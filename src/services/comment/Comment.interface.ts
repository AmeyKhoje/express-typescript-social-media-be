interface CommentInterface {
  _id: string;
  from: string;
  to: string;
  text: string;
  replies: [];
}

export default CommentInterface;
