// edamame API Key = e3392508937db340d33eeafb12c22cae
// app ID = f4e73b88
// https://api.edamam.com/api/recipes/v2?type=public&q=steak&app_id=f4e73b88&app_key=e3392508937db340d33eeafb12c22cae

//edamame returned CORS restriction.  SO....

//THE MEAL DB
// API Methods using the developer test key '1' as the API key
//Search by meal name
// https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

//image of meal
// Meal Thumbnail Images
// Add /preview to the end of the meal image URL
// /images/media/meals/llcbn01574260722.jpg/preview


$(document).ready(function () {

    // var recipe = ""


    $("#artist-search").submit(function (event) {

        var searchBoxValue = $("artist-search")
        var videos = $("videos");
        var recipe = $("recipes");

        event.preventDefault();
        console.log("form is submitted");
        console.log(searchBoxValue);

        var search = $("#q").val()

        // Clear!! Doesnt work
        if (searchBoxValue != " ") {
            videos = " ";
            recipe = " ";
        }

        //Removed API Key and 5
        recipeSearch(search);

    })
    //took out maxResults and key because I did not see that option but for steak there are only two results
    function recipeSearch(search) {
        //took out maxResults
        $.get("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search, function (data) {
            console.log(data.meals);

            //This isnt working
            $("#recipe").append(data.meals);
        })
    }

})

// if (searchBoxValue != "") {
//     weatherContainer.innerHTML = " ";
//     init(searchBoxValue);

//     search = " ";
