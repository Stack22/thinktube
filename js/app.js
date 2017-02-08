var state = {
  items: [],
}

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

function parseResultsToState(data) {
  console.log(data.items);
  data.items.forEach(function(item) {
    state.items.push(item);
  });
  console.log(state);
};

// function readTitle(state) {
//   var title = state.items[0].title;
// }
  // var resultElement = "";
  // data.items.forEach(function(item) {
  //  resultElement += '<p>' + item.snippet.title + '</p>';
  // });

  // if (data.items) {
  //   data.items.forEach(function(item) {
  //    resultElement += '<p>' + item.Title + '</p>';
  //   });
  // }
  // else {
  //   resultElement += '<p>No results</p>';
  // }

  // $('.js-search-results').html(resultElement);


function watchSubmit(state) {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var searchTerm = $(this).find('.js-search-input').val();
    getDataFromApi(searchTerm, parseResultsToState);
    console.log(searchTerm);
  });
};

$(function(){watchSubmit(state);});
