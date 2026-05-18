const { chromium } = require("playwright");

const baseUrl = "http://127.0.0.1:8768";
const desktopShot =
  "/Users/woodytaylor/dev/paramis-website/field-notes/mgi-new-orleans-desktop-preview.png";
const mobileShot =
  "/Users/woodytaylor/dev/paramis-website/field-notes/mgi-new-orleans-mobile-preview.png";
const landingShot =
  "/Users/woodytaylor/dev/paramis-website/field-notes/mgi-field-notes-card-preview.png";
const walkthroughShot =
  "/Users/woodytaylor/dev/paramis-website/field-notes/mgi-new-orleans-walkthrough-preview.png";
const lightboxShot =
  "/Users/woodytaylor/dev/paramis-website/field-notes/mgi-new-orleans-lightbox-preview.png";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1100 },
    deviceScaleFactor: 1,
  });

  await page.goto(`${baseUrl}/field-notes/mgi-new-orleans.html`, {
    waitUntil: "networkidle",
  });
  await page.screenshot({ path: desktopShot, fullPage: false });
  const defaultPartsOpen = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".part-section")).map((part) => part.open)
  );
  await page.evaluate(() => {
    document.querySelectorAll(".part-section").forEach((part) => {
      part.open = true;
    });
    document.querySelectorAll("img").forEach((image) => {
      image.loading = "eager";
    });
  });
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight;
        window.scrollTo(0, y);
        if (y >= document.documentElement.scrollHeight) {
          window.scrollTo(0, 0);
          resolve();
          return;
        }
        setTimeout(step, 60);
      };
      step();
    });
  });
  await page.waitForTimeout(1000);

  const pageChecks = await page.evaluate((defaultPartsOpen) => ({
    title: document.title,
    slideCards: document.querySelectorAll(".slide-card").length,
    defaultPartsOpen,
    metaLabelCount: Array.from(document.querySelectorAll(".slide-caption")).filter((caption) =>
      /Role in the talk|Talk track|Why it matters|Next:/.test(caption.textContent)
    ).length,
    missingImages: Array.from(document.images)
      .filter((image) => !image.complete || image.naturalWidth === 0)
      .map((image) => image.src),
  }), defaultPartsOpen);

  await page.click('.slide-image-button[data-slide-index="0"]');
  await page.waitForSelector("#lightbox.active");
  await page.screenshot({ path: lightboxShot, fullPage: false });
  const lightboxOpen = await page.evaluate(() => ({
    title: document.querySelector("#lightboxTitle").textContent,
    focused: document.activeElement.id,
    modal: document.querySelector("#lightbox").getAttribute("aria-modal"),
  }));
  await page.keyboard.press("ArrowRight");
  const lightboxNext = await page.evaluate(
    () => document.querySelector("#lightboxTitle").textContent
  );
  await page.keyboard.press("Escape");
  const lightboxClosed = await page.evaluate(
    () => !document.querySelector("#lightbox").classList.contains("active")
  );

  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto(`${baseUrl}/field-notes/mgi-new-orleans.html`, {
    waitUntil: "networkidle",
  });
  await page.screenshot({ path: mobileShot, fullPage: false });

  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(`${baseUrl}/field-notes/mgi-new-orleans.html`, {
    waitUntil: "networkidle",
  });
  await page.evaluate(() => {
    document.querySelector("#slide-03").scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: walkthroughShot, fullPage: false });

  await page.goto(`${baseUrl}/field-notes.html`, { waitUntil: "networkidle" });
  await page.locator('a[href="field-notes/mgi-new-orleans.html"]').scrollIntoViewIfNeeded();
  await page.screenshot({ path: landingShot, fullPage: false });

  await browser.close();

  console.log(
    JSON.stringify(
      {
        pageChecks,
        lightboxOpen,
        lightboxNext,
        lightboxClosed,
        screenshots: { desktopShot, mobileShot, landingShot, walkthroughShot, lightboxShot },
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
