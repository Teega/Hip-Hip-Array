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

//movies:
//imdb apikey = f8e63df97dfc2a7095345babf9d3fe54
// /3/discover/movie?primary_release_year=2010&sort_by=vote_average.desc

//Remember that we can change the year/page with user input or onclick events, ie: $("#seemore").on("click", function(page++));
// var year = $("#year-addon");
var year = 2010;
var page = 3;
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
  console.log(response, "These are movies");

//Establish a variable that pulls results out of the response
var result = response.results;

//Loop through the results, isolate most popular/appropriate movies, establish variables to be able to refer to specific results later
  for (var i = 0; i < result.length; i++) {
          if (result[i].genre_ids[0] !== 99 && result[i].original_language == "en" && result[i].popularity >= 5 && result[i].vote_average >=6) {
           	var movieDiv = $("#moviesResults");
            var imgDiv = $("#imgDiv");
           	var title = result[i].original_title;
            var plot = result[i].overview;
            var movieIMG = result[i].poster_path;
            var imgURL = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + movieIMG;
//            var image = $("<img>").attr("src", imgURL);

//Grab the table from the HTML and put our movie data in it!
            var table = document.getElementById("movieData");
            var row = table.insertRow(0);

              var posterCell = row.insertCell(0);
              var descCell = row.insertCell(1);

                posterCell.innerHTML = ("<img src=" + imgURL + ">");
                descCell.innerHTML = ("<h3>" + title + "</h3><p>" + plot + "</p><hr>");

		      };
	};

})

//tv shows
//imdb apikey = f8e63df97dfc2a7095345babf9d3fe54
//

var tvYear = 2009;
var page = 1;
var tvURL = "https://api.themoviedb.org//3/discover/tv?primary_release_year=" + tvYear + "&language=en-US&api_key=f8e63df97dfc2a7095345babf9d3fe54";

var settings = {
  "async": true,
  "crossDomain": true,
  "url":  tvURL,
  "method": "GET",
  "headers": {},
  "data": "{}"
}

$.ajax(settings).done(function (response) {
  console.log(response, "These are TV Shows");

  var tvResult = response.results;

  for (var i = 0; i < tvResult.length; i++) {
          if (tvResult[i].original_language == "en" && tvResult[i].popularity >= 100 && tvResult[i].vote_average >=7) {
            var tvDiv = $("#tvResults");
            var title = tvResult[i].original_name;
            var plot = tvResult[i].overview;
            var date = tvResult[i].first_air_date;
            var tvIMG = tvResult[i].poster_path;
            var tvimgURL = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + tvIMG;
//            var image = $("<img>").attr("src", imgURL);

//Grab the table from the HTML and put our tv data in it!
            var table = document.getElementById("tvData");
            var row = table.insertRow(0);

              var posterCell = row.insertCell(0);
              var descCell = row.insertCell(1);

                posterCell.innerHTML = ("<img src=" + tvimgURL + ">");
                descCell.innerHTML = ("<h3>" + title + "</h3><br><h4>" + date + "</h4><p>" + plot + "</p><hr>");

          };
  }
})

//news
//nyt archive apikey: 1918eacf59e1438aa675c6786c3fcfd2

var newsYear = 2015;
var newsMonth = 7;

var newsURL = "http://api.nytimes.com/svc/archive/v1/"+ newsYear +"/"+ newsMonth +".json?api-key=1918eacf59e1438aa675c6786c3fcfd2";

$.ajax({
  url: newsURL,
  method: 'GET',
}).done(function(result) {
  console.log(result, "This is our news archive");

var newsResult = result.response;
//their results are nested, so this next line pulls the nest apart.  do we need var articles = news[0];  ??
var news = newsResult.docs;
console.log(news, "these are the articles");

  for (var i = 0; i < news.length; i++) {
  //include only US news articles from the News section, not Op-Ed or local or whatever, 
          if (news[i].news_desk == "U.S." && news[i].type_of_material == "News") {
            console.log("inside our News if");
            var newsDiv = $("#newsDiv");
            var headline = news[i].headline;
            var summ = news[i].snippet;
            var newsLink = news[i].web_url;
            console.log(headline, summ, newsLink);
            $("#newsDiv").innerHTML("<h3>" + headline + "</h3><h4>" + summ + "</h4><p>" + newsLink + "</p><hr>")
          };
  }

})