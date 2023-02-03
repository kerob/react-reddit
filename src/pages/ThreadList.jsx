import React, { useEffect, useState } from "react";
import { useThreadUpdate } from "../providers/ThreadProvider";
import { getThreads, threadsRef } from "../firebase";
import {
  query,
  orderBy,
  limit,
  addDoc,
  onSnapshot,
  where,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import IconBtn from "../components/IconBtn";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { convertDate } from "../util/Date";
import { useAsync } from "../hooks/useAsync";

export default function ThreadList() {
  // const [threads, setThreads] = useState([]);
  // const { loading, error, value: threads } = useAsync(getThreads);

  // useEffect(() => {
  //   const q = query(threadsRef, orderBy("lastUpdated"), limit(25));
  //   const unsub = onSnapshot(q, (threadSnapshot) => {
  //     let threadOutput = [];
  //     threadSnapshot.docs.forEach((doc) => {
  //       threadOutput.push({ ...doc.data(), id: doc.id });
  //     });
  //     setThreads(threadOutput);
  //   });

  //   return () => unsub();
  // }, []);

  const threads = getThreads();

  return (
    <div className="threadlist">
      {threads &&
        threads.map((thread) => <Thread data={thread} key={thread.id} />)}
    </div>
  );
}

function Thread(props) {
  const { id, title, user, createdAt, rating, content, lastUpdated, userid } =
    props.data;

  const loadThread = useThreadUpdate();

  return (
    <div className="thread_container">
      <div className="thread_rating">
        <IconBtn Icon={ImArrowUp} aria-label="Like" />
        <span>{rating}</span>
        <IconBtn Icon={ImArrowDown} aria-label="Dislike" />
      </div>
      <div>
        <Link
          to={`/thread/${id}`}
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
