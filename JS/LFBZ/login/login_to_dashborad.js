import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { browser } from 'k6/browser';


function getFormattedTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const page = await browser.newPage();
  const timestamp = getFormattedTimestamp().replace(/:/g, '_');
  try {
    await page.goto('https://business.lawform.io');
    await page.screenshot({ path: `screenshots/screenshot_${timestamp}.png` });
    await page.goto('https://business.lawform.io/login');
    await page.screenshot({ path: `screenshots/screenshot_${timestamp}.png` });
    await page.waitForSelector('input[type="email"');
    await page.type('input[type="email"]', 'ggpark+id20250211162329770_m@amicuslex.net');
    await page.waitForSelector('input[type="password"');
    await page.type('input[type="password"]', 'q1w2E#R$');
    await page.click('button[type="submit"]', { nht: 0 });
    await page.goto('https://business.lawform.io/dashboard');
    await page.screenshot({ path: `screenshots/screenshot_${timestamp}.png` });
  
    return page;
  }

  finally{
    //await page.close();
  }
}
export function handleSummary(data) {
  const timestamp = getFormattedTimestamp().replace(/:/g, '_');
  return {
        [`Reuslt/login_summary_${timestamp}.html`]: htmlReport(data),
    };
}

