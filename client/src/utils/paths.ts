import { ROUTE } from '../enums';
import { generatePath } from 'react-router-dom';

export type ExtractRouteParams<T> = string extends T
	? Record<string, string>
	: T extends `${infer _Start}:${infer Param}/${infer Rest}`
	? { [k in Param | keyof ExtractRouteParams<Rest>]: string }
	: T extends `${infer _Start}:${infer Param}`
	? { [k in Param]: string }
	: undefined;

type PathParams<P extends ROUTE> = ExtractRouteParams<P>;

export const buildUrl = <P extends ROUTE>(path: P, ...params: PathParams<P> extends undefined ? [] : [params: PathParams<P>]): string => {
	// TODO: upgrate reat-router to v6 and use this:
	// return generatePath(path, params?.[0])
	let ret: string = path;

	// Upcast `params` to be used in string replacement.
	const paramObj: { [i: string]: string } = params?.[0] || {};

	for (const key of Object.keys(paramObj)) {
		ret = ret.replace(`:${key}`, paramObj[key]);
	}

	return ret;
};
