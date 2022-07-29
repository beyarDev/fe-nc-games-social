export function sliceDate(date) {
  return date ? date.slice(0, 10) : date;
}

export function changeId(commentsArray, responseComment) {
  const updatedComments = commentsArray.map((comment) => {
    const newCommet = { ...comment };
    if (newCommet.body === responseComment.body) {
      newCommet.comment_id = responseComment.comment_id;
    }
    return newCommet;
  });
  return updatedComments;
}
