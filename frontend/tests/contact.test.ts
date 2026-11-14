// A kapcsolati űrlap limitjei és témái a frontendben (utils/contact.ts) egyezzenek a backenddel (a backend a forrás),
// és minden témának legyen felirata mindkét nyelven.
import { describe, expect, it } from "vitest";

import { CONTACT_LIMITS as BACKEND_LIMITS, CONTACT_TOPICS as BACKEND_TOPICS } from "../../backend/src/utils/validation.ts";
import { messages } from "../src/i18n/index.ts";
import { CONTACT_LIMITS, CONTACT_TOPICS } from "../src/utils/contact.ts";

describe("kapcsolati űrlap", () => {
  it("a mezőlimitek egyeznek a backendével", () => {
    expect(CONTACT_LIMITS).toEqual(BACKEND_LIMITS);
  });

  it("a témák azonosítói egyeznek a backendével, és mindkét nyelven van feliratuk", () => {
    expect([...CONTACT_TOPICS]).toEqual(Object.keys(BACKEND_TOPICS));
    for (const lang of ["hu", "en"] as const) {
      for (const topic of CONTACT_TOPICS) expect(messages(lang).contact.form.topics[topic].trim()).not.toBe("");
    }
  });
});
