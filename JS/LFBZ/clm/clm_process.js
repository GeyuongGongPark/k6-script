import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { browser } from "k6/browser";
//import login_to_dashborad from "../login/login_to_dashborad.js";
import clm_draft from "./clm_draft.js";

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
    }
};

export default async function () {
    // const page = await browser.newPage();

    try {
        //const page = await login_to_dashborad();
        //await page.screenshot({ path: `screenshots/screenshot_${Date.now()}.png` });
        const page = await clm_draft();
        //await page.screenshot({ path: `screenshots/screenshot_${Date.now()}.png` });

    }
    finally {
        await page.close();
    }
}

export function handleSummary(data) {
    const timestamp = getFormattedTimestamp().replace(/:/g, '_');
    return {
        [`Reuslt/clm_process_summary_${timestamp}.html`]: htmlReport(data),
    };
}