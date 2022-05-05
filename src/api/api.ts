const Base = "http://127.0.0.1:8080/api";
// 发送数据
async function upload(form: FormData) {
	try {
		const res = await fetch(Base + "/transfer", {
			method: "POST",
			mode: "cors",
			// headers: {
			// 	"Content-Type": "application/x",
			// },
			body: form,
		});
		// const blob = await res.blob();
		const json = await res.json();
		console.log(json);
		return json;
	} catch (error) {
		return console.log(error);
	}
}

// 请求数据
/**
 * styleList
 * zoomList
 *
 */
export { upload };
