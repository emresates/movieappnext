"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import StarRatingModal from "../vote-popup";

import styles from "./styles.module.scss";
//* Icon
import { CiBookmarkPlus } from "react-icons/ci";
import { TbStarsFilled } from "react-icons/tb";
import { PiStarHalfLight } from "react-icons/pi";
import CommentsModal from "../commentsModal";
import { fetchSinglePostData } from "@/services/post.service";
import { useSession } from "next-auth/react";
import {
  fetchCreateComment,
  fetchDeleteComment,
  fetchSingleComment,
} from "@/services/comment.servies";
import { fetchSingleUserData } from "@/services/user.service";

export default function MovieDetails({
  title,
  backdrop,
  original_title,
  date,
  length,
  budget,
  poster,
  teaserKey,
  images,
  genres,
  overview,
  directorPerson,
  castNames,
  productID,
}) {
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userID, setUserID] = useState("");
  const { data, status } = useSession();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (status === "authenticated") {
      setUserID(data?.user?.id);
    }
  }, []);

  useEffect(() => {
    fetchPostData();
    console.log("use effect worked");
  }, []);

  const fetchPostData = async () => {
    const { product } = await fetchSinglePostData(productID);

    if (product?.comments.length > 0) {
      const comments = await Promise.all(
        product.comments.map(async (commentID) => {
          const { comment } = await fetchSingleComment(commentID);
          const { user } = await fetchSingleUserData(comment?.user);
          return {
            text: comment.text,
            user: user?.username,
            userId: user._id,
            commentId: comment._id,
          };
        })
      );

      setComments(comments);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      setNewComment("");

      const data = {
        text: newComment,
        productID: productID,
        user: userID,
        type: "movie",
      };

      await fetchCreateComment(data);
      await fetchPostData();
    }
  };

  const handleEditComment = (index, editedComment) => {
    const editedComments = [...comments];
    editedComments[index] = editedComment;
    setComments(editedComments);
  };

  const handleDeleteComment = async (id) => {
    await fetchDeleteComment(id);
    await fetchPostData();
  };
  return (
    <>
      <div className={styles.movieWrapper}>
        {/* Background Image */}
        <Image
          unoptimized
          src={`https://image.tmdb.org/t/p/original${backdrop}`}
          alt={title}
          className={styles.backgroundImg}
          width={100}
          height={100}
        />

        <header>
          <div>
            <h1 className={styles.movieTitle}>{title}</h1>
            <p>Original Title: {original_title}</p>
            <p className={styles.info}>
              {date} • {length} • {budget}
            </p>
          </div>
          <div className={styles.rateWrapper}>
            <div className={styles.block}>
              <h4>User Stars</h4>
              <div>
                <TbStarsFilled />
                <p>
                  8.7/10
                  <span>167 User</span>
                </p>
              </div>
            </div>
            <div className={`${styles.block}  ${styles.right}`}>
              <h4>Your Star</h4>
              <div>
                <PiStarHalfLight />
                <p onClick={handleOpenModal}>RATE</p>
              </div>
            </div>
          </div>
          {showModal && <StarRatingModal onClose={handleCloseModal} />}
        </header>

        {/* Posters */}
        <div className={styles.moviePoster}>
          <Image
            unoptimized
            src={`https://image.tmdb.org/t/p/original${poster}`}
            alt={title}
            fill
          />
          <iframe
            src={`https://www.youtube.com/embed/${teaserKey}`}
            allowFullScreen
            width={700}
          />

          <div className={styles.posters}>
            {images.map((image, index) => {
              return (
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                  alt={title}
                />
              );
            })}
          </div>
        </div>
        {/* Genres */}
        <ul>
          {genres?.map((genre) => (
            <li key={genre.id}>
              <Link href={`/categorie/${genre.id}`}>{genre.name}</Link>
            </li>
          ))}
        </ul>
        {/* Detail */}
        <div className={styles.detail}>
          <div className={styles.overview}>
            <p>{overview}</p>
            <p>Director: {directorPerson} </p>
            <p>Cast: {castNames} </p>
          </div>
          <div className={styles.right}>
            <div className={styles.inner}>
              <CiBookmarkPlus />
              <div>
                <p>Add to Watchlist</p>
                <p>Added by 333k users</p>
              </div>
            </div>
          </div>
        </div>

        <CommentsModal
          newComment={newComment}
          setNewComment={setNewComment}
          comments={comments}
          handleEditComment={handleEditComment}
          handleDeleteComment={handleDeleteComment}
          handleAddComment={handleAddComment}
          productID={productID}
          type="movie"
        />
      </div>
    </>
  );
}
