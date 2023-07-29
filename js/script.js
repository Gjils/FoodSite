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

	// const modalTimeout = setTimeout(showModal, 10000);
		
	function showModal() {
		modal.classList.remove("hide");
		modal.classList.add("show");
		document.body.classList.add("inactive");
		// clearInterval(modalTimeout);
		
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

	// Menu

	class MenuCard {
		constructor(src, alt, name, descr, price, parentSelector) {
			this.src = src;
			this.name = name;
			this.descr = descr;
			this.price = price;
			this.parent = document.querySelector(parentSelector); 
			this.transfer = 1;
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

	new MenuCard("img/tabs/vegy.jpg", "vegy", "Меню \"Фитнес\"", `Меню "Фитнес" - это новый подход к приготовлению блюд: больше
	свежих овощей и фруктов. Продукт активных и здоровых людей. Это
	абсолютно новый продукт с оптимальной ценой и высоким качеством!`, 229, ".menu__field .container").render();
	new MenuCard("img/tabs/elite.jpg", "elite", "Меню \"Премиум\"", `В меню “Премиум” мы используем не только красивый дизайн упаковки,
	но и качественное исполнение блюд. Красная рыба, морепродукты,
	фрукты - ресторанное меню без похода в ресторан!`, 550, ".menu__field .container").render();
	new MenuCard("img/tabs/post.jpg", "post", "Меню \"Постное\"", `Меню “Постное” - это тщательный подбор ингредиентов: полное
	отсутствие продуктов животного происхождения, молоко из миндаля,
	овса, кокоса или гречки, правильное количество белков за счет тофу
	и импортных вегетарианских стейков.`, 430, ".menu__field .container").render();

	// Forms

	const forms = document.querySelectorAll("form");

	const message = {
		loading: "Загрузка...",
		success: "Спасибо, скоро мы с вами свяжемся",
		failure: "Что-то пошло не так"
	};

	function postData(form) {
		form.addEventListener("submit", (event) => {
			event.preventDefault();

			const statusMessage = document.createElement("div");
			statusMessage.classList.add("status");
			statusMessage.textContent = message.loading;
			form.append(statusMessage);

			const request = new XMLHttpRequest();
			request.open("POST", "server.php");

			request.setRequestHeader("Content-type", "application/json");
			const formData = new FormData(form);

			const object = {};
			console.log(formData);
			formData.forEach((value, key) => {
				object[key] = value;
			});

			const json = JSON.stringify(object);
			
			request.send(json);

			request.addEventListener("load", () => {
				if (request.status == 200) {
					console.log(request.response);
					statusMessage.textContent = message.success;
					form.reset();
					setTimeout(() => {
						statusMessage.remove();
					}, 2000);
				} else {
					console.log(request.response);
					statusMessage.textContent = message.failure;
				}
			});
		});
	}

	forms.forEach(item => {
		postData(item);
	});
});