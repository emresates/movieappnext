import React from "react";

import styles from "./styles.module.scss";

import { BiSolidEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useSession } from "next-auth/react";

function CommentsModal({
  newComment,
  setNewComment,
  comments,
  handleEditComment,
  handleDeleteComment,
  handleAddComment,
}) {
  const { status, data } = useSession();
  return (
    <div className={styles.commentSection}>
      <h1>User Reviews</h1>
      {status === "authenticated" ? (
        comments.some((comment) => comment.userId === data?.user?.id) ? (
          <h4>You have already added a review.</h4>
        ) : (
          <>
            <div className={styles.writeComment}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Enter your review..."
              />
              <button onClick={handleAddComment}>Share</button>
            </div>
          </>
        )
      ) : (
        <h3>Please sign in to share your thoughts ^-^</h3>
      )}

      <div className={styles.comments}>
        {comments?.map((comment) => (
          <div key={comment.commentId} className={styles.singleComment}>
            <span>{comment.user}</span>
            <p>{comment.text}</p>
            <div className={styles.actions}>
              {data?.user?.id === comment.userId && (
                <>
                  <BiSolidEditAlt
                    style={{ color: "#30c7cf" }}
                    // onClick={() =>
                    //   handleEditComment(
                    //     index,
                    //     prompt("Yorumunuzu düzenleyin", comment)
                    //   )
                    // }
                  />

                  <MdDeleteForever
                    style={{ color: "#ff0000" }}
                    onClick={() => handleDeleteComment(comment.commentId)}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentsModal;
