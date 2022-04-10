import themes from "./options";

/**
 * 返回更改后的主题的key
 * @param val Theme.key
 * @returns CurTheme.key
 */
const setTheme = (val: string) => {
	let currentTheme = themes.filter(({ key }) => val == key)[0];

	let root = document.getElementsByTagName("html");

	root[0].setAttribute("data-theme", currentTheme.dataTheme);
	return currentTheme.key;
};

/**
 * 默认值为themes[0]
 * @returns DefaultTheme.key
 */
const initTheme = () => {
	const DefaultKey = "primary";
	return setTheme(DefaultKey);
};
export { setTheme, initTheme };
