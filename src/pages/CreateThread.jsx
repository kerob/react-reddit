import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addThread } from "../firebase";
import { useAuth } from "../providers/AuthProvider";

export default function CreateThread() {
  const { currentUser } = useAuth();
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, []);

  const handleFile = (e) => {
    const types = ["image/png", "image/jpeg"];
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
    } else {
      setFile(null);
      setFileError("Invalid File Type (Only PNG or JPEG Allowed)");
    }
  };

  function handleCreateThread(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    // const formRaw = JSON.parse(formJson);

    if (currentUser && formJson.title != "") {
      addThread(
        currentUser.displayName,
        currentUser.uid,
        formJson.title,
        formJson.content,
        file
      );

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      console.log("Log in to create thread");
    }
  }

  return (
    <div className="centered">
      {currentUser ? (
        <div className="create-thread post-container">
          <h2>Create A New Thread</h2>
          <form className="create-thread__form" onSubmit={handleCreateThread}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter Title"
              required
            />
            <label htmlFor="img" style={fileError ? { color: "red" } : {}}>
              {fileError ? fileError : "Select an Image (PNG or JPG)"}
            </label>
            <input
              type="file"
              name="image"
              accept=".jpg, .jpeg, .png"
              onChange={handleFile}
            />
            <label htmlFor="content">Text</label>
            <textarea type="text" name="content" placeholder="Enter Text" />
            <button className="create-thread__button" type="submit">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div>
          We need you to login for that! Redirecting you to the login page
        </div>
      )}
    </div>
  );
}
