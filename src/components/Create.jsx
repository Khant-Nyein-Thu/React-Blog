import React from "react";

const Create = ({
  getTitle,
  getContent,
  saveTitleToState,
  saveContentToState,
  savePost,
  cancelPost,
}) => {
  return (
    <>
      <h1
        className="text-center mt-3"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        Create New Post
      </h1>
      <form action="" className="w-50 mx-auto p-3 my-3">
        <input
          ref={getTitle}
          onChange={saveTitleToState}
          type="text"
          className="form-control mb-3"
          placeholder="title"
          style={{ fontFamily: "Roboto, sans-serif" }}
        />
        <textarea
          ref={getContent}
          onChange={saveContentToState}
          className="form-control mb-3"
          placeholder="content"
          style={{ fontFamily: "Roboto, sans-serif" }}
        ></textarea>
        <button onClick={savePost} className="btn btn-primary me-2">
          Create
        </button>
        <button onClick={cancelPost} className="btn btn-success">
          Cancel
        </button>
      </form>
    </>
  );
};

export default Create;
