// https://www.googleapis.com/youtube/v3/search YOUTUBE API
// https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCtctob-kkfgeC-tLfL8Yz5KCWNvkjXObA&type=video&q=drake

var YoutubeAPIKEY = "AIzaSyCtctob-kkfgeC-tLfL8Yz5KCWNvkjXObA";
function getIngredients(meal) {
    return (
        Object.keys(meal)
            .filter(key => key.includes('Ingredient'))
            .map(ingredient => meal[ingredient])
            .filter(ingredient => ingredient)
    )
};

function getMeasurements(meal) {
    return (
        Object.keys(meal)
            .filter(key => key.includes('Measure'))
            .map(measurement => meal[measurement])
            .filter(measurement => measurement)
    )
};


$(document).ready(function () {

    var YoutubeAPIKEY = "AIzaSyCtctob-kkfgeC-tLfL8Yz5KCWNvkjXObA";

    var video = ""

    $("#food-search").submit(function (event) {
        event.preventDefault();
        // console.log("form is submitted");
        document.querySelector("#videos").innerHTML = ""; // clears search results for each search

        var search = $("#q").val()

        videoSearch(YoutubeAPIKEY, search, 5);
    });

    function videoSearch(key, search, maxResults) {
        document.querySelector("#videos").innerHTML = "";
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
    $("#food-search").submit(function (event) {
        document.querySelector("#recipes").innerHTML = "";
        event.preventDefault();
        var search = $("#q").val()
        recipeSearch(search);

    })

    function recipeSearch(search) {
        document.querySelector("#recipes").innerHTML = "";
        $.get("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search, function (data) {
            // console.log(data);
            if (data.meals) {
                for (var meal of data.meals) {

                    var h2El = document.createElement("h2");
                    h2El.textContent = meal.strMeal;

                    var imgEl = document.createElement("img");
                    imgEl.src = meal.strMealThumb;

                    var pEl = document.createElement("p");
                    pEl.textContent = meal.strInstructions;

                    var ulEl = document.createElement("ul");

                    var ingredients = getIngredients(meal);
                    var measurements = getMeasurements(meal);

                    for (let i = 0; i < ingredients.length; i++) {
                        var liEl = document.createElement("li");
                        liEl.textContent = ingredients[i] + " - " + measurements[i];
                        ulEl.appendChild(liEl);
                    }

                    $("#recipes").append(h2El, pEl, imgEl, ulEl);

                }
            }
        })
    }

    //Save button and display stuff
    var saveBtn = $('#saveBtn');
    var foodSearches = JSON.parse(localStorage.getItem('foodSearches')) || [];
    
    // console.log(foodSearches);
    // function to save description to a corresponding food to local storage.
    saveBtn.on('click', function saveSearch (event) {
        event.preventDefault();
        var save = $("#q").val().trim();
        console.log(save);
        if (foodSearches.includes(save)){
            var history = document.getElementById("search-history");
            history.innerHTML = "";
            foodSearches.forEach(function (searchTerm) {


                // console.log(searchTerm);
                var listItem = document.createElement("button");

                //Added button stuff
                listItem.className = "button is-primary mb-1 align"
                console.log(listItem.className)

                listItem.textContent = searchTerm;
                listItem.setAttribute("value", searchTerm);
                history.appendChild(listItem);

                listItem.addEventListener("click", function (event) {
                    event.preventDefault();
                    var buttonPressed = event.target;
                    var buttonText = buttonPressed.textContent
                    ////
                    ////
                    //This is what connects to the dynamic buttons
                    console.log(buttonText);
                    recipeSearch(buttonText);
                    videoSearch(YoutubeAPIKEY, buttonText, 5);


                    // console.log(event.target.textContent);

                })


            })


        } else {
    

        if (save !== "") {
            foodSearches.push(save);
            localStorage.setItem("foodSearches", JSON.stringify(foodSearches));
            var history = document.getElementById("search-history");
            history.innerHTML = "";
            foodSearches.forEach(function (searchTerm) {


                // console.log(searchTerm);
                var listItem = document.createElement("button");

                //Added button stuff
                listItem.className = "button is-primary mb-1 align"
                console.log(listItem.className)

                listItem.textContent = searchTerm;
                listItem.setAttribute("value", searchTerm);
                history.appendChild(listItem);

                listItem.addEventListener("click", function (event) {
                    event.preventDefault();
                    var buttonPressed = event.target;
                    var buttonText = buttonPressed.textContent
                    ////
                    ////
                    //This is what connects to the dynamic buttons
                    console.log(buttonText);
                    recipeSearch(buttonText);
                    videoSearch(YoutubeAPIKEY, buttonText, 5);


                    // console.log(event.target.textContent);

                })


            })




        }
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