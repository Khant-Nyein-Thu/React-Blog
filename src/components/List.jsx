import React, { useEffect, useRef, useState } from "react";
import Create from "./Create";
import Edit from "./Edit";

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
        <h1 className="text-primary">All Posts</h1>
        {!posts.length ? (
          <h1 className="text-danger mb-2">Nothing to show here</h1>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.content}</td>
                  <td>
                    <button
                      onClick={() => editPost(post.id)}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button className="btn btn-primary" onClick={toggleCreate}>
          Create New
        </button>
      </div>
    );
  }
};

export default List;
