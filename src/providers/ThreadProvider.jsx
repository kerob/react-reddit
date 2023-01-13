import { createContext, useContext, useState } from "react";

const ThreadContext = createContext();
const ThreadUpdateContext = createContext();

export function useThread() {
  return useContext(ThreadContext);
}

export function useThreadUpdate() {
  return useContext(ThreadUpdateContext);
}

export function ThreadProvider(props) {
  const [data, setData] = useState({});

  function setThread(data) {
    setData(data);
  }

  return (
    <ThreadContext.Provider value={data}>
      <ThreadUpdateContext.Provider value={setThread}>
        {props.children}
      </ThreadUpdateContext.Provider>
    </ThreadContext.Provider>
  );
}
