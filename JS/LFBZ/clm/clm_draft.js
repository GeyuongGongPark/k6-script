import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { browser } from 'k6/browser';
import login_to_dashborad from "../login/login_to_dashborad.js";

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

  try {
    const page = await login_to_dashborad();
    await page.goto('https://business.lawform.io/clm/draft')
    await page.screenshot({path: `screenshots/screenshot_${Date.now()}.png`});
    return page;
  }
  finally{
    //await page.close();
  }
}
export function handleSummary(data) {
    return {
        [`Reuslt/clm_draft_summary_${Date.now()}.html`]: htmlReport(data),
    };
}

