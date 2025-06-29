// 기본 URL 설정
export const BASE_URL = 'https://business.lawform.io';

// 로그인 관련 URL
export const LOGIN_URLS = {
    HOME: `${BASE_URL}`,
    LOGIN: `${BASE_URL}/login`,
    DASHBOARD: `${BASE_URL}/dashboard`
};

// CLM 관련 URL
export const CLM_URLS = {
    DRAFT: `${BASE_URL}/clm/draft`,
    PROCESS: `${BASE_URL}/clm/process`
};

// Advice 관련 URL
export const ADVICE_URLS = {
    DRAFT: `${BASE_URL}/advice/draft`,
    PROCESS: `${BASE_URL}/advice/process`
};

// 모든 URL을 하나의 객체로 통합
export const URLS = {
    BASE: BASE_URL,
    LOGIN: LOGIN_URLS,
    CLM: CLM_URLS,
    ADVICE: ADVICE_URLS
}; 