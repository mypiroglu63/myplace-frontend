import React, { useState } from "react";
import axios from "axios";
import "../css/CommentSection.css";

const CommentSection = ({ comments, addComment }) => {
  const [comment, setComment] = useState("");

  return (
    <div className="comment-section">
      <h2>Yorumlar</h2>
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Yorumunuzu yazın"
          required
        />
        <button type="submit">Gönder</button>
      </form>
      <div className="comments">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <h3>{comment.author}</h3>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
