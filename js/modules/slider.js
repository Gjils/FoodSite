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

export default slider;
