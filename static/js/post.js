// POST 방식 : nickname_give, comment_give, track_give 에 방명록을 작성하기 위한 닉네임, 내용, 트랙을 담아 보냅니다. 
function save_comment() {

  let nickname = $('#nickname').val()
  let comment = $('#comment').val()

  

  let track1 = $('.track1')
  let track2 = $('.track2')
  let track3 = $('.track3')
  let track

  if (track1.is(':checked') == true) {
    track = track1.val().toString()
  }
  else if (track2.is(':checked') == true) {
    track = track2.val().toString()

  }
  else if (track3.is(':checked') == true) {
    track = track3.val().toString()

  }
  else {
    alert('트랙이 없나요? 트랙을 신청해 보세요!');
  }



  let part = document.querySelectorAll("input[name='part']:checked");
  let partgive = ' '
  let partkeys = Object.keys(part).length
  for (let i=0;i<partkeys;i++){
   partgive = partgive +  "  " + part[i].value
  }

  let formData = new FormData();
  formData.append("nickname_give", nickname);
  formData.append("comment_give", comment);
  formData.append("track_give", track);
  formData.append("part_give",partgive);

  fetch('/comments', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
    alert(data["msg"]);
    window.location.reload()
  });
}
