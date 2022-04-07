function getWineParingAPI (foodId) {
  // fetch request gets a list of all the repos for the node.js organization
var requestUrl = 'https://api.spoonacular.com/food/wine/pairing?food=steak&apiKey=d2130512b2d04807b0aefd43f5d70f29';
// change this to: var requestUrl = 'https://api.spoonacular.com/food/wine/pairing?food=' + foodId + 
//  '&apiKey=d2130512b2d04807b0aefd43f5d70f29'; 
// and then test it of course
  console.log(requestUrl);
fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.pairedWines);
    var suggestedWine = data;
    console.log(suggestedWine);
    return suggestedWine;

  })
}

getWineParingAPI();

var fetchButton = document.getElementById("fetch3");
fetchButton.addEventListener('click', getWineParingAPI); 