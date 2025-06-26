import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
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
    await page.goto('https://business.lawform.io/login');
    await page.screenshot({ path: `screenshots/screenshot_${Date.now()}.png` });
  } finally {
    await page.close();
  }
}
export function login() {
  const url = 'https://business.lawform.io/login';
  const payload = JSON.stringify({
    email : 'ggpark+id20250211092023378_m@amicuslex.net',
    password : '1q2w#E$R',
  });
  const params = {
    headers: {
      'content-Type': 'application/json',
    },
  };
  http.post(url, payload, params);
}

export function handleSummary(data) {
    return {
        'test4_summary.html': htmlReport(data),
    };
}

