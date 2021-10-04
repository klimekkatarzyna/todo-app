declare const CONFIG: Config;

export interface Config {
    api: string;
}

export const register = `${CONFIG.api}/api/register`;
export const login = `${CONFIG.api}/api/login`;
export const me = `${CONFIG.api}/api/me`;
export const logout = `${CONFIG.api}/api/logout`;