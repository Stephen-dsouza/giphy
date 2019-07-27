$(document).ready(function () {
  // Initial array of movies
  var topicList = ["Star Trek", "Avengers", "Matrix", "Stranger Things"];
  var favlist = [];
  var savedfavouritelist = JSON.parse(localStorage.getItem("fav-input"));
  // displaytopic buttons and call everytime new button is added
  function displaytopic() {

    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?&apikey=09m8elugi0EEuwpGSfIz5UlwHgxXrk17&q=" + topic;
    console.log(queryURL);
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);

      // Storing the rating.title and image data
      for (var i = 0; i < 10; i++) {
        var topicDiv = $("<div class='col-sm-4 themed-grid-col movie'>");
        var rating = response.data[i].rating;
        var title = response.data[i].title;
        // Creating an element to have the rating and title displayed
        var gifTitle = $("<p>").text("Title: " + title);
        var gifRatings = $("<p>").text("Rating: " + rating);

        // Displaying the Title and rating
        topicDiv.append("<br>");
        topicDiv.append(gifTitle);
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

        // Putting the entire clicked topicabove the previous topics
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


  // This function handles events where a submit button is clicked to add anew topic
  $("#add-topic").on("click", function (event) {
    event.preventDefault();
    console.log(this);
    //This line grabs the input from the textbox
    // Adding movie from the textbox to our array
    var addtopic = $("#topic-input").val().trim();

    topicList.push(addtopic);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
    // setLocalStorageFavourites()
  });

  // Adding a click event listener to all elements with a class of "movie-btn"
  $(document).on("click", ".topic-btn", displaytopic);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

  // Adding a click event listener to all elements with a class of "gif
  $(document).on("click", ".gif", stillOrAnimate);

  function stillOrAnimate() {

    if ($(this).attr("data-states") === "still") {
      console.log(128);
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-states", "animate");
    } else {

      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-states", "still");
    }
  }

});