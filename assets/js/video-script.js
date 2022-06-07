// https://www.googleapis.com/youtube/v3/search YOUTUBE API
// https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCtctob-kkfgeC-tLfL8Yz5KCWNvkjXObA&type=video&q=drake
$(document).ready(function () {

    var YoutubeAPIKEY = "AIzaSyCtctob-kkfgeC-tLfL8Yz5KCWNvkjXObA";

    var video = ""

    $("#food-search").submit(function (event) {
        event.preventDefault();
        // console.log("form is submitted");
        document.querySelector("#videos").innerHTML = ""; // clears search results for each search

        var search = $("#q").val()

        videoSearch(YoutubeAPIKEY, search, 5);
    })
    function videoSearch(key, search, maxResults) {
        $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function (data) {
            // console.log(data);

            data.items.forEach(item => {
                video = `
                
                <iframe width="420" height="315" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                
                `

                $('#videos').append(video);
            });
        })

    };



    var saveBtn = $('#saveBtn');
    var foodSearches = JSON.parse(localStorage.getItem('foodSearches')) || [];
    console.log(foodSearches);
    // function to save description to a corresponding hour to local storage.
    saveBtn.on('click', function () {
        var save = $("#q").val();
        console.log(save);
        foodSearches.push(save);
        localStorage.setItem("foodSearches", JSON.stringify(foodSearches));
        var history = document.getElementById("search-history");
        foodSearches.forEach(function (searchTerm){
            console.log(searchTerm);
            var listItem = document.createElement("button");
            listItem.textContent = searchTerm;
            listItem.setAttribute("value", searchTerm);
            history.appendChild(listItem);
        })
    });

    // events stay when saved even when page is refreshed.
    // function saveEvents() {

    //     $('#q').each(function () {
    //         var event = $(this).text();
    //         var search = localStorage.getItem(event);

    //         if (event !== null) {
    //             $(this).siblings('#q').val(search);
    //         }
    //     });
    // saveEvents();
    // }

    function saveBtnAppear() {
        var saveBtn = document.getElementById('saveBtn');
        saveBtn.classList.remove('is-hidden');

    }

    function hideLogo() {
        var logo = document.getElementById("logo");
        logo.classList.add("is-hidden");
    }

    function fixFooter() {
        document.getElementById("stayB").style.bottom = "auto";
    }


    document.getElementById("searchBtn").addEventListener("click", saveBtnAppear);
    document.getElementById("searchBtn").addEventListener("click", hideLogo);
    document.getElementById("searchBtn").addEventListener("click", fixFooter);
});