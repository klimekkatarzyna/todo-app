export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const http = async (url: string, method: HttpMethod, body: any): Promise<any> => {
    const response = await fetch(url, {
        method,
        headers: {
            'Content-type': 'application/json'
        },
        ...body,
        credentials: 'include' // it's needed to save token in cookie
    });

    if (response.status === 401) {
        throw Error;
    }

    return await response.json();
};

export interface HttpResponse<T = any> {
    status?: number;
    ok: boolean;
    body?: T;
    data?: T;
    message?: string;
    auth?: boolean;
    token?: string;
    error?: string;
    isSuccess?: boolean;
}
