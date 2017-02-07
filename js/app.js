var YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";
var apiKey = 'AIzaSyC_6i0-lxFb7T4ORGSWNA5LVW46qRWa7b8';

function getDataFromApi(searchTerm, callback) {
  var query = {
    part: "snippet",
    type: "video",
    q: searchTerm,
    order: "viewCount",
    maxResults: 8,
    key: apiKey
  };
  $.get(YOUTUBE_API_URL, query, callback);
};

function displayOMDBSearchData(data) {
  var resultElement = '';
  console.log(data);
  // if (data.Search) {
  //   data.Search.forEach(function(item) {
  //    resultElement += '<p>' + item.Title + '</p>';
  //   });
  // }
  // else {
  //   resultElement += '<p>No results</p>';
  // }
  //
  // $('.js-search-results').html(resultElement);
};

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var searchTerm = $(this).find('.js-search-input').val();
    getDataFromApi(searchTerm, displayOMDBSearchData);
    console.log(searchTerm);
  });
};

$(function(){watchSubmit();});
