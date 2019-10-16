$(function(){

  function buildMessage(message){

    var image =  message.image ? `<img src="${message.image}">` : image = " ";

    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.name}
                    </div>
                    <div class="upper-message__date">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                  </div>
                  <img class="lower-message__image" src="">
                    ${image}
                </div>`
                return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.messages').animate({
        scrollTop: $('.messages')[0].scrollHeight});
     })

     .always(() =>{
      $(".form__submit").removeAttr("disabled")
      })
     .fail(function(){
      alert('メッセージの送信に失敗しました');
     })
  })

  $(function () {

    function buildHTML(message) {
  
    
      var image = message.image ? `<img class= "lower-message__image" src=${message.image} >` : " "; //三項演算子を使ってmessage.imageにtrueならHTML要素、faiseなら空の値を代入。
  
      var html = `<div class="message" data-message-id="${message.id}"> 
            <div class="upper-message">
              <div class="upper-message__user-name">
                ${message.user_name}
              </div>
              <div class="upper-message__date">
                ${message.created_at}
              </div>
            </div>
            <div class="lower-meesage">
              <p class="lower-message__content">
                ${message.content}
              </p>
              ${image}
            </div>
          </div>`
      return html;
    }

    
//自動更新はここから
     var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.message:last').data('message-id');

      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: "api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'GET',
        dataType: 'json',
        data: {last_id: last_message_id}
        //dataオプションでリクエストに値を含める
        
      })

      .done(function(messages) {
        var insertHTML = '';
          messages.forEach(function(message){
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
          })
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');      
      })
      .fail(function() {
        alert('自動更新に失敗しました');
       });
    }
  };
  setInterval(reloadMessages, 5000);
  });
});