// https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
// /images/media/meals/llcbn01574260722.jpg/preview

$(document).ready(function () {

    $("#food-search").submit(function (event) {

        document.querySelector("#recipes").innerHTML = "";
        event.preventDefault();
        var search = $("#q").val()
        recipeSearch(search);

    })
    function recipeSearch(search) {
        $.get("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search, function (data) {
            if (data.meals) {
                for (var meal of data.meals) {

                    var combinedMeasAndIng = [];
                    var amountOfIngredients = 20;


                    for (let i = 0; i < amountOfIngredients; i++) {
                        const measurement = meal[`strMeasure${i + 1}`]
                        const ingredient = meal[`strIngredient${i + 1}`]
                        const results = [];
                        combinedMeasAndIng.push(`${measurement}` + " : " + `${ingredient}`);

                        //Get this to work
                        combinedMeasAndIng.forEach(element => {

                            if (element !== "" || element !== null) {
                                results.push(element);
                            }
                        });

                        console.log(results);

                    }
                    for (var meal of data.meals) {

                        var h2El = document.createElement("h2");
                        h2El.textContent = meal.strMeal;

                        var imgEl = document.createElement("img");
                        imgEl.src = meal.strMealThumb;

                        var pEl = document.createElement("p");
                        pEl.textContent = meal.strInstructions;

                        var ulEl = document.createElement("ul");
                        combinedMeasAndIng.forEach(element => {
                            var liEl = document.createElement("li")
                            liEl.textContent = element;
                            ulEl.append(liEl);

                        });

                        $("#recipes").append(h2El, pEl, imgEl, ulEl);
                    }

                }
            }

        })
    }
})

