//Title: additem.html JavaScript
//Author: Jeffrey HArris
//Term: 1204
//For VFW Web App Part 2



//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function() {

	//getElementById Function
	function $(x) {
	var theElement = document.getElementById(x);
	return theElement;
	}
	
	//Create select field element and populate with options.
	function addStyles () {
		var formTag = document.getElementsByTagName("form"), //formTag is an array of all the form tags.
			selectList = $("select"),
			makeSelect = document.createElement("select")
		;
			makeSelect.setAttribute("id", "beerstyles");
		for (var i = 0, j = beerStyles.length; i < j; i++) {
			var addOption = document.createElement("option");
			var optText = beerStyles[i];
			addOption.setAttribute("value", optText);
			addOption.innerHTML = optText;
			makeSelect.appendChild(addOption);
		}
		selectList.appendChild(makeSelect);
	}
	
	/*
	//Find value of selected radio button.
	function getSelectedRadio () {
		var radios = document.form[0].*radio id //* use the id of the radio button present in the html page.
		for (var i=0; i<radios.length; i++) {
			if (radios[i].checked) {
			radio value = radios[i].value; //radio value  would be listed in the item variable if present.
			}
		}
	}
	
	the radio value variable should be listed outside the function (below the beerStyles varible for instance) in order to avoid any issues with scope.
	
	*/
	
	function getCheckboxValue () {
		if ($("fav").checked) {
			favoriteValue = $("fav").value;
		}else {
			favoriteValue = "No"
		}
	}
	
	function toggleControls (n) {
		switch (n) {
			case "on":
				$("beerForm").style.display = "none";
				$("clearLink").style.display = "inline";
				$("displayLink").style.display = "none";
				$("addNewLink").style.display = "inline";
				break;
			case "off":
				$("beerForm").style.display = "block";
				$("clearLink").style.display = "inline";
				$("displayLink").style.display = "inline";
				$("addNewLink").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	function storeData () {
		var id = Math.floor(Math.random()*100000001);
		//Gather up all our form field values in an object.
		//Object properties contain array with the form label and input values
		getCheckboxValue();
		var item = {};
			item.beerstyle = ["Beer: ", $("beerstyles").value];
			item.beername = ["Name of Beer: ", $("beername").value];
			item.breweryname = ["Name of Brewey: ", $("breweryname").value];
			item.alcrange = ["Alcohol Range (in %): ", $("alcrange").value];
			item.dateenjoyed = ["Date Enjoyed (or not): ", $("dateenjoyed").value];
			item.fav = ["Add to Favorites: ", favoriteValue];
			item.comments = ["Additional Info or Comments: ", $("comments").value];
		//Save data into Local Storage: Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Beer is saved!");
	}
	
	function getData () {
		toggleControls("on");
		if (localStorage.length === 0) {
			alert("There is no data in local storage!");
		}
		//Write data from Local Storage to the browser.
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "block";
		for (var i = 0, j = localStorage.length; i < j; i++) {
			var makeLi = document.createElement("li");
			makeList.appendChild(makeLi);
			var key = localStorage.key(i),
				value = localStorage.getItem(key)
			;
			//Convert the string from Local Storage value back to an object using JSON.parse()
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeLi.appendChild(makeSubList);
			for (var n in obj) {
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0] + " " + obj[n][1];
				makeSubli.innerHTML = optSubText;
			}
		}
	}
	
	function clearLocal () {
		if (localStorage.length === 0) {
			alert("There is no data to clear.")
		}else {
			localStorage.clear();
			alert("All beer information has been deleted!");
			window.location.reload();
			return false;
		}
	}
	
	//Variable defaults
	var beerStyles = ["--Choose a Beer Style--", "Ale", "Lager", "Wheat", "Stout"],
		favoriteValue = "No"
	;
	addStyles();
	
	//Set Link & Submit Click Events
	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);
	
	var clearLink = $("clearLink");
	clearLink.addEventListener("click", clearLocal);
	
	var saveBeer = $("submit");
	saveBeer.addEventListener("click", storeData);
});