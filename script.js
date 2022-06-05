// FUNCTION TO RETRIEVE VIDEO BASED ON KEYWORD
//function searchByKeyword() {
//     var results = YouTube.Search.list('id,snippet', { q: 'dogs', maxResults: 25 });

//     for (var i in results.items) {
//         var item = results.items[i];
//         Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
//     }
// }
// https://www.googleapis.com/youtube/v3/search YOUTUBE API
// https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCtctob-kkfgeC-tLfL8Yz5KCWNvkjXObA&type=video&q=drake
$(document).ready(function(){

    var YoutubeAPIKEY = "AIzaSyCtctob-kkfgeC-tLfL8Yz5KCWNvkjXObA";

    var video = ""

    $("#artist-search").submit(function (event) {
        event.preventDefault();
        console.log("form is submitted");

        var search = $("#q").val()

        videoSearch(YoutubeAPIKEY, search,5);
    })

    function videoSearch(key, search, maxResults) {

        $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search,function(data) {
            console.log(data);

            data.items.forEach(item => {
                video = `
                
                <iframe width="420" height="315" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                
                `

                $('#videos').append(video);
            });
        })

    }

})

// var searchResultsEl = document.querySelector('#search-results');
// var qInput = document.querySelector('#q');
// var formatInput = document.querySelector('#format');
// var searchForm = document.querySelector('#artist-search');



// var getSearchResults = function (q) {
//     var searchURL = "";

//     fetch(searchURL)
//         .then(function (response) {
//             console.log(response);
//             return response.json();

//         })
//     .then(function (data) {
//         searchResultsEl.innerHTML = null;

//     })
// }





// var init = function () {
//     if (location.search) {
//         var url = new URL(location.href);
//         var q = url.searchParams.get('q');
//         var format = url.searchParams.get('format');
//         getSearchResults(q, format);
//     }
// };

// var handleSearch = function (event) {
//     event.preventDefault();
//     var q = qInput.value.trim();

//     if (!q) return;

//     if (searchResultsEl) {
//         getSearchResults(q);
//     } else {
//         location.replace('./search-results.html?q=' + q);
//     }
// }

// searchForm.addEventListener('submit', handleSearch);


// init();