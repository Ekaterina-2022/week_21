const subBtn = document.querySelector(".btn-submit");

document.addEventListener("DOMContentLoaded", () => {
	const dataPost = async (formData) => {
		const response = await fetch("https://httpbin.org/post", {
			method: "POST",
			body: formData,
			headers: {
				"Content-Type": "form/multipart",
			},
		});
		if (!response.ok) {
			throw new Error(`Ошибка URL ${url}, статус: ${response.status}`);
		}
		return await response.text();
	};

	if (document.querySelector("form")) {
		const forms = document.querySelectorAll("form");

		forms.forEach((form) => {
			form.addEventListener("submit", function (e) {
				e.preventDefault();
				const formData = new FormData(this);

				dataPost(formData)
					.then((response) => {
						console.log(response);
						form.reset();
					})
					.catch((err) => console.error(err));
			});
		});
	}
});
