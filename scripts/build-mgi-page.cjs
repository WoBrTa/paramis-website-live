const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const walkthroughPath =
  "/Users/woodytaylor/My Drive (woody@paramis.ai)/03 Education/MGI New Orleans/HTML rebuild working v1/Your Cognitive Shift - Slide Walkthrough.md";
const outputPath = path.join(repoRoot, "field-notes", "mgi-new-orleans.html");
const assetVersion = "20260515-final";

function versionedAsset(assetPath) {
  return `${assetPath}?v=${assetVersion}`;
}

const parts = [
  {
    eyebrow: "Part I",
    title: "What Now Looks Like",
    summary: "The state of generative AI in 2026: what changed, what is new, what is risky.",
    range: [1, 8],
    open: true,
  },
  {
    eyebrow: "Part II",
    title: "Forecasting Impact",
    summary: "Where AI lands in professional services work and the firm.",
    range: [9, 14],
    open: false,
    quote:
      "An assistant responds when you drive. An agent takes a goal and acts through steps on your behalf. That distinction changes the management problem.",
  },
  {
    eyebrow: "Part III",
    title: "Workforce Transformation",
    summary: "Building, training, and listening to the people who will use it.",
    range: [15, 24],
    open: false,
    quote:
      "The number is less important than the paradigm. AI moves fastest where outputs can be checked. It is harder to replace judgment, presence, accountability, and taste.",
  },
  {
    eyebrow: "Part IV",
    title: "Looking Ahead",
    summary: "A maturity model and a 90-day playbook for personal and firm-level moves.",
    range: [25, 30],
    open: false,
    quote:
      "The most important asset in this transition is not the model. It is the workforce you teach, equip, and trust to use it.",
  },
];

const whyItMatters = {
  4: "Why it matters: For accounting and advisory leaders, reasoning is what makes AI useful for tax research, audit risk assessment, advisory analysis, and other work that requires structured judgment, not just drafting.",
  8: "Why it matters: Mythos is a frontier-model evaluation involving novel scientific work. It signals both capability and risk: the same systems that can find what people miss can also behave in ways leaders need to understand and govern.",
  11: "Why it matters: This is one of the deck's main diagnostic moves. The practical question is not whether a job is exposed, but whether the output can be checked, reviewed, and trusted.",
  13: "Why it matters: Organization charts may change from the bottom up. Power users absorb work, coordination layers compress, and mid-tier roles get reshaped before a formal reorg ever appears.",
  14: "Why it matters: Clients with their own AI will review scope, pricing, quality, and communication differently. That changes what trust looks like in a professional services relationship.",
  16: "Why it matters: This reframes adoption as identity design, not tool rollout. The goal is to create professionals whose judgment is amplified by the firm's tools, data, workflows, and standards.",
  17: "Why it matters: Training here does not mean a one-time webinar. It means repeated practice on real work, so people learn what the tools can do, where they fail, and how to supervise them.",
  19: "Why it matters: Message volume is a weak proxy for progress. Managing partners need to know whether people are moving into higher-complexity work, not just whether they are chatting more.",
  23: "Why it matters: This is where the agent-manager role starts to appear. Workers move from doing every step to directing, reviewing, and improving AI-supported work.",
  24: "Why it matters: Per-seat pricing gets less useful when AI becomes frequent and agentic. Leaders need to plan for variable usage costs and measure ROI by workflow, not only by license count.",
  27: "Why it matters: The maturity model is not one score for the whole firm. Each row is a separate diagnostic, and uneven maturity is the normal starting point.",
};

