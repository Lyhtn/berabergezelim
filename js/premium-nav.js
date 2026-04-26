document.addEventListener("DOMContentLoaded", function () {
	var nav = document.querySelector("nav");
	if (!nav) {
		return;
	}

	nav.classList.add("site-nav");

	var links = Array.prototype.slice.call(nav.querySelectorAll("a"));
	if (!links.length) {
		return;
	}

	var hasDistrictsLink = links.some(function (link) {
		return (link.getAttribute("href") || "").toLowerCase() === "ilceler.html";
	});

	if (!hasDistrictsLink) {
		var districtsLink = document.createElement("a");
		districtsLink.href = "ilceler.html";
		districtsLink.textContent = "İlçeler";

		var transportLink = links.find(function (link) {
			return (link.getAttribute("href") || "").toLowerCase() === "nasilgiderim.html";
		});

		if (transportLink && transportLink.parentNode === nav) {
			transportLink.insertAdjacentElement("afterend", districtsLink);
		} else {
			nav.appendChild(districtsLink);
		}

		links = Array.prototype.slice.call(nav.querySelectorAll("a"));
	}

	var toggleButton = document.createElement("button");
	toggleButton.type = "button";
	toggleButton.className = "nav-toggle";
	toggleButton.setAttribute("aria-expanded", "false");
	toggleButton.setAttribute("aria-label", "Menüyü aç veya kapat");
	toggleButton.innerHTML = "<span></span><span></span><span></span>";

	var linksWrapper = document.createElement("div");
	linksWrapper.className = "nav-links";
	links.forEach(function (link) {
		linksWrapper.appendChild(link);
	});

	nav.appendChild(toggleButton);
	nav.appendChild(linksWrapper);

	function closeMenu() {
		nav.classList.remove("is-open");
		toggleButton.setAttribute("aria-expanded", "false");
	}

	toggleButton.addEventListener("click", function () {
		var open = nav.classList.toggle("is-open");
		toggleButton.setAttribute("aria-expanded", open ? "true" : "false");
	});

	linksWrapper.addEventListener("click", function (event) {
		if (event.target && event.target.tagName === "A") {
			closeMenu();
		}
	});

	window.addEventListener("resize", function () {
		if (window.innerWidth > 768) {
			closeMenu();
		}
	});
});
