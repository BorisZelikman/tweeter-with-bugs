const Renderer = function () {
  const createCommentEditor = function (btnComment) {
    $(btnComment).hide();
    const commentEditor = $("<div>", { class: "commentEditor" });
    commentEditor.append($("<input>", { placeholder: "comment..." }));
    commentEditor.append(
      $("<div>", { id: "post", class: "commentEditor", text: "submit" })
    );
    $(btnComment).parent().append(commentEditor);
    $(".posts").find("input").focus();
  };

  const _postAndButtonDiv = (post) => {
    let outerDiv = $("<div>", { class: "outerClass" });
    let textDiv = $("<div>", { class: "post-text", text: post.text });
    let deleteBtn = $("<div>", { class: "delete", text: "Delete Post" });

    return outerDiv.append(textDiv).append(deleteBtn);
  };

  const _commentAndButtonDiv = (comment) => {
    let outerDiv = $("<div>", { class: "outerClass" });
    let textDiv = $("<div>", { class: "comments", text: comment.text });
    let deleteBtn = $("<div>", { class: "delete-comment", text: "x" });
    deleteBtn.attr("data-id", comment.id);

    return outerDiv.append(deleteBtn);
  };

  const clear = () => $("#posts").empty();

  const renderPosts = function (posts) {
    for (const post in posts) {
      const postDiv = $("<div>", { class: "post" });
      postDiv.attr("data-id", post.id);

      postDiv.append(_postAndButtonDiv(post));
      for (const comment of post.comments) {
        postDiv.append(_commentAndButtonDiv(comment));
      }

      postDiv.append('<div class="btnComment">Comment</div>');

      $("#posts").append(postDiv);
    }
  };

  return {
    clear,
    renderPosts,
    createCommentEditor,
  };
};
