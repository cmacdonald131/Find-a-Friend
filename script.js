'use strict';

//retrieves token for authorization and sends fetch request with user input//

function fetchAnimals(animal, zip, gender) {
  console.log(token);
  fetch(`https://api.petfinder.com/v2/animals?type=${animal}&location=${zip}&gender=${gender}&status=adoptable&distance=25`, {
    headers: {
      Authorization: `Bearer ${token.access_token}`
    }
  })
    .then(response => response.json())
    .then(responseJson => showAnimals(responseJson))
    .catch(error => showError(error.message));
}

//displays data retrieved from the API as JSON and then renders it into the HTML//

function showAnimals(responseJson) {
  console.log(responseJson);
  if(!responseJson.animals) {
    showError("Something went wrong with your search.  Please try again.");
    return
  }
  if(responseJson.animals.length == 0) {
    showError("Sorry, there were no results for your search.  Please try again.");
    return
  }

//displays data returned from JSON in the HTML//

  $('#results ul').html('');
  for(let i=0; i<responseJson.animals.length; i++) {
    for(let p=0; p<responseJson.animals[i].photos.length; p++) {
     $('#results ul').append(`<li>
     <h3>${responseJson.animals[i].name}</h3>
     <img src="${responseJson.animals[i].photos[p].small}" alt="animals" class="petImg">
     <p>${responseJson.animals[i].breeds.primary} (${responseJson.animals[i].age}) (${responseJson.animals[i].size})</p>
     <a href="${responseJson.animals[i].url}" class="animalLink" target="_blank">Find out more about me!</a>
     
     </li>`);
 }
}  

}

function showError(message) {
  $('#results ul').html('');
  $('#results ul').append(`<li>${message}</li>`);
  console.log(message);
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const animal = $('#petSearch').val();
    const zip = $('#zip').val();
    const gender = $('#gender').val();
    fetchAnimals(animal, zip, gender);
  });
}

$(function () {
  console.log('Good to go!  Waiting to see some pets!');
  watchForm();
})
