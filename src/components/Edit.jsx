import React from "react";

const Edit = ({
  title,
  content,
  saveTitleToState,
  saveContentToState,
  updatePost,
}) => {
  return (
    <>
      <h1 className="text-center mt-3">Edit New Post</h1>
      <form action="" className="w-50 mx-auto p-3 my-3">
        <input
          defaultValue={title}
          type="text"
          className="form-control mb-3"
          placeholder="title"
          onChange={saveTitleToState}
        />
        <textarea
          defaultValue={content}
          className="form-control mb-3"
          placeholder="content"
          onChange={saveContentToState}
        ></textarea>
        <button className="btn btn-primary me-2" onClick={updatePost}>
          Update
        </button>
        <button className="btn btn-success">Cancel</button>
      </form>
    </>
  );
};

export default Edit;
