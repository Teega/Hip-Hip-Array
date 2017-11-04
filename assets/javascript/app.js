


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

//movies
//imdb apikey = f8e63df97dfc2a7095345babf9d3fe54
// /3/discover/movie?primary_release_year=2010&sort_by=vote_average.desc

// var year = $("#year-addon");
var year = 2007;
var movieURL = "https://api.themoviedb.org//3/discover/movie?primary_release_year="+ year +"&sort_by=vote_average.descpage=2&language=en-US&api_key=f8e63df97dfc2a7095345babf9d3fe54";

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
// $("#movie").text(JSON.stringify(response));

 var result = response.results;

  for (var i = 0; i < result.length; i++) {
           if (result[i].genre_ids[0] !== 99 && result[i].original_language == "en" && result[i].popularity > 5) {
           	var movieDiv = $(".moviesResults");
           	var title = result[i].original_title;
           	console.log(title);
           	movieDiv.append("<br>" + title + "<hr>");
		};
	};

})

