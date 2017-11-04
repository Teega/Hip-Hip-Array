


$( document ).ready(function() {
        $('#news-button').on("click", function(){
        	console.log("News is working")
        });
        $('#movies-button').on("click", function(){
        	console.log("Movies is working")
        });
        $('#music-button').on("click", function(){
        	console.log("Music is working")
        });
        $('#youtube-button').on("click", function(){
        	console.log("Youtube is working")
        });
    });

console.log("this is a test");

//movies:
//imdb apikey = f8e63df97dfc2a7095345babf9d3fe54
// /3/discover/movie?primary_release_year=2010&sort_by=vote_average.desc

//Remember that we can change the year/page with user input or onclick events, ie: $("#seemore").on("click", function(page++));
// var year = $("#year-addon");
var year = 2009;
var page = 10;
var movieURL = "https://api.themoviedb.org//3/discover/movie?primary_release_year="+ year +"&sort_by=vote_average.descpage=" + page + "&language=en-US&api_key=f8e63df97dfc2a7095345babf9d3fe54";

//This bit came from IMDB, don't mess with it, we need it to pull data correctly
var settings = {
  "async": true,
  "crossDomain": true,
  "url": movieURL,
  "method": "GET",
  "headers": {},
  "data": "{}",
}

$.ajax(settings).done(function(response) {
  console.log(response);

//Establish a variable that pulls results out of the response
var result = response.results;

//Loop through the results, isolate most popular/appropriate movies, establish variables to be able to refer to specific results later
  for (var i = 0; i < result.length; i++) {
           if (result[i].genre_ids[0] !== 99 && result[i].original_language == "en" && result[i].popularity >= 5 && result[i].vote_average >=6) {
           	var movieDiv = $("#moviesResults");
            var imgDiv = $("#imgDiv");
           	var title = result[i].original_title;
              console.log(title);
            var plot = result[i].overview;
              console.log(plot);
            var movieIMG = result[i].poster_path;
            var imgURL = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + movieIMG;
              console.log(imgURL);
//            var image = $("<img>").attr("src", imgURL);

//Grab the table from the HTML and put our movie data in it!  
            var table = document.getElementById("movieData");
            var row = table.insertRow(0);

              var posterCell = row.insertCell(0);
              var descCell = row.insertCell(1);

                posterCell.innerHTML = ("<img src=" + imgURL + ">");
                descCell.innerHTML = ("<h4>" + title + "</h4><p>" + plot + "</p><hr>");

		};
	};



})



