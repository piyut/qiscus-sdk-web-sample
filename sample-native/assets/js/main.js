$(function(){
  attachClickListenerOnConversation();
  // let's setup options for our widget
  QiscusSDK.core.init({
    AppId: 'DRAGONGO',
    mode: 'wide',
    options: {
      // When we're success login into qiscus SDK we'll have a 1-on-1 chat to guest2@qiscus.com
      // You can change this to any user you have on your AppId, e.g: contact@your_company.com, etc
      loginSuccessCallback(data) { 
        // QiscusSDK.core.UI.chatTarget('guest2@qiscus.com') 
        // load Room List
        loadRoomList();

        // Join Qiscus AOV Room
        // QiscusSDK.core.getOrCreateRoomByUniqueId('Qiscus AOV');
        
        // Display UI in sidebar
        renderSidebarHeader();
      },
    }
  });
  // login to qiscus
  // QiscusSDK.core.setUser('amsibsam@qiscus.com', 'password', 'Bisma Rahardian', 'https://d1edrlpyc25xu0.cloudfront.net/kiwari-prod/image/upload/s322Ji9RLe/1507605762-Rubick_icon.png');
  // QiscusSDK.core.setUser('juang@qiscus.com', 'password', 'Ashari Juang', 'https://d1edrlpyc25xu0.cloudfront.net/kiwari-prod/image/upload/BTDIXHEr9u/1507605766-Timbersaw_icon.png');
  QiscusSDK.core.setUser('fikri@qiscus.com', 'password', 'Rijalul Fikri', 'https://d1edrlpyc25xu0.cloudfront.net/kiwari-prod/image/upload/ixIrQHwz2w/1507605797-Lifestealer_icon.png');
  // QiscusSDK.core.setUser('rajapulau@qiscus.com', 'password', 'Ganjar Widyatmansyah', 'https://d1edrlpyc25xu0.cloudfront.net/kiwari-prod/image/upload/swD5H65c89/1507605880-Ogre_Magi_icon.png');
  // QiscusSDK.core.setUser('arief@qiscus.com', 'password', 'Arief Nur', 'https://d1edrlpyc25xu0.cloudfront.net/kiwari-prod/image/upload/0AlS8O2rr_/1507606591-Lina_icon.png');
  // QiscusSDK.core.setUser('sunu@qiscus.com', 'password', 'Sunu PF', 'https://d1edrlpyc25xu0.cloudfront.net/kiwari-prod/image/upload/6nsJ-eS_nd/1507605872-Animal_Courier_(Radiant)_icon.png');
  // render the widget
  QiscusSDK.render();

  var appSidebar = $('.app-sidebar__lists');

  function loadRoomList() {
    QiscusSDK.core.loadRoomList()
    .then(function(rooms) {
      var lists = '';
      rooms.forEach(function(room){
        var avatar = '<img class="room-avatar" src="'+room.avatar+'" width="48" height="48">';
        lists = lists + '<li data-id="'+room.id+'" id="room-'+room.id+'">'+avatar+'<div><strong>'+room.name+'</strong><span>'+room.last_comment_message+'</span></div></li>'
      })
      // $('.app-sidebar__lists ul').html(lists);
      appSidebar.find('ul').html(lists);
      toggleConversationActiveClass();
    });
  }

  function renderSidebarHeader() {
    $('.app-sidebar__header img').attr('src', QiscusSDK.core.userData.avatar_url);
    $('.app-sidebar__myinfo div').html(QiscusSDK.core.userData.username);
    $('.app-sidebar__myinfo span').html('Online');
  }

  function attachClickListenerOnConversation() {
    $('.app-sidebar__lists').on('click', 'li', function(){
      var $this = $(this);
      $('.app-sidebar__lists li').removeClass('active');
      $this.addClass('active');
      toggleConversationActiveClass();
      QiscusSDK.core.UI.chatGroup($this.data('id'));
    });
  }

  function toggleConversationActiveClass() {
    if(!QiscusSDK.core.selected) return;
    appSidebar.find('li').removeClass('active');
    appSidebar.find('li#room-'+QiscusSDK.core.selected.id).addClass('active');
  }
})