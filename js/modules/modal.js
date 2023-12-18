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

export default modal;
export { hideModal, showModal };
