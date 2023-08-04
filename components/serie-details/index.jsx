"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import StarRatingModal from "../vote-popup";

import styles from "./styles.module.scss";
//* Icon
import { CiBookmarkPlus } from "react-icons/ci";
import { TbStarsFilled } from "react-icons/tb";
import { PiStarHalfLight } from "react-icons/pi";
import CommentsModal from "../commentsModal";

export default function SerieDetails({
  name,
  original_name,
  date,
  status,
  original_language,
  runTime,
  backdrop,
  poster,
  teaserKey,
  images,
  genres,
  overview,
  director,
  cast,
  seasons,
  episodes,
  productID,
}) {
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const newComments = [...comments, newComment];
      setComments(newComments);
      setNewComment("");
    }
  };

  const handleEditComment = (index, editedComment) => {
    const editedComments = [...comments];
    editedComments[index] = editedComment;
    setComments(editedComments);
  };

  const handleDeleteComment = (index) => {
    const filteredComments = comments.filter((_, i) => i !== index);
    setComments(filteredComments);
  };
  return (
    <>
      <div className={styles.movieWrapper}>
        <header>
          <div>
            <h1 className={styles.movieTitle}>{name}</h1>
            <p>Original Name: {original_name}</p>
            <p>
              {date} • {status} • {original_language}
              {runTime > 0 && ` • ${runTime}m`}
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

        {/* Background Image */}
        <Image
          unoptimized
          src={`https://image.tmdb.org/t/p/original${backdrop}`}
          alt={name}
          className={styles.backgroundImg}
          width={100}
          height={100}
        />

        {/* Posters */}
        <div className={styles.moviePoster}>
          <Image
            unoptimized
            src={`https://image.tmdb.org/t/p/original${poster}`}
            alt={name}
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
                  alt={images.name}
                />
              );
            })}
          </div>
        </div>

        {/* Genres */}
        <ul>
          {genres?.map((genre) => (
            <li key={genre.id}>
              <Link href={`/categories/${genre.id}`}>{genre.name}</Link>
            </li>
          ))}
        </ul>

        {/* Detail */}
        <div className={styles.detail}>
          <div className={styles.overview}>
            <p>{overview}</p>
            {director && <p>Director: {director} </p>}
            {cast && <p>Cast: {cast} </p>}
            <p>
              {seasons} Season • {episodes} Episode
            </p>
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
          type="serie"
        />
      </div>
    </>
  );
}
