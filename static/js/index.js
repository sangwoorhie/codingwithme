 // 페이지를 열면 show_comment() 함수가 실행됩니다. 방명록 리스트가 나옵니다. 
 $(document).ready(function () {
    show_comment();
  });
  // POST 방식 : nickname_give, comment_give, track_give 에 방명록을 작성하기 위한 닉네임, 내용, 트랙을 담아 보냅니다. 
  function save_comment() {
    let nickname = $('#nickname').val()
    let comment = $('#comment').val()
    let track1 = $('.track1')
    let track2 = $('.track2')
    let track3 = $('.track3')
    let track

    if (track1.is(':checked') == true){
      track = track1.val().toString();;
         }
    else if(track2.is(':checked') == true){
      track = track2.val().toString();;

    }
    else if (track3.is(':checked') ==true){
      track = track3.val().toString();;

    }
    else{
      alert('트랙이 없나요? 트랙을 신청해 보세요!');
    }

    let formData = new FormData();
    formData.append("nickname_give", nickname);
    formData.append("comment_give", comment);
    formData.append("track_give", track);

    fetch('/comments', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
      alert(data["msg"]);
      window.location.reload()
    });
  }

  // GET 방식 : DB에 저장되어 있는 정보들을 가져옵니다.
  function show_comment() {
    fetch('/comments').then((res) => res.json()).then((data) => {
      let rows = data['result']
      rows.forEach((a) => {
        let nickname = a['nickname']
        let comment = a['comment']
        let track = a['track']
        let date = a['time'].substr(0, 19)



        // temp_html 안에 모달을 넣어 수정 버튼을 누르면 입력 창이 뜨게 합니다.
        // 삭제하기 버튼을 누르면 바로 del_comment('${nickname}') 과 이어져 삭제되게 합니다.
        let temp_html = `<div class="card">
                                  <div class="card-body">
                                      <blockquote class="blockquote mb-0" id="blockquote">
                                          <p>${comment}</p>
                                          <p><small class="text-muted">트랙 : ${track} <br> 작성자 : ${nickname}<br>작성 시간 : ${date}</small></p>
                                          <button type="button" class="btn btn-dark" onclick="del_comment('${nickname}')">삭제하기</button>
                                          <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">수정하기</button>
                                          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                          <div class="modal-dialog">
                                              <div class="modal-content">
                                              <div class="modal-header">
                                                  <h5 class="modal-title" id="exampleModalLabel">방명록 수정하기</h5>
                                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                              </div>
                                              <div class="modal-body">
                                                  <form>
                                                 
                                                  <div class="mb-3">
                                                     
                                                      <label for="recipient-name" class="col-form-label" >수정할 방명록 내용</label>
                                                      <textarea class="form-control" id="editcomment"></textarea>
                                              
                                                  
                                                      </div>
                                                  </form>
                                              </div>
                                              <div class="modal-footer">
                                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                                                  <button type="button" class="btn btn-primary" onclick="edit_comment('${nickname}')">수정하기</button>
                                              </div>
                                              </div>
                                          </div>
                                          </div>
                                          `

        $('#comment-list').prepend(temp_html)
      });

    })

  }
  var exampleModal = document.getElementById('exampleModal')
  exampleModal.addEventListener('show.bs.modal', function (event) {
    // Button that triggered the modal
    var button = event.relatedTarget
    // Extract info from data-bs-* attributes
    var recipient = button.getAttribute('data-bs-whatever')
    // If necessary, you could initiate an AJAX request here
    // and then do the updating in a callback.
    //
    // Update the modal's content.
    var modalTitle = exampleModal.querySelector('.modal-title')
    var modalBodyInput = exampleModal.querySelector('.modal-body input')

    modalTitle.textContent = 'New message to ' + recipient
    modalBodyInput.value = recipient
  })


  // DELETE 방식 : 입력한 삭제할 닉네임 값을 delnickname_give에 담아 보냅니다.

  function del_comment(nickname) {
    let formData = new FormData();
    formData.append("delnickname_give", nickname);

    fetch('/comments', { method: "DELETE", body: formData }).then((res) => res.json()).then((data) => {

      alert(data["msg"]);
      window.location.reload()
    });
  }
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