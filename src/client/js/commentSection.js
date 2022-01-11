const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm")
const deleteCommentBtns = document.querySelectorAll(".deleteBtn");

const handleDeleteComment = async (e) => {
    const li = e.srcElement.parentNode;
    const {
        dataset:{id:commentId}
    } = li
    const checkDelete = confirm("댓글을 삭제 하시겠습니까?");
    if (checkDelete === true) {
      const response = await fetch(`/api/comments/${commentId}/delete`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
    });
    if (response) {
        li.remove();
        alert("삭제가 완료되었습니다.");
      }
    } else {
      alert("취소되었습니다.");
    }

};

if (deleteCommentBtns) {
  deleteCommentBtns.forEach((deleteCommentBtn) =>
    deleteCommentBtn.addEventListener("click", handleDeleteComment)
  );
}

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.dataset.id = id;
    newComment.className = "video__comment";
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span")
    span.innerText = `  ${text}`;
    const span2 = document.createElement("span")
    span2.className = "deleteBtn"
    span2.innerText = "❌";
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(span2);
    videoComments.prepend(newComment);
    span2.addEventListener("click", handleDeleteComment);
}

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form Click");
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if( text === "" ){
        return ;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        body: {
            text,
        },
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text
        }),
    });
    textarea.value = "";
    const { newCommentId }= await response.json();
    console.log(newCommentId)
    if(response.status === 201){
        addComment(text, newCommentId);
    }
}

const deleteComment = (e) => {
    console.log(e)
}

if (form) {
    form.addEventListener("submit", handleSubmit)
}