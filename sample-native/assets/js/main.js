$(function(){
  $('.app-sidebar__lists').on('click', 'li', function(){
    QiscusSDK.core.UI.chatGroup($(this).data('id'));
  });
  // let's setup options for our widget
  QiscusSDK.core.init({
    AppId: 'DRAGONGO',
    mode: 'wide',
    options: {
      // When we're success login into qiscus SDK we'll have a 1-on-1 chat to guest2@qiscus.com
      // You can change this to any user you have on your AppId, e.g: contact@your_company.com, etc
      loginSuccessCallback(data) { 
        // QiscusSDK.core.UI.chatTarget('guest2@qiscus.com') 
        // Join Qiscus AOV Room
        QiscusSDK.core.getOrCreateRoomByUniqueId('Qiscus AOV');
        // Display UI in sidebar
        $('.app-sidebar__header img').attr('src', QiscusSDK.core.userData.avatar_url);
        $('.app-sidebar__myinfo div').html(QiscusSDK.core.userData.username);
        $('.app-sidebar__myinfo span').html('Online');

        // load Room List
        QiscusSDK.core.loadRoomList()
          .then(function(rooms) {
            var lists = '';
            rooms.forEach(function(room){
              var avatar = '<img class="room-avatar" src="'+room.avatar+'" width="48" height="48">';
              lists = lists + '<li data-id="'+room.id+'">'+avatar+'<div><strong>'+room.name+'</strong><span>'+room.last_comment_message+'</span></div></li>'
            })
            $('.app-sidebar__lists ul').html(lists);
          });
      },
    }
  });
  // login to qiscus
  QiscusSDK.core.setUser('fikri@qiscus.com', 'password', 'Rijalul Fikri');
  // render the widget
  QiscusSDK.render();
})