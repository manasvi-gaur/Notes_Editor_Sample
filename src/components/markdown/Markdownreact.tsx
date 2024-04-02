import React, { useEffect, useState } from "react";
import "./Markdownreact.css";
import Markdown from "react-markdown";
import { MentionsInput, Mention } from "react-mentions";

function Markdownreact() {
  const [title, setTitle] = useState("");
  const [mark, setMarkdown] = useState("");
  const [users, setUsers] = useState([]);

  const fun = async () => {
    fetch("http://localhost:8000/getusers/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: window.localStorage.getItem("id"),
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        const dataset = new Set(users);
        resJson.users.map((user) => {
          const data = {
            id: user.id,
            display: user.username,
          };
          dataset.add(data);
        });
        setUsers([...dataset]);
      });
  };
  useEffect(() => {
    fun();
  }, []);

  const [file, setFile] = useState<any>(null);
  const [mode, setMode] = useState("edit");

  const handleUpload = (event: any) => {
    event.preventDefault();
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    const id: any = window.localStorage.getItem("id");
    if (title.length == 0) {
      alert("Provide the title!");
      return;
    }
    if (!id) {
      alert("User required!");
      return;
    }
    formData.append("title", title);
    formData.append("user", id);
    formData.append("notes", mark);
    if (file) {
      formData.append("file", file);
    }

    const options = {
      method: "POST",
      body: formData,
    };

    const res = await fetch("http://127.0.0.1:8000/notes/create/", options);
    const resJson = await res.json();
    if (resJson.status == "ok") {
      alert("Notes saved in backend/database!");
      setTitle("");
      setMarkdown("");
      setFile(null);
    }
  };

  const toggleMode = () => {
    setMode(mode === "edit" ? "preview" : "edit");
  };

  return (
    <div className="markdown-container">
      <div className="mode-toggle-button">
        <button onClick={toggleMode}>
          {mode === "edit" ? "Preview" : "Edit"}
        </button>
      </div>
      <div className="markdown-editor">
        {mode === "edit" && (
          <div>
            <input
              className="title-input"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        )}
        {mode === "edit" && (
          <>
            <MentionsInput
              className="markdown-input center-div"
              value={mark}
              placeholder="Write something!"
              onChange={(e) => setMarkdown(e.target.value)}
              style={{ color: "black" }}
            >
              <Mention trigger="@" data={users}></Mention>
            </MentionsInput>
            <div className="upload-button">
              <input type="file" onChange={handleUpload} />
            </div>
          </>
        )}
      </div>

      {mode === "preview" && (
        <div className="markdown-preview">
          <div className="mark-container">
            <Markdown className="title-preview">{title}</Markdown>
            <Markdown className="divMarkPrev">{mark}</Markdown>
            <div className="file-container">
            <div className="title-preview file">
              {file ? `File choosen: ${file.name}` : null}
            </div>
            </div>
            
          </div>

          <button
            className="submit"
            onClick={handleOnSubmit}
            disabled={mark == "" && file}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default Markdownreact;
