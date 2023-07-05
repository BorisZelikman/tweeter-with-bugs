const tweeter = Tweeter();
const renderer = Renderer();

const refresh = () => renderer.renderPosts(tweeter.getPosts());

const post = function () {
  const input = $("#input");
  if (input.val().trim().length > 0) tweeter.addPost(input.val());
  input.val("");

  refresh();
};

$("#posts").on("click", ".delete", function () {
  tweeter.removePost($(this).closest(".post").data("id"));
  refresh();
});

$("#posts").on("click", ".delete-comment", function () {
  tweeter.removeComment(
    $(this).closest(".post").data("id"),
    $(this).data("id")
  );
  refresh();
});

$("#posts").on("click", ".btnComment", function () {
  renderer.createCommentEditor($(this));
  refresh();
});

// submit button click
$("#posts").on("click", "#post", function () {
  let text = $(this).siblings()[0].value;
  if (text.trim().length > 0) {
    tweeter.addComment(text, $(this).closest(".post").data("id"));
  }
  refresh();
});

$("#container").on("keydown", "input", function (event) {
  if (event.keyCode === 13) $(this).siblings("#post").click();
});
