document.addEventListener("DOMContentLoaded", () => {
	// Tabs

	const tabs = document.querySelectorAll(".tabheader__item");
	const tabheaderItems = document.querySelector(".tabheader__items");
	const tabsContent = document.querySelectorAll(".tabcontent");

	function hideTabContent() {
		tabs.forEach((item) => {
			item.classList.remove("tabheader__item_active");
		});
		tabsContent.forEach((item) => {
			item.classList.add("hide");
			item.classList.remove("show", "fade");
		});
	}

	function showTabContent(i = 0) {
		tabs[i].classList.add("tabheader__item_active");
		tabsContent[i].classList.add("show", "fade");
		tabsContent[i].classList.remove("hide");
	}

	hideTabContent();
	showTabContent();

	tabheaderItems.addEventListener("click", (event) => {
		const { target } = event;
		if (target && target.classList.contains("tabheader__item")) {
			tabs.forEach((item, i) => {
				if (item == target) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	// Timer

	const deadline = "2024-05-20";

	function getTimeRemaining(endtime) {
		const total = Date.parse(endtime) - Date.parse(new Date());
		if (total <= 0) {
			return {
				total: 0,
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0,
			};
		}
		const days = Math.floor(total / (1000 * 60 * 60 * 24));
		const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((total / (1000 * 60)) % 60);
		const seconds = Math.floor((total / 1000) % 60);

		return {
			total,
			days,
			hours,
			minutes,
			seconds,
		};
	}

	function getZero(number) {
		if (number <= 9) {
			return `0${number}`;
		}
		return number;
	}

	function setClock(selector, deadline) {
		const timer = document.querySelector(selector);
		const days = timer.querySelector("#days");
		const hours = timer.querySelector("#hours");
		const minutes = timer.querySelector("#minutes");
		const seconds = timer.querySelector("#seconds");
		const timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const timeRemaining = getTimeRemaining(deadline);
			days.innerHTML = getZero(timeRemaining.days);
			hours.innerHTML = getZero(timeRemaining.hours);
			minutes.innerHTML = getZero(timeRemaining.minutes);
			seconds.innerHTML = getZero(timeRemaining.seconds);

			if (timeRemaining.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock(".timer", deadline);

	// Modal

	const modalButton = document.querySelectorAll("[data-modal]");
	const modal = document.querySelector(".modal");

	const modalTimeout = setTimeout(showModal, 50000);

	function showModal() {
		modal.classList.remove("hide");
		modal.classList.add("show");
		document.body.classList.add("inactive");
		clearInterval(modalTimeout);
	}
	function hideModal() {
		modal.classList.remove("show");
		modal.classList.add("hide");
		document.body.classList.remove("inactive");
	}

	modalButton.forEach((item) => {
		item.addEventListener("click", () => {
			showModal();
		});
	});

	modal.addEventListener("click", (event) => {
		if (
			(event.target && event.target === modal) ||
			event.target.getAttribute("data-close") == ""
		) {
			hideModal();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.code == "Escape" && modal.classList.contains("show")) {
			hideModal();
		}
	});

	function showModalByScroll() {
		if (
			window.scrollY + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight - 1
		) {
			showModal();
			window.removeEventListener("scroll", showModalByScroll);
		}
	}

	window.addEventListener("scroll", showModalByScroll);

	// Menu

	class MenuCard {
		constructor(src, alt, name, descr, price, parentSelector) {
			this.src = src;
			this.name = name;
			this.descr = descr;
			this.price = price;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 10;
			this.changeToUAH();
		}

		changeToUAH() {
			this.price *= this.transfer;
		}

		render() {
			const element = document.createElement("div");
			element.innerHTML = `
			<div class="menu__item">
				<img src="${this.src}" alt="${this.alt}" />
				<h3 class="menu__item-subtitle">${this.name}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			</div>`;

			this.parent.append(element);
		}
	}

	async function getResource(url) {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	}

	getResource("http://localhost:3000/menu").then((data) => {
		data.forEach(({ img, altimg, title, descr, price }) => {
			new MenuCard(
				img,
				altimg,
				title,
				descr,
				price,
				".menu__field .container",
			).render();
		});
	});

	// new MenuCard(
	// 	"img/tabs/vegy.jpg",
	// 	"vegy",
	// 	'Меню "Фитнес"',
	// 	`Меню "Фитнес" - это новый подход к приготовлению блюд: больше
	// свежих овощей и фруктов. Продукт активных и здоровых людей. Это
	// абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
	// 	229,
	// 	".menu__field .container",
	// ).render();
	// new MenuCard(
	// 	"img/tabs/elite.jpg",
	// 	"elite",
	// 	'Меню "Премиум"',
	// 	`В меню “Премиум” мы используем не только красивый дизайн упаковки,
	// но и качественное исполнение блюд. Красная рыба, морепродукты,
	// фрукты - ресторанное меню без похода в ресторан!`,
	// 	550,
	// 	".menu__field .container",
	// ).render();
	// new MenuCard(
	// 	"img/tabs/post.jpg",
	// 	"post",
	// 	'Меню "Постное"',
	// 	`Меню “Постное” - это тщательный подбор ингредиентов: полное
	// отсутствие продуктов животного происхождения, молоко из миндаля,
	// овса, кокоса или гречки, правильное количество белков за счет тофу
	// и импортных вегетарианских стейков.`,
	// 	430,
	// 	".menu__field .container",
	// ).render();

	// Forms

	const forms = document.querySelectorAll("form");

	const message = {
		loading: "img/form/spinner.svg",
		success: "Спасибо, скоро мы с вами свяжемся",
		failure: "Что-то пошло не так",
	};

	forms.forEach((item) => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		let res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: data,
		});

		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			let statusMessage = document.createElement("img");
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
						display: block;
						margin: 0 auto;
				`;
			form.insertAdjacentElement("afterend", statusMessage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData("http://localhost:3000/requests", json)
				.then((data) => {
					showThanksModal(message.success);
					statusMessage.remove();
				})
				.catch(() => {
					showThanksModal(message.failure);
					statusMessage.remove();
				})
				.finally(() => {
					form.reset();
				});
		});
	}

	function showThanksModal(message) {
		const previousModalDialog = document.querySelector(".modal__dialog");

		previousModalDialog.classList.add("hide");
		showModal();

		const thanksModal = document.createElement("div");
		thanksModal.classList.add("modal__dialog");
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector(".modal").append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			previousModalDialog.classList.add("show");
			previousModalDialog.classList.remove("hide");
			hideModal();
		}, 4000);
	}

	// Slider
	const sliderWrapper = document.querySelector(".offer__slider-wrapper");
	const slideClass = ".offer__slide";
	const sliderFieldClass = ".offer__slider-inner";
	let current = 0;
	const slides = sliderWrapper.querySelectorAll(slideClass);
	const sliderField = sliderWrapper.querySelector(sliderFieldClass);
	const width = window.getComputedStyle(sliderWrapper).width;

	sliderField.style.width = 100 * slides.length + "%";

	slides.forEach((slide) => {
		slide.style.width = width;
	});

	const slider = document.querySelector(".offer__slider");

	const sliderIndicators = document.createElement("div");
	sliderIndicators.classList.add("carousel-indicators");
	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement("div");
		dot.classList.add("dot");
		dot.dataset.index = i;
		if (i == current) {
			dot.classList.add("active");
		}
		sliderIndicators.append(dot);
	}

	const makeInactive = function () {
		sliderIndicators.querySelectorAll(".dot").forEach((item) => {
			item.classList.remove("active");
		});
	};
	// const hideAll = function () {
	// 	slides.forEach((item) => {
	// 		item.classList.add("hide");
	// 	});
	// };
	// const showCur = function () {
	// 	slides[current].classList.remove("hide");
	// };

	const showCurrent = function () {
		sliderField.style.transform = `translateX(${
			-1 * parseFloat(width) * current
		}px)`;
	};
	const increaseCurrent = function () {
		current += 1;
		if (current == slides.length) {
			current = 0;
		}
	};
	const decreaseCurrent = function () {
		current -= 1;
		if (current == -1) {
			current = slides.length - 1;
		}
	};
	const getCurSlide = function () {
		return current + 1 < 10 ? "0" + (current + 1) : current + 1;
	};

	const totalSlides = slides.length < 10 ? "0" + slides.length : slides.length;
	const sliderCounter = document.querySelector(".offer__slider-counter");
	sliderCounter.querySelector("#total").innerHTML = totalSlides;
	sliderCounter
		.querySelector(".offer__slider-prev")
		.addEventListener("click", () => {
			decreaseCurrent();
			showCurrent();
			makeInactive();
			sliderIndicators
				.querySelectorAll(".dot")
				[current].classList.add("active");
			sliderCounter.querySelector("#current").innerHTML = getCurSlide();
		});
	sliderCounter
		.querySelector(".offer__slider-next")
		.addEventListener("click", () => {
			increaseCurrent();
			showCurrent();
			makeInactive();
			sliderIndicators
				.querySelectorAll(".dot")
				[current].classList.add("active");
			sliderCounter.querySelector("#current").innerHTML = getCurSlide();
		});

	showCurrent();

	sliderIndicators.addEventListener("click", (event) => {
		if (event.target.classList.contains("dot")) {
			current = +event.target.dataset.index;
			showCurrent();
			makeInactive();
			event.target.classList.add("active");
			sliderCounter.querySelector("#current").innerHTML = getCurSlide();
		}
	});

	slider.append(sliderIndicators);

	// Calculator

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
	const calculatorWrapper = document.querySelector(".calculating__field"),
		sexOptions = document.querySelectorAll("[data-sex]"),
		resultBlock = document.querySelector(".calculating__result span");
	(activityOptions = document.querySelectorAll("[data-ratio]")),
		(personProperties = {
			sex: localStorage.getItem("sex") || "male",
			ratio: localStorage.getItem("ratio") || 1.33,
			height: localStorage.getItem("height") || null,
			weight: localStorage.getItem("weight") || null,
			age: localStorage.getItem("age") || null,
		}),
		(inputSelectors = ["height", "weight", "age"]);
	hideAll(sexOptions, "calculating__choose-item_active");
	sexOptions.forEach((element) => {
		if (element.dataset.sex === personProperties.sex) {
			showElement(element, "calculating__choose-item_active");
		}
	});
	hideAll(activityOptions, "calculating__choose-item_active");
	activityOptions.forEach((element) => {
		if (element.dataset.ratio === personProperties.ratio) {
			showElement(element, "calculating__choose-item_active");
		}
	});
	inputSelectors.forEach((selector) => {
		element = document.querySelector(`#${selector}`);
		if (+personProperties[selector]) {
			element.value = personProperties[selector];
		}
	});
	calculateCallories(personProperties, resultBlock);

	calculatorWrapper.addEventListener("click", (event) => {
		if (event.target.hasAttribute("data-sex")) {
			hideAll(sexOptions, "calculating__choose-item_active");
			showElement(event.target, "calculating__choose-item_active");
			personProperties.sex = event.target.dataset.sex;
			calculateCallories(personProperties, resultBlock);
		}
		if (event.target.hasAttribute("data-ratio")) {
			hideAll(activityOptions, "calculating__choose-item_active");
			showElement(event.target, "calculating__choose-item_active");
			personProperties.ratio = +event.target.dataset.ratio;
			calculateCallories(personProperties, resultBlock);
		}
	});
	inputSelectors.forEach((selector) => {
		element = document.querySelector(`#${selector}`);
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
});
