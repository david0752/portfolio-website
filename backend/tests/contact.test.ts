/**
 * A kapcsolati végpont tesztjei (npm test): mezőellenőrzés, limitek, spamcsapda, eredet- és méretellenőrzés,
 * hiányzó levélküldő, rate limit. A Worker fetch függvényét hívják hamis env-vel: valódi e-mail nem megy ki.
 */

import { beforeEach, describe, expect, it, vi } from "vitest";

import worker from "../src/worker.js";

const SITE = "https://szdavid.dev";
const sendMock = vi.fn();
let limiterOk = true;

function makeEnv(overrides: Partial<Env> = {}): Env {
  return {
    CONTACT_MAIL: { send: sendMock },
    CONTACT_LIMITER: { limit: async () => ({ success: limiterOk }) },
    MAIL_FROM: "urlap@szdavid.dev",
    MAIL_TO: "szanto.david12@gmail.com",
    ...overrides,
  } as unknown as Env;
}

const valid = { topic: "new-site", name: "Teszt Elek", email: "teszt@example.com", message: "Szeretnék egy weboldalt." };

async function post(body: unknown, { env = makeEnv(), origin = SITE, raw }: { env?: Env; origin?: string | null; raw?: string } = {}) {
  const headers: Record<string, string> = { "Content-Type": "application/json", "CF-Connecting-IP": "10.0.0.1" };
  if (origin) headers.Origin = origin;
  const request = new Request(`${SITE}/api/contact`, { method: "POST", headers, body: raw ?? JSON.stringify(body) });
  const response = await worker.fetch(request as Parameters<typeof worker.fetch>[0], env, {} as ExecutionContext);
  return { status: response.status, body: (await response.json()) as { message: string } };
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    sendMock.mockReset();
    limiterOk = true;
  });

  it("érvényes üzenetet továbbít, a válasz a feladónak megy, fontosként jelölve", async () => {
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledOnce();
    const mail = sendMock.mock.calls[0][0];
    expect(mail.replyTo.email).toBe(valid.email);
    expect(mail.to).toBe("szanto.david12@gmail.com");
    expect(mail.subject).toBe("Új weboldal – Teszt Elek");
    expect(mail.headers.Importance).toBe("high");
  });

  it("ismeretlen vagy hiányzó témát 400-zal elutasít", async () => {
    for (const topic of [undefined, "", "hacker", "__proto__", "toString"]) {
      expect((await post({ ...valid, topic })).status).toBe(400);
    }
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("hiányzó vagy rossz mezőt 400-zal elutasít", async () => {
    for (const body of [{ ...valid, name: "" }, { ...valid, email: "nem-email" }, { ...valid, message: "rövid" }]) {
      const res = await post(body);
      expect(res.status).toBe(400);
      expect(res.body.message).toBeTruthy();
    }
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("a limit feletti hosszt elutasítja", async () => {
    expect((await post({ ...valid, message: "a".repeat(3001) })).status).toBe(400);
    expect((await post({ ...valid, name: "a".repeat(101) })).status).toBe(400);
  });

  it("a 20 KB-nál nagyobb kérést 413-mal elutasítja", async () => {
    expect((await post({ ...valid, message: "a".repeat(25_000) })).status).toBe(413);
  });

  it("hibás JSON-ra 400", async () => {
    expect((await post(null, { raw: "{nem json" })).status).toBe(400);
    expect((await post([1, 2])).status).toBe(400);
  });

  it("a névből kiveszi a sortörést (fejléc-injekció ellen)", async () => {
    await post({ ...valid, name: "Elek\r\nBcc: x@y.hu" });
    expect(sendMock.mock.calls[0][0].replyTo.name).not.toMatch(/[\r\n]/);
  });

  it("kitöltött spamcsapdánál nem küld levelet, de sikert jelez", async () => {
    const res = await post({ ...valid, website: "http://spam" });
    expect(res.status).toBe(200);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("más oldalról érkező kérést 403-mal elutasít, Origin nélkülit elfogad", async () => {
    expect((await post(valid, { origin: "https://gonosz.example" })).status).toBe(403);
    expect((await post(valid, { origin: "null" })).status).toBe(403);
    expect((await post(valid, { origin: null })).status).toBe(200);
  });

  it("hiányzó levélküldőnél 503", async () => {
    expect((await post(valid, { env: makeEnv({ CONTACT_MAIL: undefined }) })).status).toBe(503);
  });

  it("ha a levélküldés hibát dob, 502 általános üzenettel", async () => {
    sendMock.mockRejectedValueOnce(Object.assign(new Error("boom"), { code: "E_DELIVERY_FAILED" }));
    const res = await post(valid);
    expect(res.status).toBe(502);
    expect(res.body.message).not.toContain("boom");
  });

  it("a rate limit felett 429", async () => {
    limiterOk = false;
    expect((await post(valid)).status).toBe(429);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("más végpontra 404, GET-re 405", async () => {
    const env = makeEnv();
    const ctx = {} as ExecutionContext;
    type Req = Parameters<typeof worker.fetch>[0];
    expect((await worker.fetch(new Request(`${SITE}/api/semmi`) as Req, env, ctx)).status).toBe(404);
    expect((await worker.fetch(new Request(`${SITE}/api/contact`) as Req, env, ctx)).status).toBe(405);
    // Perjellel is ugyanaz a végpont.
    expect((await worker.fetch(new Request(`${SITE}/api/contact/`) as Req, env, ctx)).status).toBe(405);
  });
});
