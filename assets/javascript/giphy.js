$(document).ready(function () {
  // Initial array of movies
  var topicList = ["Star Trek", "Avengers", "Matrix", "Stranger Things"];

  // displaytopic buttons and call everytime new button is added
  function displaytopic() {

    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?&apikey=09m8elugi0EEuwpGSfIz5UlwHgxXrk17&limit=15&q=" + topic;
    console.log(queryURL);
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      // Creating a div to hold the movie topic
      var topicDiv = $("<div class='movie'>");

      // Storing the rating data
      for (var i = 0; i < 10; i++) {
        var rating = response.data[i].rating;

        // Creating an element to have the rating displayed
        var gifRatings = $("<p>").text("Rating: " + rating);

        // Displaying the rating
        topicDiv.append(gifRatings);

        // Retrieving the URL for the image in still and animated
        var imgURL = response.data[i].images.fixed_height_still.url;
        var imgStill = response.data[i].images.fixed_height_still.url;
        var imgAnimate = response.data[i].images.fixed_height_downsampled.url;
        // Creating an element to hold the images and assign data class for each state
        var image = $("<img>").attr({
          "src": imgURL,
          "data-still": imgStill,
          "data-animate": imgAnimate,
          "data-states": "still",
          "class": "gif"
        });

        // Appending the image
        topicDiv.append(image);

        // Putting the entire movie above the previous movies
        $("#topics-view").prepend(topicDiv);
      }
    });

  }

  // Function for displaying movie data
  function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < topicList.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of topic-btn to our button
      a.addClass("topic-btn");
      // Adding a data-attribute
      a.attr("data-name", topicList[i]);
      // Providing the initial button text
      a.text(topicList[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where a movie button is clicked
  $("#add-topic").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var addtopic = $("#topic-input").val().trim();

    // Adding movie from the textbox to our array
    topicList.push(addtopic);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "movie-btn"
  $(document).on("click", ".topic-btn", displaytopic);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

  // Adding a click event listener to all elements with a class of "gif
  $(document).on("click", ".gif", stillOrAnimate);
  consolelog(this)
  function stillOrAnimate() {
    consolelog(this);
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("img"));
      $(this).attr("data-state", "still");
    }
  }

});