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

    }
    function hideLogo() {
        var logo = document.getElementById("logo");
        logo.classList.add("is-hidden");
    }
    function fixFooter() {
        document.getElementById("stayB").style.bottom = "auto";
    }
    document.getElementById("searchBtn").addEventListener("click", hideLogo);
    document.getElementById("searchBtn").addEventListener("click", fixFooter);
})