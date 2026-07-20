import React, { useState, useEffect } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: 'center' }}>Yuklanmoqda...</h2>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Postlar Ro'yxati</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {posts.map((post) => (
          <div key={post.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ textTransform: 'capitalize', color: '#333' }}>{post.id}. {post.title}</h3>
            <p style={{ color: '#666', lineHeight: '1.5' }}>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;