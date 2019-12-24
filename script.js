'use strict';

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

  $('#results ul').html('');
  for(let i=0; i<responseJson.animals.length; i++) {
     $('#results ul').append(`<li>
     <h3>${responseJson.animals[i].name}</h3>
     
     <p>${responseJson.animals[i].breeds.primary} (${responseJson.animals[i].age}) (${responseJson.animals[i].size})</p>
     <a href="${responseJson.animals[i].url}" class="animalLink" target="_blank">Check Me Out</a>
     </li>`);
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
