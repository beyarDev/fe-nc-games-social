export function userAvatarUrl(comment, usersArrary) {
  // console.log(comment)
  // console.log(usersArrary)
  const user = usersArrary.find((userObj) => {
    return userObj.username === comment.author;
  });
  if (user) {
    return user.avatar_url;
  }
}
