// API call
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

// State
var state = {
  items: [],
  queryTerm: ""
}

// Read State


// Update State
function parseResultsToState(data) {
  data.items.forEach(function(item) {
    state.items.push(item);
  });
  console.log(state);
};

function resetState(state) {
  state.items = [];
}


// Render State
//  - Query term
function renderQueryTerm(state, resultsElement) {
  var content = '<em> Searching for: "' + state.queryTerm + '"</em>';
  resultsElement.find(".js-query-display").html(content);
};

//  - Thumbnails
function renderThumbnails(state, resultsElement) {

}
//  - Viewer

// Event handlers
function watchSubmit(state, formElement, resultsElement) {
  formElement.submit(function(e) {
    e.preventDefault();
    var searchTerm = $(this).find('.js-search-input').val();
    state.queryTerm = searchTerm;
    getDataFromApi(searchTerm, parseResultsToState);
    console.log(state);
    renderQueryTerm(state, resultsElement);
    // renderThumbnails(state);
  });
};
/*- handle API call (search input)
  - handle data --> State
  - handle render Thumbnails
  - handle render viewer
*/

/* Event listeners
  - Page Load (reset State)
  - Submit (get data via API)
  - Thumbnail/Card click (watch video)
*/

// App initialization
var formElement = $(".js-search-form");
var submitButton = $("#searchButton");
var resultsElement = $(".js-search-results");
var viewerElement = $(".js-viewer");

$(function() {
  watchSubmit(state, formElement, resultsElement);
});
