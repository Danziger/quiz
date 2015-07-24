var menu = null;
var button = null;

// This event may need a fallback:
// http://stackoverflow.com/questions/9899372/pure-javascript-equivalent-to-jquerys-ready-how-to-call-a-function-when-the
document.addEventListener('DOMContentLoaded', function() {
	
	menu = document.getElementById("menu");
	button = document.getElementById("search-menu-button");
	
	document.onclick = function(e) {
	
		if(e.target === button)
			menu.classList.toggle("visible");
		else
			menu.classList.remove("visible");
	}

}, false);