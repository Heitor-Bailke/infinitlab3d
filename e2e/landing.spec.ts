import { expect, test } from "@playwright/test";

test("keyboard navigation and mobile menu keep focus usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.keyboard.press("Tab");
  const skipLink = page.locator(".skip-link");
  await expect(skipLink).toBeFocused();

  const menuToggle = page.locator(".menu-toggle");
  await expect(menuToggle).toHaveAttribute("aria-label", "Abrir menu");
  await menuToggle.click();
  await expect(menuToggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(menuToggle).toBeFocused();
  await expect(menuToggle).toHaveAttribute("aria-expanded", "false");

  await menuToggle.click();
  await page.getByRole("heading", { level: 1 }).click();
  await expect(menuToggle).toHaveAttribute("aria-expanded", "false");

  const firstFaq = page.locator(".faq-item").first();
  await firstFaq.locator("summary").click();
  await expect(firstFaq).toHaveAttribute("open", "");
});

test("customizer keeps the piece blue and updates the WhatsApp quote", async ({ page }) => {
  await page.goto("/");
  await page.locator("#personalized-name").fill("João 3D");
  await expect(page.locator(".customizer__fixed-color")).toContainText("Azul royal");
  await expect(page.getByRole("button", { name: "Branco" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Preto" })).toHaveCount(0);

  const quoteLink = page.locator(".customizer__controls a.button--full");
  const href = await quoteLink.getAttribute("href");
  expect(href).not.toBeNull();
  const quote = new URL(href!).searchParams.get("text");
  expect(quote).toContain("Nome: João 3D");
  expect(quote).toContain("Cor: Azul royal");
  expect(page.url()).toBe("http://127.0.0.1:4173/");
  await expect(page.locator(".customizer__input-meta")).toContainText("Prévia atualizada");
});

test("reduced motion and the product photo remain usable without WebGL", async ({ browser }) => {
  const reducedContext = await browser.newContext({ reducedMotion: "reduce" });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto("/");
  const duration = await reducedPage.locator(".button").first().evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).transitionDuration),
  );
  expect(duration).toBeLessThanOrEqual(0.001);
  await expect(reducedPage.locator("#hero-title")).toBeVisible();
  await reducedContext.close();

  const webglContext = await browser.newContext();
  await webglContext.addInitScript({ content: `
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type, ...args) {
      if (typeof type === "string" && /^(webgl|webgl2|experimental-webgl)$/i.test(type)) return null;
      return originalGetContext.call(this, type, ...args);
    };
  ` });
  const webglPage = await webglContext.newPage();
  await webglPage.goto("/");
  await expect(webglPage.locator("#hero-title")).toBeVisible();
  await expect(webglPage.locator(".boot-mug-viewer__photo").first()).toBeVisible();
  await expect(webglPage.locator(".boot-mug-viewer canvas")).toHaveCount(0);
  await expect(webglPage.locator(".hero__actions a.button--primary")).toBeVisible();
  await webglContext.close();
});

test("product assets, placeholders, outbound links, and mobile rail are usable", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".boot-mug-viewer__photo")).toHaveCount(2);
  await expect(page.locator(".boot-mug-viewer__photo").first()).toBeVisible();

  const desktopRail = page.locator("[data-product-rail]");
  await desktopRail.scrollIntoViewIfNeeded();
  await expect(page.locator(".product-rail-hint__desktop")).toBeVisible();
  const railBox = await desktopRail.boundingBox();
  if (!railBox) throw new Error("Product rail is not visible");
  await page.mouse.move(railBox.x + railBox.width * 0.6, railBox.y + railBox.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(railBox.x + railBox.width * 0.35, railBox.y + railBox.height * 0.5, { steps: 4 });
  await page.mouse.up();
  await expect.poll(() => desktopRail.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);

  await page.locator("img").evaluateAll((images) => {
    images.forEach((image) => { (image as HTMLImageElement).loading = "eager"; });
  });
  await page.waitForFunction(() =>
    Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0),
  );
  const imageAudit = await page.locator("img").evaluateAll((images) => images.map((element) => {
    const image = element as HTMLImageElement;
    return {
      src: new URL(image.currentSrc || image.src).pathname,
      alt: image.alt,
    };
  }));
  expect(imageAudit.length).toBeGreaterThan(0);
  expect(imageAudit.every((image) => image.alt.trim().length > 0)).toBe(true);
  expect(imageAudit.filter((image) => image.src.startsWith("/image/") && !image.src.endsWith(".jpg")).every((image) => image.src.endsWith(".webp"))).toBe(true);

  const outboundLinks = await page.locator('a[target="_blank"]').evaluateAll((links) => links.map((link) => ({
    href: (link as HTMLAnchorElement).href,
    rel: (link as HTMLAnchorElement).rel,
  })));
  expect(outboundLinks.some(({ href }) => href.startsWith("https://wa.me/"))).toBe(true);
  expect(outboundLinks.some(({ href }) => href.startsWith("https://www.instagram.com/"))).toBe(true);
  expect(outboundLinks.every(({ rel }) => rel.includes("noopener") && rel.includes("noreferrer"))).toBe(true);

  await page.setViewportSize({ width: 390, height: 844 });
  const rail = page.locator("[data-product-rail]");
  const railMetrics = await rail.evaluate((element) => {
    const style = getComputedStyle(element);
    const scrollable = element.scrollWidth > element.clientWidth;
    element.scrollLeft = Math.min(300, element.scrollWidth - element.clientWidth);
    return { scrollable, scrollLeft: element.scrollLeft, snap: style.scrollSnapType };
  });
  expect(railMetrics.scrollable).toBe(true);
  expect(railMetrics.scrollLeft).toBeGreaterThan(0);
  expect(railMetrics.snap).toContain("x");
});

test("the product photo is static and Lottie waits for the process section", async ({ page }) => {
  let releaseLottie: (() => void) | undefined;
  const lottieGate = new Promise<void>((resolve) => { releaseLottie = resolve; });
  let lottieRequested = false;

  await page.route(/ProcessLottieIcon-[^/]+\.js$/, async (route) => {
    lottieRequested = true;
    await lottieGate;
    await route.continue();
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".hero__visual .boot-mug-viewer__photo")).toBeVisible();
  await expect(page.locator(".hero__visual canvas")).toHaveCount(0);
  expect(lottieRequested).toBe(false);

  await page.locator("#processo").scrollIntoViewIfNeeded();
  await expect.poll(() => lottieRequested).toBe(true);
  releaseLottie?.();
  await expect(page.locator(".process-step__lottie svg").first()).toBeVisible({ timeout: 15_000 });
});
