import { URLS } from './url/base.js';
import login_to_dashborad from './login/login_to_dashborad.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { browser } from 'k6/browser';
//import { url } from 'k6/http';

//타임스탬프 날짜 변환
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

  //브라우저 오픈
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

async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}  

export default async function () {
    const timestamp = getFormattedTimestamp().replace(/:/g, '_'); //timestamp :를 _로 치환 

    let page;
    try {
        const page = await login_to_dashborad();
        //CLM page
        await page.goto(URLS.CLM.DRAFT)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        await page.goto(URLS.CLM.REVIEW)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        await page.goto(URLS.CLM.COMPLETE)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        await page.goto(URLS.CLM.PAUSE)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        //SEAL page
        await page.goto(URLS.SEAL.DRAFT)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        await page.goto(URLS.SEAL.REVIEW)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        await page.goto(URLS.SEAL.LEDGER)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        //ADVICE page
        await page.goto(URLS.ADVICE.DRAFT)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        await page.goto(URLS.ADVICE.REVIEW)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        //LITIGATGION page
        await page.goto(URLS.LITIGATION.DRAFT)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        await page.goto(URLS.LITIGATION.REVIEW)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        await page.goto(URLS.LITIGATION.SCHEDULE)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        //LAW page
        await page.goto(URLS.LAW.SCHEDULE)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        //PROJECT page
        await page.goto(URLS.PROJECT.PROJECT)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        //CONTRACT page
        await page.goto(URLS.CONTRACT.CONTRACT)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        await page.goto(URLS.CONTRACT.STAMP)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        await page.goto(URLS.CONTRACT.LOGO)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        await page.goto(URLS.CONTRACT.TEAM_STAMP)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        await page.goto(URLS.CONTRACT.WATERMARK)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        //System Setting page
        await page.goto(URLS.SETTING.TEAM)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        await page.goto(URLS.SETTING.ACCOUNT)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        await page.goto(URLS.SETTING.NOTIFICATION)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        await page.goto(URLS.SETTING.LOG)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        await page.goto(URLS.SETTING.FAILEDLOG)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        await page.goto(URLS.SETTING.FA)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        await page.goto(URLS.SETTING.MANAGEMENT)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
        await page.goto(URLS.SETTING.SETUP)
        await wait(5000);
        await page.screenshot({path: `screenshots/screenshot_${timestamp}.png`});
    }
    finally {
        if (page) await page.close();
    }
}



//결과 저장 
  export function handleSummary(data) {
    const timestamp = getFormattedTimestamp().replace(/:/g, '_');  
    return {
          [`Reuslt/all_page_summary_${timestamp}.html`]: htmlReport(data),
      };
  }