//Title: additem.html JavaScript
//Author: Jeffrey HArris
//Term: 1204
//For VFW Web App Part 3



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
	
	function storeData (key) {
		// If there is no key, this means this is a brand new item and we need a key.
		if(!key) {
			var id = Math.floor(Math.random()*100000001);
		}else {
			// Set the id to the existing key we're editing so that it will save over the data.
			// The key is the same key that's been pass along from the editSubmit event handler
			// to the validate function, and then passed here, into the storeData function.
			id = key;	
		}
		//Gather up all our form field values in an object.
		//Object properties contain array with the form label and input values
		getCheckboxValue();
		var item = {};
			item.beerstyle = ["Beer Style: ", $("beerstyles").value];
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
			var linksLi = document.createElement("li");
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
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete buttons/links for each item in local storage.
		}
	}
	
	// Make Item Links
	// Create the edit and delete links for each item when displayed.
	function makeItemLinks (key, linksLi) {
		// add edit single item link
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Beer Info";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		
		//add line break
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);
		
		
		// add delete single item link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Beer Info";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
		
	}
	
	function editItem () {
		// Grab the data from our item from Local Storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		// Show the form
		toggleControls("off");
		
		// Populate the form fields with the current localStorage values.
		$("beerstyles").value = item.beerstyle[1];
		$("beername").value = item.beername[1];
		$("breweryname").value = item.breweryname[1];
		$("alcrange").value = item.alcrange[1];
		$("dateenjoyed").value = item.dateenjoyed[1];
		if (item.fav[1] == "Yes") {
			$("fav").setAttribute("checked", "checked");
		}
		$("comments").value = item.comments[1];
	
		// Remove the initial listener from the input "save contact" button.
		saveBeer.removeEventListener("click", storeData);
		// Change Submit Button Value to Edit Button
		$("submit").value = "Edit Beer Info";
		var editSubmit = $("submit");
		// Save the key value established in this function as a property of the editSubmit event
		// so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	
	}
	
	function deleteItem () {
		var ask = confirm("Are you sure you want to delete this beer information?");
		if (ask) {
			localStorage.removeItem(this.key);
			alert ("beer information was deleted!");
			window.location.reload();
		}else {
			alert ("Beer information was NOT deleted.");
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

	function validate (e) {
		// Define the elements we want to check
		var getBeerstyle = $("beerstyles"),
			getBeername = $("beername"),
			getBreweryname = $("breweryname")
		;

		//Reset Error Messages
		errorMsg.innerHTML = "";
		getBeerstyle.style.border = "1px solid black";
		getBeername.style.border = "1px solid black";
		getBreweryname.style.border = "1px solid black";

	
		// Get Error Messages
		var messageArray = [];
		
		//Beer Style Validation
		if (getBeerstyle.value === "--Choose a Beer Style--") {
			var styleError = "Please choose a beer style.";
			getBeerstyle.style.border = "1px solid red";
			messageArray.push(styleError);
		}

		// First Name Validation
		if(getBeername.value === "") {
			var beerNameError = "Please enter the beer's name.";
			getBeername.style.border = "1px solid red";
			messageArray.push(beerNameError);
		}
	
		// Brewery Name Validation
		if(getBreweryname.value === "") {
			var breweryNameError = "Please enter the brewery's name.";
			getBreweryname.style.border = "1px solid red";
			messageArray.push(breweryNameError);
		}
	
		// If there were errors, display them on the screen.
		if (messageArray.length >= 1) {
			for (var i = 0, j = messageArray.length; i < j; i++) {
				var txt = document.createElement("li");
				txt.innerHTML = messageArray[i];
				errorMsg.appendChild(txt);	
			}
			e.preventDefault();
			return false;
		}else {
			// If all is OK, save our data. Send the key value (which came from the editData function).
			// Remember this key value was passed through the editSubmit event listener as a property.
			storeData(this.key);
		}
		
	}
	//Variable defaults
	var beerStyles = ["--Choose a Beer Style--", "Ale", "Lager", "Wheat", "Stout"],
		favoriteValue = "No",
		errorMsg = $("errors");
	;
	addStyles();
	
	//Set Link & Submit Click Events
	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);
	
	var clearLink = $("clearLink");
	clearLink.addEventListener("click", clearLocal);
	
	var saveBeer = $("submit");
	saveBeer.addEventListener("click", validate);
});