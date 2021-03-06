$( document ).ready(function() {

    $('#datefield').on('change', function() {
      chosenDate = new Date($('#datefield').val() + " MST");
      localStorage.chosenDate = chosenDate;
      })

var chosenDate;

if (localStorage.chosenDate) {
    chosenDate = new Date(localStorage.chosenDate);
    $('#datefield').val(formatDate(chosenDate));
} else {
    chosenDate = new Date("06/03/1981");
    localStorage.chosenDate = chosenDate;
}


//movies:
var imdbKey = "f8e63df97dfc2a7095345babf9d3fe54";

//Remember that we can change the year/page with user input or onclick events, ie: $("#seemore").on("click", function(page++));
// var year = $("#year-addon");

var year = chosenDate.getFullYear();
var page = 2;
var movieURL = "https://api.themoviedb.org//3/discover/movie?primary_release_year="+ year +"&sort_by=vote_average.descpage=" + page + "&language=en-US&api_key=" + imdbKey;

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
          if (result[i].genre_ids[0] !== 99 && result[i].original_language == "en" && result[i].popularity >= 4 && result[i].vote_average >= 4) {
            var imgDiv = $("#imgDiv");
            var title = result[i].original_title;
            var plot = result[i].overview;
            var movieIMG = result[i].poster_path;
            var imgURL = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + movieIMG;

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
//imdbKey = f8e63df97dfc2a7095345babf9d3fe54

var tvYear = chosenDate.getFullYear();
var tvPage = 1;
var tvURL = "https://api.themoviedb.org/3/discover/tv?api_key=" + imdbKey + "&language=en-US&sort_by=popularity.desc&first_air_date_year=" + tvYear + "&page=" + tvPage + "&timezone=America%2FNew_York&include_null_first_air_dates=false";

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
          if (tvResult[i].original_language == "en" && tvResult[i].popularity >= 5 && tvResult[i].vote_average >= 5) {
            var title = tvResult[i].original_name;
            var plot = tvResult[i].overview;
            var date = tvResult[i].first_air_date;
            var tvIMG = tvResult[i].poster_path;
            var tvimgURL = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + tvIMG;

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
var nytKey = "1918eacf59e1438aa675c6786c3fcfd2";
var newsYear = chosenDate.getFullYear();
var newsMonth = chosenDate.getMonth() + 1;

var newsURL = "https://api.nytimes.com/svc/archive/v1/"+ newsYear +"/"+ newsMonth +".json?api-key=" + nytKey;

$.ajax({
  url: newsURL,
  method: 'GET',
}).done(function(result) {
  console.log(result, "This is our news archive");

var news = result.response.docs;
var filteredNews = [];

  for (var i = 0; i < news.length; i++) {
  //include only US news articles from the News section, not Op-Ed or local or whatever and only from the front page
          if (news[i].news_desk == "National" || news[i].section_name == "U.S." && news[i].print_page == "1") {

            filteredNews.push(news[i]);
            // var newsDiv = $("#newsDiv > table > tbody");
            // var headline = news[i].headline.main;
            // var summ = news[i].snippet;
            // var newsLink = news[i].web_url;
            // // console.log(newsLink);
            // // var newsDisplay = ("<h3>" + headline + "</h3><h4>" + summ + "</h4>" + newsLink + "<hr>");
            // var newsDisplay = ('<tr><td><div class="news-article">' + "<h3>" + headline + "</h3><h4>" + summ + "</h4>" + newsLink  + '</div></td></tr>')
            // $(newsDiv).append(newsDisplay);
            // newsCount++;  // Since we are filtering the news, we need a count of what will get displayed
          };
  }

  $('#news-pagination').pagination({
    dataSource: filteredNews,
    callback: function(news, pagination) {
        var html = $("<div></div>");
        for (var i = 0; i < news.length; i++) {
            var headline = news[i].headline.main;
            var summ = news[i].snippet;
            var article = news[i].web_url;
            var newsLink = ("<a href=" + article + ">" + "Read full article at New York Times" + "</a>");

            var newsDisplay = ('<div class="news-article">' + "<h3><strong>" + headline + "</strong></h3><h4>" + summ + "</h4>" + newsLink + "<hr>" + '</div>');
            html.append(newsDisplay);
        }
        $('#newsDiv').html(html);
        $('#news-pagination').find("ul").addClass("pagination");
    }
  })


})


//Global Variables for the NYT Book API
// ***************************************************************************

//This variable holds the string that is created in the API for loop (below)
var booksTemplate = "";

//These variables change the datepicker intergers into strings
var bookYear = (chosenDate.getFullYear()).toString();
var bookMonth = (chosenDate.getMonth() + 1).toString();
var bookDay = (chosenDate.getDate()).toString();

console.log(bookYear);
console.log(bookMonth);
console.log(bookDay);

//These variables prepend "0" to all months. It then slices off the "0" if the date month is grater than 9 (ex. 010 slice---> 10)
var month = ("0" + bookMonth).slice(-2);
console.log(month);

var day = ("0" + bookDay).slice(-2);
console.log(day);


//This variable creates the date format to be passed to the NYT Book API
var bookDate = newsYear + "-" + month + "-" + day;
console.log(bookDate);



// NYT Book API URL
// ****************************************************************************
var url = "https://api.nytimes.com/svc/books/v3/lists//.json";
url += '?' + $.param({
  'api-key': "b64791b04000459ab16801c74f5de9cc",
  'list-name': "hardcover-fiction",
  'published-date': bookDate
});

//NYT API Call
//*****************************************************************************
$.ajax({
  url: url,
  method: 'GET',
}).done(function(data) {
  console.log(data, "these are books");

var bookDetails = data.results;
// Loop to string together the API results. It limits results to 10.
for (var i = 0; i < 9; i++) {
  var currentDetail = bookDetails[i].book_details[0];
  console.log(currentDetail);
  var title = currentDetail.title;
  var description = currentDetail.description;
  var author = currentDetail.author;
  var amazonLink = bookDetails[i].amazon_product_url;
  var amazonClick = ("<a href=" + amazonLink + ">" + "Buy Amazon" + "</a>");
  booksTemplate += "<h3><strong>" + title + "</strong></h3>" + "<h5><i>" + author + "</i></h5>" + "<h4>" + description + "</h4>" + "<br>" + amazonClick + "<hr>";

}

$("#booksDiv").append(booksTemplate);

}).fail(function(err) {
  throw err;

});

// Taken from https://stackoverflow.com/questions/23593052/format-javascript-date-to-yyyy-mm-dd
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');

    };

})
