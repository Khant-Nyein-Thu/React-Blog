const Post = ({ id, title, content, editPost, deletePost }) => {
  return (
    <>
      <section>
        <h3>{title}</h3>
        <p>{content}</p>
        <button onClick={() => editPost(id)} className="btn btn-primary me-2">
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => deletePost(id)}>
          Delete
        </button>
      </section>
    </>
  );
};
export default Post;
