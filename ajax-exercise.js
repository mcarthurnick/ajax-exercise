import axios from 'axios';

// PART 1: Show Dog Photo

function showDogPhoto(evt) {
  axios.get('https://dog.ceo/api/breeds/image/random')
  .then((response) => {
    const dogImageUrl = response.data.message;
    document.getElementById('dog-image').innerHTML = 
    `
      <img src="${dogImageUrl}" />
     `
  })
  // TODO: get a random photo from the Dog API and show it in the #dog-image div
}

document.querySelector('#get-dog-image').addEventListener('click', showDogPhoto);

// PART 2: Show Weather

function showWeather(evt) {
  const zipcode = document.querySelector('#zipcode-field').value;
  axios.get(`/weather.txt?zipcode=${zipcode}`)
  .then((response) => {
    document.getElementById('weather-info').innerHTML = 
    `
    <p>${response.data}</p>
    `
  })
  .catch((error) => {
    console.log('error', error)
  })
  // TODO: request weather with that URL and show the forecast in #weather-info
}

document.querySelector('#weather-button').addEventListener('click', showWeather);

// PART 3: Order Cookies

function orderCookies(evt) {
  evt.preventDefault();
  const quantity = document.getElementById('qty-field').value;
  const type = document.getElementById('cookie-type-field').value;

  let cookieBody = {
    cookieType: type,
    qty: quantity
} 
  axios.post('/order-cookies.json', cookieBody)
  .then((response) => {
      if(response.data.resultCode === "ERROR"){
        document.getElementById('order-status').innerHTML =  
        `
        <p class="order-error">${response.data.message}</p>
        `
      } else {
        document.getElementById('order-status').innerHTML = response.data.message
      }
  })
  .catch((error) => {
    console.log('error', error)
    document.getElementById('order-status').classList.add("order-error")
  })
  // TODO: Need to preventDefault here, because we're listening for a submit event!
  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector('#order-form').addEventListener('submit', orderCookies);

// PART 4: iTunes Search

function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;
  const formData = {'term': searchTerm};
  const queryString = new URLSearchParams(formData).toString();
  const url = `https://itunes.apple.com/search?${queryString}`;

  axios.get(url)
  .then((response) => {
    let artistName = '';
    let trackName = '';

    for(let i = 0; i < response.data.resultCount; i++){
      artistName = response.data.results[i].artistName
      trackName = response.data.results[i].trackName

      let itunesNameUl = document.getElementById('itunes-results')
      let newListItem = document.createElement('li')
      newListItem.innerHTML = `
      <li>Artist: ${artistName} Track:${trackName} </li>
      `
      itunesNameUl.appendChild(newListItem)

    }
  })


  // TODO: In the #itunes-results list, show all results in the following format:
  // `Artist: ${artistName} Song: ${trackName}`
}
document.querySelector('#itunes-search-form').addEventListener('submit', iTunesSearch);
