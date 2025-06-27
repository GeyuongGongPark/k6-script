import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { browser } from 'k6/browser';


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

  try {
    await page.goto('https://business.lawform.io');
    await page.screenshot({ path: `screenshots/screenshot_${Date.now()}.png` });
    await page.goto('https://business.lawform.io/login');
    await page.screenshot({ path: `screenshots/screenshot_${Date.now()}.png` });
    await page.waitForSelector('input[type="email"');
    await page.type('input[type="email"]', 'ggpark+id20250211162329770_m@amicuslex.net');
    await page.waitForSelector('input[type="password"');
    await page.type('input[type="password"]', 'q1w2E#R$');
    await page.click('button[type="submit"]', { nht: 0 });
    await page.goto('https://business.lawform.io/dashboard');
    await page.screenshot({ path: `screenshots/screenshot_${Date.now()}.png` });
  
    return page;
  }

  finally{
    //await page.close();
  }
}
export function handleSummary(data) {
    return {
        [`Reuslt/login_summary_${Date.now()}.html`]: htmlReport(data),
    };
}

