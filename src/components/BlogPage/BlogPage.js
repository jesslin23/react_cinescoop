import React, { useState, useEffect } from 'react';
import './BlogPage.css';
import { Element } from 'react-scroll';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', genre: '', image: null });
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setBlogs(storedBlogs);
    setWatchlist(storedWatchlist);
  }, []);

  useEffect(() => {
    if (blogs.length > 0) {
      localStorage.setItem('blogs', JSON.stringify(blogs));
    }
  }, [blogs]);

  useEffect(() => {
    if (watchlist.length > 0) {
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
  }, [watchlist]);

  const addBlog = () => {
    if (newBlog.title && newBlog.content && newBlog.genre && newBlog.image) {
      const updatedBlogs = [...blogs, newBlog];
      setBlogs(updatedBlogs);
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));  // Save to localStorage
      setNewBlog({ title: '', content: '', genre: '', image: null });
    }
  };

  const addToWatchlist = (blog) => {
    if (!watchlist.includes(blog)) {
      const updatedWatchlist = [...watchlist, blog];
      setWatchlist(updatedWatchlist);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));  // Save to localStorage
    }
  };

  const removeFromWatchlist = (blog) => {
    const updatedWatchlist = watchlist.filter((item) => item !== blog);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));  // Save to localStorage
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBlog({ ...newBlog, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Element className='blog' id='Blog'>
      <div className='blog'>
        <h1>Blogs</h1>
        <div className="blogPage">
          <div className="blogList">
            <h2>View Blogs</h2>
            {blogs.length === 0 ? (
              <p>No blogs available</p>
            ) : (
              blogs.map((blog, index) => (
                <div key={index} className="blogItem">
                  {blog.image && <img src={blog.image} alt={blog.title} width="100" />}
                  <h3>{blog.title}</h3>
                  <p>{blog.content}</p>
                  <p><strong>Genre:</strong> {blog.genre}</p>
                  <button className="addToWatchlistBtn" onClick={() => addToWatchlist(blog)}>+ Watchlist</button>
                </div>
              ))
            )}
          </div>

          <div className="addBlogSection">
            <h2>Add a Blog</h2>
            <input
              type="text"
              placeholder="Title"
              value={newBlog.title}
              onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            />
            <textarea
              placeholder="Content"
              value={newBlog.content}
              onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
            ></textarea>
            <input
              type="text"
              placeholder="Genre"
              value={newBlog.genre}
              onChange={(e) => setNewBlog({ ...newBlog, genre: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <button onClick={addBlog}>Add Blog</button>
          </div>
        </div>

        <div className="watchlisttitle">
          <h2>Watchlist</h2>
          </div>
          <div className='watchlist'>
          {watchlist.length === 0 ? (
            <p>No blogs in the watchlist</p>
          ) : (
            watchlist.map((blog, index) => (
              <div key={index} className="watchlistItem">
                {blog.image && <img src={blog.image} alt={blog.title} width="100" />}
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <p><strong>Genre:</strong> {blog.genre}</p>
                <button className="removeFromWatchlistBtn" onClick={() => removeFromWatchlist(blog)}>Remove</button>
              </div>
            ))
          )}
        </div>
      </div>
    </Element>
  );
};

export default BlogPage;
