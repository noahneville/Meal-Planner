

// temporarily using this API call already written out so I can test my function without needing to wait for others to finish functions that do the actual api call
let apiURL = "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=d1e52e14&app_key=cd5289aff6cb193787a2baa6b251ec23&health=egg-free&cuisineType=American"

async function displayRecipes () {
    var tempURL = await fetch(apiURL);
    var Obj = await tempURL.json();
    console.log(Obj);
    const recipeSubtitle = document.querySelector(".recipe-subtitle");
    recipeSubtitle.textContent = "Recipes Found:";

    for (var i = 0; i < 3; i++){
        var foodName = Obj.hits[i].recipe.label;
        var imgURL = Obj.hits[i].recipe.images.SMALL.url;
        var servings = Obj.hits[i].recipe.yield;
        var totalCal = Obj.hits[i].recipe.calories;
        var calories = Math.round(totalCal / servings);
        var fat = Obj.hits[i].recipe.digest[0].total.toFixed(1);
        var carbs = Obj.hits[i].recipe.digest[1].total.toFixed(1);
        var protein = Obj.hits[i].recipe.digest[2].total.toFixed(1);
        var ingredients = Obj.hits[i].recipe.ingredients;

        const recipeGridEl = document.querySelector("#recipe-grid");

        const recipeContainerEl = document.createElement("div");
        recipeContainerEl.classList.add("recipe-container", "col");
        
        var recipeCardEl = document.createElement("div");
        recipeCardEl.setAttribute("class", "card");

        var foodNameEl = document.createElement("div");
        foodNameEl.textContent = foodName;
        foodNameEl.classList.add("card-header", "text-center");

        var foodImgEl = document.createElement("img");
        foodImgEl.setAttribute("src", imgURL);
        foodImgEl.setAttribute("alt", "Picture of prepared recipe");
        foodImgEl.classList.add("card-img-top");

        var servingsEl = document.createElement("p");
        servingsEl.textContent = servings + " Servings";
        servingsEl.classList.add("card");

        var caloriesEl = document.createElement("p");
        caloriesEl.textContent = calories + " Calories Per Serving";
        caloriesEl.classList.add("card")

        var macrosEl = document.createElement("ul");
        macrosEl.classList.add("card");

        var fatEl = document.createElement("li");
        fatEl.textContent = "Fat - " + fat +"g";
        var carbsEl = document.createElement("li");
        carbsEl.textContent = "Carbs - " + carbs +"g";
        var proteinEl = document.createElement("li");
        proteinEl.textContent = "Protein - " + protein +"g";

        macrosEl.appendChild(fatEl);
        macrosEl.appendChild(carbsEl);
        macrosEl.appendChild(proteinEl);

        const ingredientsListEl = document.createElement("ul");
        ingredientsListEl.classList.add("card");
        for (var x = 0; x < ingredients.length; x++) {
            const ingredientsEl = document.createElement("li");
            ingredientsEl.textContent = ingredients[x].text;
            ingredientsListEl.appendChild(ingredientsEl);
        }


        recipeCardEl.appendChild(foodNameEl);
        recipeCardEl.appendChild(foodImgEl);
        recipeCardEl.appendChild(servingsEl);
        recipeCardEl.appendChild(caloriesEl);
        recipeCardEl.appendChild(macrosEl);
        recipeCardEl.appendChild(ingredientsListEl);

        recipeContainerEl.appendChild(recipeCardEl); 
        recipeGridEl.appendChild(recipeContainerEl);
    }
}

window.onload = function () {
    displayRecipes();
};
