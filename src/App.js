// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [memes, setMemes] = useState([]); // Store memes
  const [searchTerm, setSearchTerm] = useState(''); // Track user input
  const [loading, setLoading] = useState(false); // Show loader

  const API_KEY = 'poT12wi2T82fObyzhBdgJDMW0iSAHCyS'; // Replace with your GIPHY API key

  // Fetch trending memes when the component loads
  useEffect(() => {
    fetchTrendingMemes();
  }, []);

  const fetchTrendingMemes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=10`
      );
      setMemes(response.data.data);
    } catch (error) {
      console.error('Error fetching trending memes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=10`
      );
      setMemes(response.data.data);
    } catch (error) {
      console.error('Error fetching searched memes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Meme Search App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for memes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading memes...</p>
      ) : (
        <div className="meme-grid">
          {memes.map((meme) => (
            <div key={meme.id} className="meme-item">
              <img src={meme.images.fixed_height.url} alt={meme.title} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
