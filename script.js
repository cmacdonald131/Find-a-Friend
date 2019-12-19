'use strict';


let animal = $('#petSearch').val();

let zip = $('#zip').val();



function fetchAnimals() {
    fetch(`https://api.petfinder.com/v2/animals?type=${animal}&location=${zip}&page=2`, {headers: {
      Accept: 'application/json'},
        credentials: 'same-origin',
        Authorization: `Token ${token}`})
    .then(response => response.json())
    .then(responseJson => showAnimals(responseJson))
    .catch(error => alert("It's not working"));
}

function showAnimals(responseJson) {
  console.log(responseJson);

  $('#results').html("<h2>Let's check out your new pet!</h2>");
  responseJson.message.forEach(renderedData => {
    $('#results').append(
      `<div class="row">
        <h4>${type}</h4>
        <p>${breeds}</p>
        <p>${url}</p>`)
  });
}
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    fetchAnimals(animal, zip);
    });
}

$(function() {
  console.log('Good to go!  Waiting to see some pets!');
  watchForm();
  })
