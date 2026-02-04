import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

interface UIReport {
  timestamp: string;
  viewport: { width: number; height: number };
  sections: {
    id: string;
    tagName: string;
    classNames: string[];
    text: string;
    isVisible: boolean;
  }[];
  images: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    isVisible: boolean;
    selector: string;
  }[];
  buttons: {
    text: string;
    selector: string;
    isVisible: boolean;
  }[];
  headings: {
    level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    text: string;
    selector: string;
    isVisible: boolean;
  }[];
  links: {
    href: string;
    text: string;
    selector: string;
    isVisible: boolean;
  }[];
}

async function inspectUI(port: number = 3000): Promise<void> {
  let browser: Browser | null = null;
  let page: Page | null = null;

  try {
    console.log(`🚀 Starting Playwright browser...`);
    browser = await chromium.launch();
    page = await browser.newPage();

    const url = `http://localhost:${port}`;
    console.log(`📡 Navigating to ${url}...`);

    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    console.log(`✓ Page loaded successfully`);

    // Wait for loading screen to finish (3-second minimum)
    await page.waitForTimeout(3500);
    console.log(`✓ Loading screen animation completed`);

    // Take screenshot
    const outputDir = path.join(process.cwd(), 'inspect-output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const screenshotPath = path.join(outputDir, 'screenshot.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot saved to ${screenshotPath}`);

    // Get viewport
    const viewport = page.viewportSize() || { width: 1280, height: 720 };

    // Extract sections with IDs
    const sections = await page.evaluate(() => {
      const elements = document.querySelectorAll('[id]');
      return Array.from(elements).map((el) => ({
        id: el.id,
        tagName: el.tagName.toLowerCase(),
        classNames: Array.from(el.classList),
        text: (el.textContent || '').substring(0, 100),
        isVisible:
          (el as HTMLElement).offsetParent !== null ||
          window.getComputedStyle(el).display !== 'none',
      }));
    });

    // Extract images
    const images = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img')).map((img: Element, idx) => ({
        src: (img as HTMLImageElement).src || '',
        alt: (img as HTMLImageElement).alt || '',
        width: (img as HTMLImageElement).width || undefined,
        height: (img as HTMLImageElement).height || undefined,
        isVisible:
          (img as HTMLElement).offsetParent !== null ||
          window.getComputedStyle(img).display !== 'none',
        selector: `img[alt="${(img as HTMLImageElement).alt || `unnamed-${idx}`}"]`,
      }));
    });

    // Extract buttons
    const buttons = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('button')).map((btn: Element) => ({
        text: (btn.textContent || '').trim().substring(0, 50),
        selector: btn.id
          ? `button#${btn.id}`
          : `button:contains("${(btn.textContent || '').trim().substring(0, 20)}")`,
        isVisible:
          (btn as HTMLElement).offsetParent !== null ||
          window.getComputedStyle(btn).display !== 'none',
      }));
    });

    // Extract headings
    const headings = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(
        (heading: Element) => ({
          level: heading.tagName.toLowerCase() as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
          text: (heading.textContent || '').trim().substring(0, 100),
          selector: heading.id ? `${heading.tagName.toLowerCase()}#${heading.id}` : heading.tagName.toLowerCase(),
          isVisible:
            (heading as HTMLElement).offsetParent !== null ||
            window.getComputedStyle(heading).display !== 'none',
        })
      );
    });

    // Extract links
    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a')).map((link: Element) => ({
        href: (link as HTMLAnchorElement).href || '',
        text: (link.textContent || '').trim().substring(0, 50),
        selector: link.id
          ? `a#${link.id}`
          : `a[href="${(link as HTMLAnchorElement).href || ''}"]`,
        isVisible:
          (link as HTMLElement).offsetParent !== null ||
          window.getComputedStyle(link).display !== 'none',
      }));
    });

    // Compile report
    const report: UIReport = {
      timestamp: new Date().toISOString(),
      viewport,
      sections,
      images,
      buttons,
      headings,
      links,
    };

    // Write JSON report
    const reportPath = path.join(outputDir, 'ui-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Report saved to ${reportPath}`);

    // Console summary
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📊 UI Inspection Summary`);
    console.log(`${'='.repeat(60)}`);
    console.log(`Viewport: ${viewport.width}x${viewport.height}`);
    console.log(`Sections with IDs: ${sections.length}`);
    console.log(`Images: ${images.length}`);
    console.log(`Buttons: ${buttons.length}`);
    console.log(`Headings: ${headings.length}`);
    console.log(`Links: ${links.length}`);
    console.log(`\nSection IDs found:`);
    sections.forEach((sec) => {
      console.log(`  • ${sec.id}`);
    });
    console.log(`\nOutput files:`);
    console.log(`  • ${screenshotPath}`);
    console.log(`  • ${reportPath}`);
    console.log(`${'='.repeat(60)}\n`);

    process.exit(0);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`❌ Error: ${message}`);
    process.exit(1);
  } finally {
    if (page) await page.close();
    if (browser) await browser.close();
  }
}

// Parse CLI arguments
const args = process.argv.slice(2);
let port = 3000;
const portArg = args.find((arg) => arg.startsWith('--port='));
if (portArg) {
  port = parseInt(portArg.split('=')[1], 10);
}

inspectUI(port);
