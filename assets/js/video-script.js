// https://www.googleapis.com/youtube/v3/search YOUTUBE API
// https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCtctob-kkfgeC-tLfL8Yz5KCWNvkjXObA&type=video&q=drake

//Import it doesnt work
// import recipeSearch from './recipe-script';
// console.log(recipeSearch("success"));

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


    //Save button and display stuff
    var saveBtn = $('#saveBtn');
    var foodSearches = JSON.parse(localStorage.getItem('foodSearches')) || [];
    // console.log(foodSearches);
    // function to save description to a corresponding food to local storage.
    saveBtn.on('click', function (event) {
        event.preventDefault();
        var save = $("#q").val().trim();
        console.log(save);

        if (save !== "") {
            foodSearches.push(save);
            localStorage.setItem("foodSearches", JSON.stringify(foodSearches));
            var history = document.getElementById("search-history");
            history.innerHTML = "";
            foodSearches.forEach(function (searchTerm) {
                // console.log(searchTerm);
                var listItem = document.createElement("button");
                listItem.textContent = searchTerm;
                listItem.setAttribute("value", searchTerm);
                history.appendChild(listItem);

                listItem.addEventListener("click", function (event) {
                    event.preventDefault();
                    var buttonPressed = event.target;
                    var buttonText = buttonPressed.textContent
                    //This is what connects to recipe-script.js
                    recipeSearch(buttonText);


                    // console.log(event.target.textContent);

                })


            })




        }



    });


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