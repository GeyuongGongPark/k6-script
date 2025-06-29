import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { browser } from 'k6/browser';
import { URLS } from '../url/base.js';
import { getCurrentLoginCredentials, SELECTORS } from '../url/config.js';


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
  const credentials = getCurrentLoginCredentials();
  
  try {
    await page.goto(URLS.LOGIN.HOME);
    await page.screenshot({ path: `screenshots/screenshot_${timestamp}.png` });
    await page.goto(URLS.LOGIN.LOGIN);
    await page.screenshot({ path: `screenshots/screenshot_${timestamp}.png` });
    await page.waitForSelector(SELECTORS.LOGIN.EMAIL_INPUT);
    await page.type(SELECTORS.LOGIN.EMAIL_INPUT, credentials.EMAIL);
    await page.waitForSelector(SELECTORS.LOGIN.PASSWORD_INPUT);
    await page.type(SELECTORS.LOGIN.PASSWORD_INPUT, credentials.PASSWORD);
    await page.click(SELECTORS.LOGIN.SUBMIT_BUTTON, { nht: 0 });
    await page.goto(URLS.LOGIN.DASHBOARD);
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

