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

// function vaildateInput() {

//     var meal = $("#q").val();

//     if (meal.length == 0) {

//     } else {
//         searchMeal(meal);
//     }
// }

// function searchMeal(q) {

//     var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + q;
//     $("#")
//     var content = $("#");
// }

$(document).ready(function () {

    var recipe = ""


    $("#food-search").submit(function (event) {

        document.querySelector("#recipes").innerHTML = "";

        event.preventDefault();
        console.log("form is submitted");

        var search = $("#q").val()


        //Removed API Key and 5
        recipeSearch(search);

    })
    //took out maxResults and key because I did not see that option but for steak there are only two results
    function recipeSearch(search) {
        //took out maxResults
        $.get("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search, function (data) {
            console.log(data)
            if (data.meals) {
                for (var result of data.meals) {
                    var ingredients = "";
    
                    var h3El = document.createElement("h3");
                    h3El.textContent = result.strMeal;

                    var imgEl = document.createElement("img");
                    imgEl.src = result.strMealThumb;
    
                    var pEl = document.createElement("p");
                    pEl.textContent = result.strInstructions;
                    console.log(result.s);
    
                    $("#recipes").append(h3El,pEl,imgEl);
                }

            } else {
                console.log("no results");
            }

           


                
            
           

            //This isnt working
        })
    }

})
// function recipeSearch(search) {
//     //took out maxResults
//     let queryURL = "https://www.themealdb.com/api/json/v11/search.php?s=" + search;
//     axios.get(queryURL)
//         .then(function (response) {
//             console.log(recipeSearch);
//         })
// }




// if (searchBoxValue != "") {
//     weatherContainer.innerHTML = " ";
//     init(searchBoxValue);

//     search = " ";
