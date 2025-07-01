import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { browser } from 'k6/browser';
import login_to_dashborad from "../login/login_to_dashborad.js";
import { URLS } from '../url/base.js';
import { getFormattedTimestamp } from "../common/utils.js";

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
  //const page = await browser.newPage();
  const timestamp = getFormattedTimestamp().replace(/:/g, '_');

  try {
    const page = await login_to_dashborad();
    await page.goto(URLS.ADVICE.DRAFT)
    await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
    return page;
  }
  finally{
    //await page.close();
  }
}
export function handleSummary(data) {
  const timestamp = getFormattedTimestamp().replace(/:/g, '_');  
  return {
        [`Reuslt/clm_draft_summary_${timestamp}.html`]: htmlReport(data),
    };
}

