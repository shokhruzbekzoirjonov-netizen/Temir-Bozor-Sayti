import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(response => {
        setAlbums(response.data.slice(0, 15));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const AddAlbum = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    axios.post('https://jsonplaceholder.typicode.com/albums', {
      title: title,
      userId: 1
    })
    .then(response => {
      setAlbums([response.data, ...albums]);
      setTitle('');
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', fontFamily: 'sans-serif' }}>
      <h2>Albums</h2>
      
      <form onSubmit={AddAlbum} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Album title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            flex: 1,
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            outline: 'none'
          }}
        />
        <button 
          type="submit" 
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Add Album
        </button>
      </form>

      <ol style={{ paddingLeft: '20px', lineHeight: '2' }}>
        {albums.map((album) => (
          <li key={album.id}>
            {album.title}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Albums;