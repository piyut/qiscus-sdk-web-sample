# Qiscus Web SDK Sample


### Install Qiscus SDK

installing Qiscus SDK is very easy, all you need is just add these lines in your html code/project

css 

```
    <link rel=stylesheet href=https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css>
    <link href="http://DRAGONFLY.qiscus.com/css/qiscus.css" rel="stylesheet">

```

js

```
    <script type="text/javascript" src="http://DRAGONFLY.qiscus.com/js/manifest.qiscus.js"></script>
    <script type="text/javascript" src="http://DRAGONFLY.qiscus.com/js/app.qiscus.js"></script>
```


### Initiate Qiscus in Project

You need to include this in your body file to initiate Qiscus.

In this Sample App, we are going to initiate Qiscus SDK by adding this line in our code 


```
    <script>
      // Let's initiate the SDK
      qiscus.setUser(APP_ID, CURRENT_USER_EMAIL, CURRENT_USER_KEY, CURRENT_USER_USERNAME, CURRENT_USER_AVATAR_URL);
      qiscus.init();
    </script>
    
```


in sample code, it will look like this : 

```

    <script>
      // Let's initiate the SDK
      qiscus.setUser('DRAGONFLY', 'evan@qiscus.com', 'password', 'Evan', "https://qiscuss3.s3.amazonaws.com/uploads/36976206a8b1fd2778938dbcd72b6624/qiscus-dp.png");
      qiscus.init();
    </script>
    
```
you just set up current user who is running the app and listing participants who will receive your chats (you can use that as list of customer services)


### Full index.html looks like in code

```
<!DOCTYPE html>
<html>
<head>
  <meta charset=utf-8>
  <title>qiscus-sdk-web</title>
  <link rel=stylesheet href=https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css>
  <link href="/static/css/app.da694bef1aab0552acaee3a04e2fe0e4.css" rel="stylesheet"></head>
  <body>
    <h1>Qiscus SDK Demo</h1>
    <qiscus-widget></qiscus-widget>
    <script type="text/javascript" src="/static/js/manifest.cf4734c83d46ac6cb1b0.js"></script>
    <script type="text/javascript" src="/static/js/app.5a747c7992011baf5744.js"></script>
    <script>
    qiscus.setUser('dragonfly', 'e2@qiscus.com', 'password', 'Evan 2');
    qiscus.init();
    </script>
  </body>
</html>
```

### Start chat with target

to start chatting with target, you can just call this in your app : 

```
vStore.dispatch('CHAT_TARGET', YOUR_TARGET_EMAIL)
```

sample :

```
vStore.dispatch('CHAT_TARGET', 'e14@qiscus.com')
```

further information if you want to see codebase of the qiscus web SDK, you can go to :
https://github.com/qiscus/qiscus-sdk-web

### Screen Shots


![alt tag](https://qiscuss3.s3.amazonaws.com/example@mail.com/xxx/a9ac848ed14fc533238d8db4eaeba2a4/Screen+Shot+2016-09-13+at+2.54.35+PM.png)