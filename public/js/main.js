var menu = null;
var button = null;
var login = null;
var loginForm = null;

var deleteConfirm = null;

var visible = null;

// This event may need a fallback:
// http://stackoverflow.com/questions/9899372/pure-javascript-equivalent-to-jquerys-ready-how-to-call-a-function-when-the
document.addEventListener('DOMContentLoaded', function() {
	
	menu = document.getElementById("menu");
	button = document.getElementById("search-menu-button");
	login = document.getElementById("login-menu-button");
	loginForm = document.getElementById("login-form");
	
	deleteConfirm = document.createElement("form");
	deleteConfirm.setAttribute("id", "delete-confirm");
	deleteConfirm.setAttribute("method", "post");	
	deleteConfirm.innerHTML = '<input type="submit" id="acceptDelete" value="ELIMINAR"/><input type="reset" id="cancelDelete" value="CANCELAR"/>';	
	
	document.onclick = function(e) {
		
		var target = e.target;
	
		switch(target) {
			case button:
				if(menu.classList.toggle("visible")) {
					if(visible) visible.classList.remove("visible");
					visible = menu;
				} else { visible = null; }
				break;
				
			case login:
				if(loginForm.classList.toggle("visible")){
					if(visible) visible.classList.remove("visible");
					visible = loginForm;
				} else { visible = null; }
				break;
				
			default: 
				//menu.classList.remove("visible");
				
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
					if(visible != deleteConfirm && visible != null) visible.classList.remove("visible");
					visible = deleteConfirm;
				}
				else if(target.tagName !== "INPUT" && target !== loginForm && target.parentNode !== loginForm){ // Shold exclude all containers related with the buttons!
					if(visible)	visible.classList.remove("visible");
					visible = null;
				}
		}
	}

	// TO-DO: Hidde menu if visible when resizing?
	
	
	
}, false);