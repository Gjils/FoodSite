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

export default tabs;
