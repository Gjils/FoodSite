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
		const total = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(total / (1000 * 60 * 60 * 24)),
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
  
});