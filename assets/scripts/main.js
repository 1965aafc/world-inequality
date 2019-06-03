/*
 * Tab manipulation from w3schools: https://www.w3schools.com/howto/howto_js_tabs.asp
 */
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function selectTab(evt, tabName) {
	// Declare all variables
	var i, tabcontent, tablinks;

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
}

/*
 * Sticky tab bar from w3schools: https://www.w3schools.com/howto/howto_js_navbar_sticky.asp
 */
// When the user scrolls the page, execute myFunction
window.onscroll = function() {adjustStickyTabs()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop + 1;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function adjustStickyTabs() {
	if (window.pageYOffset >= sticky) {
		navbar.classList.add("sticky")
	} else {
		navbar.classList.remove("sticky");
	}
}

/*
 * Layout information
 */
const margin = {top: 45, right: 0, bottom: 15, left: 0};

const svgAspectRatio = 4/3;
const svgWidth = 245;
const svgHeight = svgWidth / svgAspectRatio;