from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
import certifi

from datetime import datetime, timezone, timedelta


ca = certifi.where()

client = MongoClient('mongodb+srv://sparta:test@cluster0.0uiki8z.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta


# localhost:5000을 입력하면 index.html 이 나오게 해라
# @app.route('/') = localhost:5000
@app.route('/')
def home():
    return render_template('index.html')

# POST 방식 : 받은 nickname_give comment_give 로 방명록 저장하기
# nowtime 변수를 지정하여 time 역시 저장한다.
@app.route('/comments', methods=["POST"])
def comments_post():
    nickname_receive = request.form['nickname_give']
    comment_receive = request.form['comment_give']
    track_receive = request.form['track_give']
    part_receive = request.form['part_give']
    kst = timezone(timedelta(hours=9))
    nowtime = str(datetime.now(tz=kst))

    doc = {
        'nickname':nickname_receive,
        'comment':comment_receive,
        'time':nowtime,
        'track': track_receive,
        'part' : part_receive
        }
    


    db.comments.insert_one(doc)

    return jsonify({'msg': '방명록 저장 완료!'})
# jsonify : 사용자가 json data를 내보내도록 제공하는 flask의 함수.

# GET 방식 : 방명록 불러오기
@app.route('/comments', methods=['GET'])
def comments_get():
    all_comments = list(db.comments.find({},{'_id':False}))
    return jsonify({'result':all_comments})

# DELETE 방식 : 입력한 닉네임 값에 해당하는 방명록을 삭제합니다.
@app.route('/comments', methods=['DELETE'])
def comments_del():
    delnickname_receive = request.form['delnickname_give']
    db.comments.delete_one({'nickname': delnickname_receive})
    return jsonify({'msg': '방명록 삭제 완료!'})
    

# PUT 방식 : 입력한 닉네임값에 해당하는 방명록의 내용을 editcomment_give 로 받아서 수정합니다.
@app.route('/comments', methods=['PUT'])
def comments_put():
    editnickname_receive = request.form['editnickname_give']
    editcomment_receive = request.form['editcomment_give']
    kst = timezone(timedelta(hours=9))
    nowtime = str(datetime.now(tz=kst))
    db.comments.update_one({'nickname':editnickname_receive},{'$set':{'comment':editcomment_receive}})
    db.comments.update_one({'nickname':editnickname_receive},{'$set':{'time':nowtime}})
    return jsonify({'msg': '방명록 수정 완료!'})



if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
    # debug=True 디버깅 모드 실행
