const Tweeter = function () {
  let _posts = [
    {
      text: "First post!",
      id: "p1",
      comments: [
        { id: "c1", text: "First comment on first post!" },
        { id: "c2", text: "Second comment on first post!!" },
        { id: "c3", text: "Third comment on first post!!!" },
      ],
    },
    {
      text: "Aw man, I wanted to be first",
      id: "p2",
      comments: [
        {
          id: "c4",
          text: "Don't wory second poster, you'll be first one day.",
        },
        { id: "c5", text: "Yeah, believe in yourself!" },
        { id: "c6", text: "Haha second place what a joke." },
      ],
    },
  ];

  let _postIdCounter = { prefix: "p", count: 0 };
  let _commentIdCounter = { prefix: "c", count: 0 };

  const _idNum = (idString, prefix) =>
    parseInt(idString.substring(prefix.length));

  const _initCounters = () => {
    maxCommentNum = 0;
    maxPostNum = 0;
    for (const post of _posts) {
      const postNum = _idNum(post.id, _postIdCounter.prefix);
      if (postNum > maxPostNum) maxPostNum = postNum;

      for (const comment of post.comments) {
        const commentNum = _idNum(post.id, _postIdCounter.prefix); // post.id
        if (commentNum > maxCommentNum) maxCommentNum = commentNum;
      }
    }
    _postIdCounter.count = maxPostNum;
  };

  const _generateId = (counterType) => {
    counterType.counter++;
    return counterType.prefix + counterType.counter;
  };

  const _getPostIndex = (id) => _posts.findIndex((post) => post.id === id);

  const getPosts = () => JSON.parse(JSON.stringify(_posts));

  const addPost = (postText) => {
    if (_postIdCounter.count === 0) _initCounters();
    _posts.push({
      id: _generateId(_postIdCounter),
      text: postText,
      comments: [],
    });
  };

  const removePost = (id) => {
    const postIndex = _getPostIndex(id);
    if (postIndex > 0) _posts.splice(postIndex, 1);
  };

  const addComment = (commentText, postId) => {
    if (_postIdCounter === 0) _initCounters();
    const postIndex = _getPostIndex(postId);
    _posts[postIndex].comments.push({
      id: _generateId(_commentIdCounter),
      text: commentText,
    });
  };

  const removeComment = (postId, commentId) => {
    const postIndex = _getPostIndex(postId);
    let comments = _posts[postIndex].comments;
    const commentIndex = comments.findIndex(
      (comment) => comment.id === commentId
    );
    if (commentIndex > 0) comments.splice(commentIndex, 1);
  };

  return {
    getPosts,
    addPost,
    removePost,

    addComment,
    removeComment,
  };
};
