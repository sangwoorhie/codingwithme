  // PUT 방식 : 입력한 수정할 방명록의 닉네임값 editnickname_give 와 수정할 내용을 editcomment_give 에 담아 보냅니다.
  function edit_comment(nickname) {
    let editcomment = $('#editcomment').val()
    let formData = new FormData()
    formData.append("editnickname_give", nickname)
    formData.append("editcomment_give", editcomment)
    fetch("/comments", { method: "PUT", body: formData }).then(res => res.json()).then(data => {
      alert(data["msg"])
      window.location.reload()
    })
  }