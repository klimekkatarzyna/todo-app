// declare const CONFIG: Config;

export interface Config {
    api: string;
}
// TODO: create evniroments configs
// port the as as in app.use.cors
export const register = `http://localhost:3000/api/register`;
export const login = `http://localhost:3000/api/login`;
export const me = `http://localhost:3000/api/me`;
export const logout = `http://localhost:3000/api/logout`;