const errorMessage = document.getElementById("errorBanner");
const regBtn = document.querySelector("#regButton");
const first_name = document.getElementById("firstName");
const last_name = document.getElementById("lastName");
const yourCountry = document.getElementById("country");
const yourJob = document.getElementById("job");
const yourSchool = document.getElementById("school");
const yourEmail = document.getElementById("eadress");
const yourPassword = document.getElementById("password");
const page = document.querySelector("#containerMain");
let errors = [];

function check() {
	if (
		first_name.value == "" ||
		last_name.value == "" ||
		yourCountry.value == "" ||
		yourJob.value == "" ||
		yourSchool.value == "" ||
		yourEmail.value == "" ||
		yourPassword.value == ""
	) {
		document.getElementById("errorBanner").innerHTML =
			"Please fill in all fields below<br>";
		errorMessage.classList.remove("error");
		errorMessage.classList.add("banner-error");
	} else if (yourPassword.value.length < 8) {
		yourPassword.style.backgroundColor = "red";
	} else {
		alert(`Welcome, ${first_name.value}!`);
	}
}

function checkValidity(input) {
	let validity = input.validity;
	if (validity.valueMissing) {
		errors.push("Заполните поле" + input.placeholder);
	}
	if (validity.patternMismatch) {
		errors.push("Неверный формат заполнения");
	}
	if (validity.tooLong) {
		let max = getAttributeValue(input, "maxlength");
		errors.push("Превышает допустимое значение" + max);
	}
	if (validity.patternMismatch) {
		errors.push("Ненадежный пароль: введите 10 цифр");
	}
}

function checkAll() {
	errors = [];

	let inputs = document.querySelectorAll("input");

	for (let input of inputs) {
		checkValidity(input);
	}

	document.querySelector(".error-info").innerHTML = errors.join(". <br>");
}

regBtn.addEventListener("click", check);
regBtn.addEventListener("click", checkAll);

let obj = {};

regBtn.addEventListener("click", function userData(e) {
	e.preventDefault();
	let inputAll = Array.from(document.querySelectorAll("form input"));

	for (const input of inputAll) {
		obj[input.id] = input.value;
	}
	fetch("https://httpbin.org/post", {
		method: "POST",
		body: JSON.stringify(obj),
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
	})
		.then((response) => response.json())
		.then((obj) => {
			console.log(obj);
		})
		.catch((error) => console.log(error));
});
