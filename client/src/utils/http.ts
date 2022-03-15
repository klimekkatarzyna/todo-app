export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const http = async <T>(url: string, method: HttpMethod, body?: Object): Promise<HttpResponse<T>> => {
	const response = await fetch(url, {
		method,
		headers: {
			'Content-type': 'application/json',
		},
		body: body ? JSON.stringify(body) : undefined,
		credentials: 'include', // it's needed to add token to cookie when FE and BE are o different domaines
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
