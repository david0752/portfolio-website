// Nyilas szövegű linkek („Írd meg, mit automatizálnál →”): egérrel fölé húzva csak a szöveg kap aláhúzást. Ha az egész
// link aláhúzott, a szöveg és a nyíl közötti rés aláhúzatlan foltként látszik.
import { expect, test } from "@playwright/test";

for (const path of ["/", "/en/"]) {
  test(`${path}: a nyilas linkeknél hoverkor csak a szöveg aláhúzott`, async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) < 1024, "hover csak lg-től van");
    await page.goto(path);
    const links = page.locator("main a:has(> span[aria-hidden='true'])");
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
    for (let index = 0; index < count; index++) {
      const link = links.nth(index);
      if (!(await link.isVisible())) continue;
      await link.scrollIntoViewIfNeeded();
      await link.hover();
      const decoration = await link.evaluate((element) => {
        const line = (node: Element) => getComputedStyle(node).textDecorationLine;
        const children = [...element.children];
        return {
          link: line(element),
          arrow: children.filter((child) => child.getAttribute("aria-hidden") === "true").map(line),
          text: children.filter((child) => child.getAttribute("aria-hidden") !== "true").map(line),
        };
      });
      // Ha a link aláhúzást kap hoverkor, az csak a szövegén lehet, a linken és a nyílon nem.
      expect(decoration.link, await link.innerText()).toBe("none");
      expect(decoration.arrow.every((line) => line === "none")).toBe(true);
    }
  });
}
