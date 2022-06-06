// https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
// /images/media/meals/llcbn01574260722.jpg/preview


$(document).ready(function () {

    var recipe = ""


    $("#food-search").submit(function (event) {

        document.querySelector("#recipes").innerHTML = "";

        event.preventDefault();
        console.log("form is submitted");

        var search = $("#q").val()


        recipeSearch(search);

    })
    function recipeSearch(search) {
        $.get("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search, function (data) {
            console.log(data)
            if (data.meals) {
                for (var result of data.meals) {
                    var ingredients = [result.strMeasure1, result.strIngredient1, result.strMeasure2, result.strIngredient2, result.strMeasure3, result.strIngredient3, result.strMeasure4, result.strIngredient4];

                    var h2El = document.createElement("h2");
                    h2El.textContent = result.strMeal;

                    var imgEl = document.createElement("img");
                    imgEl.src = result.strMealThumb;

                    var pEl = document.createElement("p");
                    pEl.textContent = result.strInstructions;

                    var ulEl = document.createElement("ul");
                    ulEl.textContent = ingredients;

                    $("#recipes").append(h2El, pEl, imgEl, ulEl);
                }

            } else {
                console.log("no results");
            }

        })
    }

})