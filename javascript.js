$(document).ready(function () {
	// An array of games, new games will be pushed into this array;
	var games = ["Zelda", "Witcher", "StarCraft", "Overwatch"];
	// Creating Functions & Methods
	// Function that displays all gif buttons
	function displayGifButtons() {
		$("#gifButtonsView").empty();
		$("#gifsView").empty();
		// erasing anything in this div id so that it doesnt duplicate the results
		// for loop that cycles through the games variable
		for (var i = 0; i < games.length; i++) {
			// variable that creates a button in HTML
			var gifButton = $("<button>");
			// adds a class to that button and sets it equal to game (also adds a class called btn btn-primary)
			gifButton.addClass("game");
			// adds two classes btn and btn-primary
			gifButton.addClass("btn btn-primary")
			// adds an attribute to the newly created button and sets it to the value of the index. which adds zelda to zelda and witcher to witcher etc.
			gifButton.attr("data-name", games[i]);
			// sets the text for each button by using the value of the games index
			gifButton.text(games[i]);
			// finds the div in HTML with an id of gifButtonsView and appends the gifButton variable that creates the buttons
			$("#gifButtonsView").append(gifButton);
		}
	}
	// Function to add a new game button
	function addNewButton() {
		// goes into the HTML and finds the element with the addGif ID. which is an input button and adds an on click function to it
		$("#addGif").on("click", function () {
			// creating a variable inside addNewButton that finds the HTML element with and ID of game-input, obtains the value of that HTML element and "trims" the beginning and end. (Trim removes emtpy spaces in the input. in canse someone hit the spacebar unnecessarily)
			var game = $("#game-input").val().trim();
			// an if statement that says "if the game variable is empty..."
			if (game == "") {
				// by returning something the code will stop running within the scope of the function. so by returning false here we can prevent the code from continuing when the user does not enter anything in the #game-input element
				return false;
			}
			// grabs the array above labeled games, and pushes the game variable into it. This allows the user to add to the games array
			games.push(game);

			// Runs the displayGifButtons function that was created above. to display the buttons that are in the games array.
			displayGifButtons();
			// 
			return false;
		});
	}
	// Function to remove all the game buttons
	function removeAllButtons() {
		// Goes into the HTML and finds the elementh with an ID of removeGif and give it an on click function
		$("#removeGif").on("click", function () {
			games = ["Zelda", "Witcher", "StarCraft", "Overwatch"];
			displayGifButtons();

			return false;
		});
	}
	// Function that displays all of the gifs
	function displayGifs() {
		// Creates a variable inside the scope called game and sets it equal to this which is reffering to displayGifs. since dispplayGifs being passed in as a parameter to the onClick funtion of the .game class on line 125, "this" refers to the button being pressed by the user which has the .game class. so "this" grabs the value of the "data-name" attribute of the element that was clicked. i.e. Zelda
		var game = $(this).attr("data-name");
		// creates a variable that is set to the api web address. instead of a specific search term we have concanitated the "game" variable. this allows the user input to be ran in the URL so that it returns the information the user specified
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=A8lYGkwc52L8O1UERk4wWa7CrSwjNdL9&limit=10";
		console.log(queryURL); // displays the constructed url
		// function to initiate a network request to the queryURL above
		$.ajax({
			// sets the url of the ajax function to the queryURL that was created above
			url: queryURL,
			// Get is reading information from the url above.
			method: 'GET'
		})
			// the response variable is what comes back from the request to the ajax url. .done executes when the server responds to me with a response.
			.done(function (response) {
				console.log(response); // console test to make sure something returns
				// erasing anything in this div id so that it doesnt keep any gifs from the previous click
				$("#gifsView").empty();
				// a variable that is set equal to the response section and goes into that and finds the data attribute. you can find this in console.log
				var results = response.data; //shows results of gifs *
				// if statement that says if results is empty....
				if (results == "") {
					// ... then run this alert
					alert("There are no GIF's associated with this button.");
				}
				// a for loop that cycles through the entire length of the results array
				for (var i = 0; i < results.length; i++) {

					// variable that creates a <div> element inside of the HTLM
					var gifDiv = $("<div>");
					// adds a class to the <div> created above and sets it to gifDiv
					gifDiv.addClass("gifDiv");
					// variable that creates a <p> element inside of HTML then targets the text of that element and pushed into it the word Rating and a concatination of the results array and all of their ratings. You can find this in console.log by going through the information and finding the results section. opening it up and looking for the ratings section.
					var gifRating = $("<p>").text("Rating: " + results[i].rating);
					// grabs the gifDiv variable that was created above and appends the variable gifRating to it. This displays the the <p> that was created in the gifRating variable
					gifDiv.append(gifRating);
					// a variable that creates an <img> element in HTML
					var gifImage = $("<img>");
					// grabs the gifImage variable and gives it a "src" attribute. Then sets that attribute equal to the results array goes into that section and finds the url of the fixed_height_small_still
					gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
					// grabs the gifImage variable and adds an attribute to it called "data-still" then sets that equal to the results index goes into that and finds the images section then goes into that and finds the fixed_height_small_still section then goes into that and finds the url
					gifImage.attr("data-still", results[i].images.fixed_height_small_still.url); // still image
					// grabs the gifImage variable and adds an attribute to it called "data-animate" then sets that equal to the results index goes into that and finds the images section then gos into that and finds the fixed_height_small section and then gos into that and finds the url
					gifImage.attr("data-animate", results[i].images.fixed_height_small.url); // animated image
					// grabs the gifImage variable and adds an attribute to it called "data-state" and sets it to still
					gifImage.attr("data-state", "still"); // set the image state
					// grabs the gifImage variable and adds a class to it called "image"
					gifImage.addClass("image");
					// grabs the gifDiv variable and appens the gifImage variable to it
					gifDiv.append(gifImage);// pulling still image of gif
					// grabs the HTML element with the ID of gifsView and prepends the gifDiv variable to it on line 106 we append the gifImage var to the gifDiv variable and then prepend that to the #gifsView element in HTML
					$("#gifsView").prepend(gifDiv);
				}
			});
	}
	// Calling Functions & Methods
	displayGifButtons(); // displays list of games already created
	addNewButton();
	removeAllButtons();
	// Document Event Listeners
	// creates an on click event that targets anything with a class of game and then runs the displayGifs function
	$(document).on("click", ".game", displayGifs);
	// creats an on click event that targets anything with a class of image and then runs the code below
	$(document).on("click", ".image", function () {
		// creating a variable called state and then uses the on click event above to select the data-state attribute on the image clicked. this is referring to the element that is being clicked on with the .image class. (line 120)
		var state = $(this).attr('data-state');
		// if the state (or 'data-state') of the image clicked is equal to 'still' then...
		if (state == 'still') {
			// this is reffering again to the image that is clicked (line 120). when you click on the image it looks at the state of the image and says if the data-state attribute of the image is still, then change the data to animate.
			$(this).attr('src', $(this).data('animate'));
			$(this).attr('data-state', 'animate');
		} else {
			// if the images data is set to still then if you click on it it will set its data to animate.
			$(this).attr('src', $(this).data('still'));
			$(this).attr('data-state', 'still');
		}
	});
});