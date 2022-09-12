import { ROUTE } from '../enums';

export type ExtractRouteParams<T> = string extends T
	? Record<string, string> // eslint-disable-next-line @typescript-eslint/no-unused-vars
	: T extends `${infer _Start}:${infer Param}/${infer Rest}`
	? { [k in Param | keyof ExtractRouteParams<Rest>]: string } // eslint-disable-next-line @typescript-eslint/no-unused-vars
	: T extends `${infer _Start}:${infer Param}`
	? { [k in Param]: string }
	: undefined;

type PathParams<P extends ROUTE> = ExtractRouteParams<P>;

export const buildUrl = <P extends ROUTE>(path: P, ...params: PathParams<P> extends undefined ? [] : [params: PathParams<P>]): string => {
	let ret: string = path;

	const paramObj: { [i: string]: string } = params?.[0] || {};

	for (const key of Object.keys(paramObj)) {
		ret = ret.replace(`:${key}`, paramObj[key]);
	}

	return ret;
};
