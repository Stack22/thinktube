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
}

// Update State
function parseResultsToState(data) {
  data.items.forEach(function(item) {
    state.items.push(item);
    state.vidArray.push( {
      ytID: item.id.videoId,
      vidName: item.snippet.title,
      vidURL: "https://youtu.be/" + item.id.videoId,
      vidEmbed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + item.id.videoId + '?controls=1" frameborder="0" allowfullscreen></iframe>',
      vidTnail: item.snippet.thumbnails.medium.url,
    });
  });
  renderThumbnails(state, resultsElement);
};

function resetState(state) {
    state.items = [],
    state.vidArray = []
};

// Render State
function renderThumbnails(state, resultsElement) {
  var content = state.vidArray.map(function(item) {
    return '<div class="col-4 js-card">' +
          '<div class="thumbnailBox">' +
            '<a href=' + item.vidURL + ' target="_blank"><img class="thumbnail js-thumbnail" id="' + item.ytID + '" src=' + item.vidTnail +
            '></img></a>' +
            '<div class="thumbnailLabel"' +
              '<p><span class="videoName">' + item.vidName + '</span><br>' + '</p>' +
            '</div>' +
          '</div>' +
        '</div>';
  });
  resultsElement.html(content);
};

// Event handlers
function watchSubmit(state, formElement, resultsElement) {
  formElement.submit(function(e) {
    resetState(state);
    e.preventDefault();
    var searchTerm = $(this).find('.js-search-input').val();
    getDataFromApi(searchTerm, parseResultsToState);
  });
};

function watchForVideo(state, resultsElement, thumbnailElement, viewerElement) {
  resultsElement.on('click', thumbnailElement, function(e) {
    var thisThumbnail = $(this).find('.js-thumbnail').attr('id');
  });
};

// App initialization
var formElement = $(".js-search-form");
var resultsElement = $(".js-search-results");
var thumbnailElement = $(".js-thumbnail");

$(function() {
  watchSubmit(state, formElement, resultsElement);
  watchForVideo(state, resultsElement, thumbnailElement)
});
