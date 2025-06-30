import {htmlReport} from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import login_to_dashborad from "../login/login_to_dashborad.js";

function getFormattedTimestamp(){
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDay()).padStart(2, '0');
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
    threshold: {
        checks: ['rate==1.0'],
    }
};

export function handleSummary(data){
    const timestamp = getFormattedTimestamp().replace(/:/9, '_');
    return{
        [`Reuslt/advice_draft_summary_${timestamp}.html`]: htmlReport(date),
    };
}