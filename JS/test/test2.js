//상단의 추가
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


import http from 'k6/http';

export default function () {
	http.get('https://business.lawform.io');
}
//하단의 추가
export function handleSummary(data) {

	return {

		"summary.html": htmlReport(data),

	}

}