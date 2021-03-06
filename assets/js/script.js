function getWineParingAPI(foodObject) {
  var foodId = foodObject.protein;
//  The foodId variable is the protein that the user selected and is inserted in the call request from the API spoonacular.
var requestUrl = 'https://api.spoonacular.com/food/wine/pairing?food=' + foodId + '&apiKey=9ba115ccffc8427f9c17e1ce8f1010b0'; 
fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
// Entire data object from the API search of wines given the selected protein is put into suggestedWine variable.
    var suggestedWine = data;
    if (suggestedWine.pairingText === "") {
      const wineSubtitle = document.querySelector(".wine-subtitle");
      wineSubtitle.textContent = "You need something stronger than wine for this recipe!";  
    } else {
      const wineGridEl = document.querySelector("#wine-grid");
      wineGridEl.innerHTML = "";
      displayWines(suggestedWine);
      return suggestedWine;
    }
  })
}

function getMealAPI(recipeID) {
  var cuisineID = recipeID.cuisine;
  var proteinID = recipeID.protein;
  var restrictionID = recipeID.restriction;
  let apiURL ="https://api.edamam.com/api/recipes/v2?type=public&q=" + proteinID + "&app_id=d1e52e14&app_key=cd5289aff6cb193787a2baa6b251ec23&health=" + restrictionID + "&cuisineType=" + cuisineID;

  console.log(apiURL);
  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    // After API response is converted into JavaScript readable information, recipe is created as an object. 
    .then(function (data) {

      var recipe = data;
    
    if (!cuisineID || !proteinID){
      window.confirm("Select at least cuisine and protein");
      } else{
        const recipeGridEl = document.querySelector("#recipe-grid");
        recipeGridEl.innerHTML = "";
        displayRecipes(recipe);
        return(recipe);
      }
    });
  }

async function displayRecipes(Obj) {
 
  const recipeSubtitle = document.querySelector(".recipe-subtitle");
  recipeSubtitle.textContent = "Recipes Found:";

  // this loops through the object we receive from the get meal API 3 times to create 3 recipes. These variables pull relevant data from that object.
  for (var i = 0; i < 3; i++) {
    var foodName = Obj.hits[i].recipe.label;
    var imgURL = Obj.hits[i].recipe.images.SMALL.url;
    var servings = Obj.hits[i].recipe.yield;
    var totalCal = Obj.hits[i].recipe.calories;
    var calories = Math.round(totalCal / servings);
    var fat = Obj.hits[i].recipe.digest[0].total.toFixed(1);
    var carbs = Obj.hits[i].recipe.digest[1].total.toFixed(1);
    var protein = Obj.hits[i].recipe.digest[2].total.toFixed(1);
    var ingredients = Obj.hits[i].recipe.ingredients;

    // use querySelector to generate HTML elements on the fly. 
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
    // servingsEl.classList.add("card");

    var caloriesEl = document.createElement("p");
    caloriesEl.textContent = calories + " Calories Per Serving";
    // caloriesEl.classList.add("card");

    var macrosEl = document.createElement("ul");
    // macrosEl.classList.add("card");

    var fatEl = document.createElement("li");
    fatEl.textContent = "Fat - " + fat + "g";
    var carbsEl = document.createElement("li");
    carbsEl.textContent = "Carbs - " + carbs + "g";
    var proteinEl = document.createElement("li");
    proteinEl.textContent = "Protein - " + protein + "g";

    // makes a list of macro nutrients from variables extracted from object earlier
    macrosEl.appendChild(fatEl);
    macrosEl.appendChild(carbsEl);
    macrosEl.appendChild(proteinEl);

    // a loop that adds ingredients to the list for however many ingredients a particular recipe has
    const ingredientsListEl = document.createElement("ul");
    ingredientsListEl.classList.add("card");
    for (var x = 0; x < ingredients.length; x++) {
      const ingredientsEl = document.createElement("li");
      ingredientsEl.textContent = ingredients[x].text;
      ingredientsListEl.appendChild(ingredientsEl);
    }

    // appends all created html to the recipe card, then appends that to the container and grid
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

async function displayWines(Obj) {
  
  let wineList = Obj.pairedWines;
  console.log(wineList);

  let wineText = Obj.pairingText;

  let wineImg = Obj.productMatches[0].imageUrl;

  let productName = Obj.productMatches[0].title;

  let productLink = Obj.productMatches[0].link;

  const wineSubtitle = document.querySelector(".wine-subtitle");
  wineSubtitle.textContent = "Wine Recommendation:";

  const wineGridEl = document.querySelector("#wine-grid");

  const wineContainerEl = document.createElement("div");
  wineContainerEl.classList.add("wine-container", "container");

  var wineCardEl = document.createElement("div");
  wineCardEl.setAttribute("class", "card");

  var wineImgEl = document.createElement("img");
  wineImgEl.setAttribute("src", wineImg);
  wineImgEl.setAttribute("alt", "Picture of wine label");
  wineImgEl.classList.add("card-img");

  var wineTextEl = document.createElement("p");
  wineTextEl.textContent = wineText;
  // wineTextEl.classList.add("card");

  var productNameEl = document.createElement("p");
  productNameEl.textContent = productName;
  // productNameEl.classList.add("card");

  var productLinkEl = document.createElement("a");
  productLinkEl.textContent = "Click to purchase " + productName;
  productLinkEl.setAttribute("href", productLink);
  productLinkEl.classList.add("btn", "btn-primary");

  const wineListEl = document.createElement("ul");
  // wineListEl.classList.add("card");
  for (var j = 0; j < wineList.length; j++) {
    const wineEl = document.createElement("li");
    console.log(wineList);
    wineEl.textContent = wineList[j];
    wineEl.classList.add("fs-3");
    wineListEl.appendChild(wineEl);
  }

  wineCardEl.appendChild(wineListEl);
  wineCardEl.appendChild(wineTextEl);
  wineCardEl.appendChild(wineImgEl);
  wineCardEl.appendChild(productNameEl);
  wineCardEl.appendChild(productLinkEl);

  wineContainerEl.appendChild(wineCardEl);
  wineGridEl.appendChild(wineContainerEl);
}



// User's selections are received from drop down menus (in index.html) and put into three respective "xxxChoice" variables 
var formSubmitHandler = function(event) {
  event.preventDefault();
  var cuisineElement = document.querySelector("#cuisineSelection");
  var proteinElement = document.querySelector("#proteinSelection");
  var restrictionElement = document.querySelector("#restrictionSelection");
  var cuisineChoice = cuisineElement.value;
  var proteinChoice = proteinElement.value;
  var restrictionChoice = restrictionElement.value;
  console.log(cuisineChoice);
  console.log(proteinChoice);
  console.log(restrictionChoice);
  var choiceObject = {
    cuisine: cuisineChoice,
    protein: proteinChoice,
    restriction: restrictionChoice,
  };

  getMealAPI(choiceObject);
  getWineParingAPI(choiceObject);
  // return choiceObject;
};

var submitBtn = document.querySelector("#submitButton");
submitBtn.onclick = formSubmitHandler;
