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

	const json = await response.json();

	const errors = [401, 403, 404, 406, 500];
	if (errors.includes(response.status)) {
		throw json;
	}

	return json;
};

export interface HttpResponse<T = any> {
	data?: T;
	message?: string;
	error?: string;
}
