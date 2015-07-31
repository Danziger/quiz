var menu = null;
var button = null;

// This event may need a fallback:
// http://stackoverflow.com/questions/9899372/pure-javascript-equivalent-to-jquerys-ready-how-to-call-a-function-when-the
document.addEventListener('DOMContentLoaded', function() {
	
	menu = document.getElementById("menu");
	button = document.getElementById("search-menu-button");
	
	deleteConfirm = document.createElement("form");
	deleteConfirm.setAttribute("id", "delete-confirm");
	deleteConfirm.setAttribute("method", "post");	
	deleteConfirm.innerHTML = '<input type="submit" id="acceptDelete" value="ELIMINAR"/><input type="reset" id="cancelDelete" value="CANCELAR"/>';	
	
	document.onclick = function(e) {
	
		var target = e.target;
	
		if(target === button) {
			menu.classList.toggle("visible");
			deleteConfirm.classList.remove("visible");
		}
		else {
			menu.classList.remove("visible");
			
			if(target.className === "delete")  {
				var id = target.getAttribute("data-id");
				var wrapper = target.parentNode.parentNode;
			}
			else if(target.parentNode.className === "delete") {
				var id = target.parentNode.getAttribute("data-id");
				var wrapper = target.parentNode.parentNode.parentNode;
			}
			
			if(typeof id !== "undefined") {
				deleteConfirm.setAttribute("action", "/quizes/" + id + "?_method=DELETE");
				deleteConfirm.className = "visible";
				wrapper.appendChild(deleteConfirm);
			}
			else {
				deleteConfirm.classList.remove("visible");
			}
		}
	}

	// TO-DO: Hidde menu if visible when resizing?
	
	
	
}, false);