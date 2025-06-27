import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { browser } from "k6/browser";

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
    const page = await browser.newPage();

    try {
        await login(page);
        await page.screenshot({path: `screenshots/screenshots_${Date.now()}.png`});
        await clm(page);

    }
    finally {
        await page.close();
    }
}

export async function login(page) {
    try{
        await page.goto('https://business.lawform.io/login');
        await page.waitForSelector('input[type="email"]');
        await page.type('input[type="email"]', 'ggpark+id20250211162329770_m@amicuslex.net');
        await page.waitForSelector('input[type="password"]');
        await page.type('input[type="password"]', 'q1w2E#R$');
        await page.click('button[type="submit"]', { nth: 0});
    } catch (error) {
        console.error('Login failed:', error);
    }
}

export async function clm(page) {
    try{
        await page.goto('https://business.lawform.io/clm/draft');

    }
    catch (error) {
        console.error('clm draft dailed:', error);
    }
}

export function handleSummary(data) {
    return {
        [`Result/clm_process_summary_${Date.now()}.html`]: htmlReport(data),
    };
}