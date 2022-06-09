// https://www.googleapis.com/youtube/v3/search YOUTUBE API
// https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCtctob-kkfgeC-tLfL8Yz5KCWNvkjXObA&type=video&q=drake
// https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

// global variable with youtube api key
var YoutubeAPIKEY = "AIzaSyCtctob-kkfgeC-tLfL8Yz5KCWNvkjXObA";

// functions to grab ingredients 
function getIngredients(meal) {
    return (
        Object.keys(meal)
            .filter(key => key.includes('Ingredient'))
            .map(ingredient => meal[ingredient])
            .filter(ingredient => ingredient)
    )
};

//function to grab measurements 
function getMeasurements(meal) {
    return (
        Object.keys(meal)
            .filter(key => key.includes('Measure'))
            .map(measurement => meal[measurement])
            .filter(measurement => measurement)
    )
};

// ready function to initialize the app when user clicks submit grabs the query 
$(document).ready(function () {

    var YoutubeAPIKEY = "AIzaSyCtctob-kkfgeC-tLfL8Yz5KCWNvkjXObA";

    var video = ""

    $("#food-search").submit(function (event) {
        event.preventDefault();
        document.querySelector("#videos").innerHTML = ""; // clears search results for each search

        var search = $("#q").val() // grabs value from the q input field 

        videoSearch(YoutubeAPIKEY, search, 5);
    });

// function using jquery .get to hit google api for youtoube video search and embed 5 videos in the #videos container
    function videoSearch(key, search, maxResults) {
        document.querySelector("#videos").innerHTML = "";
        $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function (data) {

            data.items.forEach(item => {
                video = `
                
                <iframe width="420" height="315" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                
                `

                $('#videos').append(video);
            });
        })


    };

    // function selecting the food search form and passing it the value of q calling recipeSearch function
    $("#food-search").submit(function (event) {
        document.querySelector("#recipes").innerHTML = "";
        event.preventDefault();
        var search = $("#q").val()
        recipeSearch(search);

    })

// jquery get request hitting themealdb api for our recipes assinging multiple pieces of data from the api array 
    function recipeSearch(search) {
        document.querySelector("#recipes").innerHTML = "";
        $.get("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search, function (data) {
            if (data.meals) {
                
                for (var meal of data.meals) { // for loop for each meal creating the elements and amending them to the page

                    var h2El = document.createElement("h2");
                    h2El.textContent = meal.strMeal;

                    var imgEl = document.createElement("img");
                    imgEl.src = meal.strMealThumb;

                    var pEl = document.createElement("p");
                    pEl.textContent = meal.strInstructions;

                    var ulEl = document.createElement("ul");

                    var ingredients = getIngredients(meal);  // calling get ingredients function
                    var measurements = getMeasurements(meal); // callling get measurements function

                    for (let i = 0; i < ingredients.length; i++) {
                        var liEl = document.createElement("li");
                        liEl.textContent = ingredients[i] + " - " + measurements[i]; // appending the measurements and ingredients with a for loop. thanks for the help Anthony!
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
    
    // function to save description to a corresponding food to local storage.
    saveBtn.on('click', function saveSearch (event) {
        event.preventDefault();
        var save = $("#q").val().trim();
        if (foodSearches.includes(save)){
            var history = document.getElementById("search-history");
            history.innerHTML = "";
            foodSearches.forEach(function (searchTerm) {

                var listItem = document.createElement("button");

                listItem.className = "button is-primary mb-1 align"
                listItem.textContent = searchTerm;
                listItem.setAttribute("value", searchTerm);
                history.appendChild(listItem);

                listItem.addEventListener("click", function (event) {
                    event.preventDefault();
                    var buttonPressed = event.target;
                    var buttonText = buttonPressed.textContent
                    
                    recipeSearch(buttonText);
                    videoSearch(YoutubeAPIKEY, buttonText, 5);

                })

            })

        } else {
    
        if (save !== "") {
            foodSearches.push(save);
            localStorage.setItem("foodSearches", JSON.stringify(foodSearches));
            var history = document.getElementById("search-history");
            history.innerHTML = "";
            foodSearches.forEach(function (searchTerm) {

                var listItem = document.createElement("button");

                listItem.className = "button is-primary mb-1 align"

                listItem.textContent = searchTerm;
                listItem.setAttribute("value", searchTerm);
                history.appendChild(listItem);

                listItem.addEventListener("click", function (event) {
                    event.preventDefault();
                    var buttonPressed = event.target;
                    var buttonText = buttonPressed.textContent
                    
                    recipeSearch(buttonText);
                    videoSearch(YoutubeAPIKEY, buttonText, 5);

                })
            })
        }
    }

    });

//display save btn after search is started
    function saveBtnAppear() {
        var saveBtn = document.getElementById('saveBtn');
        saveBtn.classList.remove('is-hidden');
    }
// hide the logo after search is started
    function hideLogo() {
        var logo = document.getElementById("logo");
        logo.classList.add("is-hidden");
    }

    function fixFooter() {
        document.getElementById("stayB").style.bottom = "auto";
    }

//event listeners to call functions above when search button is clicked 
    document.getElementById("searchBtn").addEventListener("click", saveBtnAppear);
    document.getElementById("searchBtn").addEventListener("click", hideLogo);
    document.getElementById("searchBtn").addEventListener("click", fixFooter);
});