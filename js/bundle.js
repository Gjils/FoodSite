/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards(parentSelector, dbUrl) {
	class MenuCard {
		constructor(src, alt, name, descr, price, parentSelector) {
			this.src = src;
			this.alt = alt;
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

	getResource(dbUrl).then((data) => {
		data.forEach(({ img, altimg, title, descr, price }) => {
			new MenuCard(img, altimg, title, descr, price, parentSelector).render();
		});
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function forms(modalSelector, modalTimeout, formSelector) {
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
		(0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)(modalSelector, modalTimeout);

		const thanksModal = document.createElement("div");
		thanksModal.classList.add("modal__dialog");
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector(modalSelector).append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			previousModalDialog.classList.add("show");
			previousModalDialog.classList.remove("hide");
			(0,_modal__WEBPACK_IMPORTED_MODULE_0__.hideModal)(modalSelector, modalTimeout);
		}, 3000);
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   hideModal: () => (/* binding */ hideModal),
/* harmony export */   showModal: () => (/* binding */ showModal)
/* harmony export */ });
function showModal(modalSelector, modalTimeout) {
	const modal = document.querySelector(modalSelector);
	modal.classList.remove("hide");
	modal.classList.add("show");
	document.body.classList.add("inactive");
	if (modalTimeout) {
		clearInterval(modalTimeout);
	}
}
function hideModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.remove("show");
	modal.classList.add("hide");
	document.body.classList.remove("inactive");
}
function modal(triggerSelector, modalSelector, modalTimeout) {
	const modalButton = document.querySelectorAll(triggerSelector);
	const modal = document.querySelector(modalSelector);

	modalButton.forEach((item) => {
		item.addEventListener("click", () => {
			showModal(modalSelector, modalTimeout);
		});
	});

	modal.addEventListener("click", (event) => {
		if (
			(event.target && event.target === modal) ||
			event.target.getAttribute("data-close") == ""
		) {
			hideModal(modalSelector);
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.code == "Escape" && modal.classList.contains("show")) {
			hideModal(modalSelector);
		}
	});

	function showModalByScroll() {
		if (
			window.scrollY + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight - 1
		) {
			showModal(modalSelector, modalTimeout);
			window.removeEventListener("scroll", showModalByScroll);
		}
	}

	window.addEventListener("scroll", showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider(sliderSelector, slideSelector) {
	const sliderWrapper = document.querySelector(`${sliderSelector}-wrapper`);
	const slideClass = slideSelector;
	const sliderFieldClass = `${sliderSelector}-inner`;
	let current = 0;
	const slides = sliderWrapper.querySelectorAll(slideClass);
	const sliderField = sliderWrapper.querySelector(sliderFieldClass);
	const width = window.getComputedStyle(sliderWrapper).width;

	sliderField.style.width = 100 * slides.length + "%";

	slides.forEach((slide) => {
		slide.style.width = width;
	});

	const slider = document.querySelector(`${sliderSelector}`);

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
	const sliderCounter = document.querySelector(`${sliderSelector}-counter`);
	sliderCounter.querySelector("#total").innerHTML = totalSlides;
	sliderCounter
		.querySelector(`${sliderSelector}-prev`)
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
		.querySelector(`${sliderSelector}-next`)
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabheaderItemsSelector, tabsContentSelector) {
	const tabs = document.querySelectorAll(tabsSelector);
	const tabheaderItems = document.querySelector(tabheaderItemsSelector);
	const tabsContent = document.querySelectorAll(tabsContentSelector);

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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(timerSelector, deadline) {

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

	setClock(timerSelector, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener("DOMContentLoaded", () => {
	const modalTimeout = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.showModal)(".modal"), 50000);

	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabheader__items", ".tabcontent");
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", modalTimeout);
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(".timer", "2024-05-20");
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])(".menu__field .container", "http://localhost:3000/menu");
	(0,_modules_calculator__WEBPACK_IMPORTED_MODULE_4__["default"])(
		".calculating__field",
		"[data-sex]",
		".calculating__result span",
		"[data-ratio]",
		"calculating__choose-item_active",
	);
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])(".modal", modalTimeout, "form");
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])(".offer__slider", ".offer__slide");
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map