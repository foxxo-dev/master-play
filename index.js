// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { searchHandler } from './searchHandler';
import { search } from './fetch-api';

console.log('Hello world');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA_tQZ9xzTXrXqRCgtnX-artCy9-cJoqxM',
  authDomain: 'musicas-45376.firebaseapp.com',
  projectId: 'musicas-45376',
  storageBucket: 'musicas-45376.appspot.com',
  messagingSenderId: '221087713786',
  appId: '1:221087713786:web:22c19f7633e4bb12d0bc43'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch data from the 'playlist' collection
const fetchData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'playlist'));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};

// Call fetchData to log existing data on page load
fetchData();

// Event listener for input change
const musicNameInput = document.getElementById('music-name');
const searchResultsContainer = document.getElementById('search-results');

musicNameInput.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();

    const inputValue = musicNameInput.value.trim();

    if (inputValue !== '') {
      try {
        // Add a new document to the 'playlist' collection
        const data = await search(inputValue);
        const song = data.tracks[0].data;
        const id = song.id;
        await addDoc(collection(db, 'playlist'), {
          name: inputValue,
          author: '-- Feature to be added in later development - This is a placeholder - Current update: v0.0.2 --',
          id
        });

        console.log(`Added: ${inputValue}`);
        // Fetch and log updated data after adding a new document
        fetchData();

        musicNameInput.value = '';
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  }
});

musicNameInput.addEventListener('input', async (e) => {
  await searchHandler(musicNameInput, searchResultsContainer);
});
