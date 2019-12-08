var key="OsktMS2zlvj2EkLt90UkTiTgUJdAdbO6SZvSHxW1hDHQp2er1t";
var secret="MKsIqvvUXPSACsQhlB8RPh0t9BqRVa3XVdsTa6Wq";

fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: "POST",
    body: "grant_type=client_credentials&client_id=" + key + "&client_secret=" + secret,
       headers: {
           "Content-Type": "application/x-www-form-urlencoded"
        }
}).then(function(resp) {
    return resp.json();
}).then(function(data) {
    console.log('token', data)})
