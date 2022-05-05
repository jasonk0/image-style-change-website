const MAX_WIDTH = 256;

const compress = (
	url: string,
	quality: number = 100,
	mimeType: string = "image/jpg"
) => {
	let canvas = document.createElement("canvas");
	let img = document.createElement("img");
	img.crossOrigin = "anonymous";
	return new Promise<{
		imageData: Blob | null;
		base64: string;
		canvas: HTMLCanvasElement;
	}>((resolve, reject) => {
		img.src = url;
		img.onload = () => {
			let targetWidth, targetHeight;
			if (img.width > MAX_WIDTH) {
				targetWidth = MAX_WIDTH;
				targetHeight = (img.height * MAX_WIDTH) / img.width;
			} else {
				targetWidth = img.width;
				targetHeight = img.height;
			}
			canvas.width = targetWidth;
			canvas.height = targetHeight;
			let ctx = canvas.getContext("2d");
			ctx!.clearRect(0, 0, targetWidth, targetHeight); // 清除画布
			ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);

			let base64 = canvas.toDataURL(mimeType, quality / 100);
			canvas.toBlob(
				(imageData) => resolve({ imageData, base64, canvas }),
				mimeType,
				quality / 100
			);
			// resolve(imageData);
		};
	});
};

const getFileURL = (file: File) => {
	let url = "";
	// 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
	if (window.URL != undefined) {
		// mozilla(firefox)
		url = window.URL.createObjectURL(file);
	} else if (window.webkitURL != undefined) {
		// webkit or chrome
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
};

export { compress, getFileURL };
