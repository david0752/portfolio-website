/**
 * A kapcsolati végpont tesztjei (npm test): mezőellenőrzés, limitek, spamcsapda, hiányzó SMTP, rate limit.
 * A levélküldés mockolva van, valódi e-mail nem megy ki.
 */

import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const sendMock = vi.fn();
vi.mock("nodemailer", () => ({ default: { createTransport: () => ({ sendMail: sendMock }) } }));

// Proxy mód: minden kérés saját X-Forwarded-For IP-ről jön, így a tesztek nem osztoznak a rate limit keretén.
process.env.TRUST_PROXY = "1";
const { app } = await import("../src/app.js");

let ipCounter = 0;
const post = (body: object, ip = `10.0.0.${++ipCounter}`) =>
  request(app).post("/api/contact").set("X-Forwarded-For", ip).send(body);

const valid = { topic: "new-site", name: "Teszt Elek", email: "teszt@example.com", message: "Szeretnék egy weboldalt." };

describe("POST /api/contact", () => {
  beforeEach(() => {
    sendMock.mockReset();
    Object.assign(process.env, { SMTP_HOST: "smtp.test", SMTP_USER: "u@test.hu", SMTP_PASS: "x", CONTACT_TO: "to@test.hu" });
  });

  it("érvényes üzenetet továbbít, a válasz a feladónak megy", async () => {
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledOnce();
    expect(sendMock.mock.calls[0][0].replyTo.address).toBe(valid.email);
    expect(sendMock.mock.calls[0][0].subject).toContain("Új weboldal");
  });

  it("ismeretlen vagy hiányzó témát 400-zal elutasít", async () => {
    for (const topic of [undefined, "", "hacker", "__proto__", "toString"]) {
      const res = await post({ ...valid, topic });
      expect(res.status).toBe(400);
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
    const res = await post({ ...valid, message: "a".repeat(3001) });
    expect(res.status).toBe(400);
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

  it("hiányzó SMTP beállításnál 503", async () => {
    delete process.env.SMTP_HOST;
    const res = await post(valid);
    expect(res.status).toBe(503);
  });

  it("egy IP-ről óránként 5 üzenet után 429", async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) statuses.push((await post(valid, "10.9.9.9")).status);
    expect(statuses).toEqual([200, 200, 200, 200, 200, 429]);
  });
});
