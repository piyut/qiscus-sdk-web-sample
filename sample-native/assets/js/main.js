$(function(){
  // let's setup options for our widget
  QiscusSDK.core.init({
    AppId: 'DRAGONGO',
    options: {
      // When we're success login into qiscus SDK we'll have a 1-on-1 chat to guest2@qiscus.com
      // You can change this to any user you have on your AppId, e.g: contact@your_company.com, etc
      loginSuccessCallback(data) { QiscusSDK.core.UI.chatTarget('guest2@qiscus.com') },
    }
  });
  // login to qiscus
  QiscusSDK.core.setUser('guest3@qiscus.com', 'password', 'Qiscus Demo');
  // render the widget
  QiscusSDK.render();
})