export function userAvatarUrl(comment, usersArrary) {
  const user = usersArrary.find((userObj) => {
    return userObj.username === comment.author;
  });
  if (user) {
    return user.avatar_url;
  }
}

export function addNewComment(prevComments, author, body) {
  const newComments = [...prevComments];
  const newComment = {};
  newComment.author = author;
  newComment.body = body;
  newComment.comment_id = body;
  newComment.votes = 0;
  newComments.unshift(newComment);
  return newComments;
}
