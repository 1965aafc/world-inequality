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
 * Layout information
 */
const margin = {top: 35, right: 0, bottom: 10, left: 0};

const svgAspectRatio = 4/3;
//const svgWidth = 245;
const svgWidth = 170;
const svgHeight = svgWidth / svgAspectRatio;