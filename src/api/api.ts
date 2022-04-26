const Base = "http://127.0.0.1:8080/api";
// 发送数据
async function upload(form: FormData) {
	let res = await fetch(Base + "/transfer", {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "multipart/form-data",
		},
		body: form,
	});
	if (res) {
	}
}

// 请求数据
/**
 * styleList
 * zoomList
 *
 */
export { upload };
