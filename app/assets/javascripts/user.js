$(document).on('turbolinks:load', function(){

    var search_list = $("#user-search-result");
    var member_list = $("#member-search_result");

    function appendUser(user){
        var html = 
                    `<div class="chat-group-user clearfix">
                        <p class="chat-group-user__name">${user.name}</p>
                        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                    </div>`;
                    search_list.append(html);
                    return html;
    }

    function appendErrMsgToHTML(msg){
        var html = 
                    `<div class="chat-group-user clearfix">
                        <p class="chat-group-user__name">${msg}</p>
                    </div>`;
                    search_list.append(html);
    }

    function appendMembers(name, user_id){
        var html = 
        `<div class='chat-group-user'>
  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
  <p class='chat-group-user__name'>${name}</p>
  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
</div>`
    
                    member_list.append(html);
    }

$('#user-search-field').on('keyup', function(e){
    var input = $("#user-search-field").val();

    $.ajax({
        type: 'GET',                // HTTPメソッドはGETで
        url:  '/users',             // /usersのURLに (これによりusersコントローラのindexアクションが起動)
        data: { keyword: input},    // keyword: inputを送信する
        dataType: 'json'            // サーバから値を返す際はjsonである
    })

    .done(function(users){                // usersにjson形式のuser変数が代入される。複数形なので配列型で入ってくる

        if (input.length === 0) {         // フォームの文字列長さが0であれば、インクリメンタルサーチ結果を表示しないようにする
            $('#user-search-result').empty();
          }

        else if (input.length !== 0){     // 値が等しくないもしくは型が等しくなければtrueを返す。
            $('#user-search-result').empty();
            users.forEach(function(user){ // users情報をひとつずつとりだしてuserに代入
                appendUser(user)
            });
        }
        else {
            $('#user-search-result').empty(); // ユーザーが見つからなければ「見つからない」を返す。
            appendErrMsgToHTML("一致するユーザーが見つかりません");
        }
    })

    .fail(function() {
        alert('ユーザー検索に失敗しました');
    });
});

$(function(){
    $(document).on('click', '.user-search-add', function() {
  
      var name = $(this).data("user-name");
      var user_id = $(this).data("user-id");
      $(this).parent().remove();
      appendMembers(name, user_id);
    });

    $(document).on("click", '.user-search-remove', function() {
      $(this).parent().remove();
    });
  });
});