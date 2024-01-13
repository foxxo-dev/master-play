import { search } from './fetch-api.js';

async function searchHandler(musicNameInput, searchResultsContainer) {
  const inputValue = musicNameInput.value.trim();

  // Handle other input changes
  if (inputValue !== '') {
    try {
      const searchResults = await search(inputValue);

      console.log(searchResults);
      // Clear previous search results
      searchResultsContainer.innerHTML = '';

      if (searchResults && searchResults.tracks) {
        const tracks = searchResults.tracks;
        console.log(tracks);

        tracks.forEach((track) => {
          if (track && track.data) {
            const data = track.data;
            const name = data.name;

            var list_item = document.createElement('li');
            list_item.innerHTML = name;
            list_item.setAttribute('onclick', `changeInputTo('${name}')`);
            console.log(list_item);
            searchResultsContainer.appendChild(list_item);
          }
        });
      } else {
        console.error('No tracks found in the search results.');
      }
    } catch (error) {
      console.error('Error searching: ', error);
    }
  }
}

// Define the changeInputTo function
function changeInputTo(name) {
  // Implement the logic to change the input value
  console.log(`Changing input to: ${name}`);
}

export { searchHandler };
