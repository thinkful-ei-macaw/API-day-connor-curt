'use strict';

// put your own value below!
const apiKey = 'VwVN4mFrPldRVqE9l6anxsbcDWWybWMT2U9Wx2q4'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks?parkCode=';

// curl -H 'X-Api-Key: VwVN4mFrPldRVqE9l6anxsbcDWWybWMT2U9Wx2q4' 'https://developer.nps.gov/api/v1/parks?parkCode=acad'
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.items.length; i++){
    // for each park object in the items 
    //array, add a list item to the results 
    //list with the park name, description,
    //and url
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].name}</h3>
      <p>${responseJson.data[i].description}</p>
      <img src='${responseJson.data[i].url}'>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNatlParks(query, maxResults=10) {
  const params = {
    stateCode: query,
    limit: maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url,{headers: {'X-Api-Key': 'VwVN4mFrPldRVqE9l6anxsbcDWWybWMT2U9Wx2q4'}})
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getNatlParks(searchTerm, maxResults);
  });
}

$(watchForm);