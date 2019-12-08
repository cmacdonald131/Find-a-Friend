var key="OsktMS2zlvj2EkLt90UkTiTgUJdAdbO6SZvSHxW1hDHQp2er1t";
var secret="MKsIqvvUXPSACsQhlB8RPh0t9BqRVa3XVdsTa6Wq";

const petForm = document.querySelector('#pet-form');

const animal = document.querySelector('#petSearch').value;
const zip = document.querySelector('#zip').value;


petForm.addEventListener('submit', fetchAnimals);

function fetchAnimals(e) {
    e.preventDefault();  

    fetch(
    `https://api.petfinder.com/pet.find?format=json&key=OsktMS2zlvj2EkLt90UkTiTgUJdAdbO6SZvSHxW1hDHQp2er1t&animal=${animal}&location=${zip}&callback=callback`,
    {
      jsonpCallbackFunction: 'callback'
    }
  )
    .then(res => res.json())
    .then(data => showAnimals(data.petfinder.pets.pet))
    .catch(error => console.log(error));
}

function callback(data) {
    console.log(data);
}

function showAnimals(pets) {
  const results = document.querySelector('#results');
  
  results.innerHTML = '';
  
  pets.forEach(pet => {
    console.log(pet);
    const div = document.createElement('div');
    div.classList.add('card', 'card-body', 'mb-3');
    div.innerHTML = `
      <div class="row">
        <div class="col-sm-6">
          <h4>${pet.name.$t} (${pet.age.$t})</h4>
          <p class="text-secondary">${pet.breeds.breed.$t}</p>
          <p>${pet.contact.address1.$t} ${pet.contact.city.$t} ${
      pet.contact.state.$t
    } ${pet.contact.zip.$t}</p>
          <ul class="list-group">
            <li class="list-group-item">Phone: ${pet.contact.phone.$t}</li>
            ${
              pet.contact.email.$t
                ? `<li class="list-group-item">Email: ${
                    pet.contact.email.$t
                  }</li>`
                : ``
            }
            <li class="list-group-item">Shelter ID: ${pet.shelterId.$t}</li>
          </ul>
        </div>
        <div class="col-sm-6 text-center">
          <img class="img-fluid rounded-circle mt-2" src="${
            pet.media.photos.photo[3].$t
          }">
        </div>
      </div>
    `;

    results.appendChild(div);
  });
}