const finishedCaptions = {
  1: [
    "The opening frame names the core idea: AI adoption is now a shift in how professionals think, work, and manage transformation.",
    "The page is not about a new tool in isolation. It is about what changes when AI becomes part of the operating environment of a firm.",
  ],
  2: [
    "Part I establishes the shared timeline. Before strategy or governance can be useful, leaders need a common view of what changed between early generative AI and the agentic systems now entering business workflows.",
  ],
  3: [
    "Generative AI is introduced through a familiar brain comparison: training, memory, context, and alignment.",
    "The comparison is useful because it makes the technology legible. It is also limited, because each of those model behaviors works differently from human cognition.",
  ],
  4: [
    "Newer models do more than produce fluent text. They can work through problems, reason across steps, and apply structured judgment.",
    "For accounting and advisory leaders, that is what makes AI useful for tax research, audit risk assessment, advisory analysis, and other work that requires interpretation, not just drafting.",
  ],
  5: [
    "Frontier AI has moved from consumer novelty to enterprise-accessible infrastructure.",
    "By 2025, major platforms had business versions with stronger data protections. Waiting for perfect certainty before learning the tools became its own business risk.",
  ],
  6: [
    "The assistant-to-agent distinction changes the management problem.",
    "An assistant responds to prompts. An agent can take a goal, work through steps, and act across tools or systems on a person's behalf.",
  ],
  7: [
    "The desk-work experience has changed quickly: paste, draft, run.",
    "In 2023, many people pasted work into a chat window. By 2026, AI systems can pull from email, texts, meetings, and memory to run more complete workflows.",
  ],
  8: [
    "Claude Mythos is used as a threshold example for frontier-model behavior.",
    "The point is not the model brand. The point is that the most capable systems are useful because they can find things humans miss, and risky because they increasingly understand context, evaluation, and constraints.",
  ],
  9: [
    "Part II turns from capability to impact.",
    "The question is where AI matters first, where it matters most, and how leaders should think about exposure in professional services work.",
  ],
  10: [
    "Forecasts about automation vary, but the scale is large enough to matter.",
    "The exact percentage is less important than the direction of travel: a meaningful share of current work hours is exposed to AI support or automation.",
  ],
  11: [
    "Forecasts are speculative and can become dated quickly.",
    "A better lens is the spectrum from verifiable to unverifiable work. AI moves fastest where outputs can be checked. It is harder to replace judgment, presence, accountability, and taste.",
  ],
  12: [
    "The exposure lens becomes practical when applied to accounting skills.",
    "Some skills are automation candidates. Some are AI-assisted. Some require human review. The safest skills are the ones where judgment, context, listening, and decision quality remain central.",
  ],
  13: [
    "Organizational reshaping may start at the bottom rather than through a formal top-down redesign.",
    "Power users absorb more work, laptops ship with AI on by default, coordination layers compress, and mid-tier roles get reshaped before the chart catches up.",
  ],
  14: [
    "Clients will also use AI, and that changes the relationship from both sides.",
    "Clients will review work, decisions, and conversations differently. That puts pressure on authenticity, pricing, scope clarity, and visible value.",
  ],
  15: [
    "Part III shifts the focus to the workforce.",
    "The model is not the most important asset in the transition. The central asset is the workforce a firm teaches, equips, and trusts to use it.",
  ],
  16: [
    "AI adoption is also professional identity design.",
    "The stronger question is not only how to get people to use AI. It is what kind of professional can exist inside the firm because of its tools, data, workflows, and judgment standards.",
  ],
  17: [
    "Training matters because these systems are not one thing.",
    "They are models, interfaces, tools, modalities, and learned working relationships. People need repeated practice on real work to build intuition and supervision habits.",
  ],
  18: [
    "Week-10 activity shows whether access is becoming actual use.",
    "The signal is not just that people have accounts. It is whether many people are actively using the platform and sustaining meaningful message volume.",
  ],
  19: [
    "Message volume is only the surface metric.",
    "A better signal is whether people are moving from simple chats into higher-complexity work. Training can accelerate that shift, and leaders should measure it directly.",
  ],
  20: [
    "Early wins matter because they show people finding real work, not abstract use cases.",
    "The examples connect AI to time savings, quality control, repeatable operating value, and the local creativity that makes adoption stick.",
  ],
  21: [
    "Workers are often the best source of truth about adoption.",
    "Their feedback helps leaders understand pace, productivity, quality, and where support is still needed.",
  ],
  22: [
    "Qualitative feedback keeps the adoption story honest.",
    "There can be momentum and concern at the same time. Leaders need to hear both, because trust is part of the implementation architecture.",
  ],
  23: [
    "Productivity claims from workers deserve serious attention.",
    "When people report 15 to 25 percent gains, the management question changes. Work shifts from doing every step to directing, reviewing, and improving AI-supported output.",
  ],
  24: [
    "Broader and more agentic AI use changes software economics.",
    "A flat per-seat license may not reflect actual compute usage. Leaders need to plan for variable costs and measure ROI by workflow, not only by seat.",
  ],
  25: [
    "Part IV turns the deck toward orientation and action.",
    "The goal is not prediction for its own sake. It is a practical way to see where the firm is on the curve and what to do next.",
  ],
  26: [
    "The curve has three broad phases: literacy and augmentation, agents and integration, and AI-native organizations.",
    "Most firms will not move through those phases cleanly. They will have pieces of all three at once.",
  ],
  27: [
    "The maturity model is multidimensional.",
    "A firm may be advanced in workforce experimentation and early in governance, data readiness, products, customer expectations, or vendor strategy. Each row is a separate diagnostic.",
  ],
  28: [
    "The first 90-day actions start with individual fluency.",
    "Leaders need to use the tools deeply, try voice, reserve time for practice, and find the curious people who are already moving.",
  ],
  29: [
    "The firm-level 90-day actions move the work from curiosity into management practice.",
    "A firm can audit one engagement for value pricing, add AI to continuity planning, refresh succession criteria, and ask clients what they expect in an AI-shaped market.",
  ],
  30: [
    "The closing slide moves from the deck to the operating question.",
    "What will the firm test, what will it change, and what will it decide not to wait on?",
  ],
};

