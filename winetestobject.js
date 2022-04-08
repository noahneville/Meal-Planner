{
    pairedWines: ["merlot", "cabernet sauvignon","pinot noir"],
    pairingText: "Merlot, Cabernet Sauvignon, and Pinot Noir are my top picks for Beef. Beef and red wine are a classic combination. Generally, leaner cuts of beef go well with light or medium-bodied reds, such as pinot noir or merlot, while fattier cuts can handle a bold red, such as cabernet sauvingnon. One wine you could try is Maddalena Merlot. It has 4.8 out of 5 stars and a bottle costs about 19 dollars.",
    productMatches: [
        {
            "id": 491394,
            "title": "Maddalena Merlot",
            "description": "Maddalena Merlot offers aromas of ripe fruit and oak spice with hints of vanilla and anise. Ripe fruit flavors include bright plum and raspberry. Fruit flavors greet the palate and soft tannins frame the fresh texture that coats the mouth.",
            "price": "$18.99",
            "imageUrl": "https://spoonacular.com/productImages/491394-312x231.jpg",
            "averageRating": 0.96,
            "ratingCount": 8,
            "score": 0.9199999999999999,
            "link": "https://click.linksynergy.com/deeplink?id=*QCiIS6t4gA&mid=2025&murl=https%3A%2F%2Fwww.wine.com%2Fproduct%2Fmaddalena-merlot-2016%2F604022"
        }
    ]
}

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