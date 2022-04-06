// var disPlaySearch = 
var fetchButton = document.getElementById("fetchBtn")
var recipeObj = {
    cuisineType	: "American",
    cuisineType	: "Asian",
    cuisineType	: "Indian",
    cuisineType	: "Italian",
    cuisineType	: "Japanese",
    mealType : "Breakfast",
    mealType	: "Lunch",
    mealType	: "Dinner",
    mealType	: "Snack",
    

}

function getRecipe() {
    // TODO: Need to concatinate form result(s) variable into the apiURL variable to complete the search
    var apiUrl = "https://api.edamam.com/search?app_id=d1e52e14&app_key=cd5289aff6cb193787a2baa6b251ec23&q=)" +

    fetch(apiUrl)
        .then(function (response) {
            // console.log(response);
            return response.json();
    //         // if (response) {
        })    
    //         //     response.json()
         .then(function (data) {
             console.log(data);
             document.querySelector("#content").innerHTML=`
             

                    })
            //  displayPlaySearch(data, city);
    //         //         });
    //         // } else {
    //         //     alert('Error: ' + response.statusText);
    //         // }
    //     })
   
}
        fetchButton.addEventListener('click', getRecipe);

        // creates a card for the api data
        // function displayRecipe(data)
        // var 
        // TODO:    
        //    

       
