const fs = require("fs/promises");
const path = require("path");
const { pathToFileURL } = require("url");
const { chromium } = require("playwright");

const repoRoot = path.resolve(__dirname, "..");
const deckPath =
  "/Users/woodytaylor/My Drive (woody@paramis.ai)/03 Education/MGI New Orleans/HTML rebuild working v1/Your Cognitive Shift - Standalone.html";
const outputDir = path.join(repoRoot, "field-notes", "assets");
const slideCount = 30;

async function installCaptureStyles(page) {
  await page.addStyleTag({
    content: `
      [data-reveal-step],
      .reasoning-card {
        opacity: 1 !important;
        visibility: visible !important;
        transform: translateY(0) !important;
        transition: none !important;
      }
    `,
  });
}

async function forceFinalSlideState(page, index) {
  if (index === 3) {
    await page.waitForFunction(
      () => {
        const slide = document.querySelectorAll("deck-stage > section")[3];
        return slide && slide.textContent.includes("controllable license");
      },
      null,
      { timeout: 30000 }
    );
  }

  await page.evaluate((target) => {
    const slide = document.querySelectorAll("deck-stage > section")[target];
    if (!slide) return;

    slide.classList.add("is-revealing");

    slide.querySelectorAll("[data-reveal-step]").forEach((element) => {
      element.classList.add("is-revealed");
      element.style.transition = "none";
      element.style.opacity = "1";
      element.style.visibility = "visible";
      element.style.transform = "translateY(0)";
    });

    slide.querySelectorAll(".reasoning-card").forEach((element) => {
      element.classList.add("tw-active");
      element.style.transition = "none";
      element.style.opacity = "1";
      element.style.visibility = "visible";
      element.style.transform = "translateY(0)";
    });

    slide.querySelectorAll("[data-count-up]").forEach((element) => {
      const value = Number.parseFloat(element.getAttribute("data-count-up") || "0");
      const suffix = element.getAttribute("data-count-suffix") || "";
      const useComma = element.getAttribute("data-count-comma") === "1";
      const formatted = useComma ? value.toLocaleString("en-US") : String(value);
      element.textContent = `${formatted}${suffix}`;
    });
  }, index);
}

async function getAnimationSettleDelay(page, index) {
  return page.evaluate((target) => {
    const slide = document.querySelectorAll("deck-stage > section")[target];
    if (!slide) return 350;

    const counters = [...slide.querySelectorAll("[data-count-up]")];
    if (counters.length) {
      const maxDuration = Math.max(
        ...counters.map((element) => {
          const duration = Number.parseInt(
            element.getAttribute("data-count-duration") || "1800",
            10
          );
          const order = Number.parseInt(element.getAttribute("data-count-order") || "0", 10);
          return order * (duration + 200) + duration;
        })
      );
      return maxDuration + 250;
    }

    return 350;
  }, index);
}

async function main() {
  await fs.access(deckPath);
  await fs.mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });

  await page.goto(pathToFileURL(deckPath).href, { waitUntil: "networkidle" });
  await page.waitForSelector("deck-stage", { state: "attached" });
  await installCaptureStyles(page);

  const hasApi = await page.evaluate(() => {
    const stage = document.querySelector("deck-stage");
    return Boolean(stage && typeof stage.goTo === "function");
  });

  if (!hasApi) {
    throw new Error("The standalone deck did not expose deck-stage.goTo().");
  }

  for (let index = 0; index < slideCount; index += 1) {
    await page.evaluate((target) => {
      document.querySelector("deck-stage").goTo(target);
    }, index);

    await page.waitForFunction(
      (target) => document.querySelector("deck-stage")?.index === target,
      index
    );

    await page.waitForTimeout(await getAnimationSettleDelay(page, index));
    await forceFinalSlideState(page, index);

    const slideNumber = String(index + 1).padStart(2, "0");
    const filePath = path.join(outputDir, `mgi-slide-${slideNumber}.png`);
    await page.screenshot({ path: filePath, fullPage: false });
    console.log(`Rendered slide ${slideNumber}`);
  }

  await browser.close();

  await fs.copyFile(
    path.join(outputDir, "mgi-slide-01.png"),
    path.join(outputDir, "mgi-new-orleans-hero.png")
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
