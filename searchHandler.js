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

      const tracks = searchResults.tracks;
      console.log(tracks);

      tracks.forEach((track) => {
        if (!track) return;
        const data = track.data;
        const name = data.name;

        var list_item = document.createElement('li');
        list_item.innerHTML = name;
        list_item.setAttribute('onclick', `changeInputTo('${name}')`); // Fix: Set onclick attribute using setAttribute method
        console.log(list_item);
        searchResultsContainer.appendChild(list_item);
      });
    } catch (error) {
      console.error('Error searching: ', error);
    }
  }
}

export { searchHandler };
