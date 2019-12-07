$(function() {
    $('input[type="text"]').focus();

    var inputPlaceholder = ["Dog", "Cat", "Bird", "Snake", "Turtle", "Hamster"];
    setInterval(function() {
        $("input[type='text']").attr("placeholder", inputPlaceholder[inputPlaceholder.push(inputPlaceholder.shift())-1]);
    }, 3000);
})

var key="OsktMS2zlvj2EkLt90UkTiTgUJdAdbO6SZvSHxW1hDHQp2er1t";
var secret="MKsIqvvUXPSACsQhlB8RPh0t9BqRVa3XVdsTa6Wq";

const animal = document.querySelector('#petSearch').value;

fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: "POST",
    body: "grant_type=client_credentials&client_id=" + key + "&client_secret=" + secret,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
}).then(function(resp) {
    return resp.json();
}).then(function(data) {
    console.log('token', data);

return fetch(`https://api.petfinder.com/v2/animals?${animal}`, {
     headers: {
        'Authorization': data.token_type + ' ' + data.access_token,
        'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

}).then(function(resp) {
    return resp.json();

}).then(response => {
    console.log(response);
    let buildHTML = "";
    for (let i = 0; i < response.data; i++) {
        buildHTML += `<h2>${response.data[i].fullName}</h2>`;
        buildHTML += `<p><a href="${response.data[i].url}" target="_blank">Visit Website</a></p>`;
        buildHTML += `<p><em>${response.data[i].description}</em></p>`;
    }
    document.querySelector("#rescue").innerHTML = buildHTML;
});

document.querySelector("#submit").addEventListener("click", (e) => {
    e.preventDefault();
})
