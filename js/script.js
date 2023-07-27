﻿document.addEventListener("DOMContentLoaded", () => {
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

	tabheaderItems.addEventListener("click", event => {
		const target = event.target;
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
				"total": 0,
				"days": 0,
				"hours": 0,
				"minutes": 0,
				"seconds": 0
			};
		}
		const days = Math.floor(total / (1000 * 60 * 60 * 24)),
			hours = Math.floor(total / (1000 * 60 * 60) % 24),
			minutes = Math.floor(total / (1000 * 60) % 60),
			seconds = Math.floor(total / 1000 % 60);

		return {total, days, hours, minutes, seconds};
	}

	function getZero(number) {
		if (number <= 9) {
			return "0" + number;
		}
		return number;
	}

	function setClock(selector, deadline) {
		const timer = document.querySelector(selector),
			days = timer.querySelector("#days"),
			hours = timer.querySelector("#hours"),
			minutes = timer.querySelector("#minutes"),
			seconds = timer.querySelector("#seconds"),
			timeInterval = setInterval(updateClock, 1000);

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
  
	const modalButton = document.querySelectorAll("[data-modal]"),
		closeButton = document.querySelector("[data-close"),
		modal = document.querySelector(".modal");

	const modalTimeout = setTimeout(showModal, 10000);
		
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

	modalButton.forEach(item => {
		item.addEventListener("click", () => {
			showModal();
		});
	});

	closeButton.addEventListener("click", () => {
		hideModal();
	});

	modal.addEventListener("click", (event) => {
		if (event.target && event.target == modal) {
			hideModal();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.code == "Escape" && modal.classList.contains("show")) {
			hideModal();
		}
	});

	function showModalByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			showModal();
			window.removeEventListener("scroll", showModalByScroll);
		}
	}

	window.addEventListener("scroll", showModalByScroll);
});