import tabs from "./modules/tabs";
import modal from "./modules/modal";
import timer from "./modules/timer";
import cards from "./modules/cards";
import calculator from "./modules/calculator";
import forms from "./modules/forms";
import slider from "./modules/slider";
import { showModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
	const modalTimeout = setTimeout(() => showModal(".modal"), 50000);

	tabs(".tabheader__item", ".tabheader__items", ".tabcontent");
	modal("[data-modal]", ".modal", modalTimeout);
	timer(".timer", "2024-05-20");
	cards(".menu__field .container", "db.json");
	calculator(
		".calculating__field",
		"[data-sex]",
		".calculating__result span",
		"[data-ratio]",
		"calculating__choose-item_active",
	);
	forms(".modal", modalTimeout, "form");
	slider(".offer__slider", ".offer__slide");
});
