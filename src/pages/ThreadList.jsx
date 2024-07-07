import React, { useEffect, useState } from "react";
import { useThreadUpdate } from "../providers/ThreadProvider";
import { getThreads, threadsRef } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import IconBtn from "../components/IconBtn";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { FaFireAlt, FaSeedling, FaChartLine } from "react-icons/fa";
import { BsImageFill } from "react-icons/bs";
import { convertDate } from "../util/Date";
import { useAsync } from "../hooks/useAsync";

export default function ThreadList() {
  const [sortType, setSortType] = useState("lastUpdated");
  const threads = getThreads(sortType);

  // useEffect(() => {
  //   let fetch = getThreads(sortType);
  //   console.log(fetch);
  // }, [sortType]);

  return (
    <div className="threadlist">
      <div className="threadlist_header">
        <ul role="list" className="flex-r threadlist_sort">
          <li
            className={
              sortType === "lastUpdated" ? "threadlist_sort_active" : ""
            }
            onClick={() => setSortType("lastUpdated")}
          >
            <FaFireAlt />
            <span>Hot</span>
          </li>
          <li
            className={sortType === "createdAt" ? "threadlist_sort_active" : ""}
            onClick={() => setSortType("createdAt")}
          >
            <FaSeedling />
            <span>New</span>
          </li>
          <li
            className={sortType === "rating" ? "threadlist_sort_active" : ""}
            onClick={() => setSortType("rating")}
          >
            <FaChartLine />
            <span>Popular</span>
          </li>
        </ul>
      </div>
      {threads &&
        threads.map((thread) => <Thread data={thread} key={thread.id} />)}
    </div>
  );
}

function Thread(props) {
  const navigate = useNavigate();
  const {
    id,
    title,
    user,
    createdAt,
    rating,
    content,
    lastUpdated,
    userid,
    imageUrl,
  } = props.data;

  const loadThread = useThreadUpdate();

  return (
    <div className="thread_container">
      <div className="thread_rating">
        <IconBtn Icon={ImArrowUp} aria-label="Like" />
        <span>{rating}</span>
        <IconBtn Icon={ImArrowDown} aria-label="Dislike" />
      </div>
      <div
        className="thread_thumbnail-container"
        style={{ border: imageUrl ? "none" : "" }}
        onClick={() => navigate(`/thread/${id}`)}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            className="thread_thumbnail"
            alt="thread thumbnail"
          />
        ) : (
          <div className="thread_thumbnail">
            <BsImageFill />
          </div>
        )}
      </div>
      <div>
        <Link
          to={`/thread/${id}`}
          className="text-no_deco"
          // onClick={() => {
          //   loadThread(props.data);
          // }}
        >
          <h2 className="thread_title"> {title}</h2>
        </Link>
        <div className="thread_info">
          Submitted {convertDate(createdAt.seconds)} by <span>{user}</span>
        </div>
        <div className="thread_footer">
          <span>share</span>
          <span>report</span>
        </div>
      </div>
    </div>
  );
}
