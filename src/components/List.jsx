import React, { useEffect, useRef, useState } from "react";
import Create from "./Create";
import Edit from "./Edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export const List = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([
    { id: 1, title: "t1", content: "c1" },
    { id: 2, title: "t2", content: "c2" },
    { id: 3, title: "t3", content: "c3" },
  ]);

  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(false);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  function saveTitleToState(e) {
    setTitle(e.target.value);
  }
  function saveContentToState(e) {
    setContent(e.target.value);
  }

  function toggleCreate() {
    setIsCreate(!isCreate);
  }

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  let getTitle = useRef();
  let getContent = useRef();

  function cancelPost(e) {
    e.preventDefault();
    toggleCreate();
  }

  function deletePost(id) {
    const isConfirmed = window.confirm("Are you sure you want to delete?");

    if (isConfirmed) {
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);
    }
  }

  function savePost(e) {
    e.preventDefault();
    const id = Date.now();
    setPosts([...posts, { id, title, content }]);

    getTitle.current.value = "";
    getContent.current.value = "";
    toggleCreate();
  }

  function updatePost(e) {
    e.preventDefault();
    const updatedPost = posts.map((eachPost) => {
      if (eachPost.id === editId) {
        return {
          ...eachPost,
          title: title || eachPost.title,
          content: content || eachPost.content,
        };
      }
      return eachPost;
    });
    setPosts(updatedPost);
    toggleEdit();
  }

  function editPost(id) {
    setEditId(id);
    toggleEdit();
  }

  if (isCreate) {
    return (
      <Create
        getTitle={getTitle}
        getContent={getContent}
        saveTitleToState={saveTitleToState}
        saveContentToState={saveContentToState}
        savePost={savePost}
        cancelPost={cancelPost}
      />
    );
  } else if (isEdit) {
    let post = posts.find((post) => post.id === editId);
    return (
      <Edit
        title={post.title}
        content={post.content}
        saveTitleToState={saveTitleToState}
        saveContentToState={saveContentToState}
        updatePost={updatePost}
      />
    );
  } else {
    return (
      <div className="text-center max-auto p-3">
        <h1
          className="text-primary"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          All Posts - Edited
        </h1>
        {!posts.length ? (
          <h1
            className="text-danger mb-2"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Nothing to show here
          </h1>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th style={{ fontFamily: "Roboto, sans-serif" }}>ID</th>
                <th style={{ fontFamily: "Roboto, sans-serif" }}>Title</th>
                <th style={{ fontFamily: "Roboto, sans-serif" }}>Content</th>
                <th style={{ fontFamily: "Roboto, sans-serif" }}>Edit</th>
                <th style={{ fontFamily: "Roboto, sans-serif" }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td style={{ fontFamily: "Roboto, sans-serif" }}>
                    {post.id}
                  </td>
                  <td style={{ fontFamily: "Roboto, sans-serif" }}>
                    {post.title}
                  </td>
                  <td style={{ fontFamily: "Roboto, sans-serif" }}>
                    {post.content}
                  </td>
                  <td style={{ fontFamily: "Roboto, sans-serif" }}>
                    <button
                      onClick={() => editPost(post.id)}
                      className="btn btn-primary"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      Edit
                    </button>
                  </td>
                  <td style={{ fontFamily: "Roboto, sans-serif" }}>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="btn btn-danger"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button className="btn btn-primary" onClick={toggleCreate}>
          <FontAwesomeIcon icon={faPlus} /> Create New
        </button>
      </div>
    );
  }
};

export default List;
