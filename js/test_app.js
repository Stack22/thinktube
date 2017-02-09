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
  $.getJSON(YOUTUBE_API_URL, query, callback);
};

// State
var state = {
  items: [],
  vidArray: [],
  queryTerm: ""
}

// Read State

// Update State
function simplifyState(state) {
  state.vidArray = state.items.map(function(item) {
    return {
      ytID: item.id.videoId,
      vidName: item.snippet.title,
      vidURL: "https://youtu.be/" + item.id.videoId,
      vidEmbed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + item.id.videoId + '?controls=1" frameborder="0" allowfullscreen></iframe>',
      vidTnail: item.snippet.thumbnails.default.url,
    };
  });
  console.log(state.vidArray);
};

function parseResultsToState(data) {
  data.items.forEach(function(item) {
    state.items.push(item);
  });

  // console.log(state);
  renderQueryTerm(state, resultsElement);
  renderThumbnails(state, resultsElement);
};

function resetState(state) {
    state.items = [],
    state.vidArray = [],
    state.queryTerm = ''
};

// Render State
//  - Query term
function renderQueryTerm(state, resultsElement) {
  var content = '<em> Searching for: "' + state.queryTerm + '"</em>';
  // console.log(state.items[0]);
  resultsElement.find(".js-query-display").html(content);
};

//  - Thumbnails
function renderThumbnails(state, resultsElement) {
  simplifyState(state);
  resultsElement.html(" ");
  var content = state.items.map(function(item) {
    return '<div class="col-4 js-card">' +
          '<div class="thumbnailBox">' +
            '<img class="thumbnail js-thumbnail" src=' + item.snippet.thumbnails.medium.url +
            '></img>' +
            '<div class="thumbnailLabel" id=' + item.id.videoId + '>' +
              '<p><span class="videoName">' + item.snippet.title + '</span><br>' + '</p>' +
            '</div>' +
          '</div>' +
        '</div>';
  });
  resultsElement.html(content);
};

function renderViewer(content, viewerElement) {
  console.log("I heard the click");
  viewerElement.removeClass(".hidden");
  viewerElement.html(content);
};
//  - Viewer

// Event handlers
function watchSubmit(state, formElement, resultsElement) {
  formElement.submit(function(e) {
    e.preventDefault();
    var searchTerm = $(this).find('.js-search-input').val();
    state.queryTerm = searchTerm;
    getDataFromApi(searchTerm, parseResultsToState);
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
var thumnailElement = $(".js-thumbnail");

$(function() {
  watchSubmit(state, formElement, resultsElement);
});
