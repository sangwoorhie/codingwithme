 // DELETE 방식 : 입력한 삭제할 닉네임 값을 delnickname_give에 담아 보냅니다.

 function del_comment(nickname) {
    let formData = new FormData();
    formData.append("delnickname_give", nickname);

    fetch('/comments', { method: "DELETE", body: formData }).then((res) => res.json()).then((data) => {

      alert(data["msg"]);
      window.location.reload()
    });
  }