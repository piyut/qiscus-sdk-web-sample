/* globals $, QiscusSDK, _ */
$(function () {
  var isLoggedIn = window.sessionStorage.getItem('sdk-sample-app---is-loggedin')
  var userData = null
  if (!isLoggedIn || Boolean(isLoggedIn) !== true) {
    window.location.href = '/login.html'
  } else {
    userData = window.sessionStorage.getItem('sdk-sample-app---user-data')
    userData = JSON.parse(userData)
  }
  attachClickListenerOnConversation()
  // let's setup options for our widget
  QiscusSDK.core.init({
    AppId: 'sdksample',
    mode: 'wide',
    options: {
      // When we're success login into qiscus SDK we'll have a 1-on-1 chat to guest2@qiscus.com
      // You can change this to any user you have on your AppId, e.g: contact@your_company.com, etc
      loginSuccessCallback (data) {
        // QiscusSDK.core.UI.chatTarget('guest2@qiscus.com')
        // load Room List
        loadRoomList()

        // Join Qiscus AOV Room
        // QiscusSDK.core.getOrCreateRoomByUniqueId('Qiscus AOV');

        // Display UI in sidebar
        renderSidebarHeader()
      },
      chatRoomCreatedCallback: function (data) {
        console.log('chatRoomCreated', data)
        var room = createRoomDOM(data.room)
        appSidebar.find('ul').prepend(room)
        $('#modal-chat-stranger').addClass('hidden')
      }
    }
  })
  // login to qiscus
  QiscusSDK.core.setUser(userData.userId, userData.secret, userData.username)
  // render the widget
  QiscusSDK.render()

  var appSidebar = $('.app-sidebar__lists')

  function loadRoomList () {
    QiscusSDK.core.loadRoomList()
    .then(function (rooms) {
      // var lists = '';
      var lists = rooms.map(function (room) {
        return createRoomDOM(room)
      })
      // $('.app-sidebar__lists ul').html(lists);
      // appSidebar.find('ul').html(lists);
      appSidebar.find('ul').empty().append(lists)
      toggleConversationActiveClass()
    })
  }

  function renderSidebarHeader () {
    $('.app-sidebar__header img').attr('src', QiscusSDK.core.userData.avatar_url)
    $('.app-sidebar__myinfo div').html(QiscusSDK.core.userData.username)
    $('.app-sidebar__myinfo span').html('Online')
  }

  function attachClickListenerOnConversation () {
    $('.app-sidebar__lists').on('click', 'li', function () {
      var $this = $(this)
      $('.app-sidebar__lists li').removeClass('active')
      $this.addClass('active')
      toggleConversationActiveClass()
      QiscusSDK.core.UI.chatGroup($this.data('id'))
    })
  }

  function toggleConversationActiveClass () {
    if (!QiscusSDK.core.selected) return
    appSidebar.find('li').removeClass('active')
    appSidebar.find('li#room-' + QiscusSDK.core.selected.id).addClass('active')
  }

  function createRoomDOM (room) {
    var avatar = document.createElement('img')
    avatar.classList.add('room-avatar')
    avatar.setAttribute('src', room.avatar)
    avatar.setAttribute('width', 48)
    avatar.setAttribute('height', 48)
    var li = document.createElement('li')
    li.setAttribute('data-id', room.id)
    li.setAttribute('id', 'room-' + room.id)
    li.setAttribute('data-room-name', room.name)
    var detail = document.createElement('div')
    var name = document.createElement('strong')
    name.innerText = room.name
    var lastComment = document.createElement('span')
    lastComment.innerText = room.last_comment_message
    detail.appendChild(name)
    detail.appendChild(lastComment)
    li.appendChild(avatar)
    li.appendChild(detail)
    return li
  }

  $('#input-search-room')
    .on('focus', function () {
      $('.app-sidebar__search__icon').addClass('focus')
    })
    .on('blur', function () {
      $('.app-sidebar__search__icon').removeClass('focus')
    })
    .on('keyup', _.debounce(function () {
      var value = this.value
      appSidebar.find('li')
        .toArray()
        .map(function (item) {
          if ($(item).hasClass('hidden')) {
            $(item).removeClass('hidden')
          }
          return item
        })
        .filter(function (item) {
          var roomName = $(item).attr('data-room-name')
          return roomName.toLowerCase().indexOf(value) < 0
        })
        .forEach(function (item) {
          $(item).addClass('hidden')
        })
    }, 400))

  $('button#chat-stranger').on('click', function (event) {
    event.preventDefault()
    $('#modal-chat-stranger').removeClass('hidden')
  })
  $('#modal-chat-stranger').on('click', '.modal-close-btn', function (event) {
    event.preventDefault()
    var modal = $('#modal-chat-stranger')
    modal.addClass('hidden')
    modal.find('input').val('')
  })
  $('#modal-chat-stranger').on('keydown', 'input', function (event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      var value = event.target.value
      QiscusSDK.core.UI.chatTarget(value)
    }
  })
})
