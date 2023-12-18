function calculator(
	calculatorSelector,
	sexOptionsSelector,
	resultBlockSelector,
	activityOptionsSelector,
	activeClass,
) {
	const hideAll = function (array, activeClass) {
		array.forEach((element) => {
			element.classList.remove(activeClass);
		});
	};
	const showElement = function (element, activeClass) {
		element.classList.add(activeClass);
	};
	const calculateCallories = function (
		{ sex, ratio, height, weight, age } = personProperties,
		resultBlock,
	) {
		localStorage.setItem("sex", sex);
		localStorage.setItem("ratio", ratio);
		localStorage.setItem("height", height);
		localStorage.setItem("weight", weight);
		localStorage.setItem("age", age);
		if (sex && ratio && height && weight && age) {
			let callories = null;
			if (sex === "male") {
				callories = (10 * weight + 6.25 * height - 5 * age + 5) * ratio;
			} else {
				callories = (10 * weight + 6.25 * height - 5 * age - 161) * ratio;
			}
			callories = Math.floor(callories);
			if (callories >= 0) {
				resultBlock.textContent = callories;
			} else {
				resultBlock.textContent = "____";
			}
		} else {
			resultBlock.textContent = "____";
		}
	};
	const calculatorWrapper = document.querySelector(calculatorSelector),
		sexOptions = document.querySelectorAll(sexOptionsSelector),
		resultBlock = document.querySelector(resultBlockSelector),
		activityOptions = document.querySelectorAll(activityOptionsSelector),
		personProperties = {
			sex: localStorage.getItem("sex") || "male",
			ratio: localStorage.getItem("ratio") || 1.33,
			height: localStorage.getItem("height") || null,
			weight: localStorage.getItem("weight") || null,
			age: localStorage.getItem("age") || null,
		},
		inputSelectors = ["height", "weight", "age"];
	hideAll(sexOptions, activeClass);
	sexOptions.forEach((element) => {
		if (element.dataset.sex === personProperties.sex) {
			showElement(element, activeClass);
		}
	});
	hideAll(activityOptions, activeClass);
	activityOptions.forEach((element) => {
		if (element.dataset.ratio === personProperties.ratio) {
			showElement(element, activeClass);
		}
	});
	inputSelectors.forEach((selector) => {
		const element = document.querySelector(`#${selector}`);
		if (+personProperties[selector]) {
			element.value = personProperties[selector];
		}
	});
	calculateCallories(personProperties, resultBlock);

	calculatorWrapper.addEventListener("click", (event) => {
		if (event.target.hasAttribute("data-sex")) {
			hideAll(sexOptions, activeClass);
			showElement(event.target, activeClass);
			personProperties.sex = event.target.dataset.sex;
			calculateCallories(personProperties, resultBlock);
		}
		if (event.target.hasAttribute("data-ratio")) {
			hideAll(activityOptions, activeClass);
			showElement(event.target, activeClass);
			personProperties.ratio = +event.target.dataset.ratio;
			calculateCallories(personProperties, resultBlock);
		}
	});
	inputSelectors.forEach((selector) => {
		const element = document.querySelector(`#${selector}`);
		element.addEventListener("input", (event) => {
			if (event.target.value.match(/\D/g)) {
				event.target.classList.add("wrong-input");
			} else {
				event.target.classList.remove("wrong-input");
			}
			personProperties[selector] = +event.target.value;
			calculateCallories(personProperties, resultBlock);
		});
	});
}

export default calculator;
