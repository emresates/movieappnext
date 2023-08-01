import React from "react";

import styles from "./styles.module.scss";

import { BiSolidEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

function CommentsModal({
  newComment,
  setNewComment,
  comments,
  handleEditComment,
  handleDeleteComment,
  handleAddComment,
}) {
  return (
    <div className={styles.commentSection}>
      <h1>User Reviews</h1>
      <div className={styles.writeComment}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Enter your review..."
        />
        <button onClick={handleAddComment}>Share</button>
      </div>
      <div className={styles.comments}>
        {comments.map((comment, index) => (
          <div key={index} className={styles.singleComment}>
            <span>User</span>
            <p>{comment}</p>
            <div className={styles.actions}>
              <BiSolidEditAlt
                style={{ color: "#30c7cf" }}
                onClick={() =>
                  handleEditComment(
                    index,
                    prompt("Yorumunuzu düzenleyin", comment)
                  )
                }
              />
              <MdDeleteForever
                style={{ color: "#ff0000" }}
                onClick={() => handleDeleteComment(index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentsModal;
