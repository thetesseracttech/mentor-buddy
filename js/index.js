// Document Ready
// document.addEventListener('DOMContentLoaded', function (){
// 	init();
// })

$(document).ready(function(){
	
	init();

	// Init
	function init () {
		// Close the preloader
		let preloader = getElem('#preloader');
		setTimeout(() => preloader.style.display = 'none', 1000);

		// Create custom cursor
		cursor();

		// Adjust Navbar width on Mobile
		if (document.innerWidth <= 768 || document.body.clientWidth <=768) {
			let toggler = getElem('.navbar-toggler').onclick = () => {
				getElem('.navbar').style.background = "#fff";
				getElem('.navbar').style.height = "auto";
			}
		}
	}

	/**
	** Create a custom cursor
	** @params none
	** @return none
	**
	*/
	function cursor () {
		// Variables
		let smallCursor = getElem('#small-cursor');
		let largeCursor = getElem('#large-cursor');

		document.onmousemove = function (e) {
			// Small
			smallCursor.style.top = (e.pageY - 5) + 'px';
			smallCursor.style.left = (e.pageX - 5) + 'px';
			smallCursor.style.display = 'block';

			// Large
			largeCursor.style.top = (e.pageY - 22) + 'px';
			largeCursor.style.left = (e.pageX - 22) + 'px';
			largeCursor.style.display = 'block';
		}

		// Change Custom Cursor color on Mobile when hovered on Navbar
		if (document.innerWidth <= 768 || document.body.clientWidth <= 768) {
			// Mouse Enter
			getElem('.navbar').onmouseenter =  () => {
				smallCursor.style.background = "#333";
				largeCursor.style.borderColor = "#333";
			}

			// Mouse Leave
			getElem('.navbar').onmouseleave =  () => {
				smallCursor.style.background = "#fff";
				largeCursor.style.borderColor = "#fff";
			}
		}
	}

	/**
	** Create a custom cursor
	** @params {String} - An id, class, or tag name of a  node 
	** @return {Node} - An html Node Element
	**
	*/
	function getElem (target) {
		return document.querySelector(target);
	}

	 // Smooth scrolling using jQuery easing
	$('a.nav-link[href*="#"]:not([href="#"])').click(function () {
	    if (
	        location.pathname.replace(/^\//, "") ==
	            this.pathname.replace(/^\//, "") &&
	        location.hostname == this.hostname
	    ) {
	        var target = $(this.hash);
	        target = target.length
	            ? target
	            : $("[name=" + this.hash.slice(1) + "]");
	        if (target.length) {
	            $("html, body").animate(
	                {
	                    scrollTop: target.offset().top,
	                },
	                1000,
	                "easeInOutExpo"
	            );
	            return false;
	        }
	    }
	});
})