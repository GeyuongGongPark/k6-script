// 환경별 설정
export const ENVIRONMENTS = {
    PRODUCTION: {
        BASE_URL: 'https://business.lawform.io',
        NAME: 'production'
    },
    alpha: {
        BASE_URL: 'https://alpha.business.lfdev.io',
        NAME: 'alpha'
    }
};

// 현재 사용할 환경 (기본값: PRODUCTION)
export const CURRENT_ENV = ENVIRONMENTS.PRODUCTION;

// 환경별 로그인 정보
export const LOGIN_CREDENTIALS = {
    PRODUCTION: {
        EMAIL: 'ggpark+id20250211162329770_m@amicuslex.net',
        PASSWORD: 'q1w2E#R$'
    },
    alpha: {
        EMAIL: 'ggpark+id20250211092023378_m@amicuslex.net',
        PASSWORD: '1q2w#E$R'
    }
};

// 현재 환경의 로그인 정보를 가져오는 함수
export function getCurrentLoginCredentials() {
    return LOGIN_CREDENTIALS[CURRENT_ENV.NAME] || LOGIN_CREDENTIALS.PRODUCTION;
}

// 셀렉터 정보
export const SELECTORS = {
    LOGIN: {
        EMAIL_INPUT: 'input[type="email"]',
        PASSWORD_INPUT: 'input[type="password"]',
        SUBMIT_BUTTON: 'button[type="submit"]'
    }
}; 