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



//      var reloadMessages = function() {
//       //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
//       last_message_id = ※※※
//       $.ajax({
//         //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
//         url: ※※※,
//         //ルーティングで設定した通りhttpメソッドをgetに指定
//         type: 'get',
//         dataType: 'json',
//         //dataオプションでリクエストに値を含める
//         data: {id: last_message_id}
//       })
//       .done(function(messages) {
//         console.log('success');
//       })
//       .fail(function() {
//         console.log('error');
//       });
//     };



//     //省略
//   var buildMessageHTML = function(message) {
//     if (message.content && message.image.url) {
//       //data-idが反映されるようにしている
//       var html = '<div class="message" data-id=' + message.id + '>' +
//         '<div class="upper-message">' +
//           '<div class="upper-message__user-name">' +
//             message.user_name +
//           '</div>' +
//           '<div class="upper-message__date">' +
//             message.created_at +
//           '</div>' +
//         '</div>' +
//         '<div class="lower-message">' +
//           '<p class="lower-message__content">' +
//             message.content +
//           '</p>' +
//           '<img src="' + message.image.url + '" class="lower-message__image" >' +
//         '</div>' +
//       '</div>'
//     } else if (message.content) {
//       //同様に、data-idが反映されるようにしている
//       var html = '<div class="message" data-id=' + message.id + '>' +
//         '<div class="upper-message">' +
//           '<div class="upper-message__user-name">' +
//             message.user_name +
//           '</div>' +
//           '<div class="upper-message__date">' +
//             message.created_at +
//           '</div>' +
//         '</div>' +
//         '<div class="lower-message">' +
//           '<p class="lower-message__content">' +
//             message.content +
//           '</p>' +
//         '</div>' +
//       '</div>'
//     } else if (message.image.url) {
//       //同様に、data-idが反映されるようにしている
//       var html = '<div class="message" data-id=' + message.id + '>' +
//         '<div class="upper-message">' +
//           '<div class="upper-message__user-name">' +
//             message.user_name +
//           '</div>' +
//           '<div class="upper-message__date">' +
//             message.created_at +
//           '</div>' +
//         '</div>' +
//         '<div class="lower-message">' +
//           '<img src="' + message.image.url + '" class="lower-message__image" >' +
//         '</div>' +
//       '</div>'
//     };
//     return html;
//   };
// //省略

// //途中省略
//   //$(function(){});の閉じタグの直上(処理の最後)に以下のように追記
// setInterval(reloadMessages, 5000);

//   //animate関数を利用する。


  })
})