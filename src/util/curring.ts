import { DirectiveArguments } from "vue";

export function Curring(this: any, fn: Function, ..._arguments: any): Function {
	const _n = fn.length;
	let args = [..._arguments];
	return (..._arguments: any) => {
		if (args.length < _n) {
			args = args.concat([..._arguments]).slice(0, _n);
		}
		if (args.length == _n) fn.apply(this, args);
	};
}
