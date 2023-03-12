const searchData = document.querySelector("#search_gif");
const searchBtn = document.querySelector(".search-btn");
const cleanBtn = document.querySelector(".delete-btn");

function searchGif() {
	let targetSearch = searchData.value;
	fetch(
		"https://api.giphy.com/v1/gifs/search?api_key=6L4MFTABxfZ4OrvqVUgJSUlVuS52ZqmU&q=" +
			targetSearch +
			"&limit=5"
	)
		.then((response) => response.json())
		.then((user) => {
			let foundElements = user.data;
			foundElements.forEach(function (image) {
				const foundImg = document.createElement("img");
				const resultContainer =
					document.querySelector(".result-container");
				foundImg.src = image.images.fixed_height.url;
				resultContainer.appendChild(foundImg);
			});
		})
		.catch((error) => console.log(error));
}

searchBtn.addEventListener("click", searchGif);
cleanBtn.addEventListener("click", function () {
	document.querySelector(".result-container").innerHTML = "";
	searchData.value = "";
});
