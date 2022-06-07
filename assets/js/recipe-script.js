// https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
// /images/media/meals/llcbn01574260722.jpg/preview

function getIngredients(meal) {
    return (
        Object.keys(meal)
            .filter(key => key.includes('Ingredient'))
            .map(ingredient => meal[ingredient])
            .filter(ingredient => ingredient)
    )

}

function getMeasurements(meal) {
    return (
        Object.keys(meal)
            .filter(key => key.includes('Measure'))
            .map(measurement => meal[measurement])
            .filter(measurement => measurement)
    )

}

$(document).ready(function () {

    $("#food-search").submit(function (event) {

        document.querySelector("#recipes").innerHTML = "";
        event.preventDefault();
        var search = $("#q").val()
        recipeSearch(search);


    })
    function recipeSearch(search) {
        $.get("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search, function (data) {
            console.log(data);
            if (data.meals) {
                for (var meal of data.meals) {

                    
                    var h2El = document.createElement("h2");
                    h2El.textContent = meal.strMeal;
                    
                    var imgEl = document.createElement("img");
                    imgEl.src = meal.strMealThumb;
                    
                    var pEl = document.createElement("p");
                    pEl.textContent = meal.strInstructions;
                    
                    var ulEl = document.createElement("ul");
                    
                    //This with the index will replace how we are looping below.  
                    var ingredients = getIngredients(meal);
                    var measurements = getMeasurements(meal);

                    for (let i = 0; i < ingredients.length; i++) {
                        var liEl = document.createElement("li");
                        liEl.textContent =  ingredients[i] + " - " + measurements[i];
                        ulEl.appendChild(liEl);
                    }
                    
                    $("#recipes").append(h2El, pEl, imgEl, ulEl);
                    
                }
            }

        })
    }
})

