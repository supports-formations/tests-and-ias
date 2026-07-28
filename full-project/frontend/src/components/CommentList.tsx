type CommentLike = {
  id: string;
  author: string;
  text: string;
  createdAt: string;
};

export default function CommentList({ comments }: { comments: CommentLike[] }) {
  if (comments.length === 0) {
    return <p className="comment-list-empty">Aucun commentaire pour le moment.</p>;
  }
  return (
    <ul className="comment-list" data-testid="comment-list">
      {comments.map((c) => (
        <li key={c.id} className="comment-item" data-testid="comment-item">
          <strong>{c.author}</strong>
          <span className="comment-date">{new Date(c.createdAt).toLocaleString()}</span>
          <p>{c.text}</p>
        </li>
      ))}
    </ul>
  );
}