const visualDescriptions = {
  1: "A dark title slide with the Paramis mark and New Orleans conference subtitle.",
  2: "A section divider for the first part of the talk.",
  3: "A brain comparison diagram explaining generative AI concepts.",
  4: "A reasoning-model slide showing why step-by-step thinking changes professional work.",
  5: "A platform availability slide showing enterprise AI becoming broadly accessible.",
  6: "A comparison of assistant behavior and agent behavior.",
  7: "A desk-work timeline moving from paste to draft to run.",
  8: "A threshold example about Claude Mythos and frontier model behavior.",
  9: "A section divider for forecasting impact.",
  10: "A forecast slide about the scale of work-hour exposure.",
  11: "A comparison of verifiable and unverifiable work.",
  12: "An accounting skills exposure map.",
  13: "An organization-shape diagram showing bottom-up change.",
  14: "A client expectations slide about trust, pricing, and AI-assisted review.",
  15: "A section divider for workforce transformation.",
  16: "A new employee profile framed around tools, data, judgment, and identity.",
  17: "A training slide showing models, modalities, tools, and working relationships.",
  18: "An adoption activity slide with week-10 usage signals.",
  19: "A complexity-of-use slide showing tool mix over time.",
  20: "A slide with examples of entrepreneurial exploration and ROI thinking.",
  21: "A worker feedback slide showing adoption pace, productivity, and quality signals.",
  22: "A qualitative feedback slide balancing enthusiasm and caution.",
  23: "A productivity and agent-manager slide.",
  24: "A cost slide about usage, inference, and software economics.",
  25: "A section divider for looking ahead.",
  26: "A three-phase framework for tracking the AI adoption curve.",
  27: "A maturity matrix across workforce, governance, data, products, customers, and vendors.",
  28: "A next-90-days checklist for individual leaders.",
  29: "A next-90-days checklist for the firm.",
  30: "A closing thank-you slide with contact information.",
};

const glossary = [
  ["Agent", "A model that takes a goal and works through steps to achieve it, often using tools, memory, and other systems."],
  ["Assistant", "A model that responds to prompts in a back-and-forth pattern. The user drives the work one request at a time."],
  ["Inference cost", "The compute cost of running a model to generate output. It rises with usage volume, model size, and task complexity."],
  ["Context window", "The amount of text a model can consider at once when generating a response. Roughly the model's short-term memory."],
  ["Frontier model", "One of the most capable models available at a given moment, usually near the leading edge of public capability."],
  ["Value pricing", "Pricing based on value delivered to the client rather than hours spent. It matters more when AI compresses delivery time."],
  ["Agent manager", "A role pattern where a person directs, reviews, and improves AI-supported work instead of doing every step manually."],
];

