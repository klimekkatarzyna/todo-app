export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const http = (url: string, method: HttpMethod, body: any) => {
    return new Promise<HttpResponse>((resolve, reject) => {
        const authorization = JSON.parse(localStorage.getItem('auth') as string);

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Authorization': `Bearer ${authorization?.accessToken}`
            },
            ...body
            //...(data.body ? { body: JSON.stringify(data.body) } : {})
        })
        .then((response: Response) => {
            if (response.status === 401 && authorization?.accessToken) {
                localStorage.removeItem('auth');

                return response.json();
            } else {
                return response.json();
            }
        })
        .then(json => {
            console.error({ json });
            return resolve(json)
        })
        .catch(error => {
            console.error(error);
            reject(error)
        });
    })
};

export interface HttpResponse<T = any> {
    status?: number;
    ok: boolean;
    body?: T;
    message?: string;
    auth?: boolean;
    token?: string;
}
