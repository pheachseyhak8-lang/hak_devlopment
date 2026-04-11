import React, { useState, useEffect } from 'react';
import './Review.css';

const ReviewSystem = ({ productId }) => {
  // ទាញយកមតិពី LocalStorage មកបង្ហាញតាម ID ផលិតផល
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem(`reviews_${productId}`);
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "សុខា", comment: "អាវស្អាតណាស់ សាច់ក្រណាត់ត្រជាក់ល្អ!", rating: 5 }
    ];
  });

  const [newName, setNewName] = useState("");
  const [newComment, setNewComment] = useState("");

  // រាល់ពេល Review ផ្លាស់ប្តូរ វានឹងរក្សាទុកក្នុង LocalStorage
  useEffect(() => {
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(reviews));
  }, [reviews, productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { 
      id: Date.now(), 
      name: newName, 
      comment: newComment, 
      rating: 5 
    };
    setReviews([newEntry, ...reviews]);
    setNewName("");
    setNewComment("");
  };

  return (
    <div className="review-section">
      <h3>មតិយោបល់ពីអតិថិជន ({reviews.length})</h3>
      <form onSubmit={handleSubmit} className="review-form">
        <input type="text" placeholder="ឈ្មោះរបស់អ្នក" value={newName} onChange={(e) => setNewName(e.target.value)} required />
        <textarea placeholder="សរសេរមតិរបស់អ្នកនៅទីនេះ..." value={newComment} onChange={(e) => setNewComment(e.target.value)} required />
        <button type="submit">ផ្ញើមតិ</button>
      </form>
      <div className="review-list">
        {reviews.map((r) => (
          <div key={r.id} className="review-item">
            <strong>{r.name}</strong> <span>⭐⭐⭐⭐⭐</span>
            <p>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSystem;