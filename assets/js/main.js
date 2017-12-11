/* global QiscusSDK, $, _ */
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
    AppId: window.SDK_APP_ID,
    mode: 'wide',
    options: {
      // When we're success login into qiscus SDK we'll have a 1-on-1 chat to guest2@qiscus.com
      // You can change this to any user you have on your AppId, e.g: contact@your_company.com, etc
      loginSuccessCallback: function () {
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
        $('.app-sidebar.chat-stranger').addClass('hidden')
        $('#empty-chat-wrapper').addClass('hidden')
      }
    }
  })
  // login to qiscus
  QiscusSDK.core.setUser(userData.userId, userData.secret, userData.username)
  // render the widget
  QiscusSDK.render()

  var appSidebar = $('.app-sidebar__lists')

  function loadRoomList() {
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

  function renderSidebarHeader() {
    $('.app-sidebar__header img').attr('src', QiscusSDK.core.userData.avatar_url)
    $('.app-sidebar__myinfo div').html(QiscusSDK.core.userData.username)
    $('.app-sidebar__myinfo span').html('Online')
  }

  function attachClickListenerOnConversation() {
    $('.app-sidebar__lists').on('click', 'li', function () {
      var $this = $(this)
      $('.app-sidebar__lists li').removeClass('active')
      $this.addClass('active')
      toggleConversationActiveClass()
      QiscusSDK.core.UI.chatGroup($this.data('id'))
      $('#empty-chat-wrapper').addClass('hidden')
    })
  }

  function toggleConversationActiveClass() {
    if (!QiscusSDK.core.selected) return
    appSidebar.find('li').removeClass('active')
    appSidebar.find('li#room-' + QiscusSDK.core.selected.id).addClass('active')
  }

  function createRoomDOM(room) {
    var avatar = document.createElement('img')
    avatar.classList.add('room-avatar')
    avatar.setAttribute('src', room.avatar)
    avatar.setAttribute('width', '48')
    avatar.setAttribute('height', '48')
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

  var $sidebarChatStranger = $('.app-sidebar.chat-stranger')
  $('#chat-with-stranger-btn').on('click', function (event) {
    event.preventDefault()
    $sidebarChatStranger.removeClass('hidden')
  })
  $sidebarChatStranger.on('click', '.navigation-btn', function (event) {
    event.preventDefault()
    var sidebarChatStranger = $('.app-sidebar.chat-stranger')
    sidebarChatStranger.addClass('hidden')
    sidebarChatStranger.find('input').val('')
  })
  $sidebarChatStranger
      .find('form')
      .on('submit', function (event) {
        event.preventDefault()
        var target = event.target['uniqueId'].value
        QiscusSDK.core.UI.chatTarget(target)
        return false
      })
  $sidebarChatStranger.on('keydown', 'input', function (event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      var value = event.target.value
      QiscusSDK.core.UI.chatTarget(value)
    }
  })

  var $showContactListBtn = $('#show-contact-list')
  var $sidebarContactList = $('.app-sidebar.contact-list')
  $showContactListBtn.on('click', function (event) {
    event.preventDefault()
    $sidebarContactList.removeClass('hidden')
    return false
  })
  $sidebarContactList
      .find('#hide-contact-list-btn')
      .on('click', function (event) {
        event.preventDefault()
        $sidebarContactList.addClass('hidden')
        return false
      })

  var $menuBtn = $('#menu-btn')
  var $popOver = $('.popover-menu')
  $popOver.on('click', 'a', function () {
    $popOver.addClass('hidden')
  })
  $menuBtn.on('click', function (event) {
    event.preventDefault()
    $popOver.toggleClass('hidden')
    return false
  })

  var $logoutBtn = $('#logout-btn')
  $logoutBtn.on('click', function (event) {
    event.preventDefault()
    window.sessionStorage.clear()
    window.location.reload()
    return false
  })

  $('.contact-list-container').on('click', '.contact-item', function (event) {
    var target = $(this).data('user-email')
    QiscusSDK.core.UI.chatTarget(target)
    $('#empty-chat-wrapper').addClass('hidden')
  })

  // TODO: Contact list
  $.ajax({
        url: 'http://dashboard-sample.herokuapp.com/api/contacts',
        method: 'get'
      })
      .done(function (data) {
        var contacts = data.results.users
        var contactDOM = contacts.map(createContactDOM)
        $('ul.contact-list').empty().append(contactDOM)
      })
      .fail(function (error) {
        console.error('error when fetching contact list', error)
      })

  function createContactDOM(contactData) {
    var container = document.createElement('li')
    var avatar = document.createElement('img')
    var detailContainer = document.createElement('div')
    var name = document.createElement('span')
    var onlineStatus = document.createElement('span')

    container.classList.add('contact-item')
    container.setAttribute('data-room-id', contactData.id)
    container.setAttribute('data-user-email', contactData.email)
    container.setAttribute('data-user-name', contactData.name)
    container.setAttribute('data-user-username', contactData.username)
    detailContainer.classList.add('contact-item-detail')
    avatar.setAttribute('src', contactData.avatar_url)
    name.classList.add('name')
    name.innerText = contactData.name
    onlineStatus.classList.add('online-status')
    onlineStatus.innerText = 'online'

    detailContainer.appendChild(name)
    detailContainer.appendChild(onlineStatus)
    container.appendChild(avatar)
    container.appendChild(detailContainer)

    return container
  }

})
