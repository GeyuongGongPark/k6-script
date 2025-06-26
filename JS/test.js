//상단의 추가
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


import http from 'k6/http'
export default function () {
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
//하단의 추가
export function handleSummary(data) {

	return {

		"login_summary.html": htmlReport(data),

	}
test.js
}