function textAfter(label, block) {
  const match = block.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*([^\\n]+)`));
  return match ? match[1].trim().replace(/^"|"$/g, "") : "";
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sentenceLead(value) {
  return /[.!?]$/.test(value) ? value : `${value}.`;
}

function parseSlides(markdown) {
  const slides = [];
  const regex = /## Slide (\d+): ([^\n]+)\n([\s\S]*?)(?=\n## Slide \d+:|\s*$)/g;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    const number = Number(match[1]);
    slides.push({
      number,
      title: match[2].trim(),
      role: textAfter("Purpose", match[3]),
      talk: textAfter("Talk track", match[3]),
      transition: textAfter("Transition", match[3]),
      why: whyItMatters[number] || "",
      paragraphs: finishedCaptions[number],
      image: versionedAsset(`assets/mgi-slide-${String(number).padStart(2, "0")}.png`),
      alt: `Slide ${String(number).padStart(2, "0")}: ${sentenceLead(match[2].trim())} ${visualDescriptions[number]}`,
    });
  }
  if (slides.length !== 30) {
    throw new Error(`Expected 30 slides, found ${slides.length}.`);
  }
  return slides;
}

function slideCard(slide) {
  const n = String(slide.number).padStart(2, "0");
  return `
        <article class="slide-card reveal" id="slide-${n}">
          <button class="slide-image-button" type="button" data-slide-index="${slide.number - 1}" aria-label="Open slide ${n}: ${escapeHtml(slide.title)}">
            <img src="${slide.image}" alt="${escapeHtml(slide.alt)}" loading="lazy" width="1920" height="1080">
            <span class="zoom-hint">Open slide</span>
          </button>
          <div class="slide-caption">
            <p class="slide-kicker">Slide ${n}</p>
            <h3>${escapeHtml(slide.title)}</h3>
            ${slide.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n            ")}
          </div>
        </article>`;
}

function partMarkup(part, slides) {
  const selected = slides.filter(
    (slide) => slide.number >= part.range[0] && slide.number <= part.range[1]
  );
  const quote = part.quote
    ? `
    <div class="pull-quote reveal">
      <p>${escapeHtml(part.quote)}</p>
    </div>`
    : "";
  return `${quote}
    <details class="part-section reveal" ${part.open ? "open" : ""}>
      <summary>
        <span class="part-label">${escapeHtml(part.eyebrow)}</span>
        <span class="part-title">${escapeHtml(part.title)}</span>
        <span class="part-summary">${escapeHtml(part.summary)}</span>
        <span class="slide-count">${selected.length} slides</span>
      </summary>
      <div class="part-content">
${selected.map(slideCard).join("\n")}
      </div>
    </details>`;
}

function lightboxData(slides) {
  return slides.map((slide) => ({
    title: `Slide ${String(slide.number).padStart(2, "0")}: ${slide.title}`,
    image: slide.image,
    alt: slide.alt,
    paragraphs: slide.paragraphs,
  }));
}

function render(slides) {
  const slideJson = JSON.stringify(lightboxData(slides));
  const schemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Your Cognitive Shift",
    description:
      "A slide-by-slide Field Notes walkthrough of Woody Taylor's MGI Worldwide North America keynote on AI and operating-model change.",
    author: { "@type": "Person", name: "Woody Taylor" },
    datePublished: "2026-05-15",
    image: "https://paramis.ai/field-notes/assets/mgi-new-orleans-hero.png",
    about: {
      "@type": "PresentationDigitalDocument",
      name: "Your Cognitive Shift",
      isPartOf: "MGI Worldwide North America New Orleans Conference",
    },
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Cognitive Shift | A Keynote at MGI Worldwide North America | Paramis Field Notes</title>
  <meta name="description" content="A slide-by-slide walkthrough of Woody Taylor's MGI keynote on AI, agent behavior, and the operating-model shift facing professional services firms.">
  <meta name="author" content="Woody Taylor">
  <link rel="canonical" href="https://paramis.ai/field-notes/mgi-new-orleans.html">
  <meta property="og:type" content="article">
  <meta property="og:title" content="Your Cognitive Shift | Paramis Field Notes">
  <meta property="og:description" content="The full deck, slide by slide, from a keynote for managing partners on AI and the operating-model shift.">
  <meta property="og:url" content="https://paramis.ai/field-notes/mgi-new-orleans.html">
  <meta property="og:image" content="https://paramis.ai/field-notes/assets/mgi-new-orleans-hero.png">
  <meta property="og:image:alt" content="The title slide for Your Cognitive Shift, a keynote by Woody Taylor.">
  <meta property="article:published_time" content="2026-05-15">
  <meta property="article:author" content="Woody Taylor">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Your Cognitive Shift | Paramis Field Notes">
  <meta name="twitter:description" content="The full deck, slide by slide, from a keynote for managing partners on AI and the operating-model shift.">
  <meta name="twitter:image" content="https://paramis.ai/field-notes/assets/mgi-new-orleans-hero.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script type="application/ld+json">${schemaJson}</script>
  <style>
    :root {
      --primary: #4A90A4;
      --primary-light: #7CB9E8;
      --primary-dark: #2C5F72;
      --accent: #F5A623;
      --dark: #0a0a0a;
      --dark-elevated: #111111;
      --light: #ffffff;
      --gray: #b7b7b7;
      --gray-dim: #858585;
      --glass: rgba(255, 255, 255, 0.035);
      --glass-border: rgba(255, 255, 255, 0.1);
      --text-sm: 0.875rem;
      --text-base: 1rem;
      --text-lg: 1.125rem;
      --text-xl: 1.5rem;
      --text-2xl: 2rem;
      --text-3xl: 2.5rem;
      --text-4xl: clamp(2.6rem, 6vw, 5rem);
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--dark);
      color: var(--light);
      line-height: 1.6;
      overflow-x: hidden;
    }
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      opacity: 0.015;
      z-index: 10000;
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }
    body::after {
      content: '';
      position: fixed;
      inset: 0;
      background:
        radial-gradient(ellipse at 18% 80%, rgba(74, 144, 164, 0.13) 0%, transparent 48%),
        radial-gradient(ellipse at 82% 18%, rgba(245, 166, 35, 0.07) 0%, transparent 48%);
      pointer-events: none;
      z-index: -1;
    }
    .skip-link {
      position: fixed;
      left: 1rem;
      top: -4rem;
      z-index: 10004;
      padding: 0.75rem 1rem;
      background: var(--light);
      color: var(--dark);
      border-radius: 4px;
      text-decoration: none;
      font-weight: 700;
    }
    .skip-link:focus { top: 1rem; }
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--primary), var(--accent));
      z-index: 10002;
      transform-origin: left;
      transform: scaleX(0);
    }
    .cursor-glow {
      position: fixed;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(74, 144, 164, 0.12) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
    }
    nav {
      position: fixed;
      top: 0;
      width: 100%;
      padding: 1rem 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1000;
      background: rgba(10, 10, 10, 0.72);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--glass-border);
      transition: all 0.3s ease;
    }
    nav.scrolled { padding: 0.75rem 5%; background: rgba(10, 10, 10, 0.9); }
    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: var(--light);
      font-weight: 600;
      font-size: 1.35rem;
    }
    .logo img { height: 36px; }
    .nav-links { display: flex; gap: 2.5rem; list-style: none; }
    .nav-links a {
      color: var(--gray);
      text-decoration: none;
      font-size: var(--text-sm);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      padding-bottom: 4px;
      transition: color 0.3s;
    }
    .nav-links a:hover, .nav-links a.active { color: var(--light); }
    .mobile-menu-btn { display: none; flex-direction: column; gap: 5px; padding: 10px; background: transparent; border: 0; }
    .mobile-menu-btn span { width: 24px; height: 2px; background: var(--light); transition: all 0.3s ease; }
    .entry-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 8rem 5% 4rem;
    }
    .content-column { max-width: 760px; margin: 0 auto; }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--primary-light);
      text-decoration: none;
      font-size: var(--text-sm);
      font-weight: 600;
      letter-spacing: 0.4px;
      margin-bottom: 2rem;
    }
    .entry-meta, .card-meta {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1.2rem;
      color: var(--gray);
      font-size: var(--text-sm);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 600;
    }
    .entry-tag, .part-label, .slide-kicker {
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 1.6px;
      font-size: var(--text-sm);
      font-weight: 700;
    }
    h1.entry-title {
      font-size: var(--text-4xl);
      line-height: 0.98;
      letter-spacing: 0;
      margin-bottom: 1.4rem;
    }
    .entry-subtitle {
      color: var(--gray);
      font-size: var(--text-xl);
      line-height: 1.45;
      margin-bottom: 3rem;
    }
    .hero-slide {
      border: 1px solid var(--glass-border);
      background: var(--glass);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
      margin: 0 auto 4rem;
      max-width: 1040px;
    }
    .hero-slide img { width: 100%; display: block; }
    .exec-summary {
      background: linear-gradient(135deg, rgba(74, 144, 164, 0.1), rgba(245, 166, 35, 0.05));
      border: 1px solid var(--glass-border);
      border-radius: 8px;
      padding: 2rem;
      margin-bottom: 3rem;
      color: #e7e7e7;
      font-size: var(--text-lg);
    }
    .stats-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
      margin: 0 auto;
      max-width: 1040px;
    }
    .stat-card {
      background: var(--glass);
      border: 1px solid var(--glass-border);
      border-radius: 8px;
      padding: 1.75rem;
      min-height: 170px;
    }
    .stat-value { color: var(--accent); font-size: var(--text-2xl); font-weight: 700; line-height: 1.1; margin-bottom: 1rem; }
    .stat-label { color: var(--gray); font-size: var(--text-base); }
    .section-divider {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 5% 2rem;
      text-align: center;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 700;
    }
    .deck-controls {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      margin: 0 auto 1.5rem;
      max-width: 1040px;
    }
    .deck-controls button, .lightbox button, .contact-popup button {
      font-family: inherit;
    }
    .deck-controls button {
      border: 1px solid var(--glass-border);
      background: rgba(255, 255, 255, 0.04);
      color: var(--light);
      border-radius: 999px;
      padding: 0.55rem 0.85rem;
      cursor: pointer;
      font-weight: 600;
    }
    .part-section {
      max-width: 1040px;
      margin: 0 auto 1rem;
      border: 1px solid var(--glass-border);
      background: rgba(255, 255, 255, 0.025);
      border-radius: 8px;
      overflow: hidden;
    }
    .part-section summary {
      display: grid;
      grid-template-columns: auto 1fr auto auto;
      gap: 1rem;
      align-items: center;
      padding: 1.4rem;
      cursor: pointer;
      list-style: none;
    }
    .part-section summary::-webkit-details-marker { display: none; }
    .part-section summary::after {
      content: 'v';
      color: var(--primary-light);
      font-weight: 700;
      transition: transform 0.25s ease;
    }
    .part-section[open] summary::after { transform: rotate(180deg); }
    .part-title {
      color: var(--light);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .part-summary { color: var(--gray); }
    .slide-count { color: var(--gray-dim); white-space: nowrap; }
    .part-content { padding: 0 1.4rem 1.4rem; }
    .slide-card {
      display: grid;
      grid-template-columns: minmax(300px, 1.05fr) minmax(280px, 0.95fr);
      gap: 1.5rem;
      margin-top: 1.4rem;
      padding: 1rem;
      border: 1px solid var(--glass-border);
      background: rgba(255, 255, 255, 0.035);
      border-radius: 8px;
      transition: transform 0.25s ease, border-color 0.25s ease;
    }
    .slide-card:hover { transform: translateY(-2px); border-color: rgba(124, 185, 232, 0.35); }
    .slide-image-button {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 6px;
      padding: 0;
      background: #050505;
      cursor: zoom-in;
    }
    .slide-image-button img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .zoom-hint {
      position: absolute;
      right: 0.75rem;
      bottom: 0.75rem;
      padding: 0.35rem 0.6rem;
      border-radius: 999px;
      background: rgba(10, 10, 10, 0.76);
      color: var(--light);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.4px;
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    .slide-image-button:hover .zoom-hint, .slide-image-button:focus-visible .zoom-hint { opacity: 1; }
    .slide-caption { color: #e2e2e2; }
    .slide-caption h3 {
      font-size: var(--text-xl);
      line-height: 1.2;
      margin: 0.25rem 0 1rem;
      letter-spacing: 0;
    }
    .slide-caption p { margin-bottom: 0.9rem; color: #d8d8d8; }
    .talk-track {
      border-left: 2px solid var(--primary);
      padding-left: 0.9rem;
      color: #ededed;
    }
    .next-note { color: var(--gray); font-size: var(--text-sm); }
    .pull-quote {
      max-width: 860px;
      margin: 3rem auto 2rem;
      padding: 1.5rem 0 1.5rem 1.5rem;
      border-left: 3px solid var(--accent);
      color: #f1e4c5;
      font-size: var(--text-xl);
      line-height: 1.45;
    }
    .glossary {
      max-width: 860px;
      margin: 4rem auto 0;
    }
    .glossary summary {
      cursor: pointer;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 700;
      padding: 1rem 0;
    }
    .glossary dl {
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 1rem 1.5rem;
      padding-top: 1rem;
      color: var(--gray);
    }
    .glossary dt { color: var(--light); font-weight: 700; }
    .cta-section {
      max-width: 760px;
      margin: 4rem auto 0;
      text-align: center;
      padding: 3rem 2rem;
      background: linear-gradient(135deg, rgba(74, 144, 164, 0.13), rgba(245, 166, 35, 0.08));
      border: 1px solid var(--glass-border);
      border-radius: 8px;
    }
    .cta-section h2 { font-size: var(--text-2xl); margin-bottom: 1rem; }
    .cta-section p { color: var(--gray); margin-bottom: 2rem; font-size: var(--text-lg); }
    .cta-btn, .popup-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.95rem 1.25rem;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      background: var(--light);
      color: var(--dark);
      text-decoration: none;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      cursor: pointer;
    }
    .footer {
      padding: 3rem 5%;
      text-align: center;
      color: var(--gray-dim);
      font-size: var(--text-sm);
    }
    .footer a { color: var(--gray); text-decoration: none; }
    .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .lightbox {
      position: fixed;
      inset: 0;
      z-index: 10003;
      display: none;
      grid-template-columns: minmax(0, 1fr) minmax(320px, 420px);
      gap: 1.2rem;
      padding: 5vh 4vw;
      background: rgba(0, 0, 0, 0.92);
    }
    .lightbox.active { display: grid; }
    .lightbox-image-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 0;
    }
    .lightbox img {
      width: 100%;
      max-height: 90vh;
      object-fit: contain;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.16);
    }
    .lightbox-panel {
      background: rgba(17, 17, 17, 0.96);
      border: 1px solid var(--glass-border);
      border-radius: 8px;
      padding: 1.25rem;
      overflow-y: auto;
      max-height: 90vh;
    }
    .lightbox-actions {
      display: flex;
      justify-content: space-between;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    .lightbox-actions button {
      min-width: 44px;
      min-height: 44px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: rgba(255, 255, 255, 0.06);
      color: var(--light);
      border-radius: 999px;
      cursor: pointer;
      font-size: 1.1rem;
      font-weight: 800;
    }
    .lightbox-panel h2 { line-height: 1.2; margin-bottom: 1rem; }
    .lightbox-panel p { color: #d8d8d8; margin-bottom: 0.85rem; }
    .contact-overlay {
      position: fixed;
      inset: 0;
      display: none;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.78);
      z-index: 10004;
      padding: 1.5rem;
    }
    .contact-overlay.open { display: flex; }
    .contact-popup {
      width: min(460px, 100%);
      background: #111;
      border: 1px solid var(--glass-border);
      border-radius: 8px;
      padding: 2rem;
      position: relative;
      text-align: center;
    }
    .popup-close {
      position: absolute;
      right: 1rem;
      top: 1rem;
      width: 36px;
      height: 36px;
      border: 1px solid var(--glass-border);
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.04);
      color: var(--light);
      cursor: pointer;
    }
    .popup-subtitle, .email-display { color: var(--gray); margin: 0.8rem 0; }
    .popup-actions { display: grid; gap: 0.8rem; margin-top: 1.5rem; }
    .popup-btn { width: 100%; border-radius: 6px; text-transform: none; letter-spacing: 0; }
    .popup-btn:not(.popup-btn-primary) { background: transparent; color: var(--light); }
    .copied-toast { color: var(--accent); opacity: 0; transition: opacity 0.25s ease; margin-top: 1rem; }
    .copied-toast.show { opacity: 1; }
    @media (max-width: 820px) {
      .nav-links {
        position: fixed;
        top: 0;
        right: -100%;
        width: min(300px, 82vw);
        height: 100vh;
        flex-direction: column;
        justify-content: center;
        background: rgba(10, 10, 10, 0.96);
        padding: 2rem;
        transition: right 0.3s ease;
      }
      .nav-links.active { right: 0; }
      .mobile-menu-btn { display: flex; }
      .stats-row { grid-template-columns: 1fr; }
      .part-section summary { grid-template-columns: 1fr auto; }
      .part-label, .part-summary { grid-column: 1 / -1; }
      .slide-card { grid-template-columns: 1fr; }
      .lightbox { grid-template-columns: 1fr; overflow-y: auto; padding: 4rem 1rem 1rem; }
      .lightbox-panel { max-height: none; }
      .glossary dl { grid-template-columns: 1fr; gap: 0.35rem; }
    }
    @media print {
      nav, .scroll-progress, .cursor-glow, .deck-controls, .cta-section, .footer, .zoom-hint, .lightbox { display: none !important; }
      body { background: #fff; color: #111; }
      body::before, body::after { display: none; }
      .entry-container { padding: 1rem 0; }
      .hero-slide, .exec-summary, .stat-card, .part-section, .slide-card { border-color: #ddd; box-shadow: none; background: #fff; color: #111; }
      .part-section:not([open]) > .part-content { display: block; }
      .slide-card { break-inside: avoid; page-break-inside: avoid; grid-template-columns: 1fr; }
      .slide-caption p, .part-summary, .stat-label, .entry-subtitle { color: #222; }
    }
  </style>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="scroll-progress"></div>
  <div class="cursor-glow"></div>

  <nav>
    <a href="../index.html" class="logo">
      <img src="../peregrine-logo.png" alt="Paramis">
      <span>Paramis</span>
    </a>
    <button class="mobile-menu-btn" type="button" aria-label="Toggle navigation">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links">
      <li><a href="../index.html#services">Services</a></li>
      <li><a href="../index.html#about">About</a></li>
      <li><a href="../field-notes.html" class="active">Field Notes</a></li>
      <li><a href="../index.html#contact">Contact</a></li>
      <li><a href="../portal.html">Client Portal</a></li>
    </ul>
  </nav>

  <main id="main">
    <div class="entry-container">
      <a href="../field-notes.html" class="back-link reveal">&larr; Field Notes</a>

      <div class="content-column">
        <div class="entry-meta reveal">
          <span class="entry-tag">Talk</span>
          <span>May 2026</span>
        </div>
        <h1 class="entry-title reveal">Your Cognitive Shift</h1>
        <p class="entry-subtitle reveal">A keynote at MGI Worldwide North America's New Orleans conference, on the operating-model shift AI is forcing on accounting and advisory firms.</p>
      </div>

      <button class="hero-slide reveal slide-image-button" type="button" data-slide-index="0" aria-label="Open title slide: Your Cognitive Shift">
        <img src="${versionedAsset("assets/mgi-new-orleans-hero.png")}" alt="Slide 01: Your Cognitive Shift. A dark title slide with the Paramis mark and New Orleans conference subtitle." width="1920" height="1080">
        <span class="zoom-hint">Open slide</span>
      </button>

      <div class="content-column">
        <div class="exec-summary reveal">
          <p>In May 2026, Woody Taylor delivered "Your Cognitive Shift" at MGI Worldwide North America's New Orleans conference for managing partners and practice leaders from accounting and advisory firms across the US and Canada. The talk argued that AI adoption has moved beyond tool rollout. Assistant behavior is giving way to agent behavior, and the implications for operating models, pricing, governance, succession, and workforce design are now concrete enough to manage.</p>
          <p>What follows is the deck itself, slide by slide, with the talk track that connected the argument.</p>
        </div>
      </div>

      <div class="stats-row reveal">
        <div class="stat-card">
          <div class="stat-value">30 Slides</div>
          <div class="stat-label">one argument, end to end: cognitive shift, operating shift, next moves</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">4 Parts</div>
          <div class="stat-label">what changed, where impact lands, how workforce shifts, what leaders do next</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">90 Days</div>
          <div class="stat-label">personal and firm-level moves leaders can start now</div>
        </div>
      </div>
    </div>

    <div class="section-divider reveal">Walk the deck.</div>

    <div class="entry-container" style="padding-top: 0;">
      <div class="deck-controls reveal">
        <button type="button" id="expandAll">Expand all</button>
        <button type="button" id="collapseAll">Collapse all</button>
      </div>
${parts.map((part) => partMarkup(part, slides)).join("\n")}

      <div class="pull-quote reveal">
        <p>The deck ends here, but the operating question starts now: what do we do next, what do we test, and what will we decide not to wait on?</p>
      </div>

      <details class="glossary reveal">
        <summary>Glossary</summary>
        <dl>
${glossary.map(([term, definition]) => `          <dt>${escapeHtml(term)}</dt>\n          <dd>${escapeHtml(definition)}</dd>`).join("\n")}
        </dl>
      </details>

      <section class="cta-section reveal">
        <h2>These are the questions managing partners are working through now.</h2>
        <p>If you want to bring them to your firm, your network, or your next conference, let's talk.</p>
        <a href="mailto:contact@paramis.ai" class="cta-btn contact-btn">Get in Touch <span>&rarr;</span></a>
      </section>
    </div>
  </main>

  <div class="footer">
    <p>&copy; 2026 <a href="../index.html">Paramis</a> &middot; <a href="mailto:woody@paramis.ai">woody@paramis.ai</a></p>
  </div>

  <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightboxTitle" aria-hidden="true">
    <div class="lightbox-image-wrap">
      <img id="lightboxImage" src="${versionedAsset("assets/mgi-slide-01.png")}" alt="">
    </div>
    <div class="lightbox-panel">
      <div class="lightbox-actions">
        <button type="button" id="prevSlide" aria-label="Previous slide">&larr;</button>
        <button type="button" id="closeLightbox" aria-label="Close slide viewer">Close</button>
        <button type="button" id="nextSlide" aria-label="Next slide">&rarr;</button>
      </div>
      <h2 id="lightboxTitle"></h2>
      <div id="lightboxCaption"></div>
    </div>
  </div>

  <div class="contact-overlay" id="contactOverlay" aria-hidden="true">
    <div class="contact-popup" role="dialog" aria-modal="true" aria-labelledby="contactTitle">
      <button class="popup-close" id="popupClose" type="button" aria-label="Close contact popup">x</button>
      <h2 id="contactTitle">Get in Touch</h2>
      <p class="popup-subtitle">Reach out to start a conversation</p>
      <div class="email-display">contact@paramis.ai</div>
      <div class="popup-actions">
        <a href="mailto:contact@paramis.ai?subject=Website%20Inquiry" class="popup-btn popup-btn-primary">Open Email Client</a>
        <button class="popup-btn" id="copyEmailBtn" type="button">Copy Email Address</button>
      </div>
      <div class="copied-toast" id="copiedToast">Copied to clipboard!</div>
    </div>
  </div>

  <script>
    const slides = ${slideJson};
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) scrollProgress.style.transform = 'scaleX(' + (window.scrollY / docHeight) + ')';
      document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 50);
    });

    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (event) => {
      cursorGlow.style.left = event.clientX + 'px';
      cursorGlow.style.top = event.clientY + 'px';
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

    const parts = Array.from(document.querySelectorAll('.part-section'));
    document.getElementById('expandAll').addEventListener('click', () => parts.forEach((part) => part.open = true));
    document.getElementById('collapseAll').addEventListener('click', () => parts.forEach((part) => part.open = false));

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightboxButton = document.getElementById('closeLightbox');
    let activeSlide = 0;
    let restoreFocusTo = null;

    function setSlide(index) {
      activeSlide = (index + slides.length) % slides.length;
      const slide = slides[activeSlide];
      lightboxImage.src = slide.image;
      lightboxImage.alt = slide.alt;
      lightboxTitle.textContent = slide.title;
      lightboxCaption.innerHTML = slide.paragraphs.map((paragraph) => '<p>' + paragraph + '</p>').join('');
    }

    function openLightbox(index, opener) {
      restoreFocusTo = opener;
      setSlide(index);
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeLightboxButton.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (restoreFocusTo) restoreFocusTo.focus();
    }

    document.querySelectorAll('.slide-image-button[data-slide-index]').forEach((button) => {
      button.addEventListener('click', () => openLightbox(Number(button.dataset.slideIndex), button));
    });
    document.getElementById('prevSlide').addEventListener('click', () => setSlide(activeSlide - 1));
    document.getElementById('nextSlide').addEventListener('click', () => setSlide(activeSlide + 1));
    closeLightboxButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (event) => {
      if (!lightbox.classList.contains('active')) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') setSlide(activeSlide - 1);
      if (event.key === 'ArrowRight') setSlide(activeSlide + 1);
      if (event.key === 'Tab') {
        const focusables = Array.from(lightbox.querySelectorAll('button, img, [tabindex]:not([tabindex="-1"])')).filter((element) => !element.disabled);
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    const contactOverlay = document.getElementById('contactOverlay');
    const popupClose = document.getElementById('popupClose');
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const copiedToast = document.getElementById('copiedToast');
    document.querySelector('.contact-btn').addEventListener('click', (event) => {
      event.preventDefault();
      contactOverlay.classList.add('open');
      contactOverlay.setAttribute('aria-hidden', 'false');
      popupClose.focus();
    });
    function closeContactPopup() {
      contactOverlay.classList.remove('open');
      contactOverlay.setAttribute('aria-hidden', 'true');
    }
    popupClose.addEventListener('click', closeContactPopup);
    contactOverlay.addEventListener('click', (event) => {
      if (event.target === contactOverlay) closeContactPopup();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeContactPopup();
    });
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('contact@paramis.ai').then(() => {
        copiedToast.classList.add('show');
        setTimeout(() => copiedToast.classList.remove('show'), 2000);
      });
    });
  </script>
</body>
</html>
`;
}

const markdown = fs.readFileSync(walkthroughPath, "utf8");
const slides = parseSlides(markdown);
fs.writeFileSync(outputPath, render(slides));
console.log(`Wrote ${outputPath}`);
