# Qiscus Web SDK Sample


### Install Qiscus SDK

add these lines in your html code/project

```
    <link rel=stylesheet href=https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css>
    <link href="http://DRAGONFLY.qiscus.com/css/qiscus.css" rel="stylesheet">

```

and

```
    <script type="text/javascript" src="http://DRAGONFLY.qiscus.com/js/manifest.qiscus.js"></script>
    <script type="text/javascript" src="http://DRAGONFLY.qiscus.com/js/app.qiscus.js"></script>
```


### Initiate Qiscus in Project

You need to include this in your body file

```

    <script>
      // Let's initiate the SDK
      qiscus.setUser('DRAGONFLY', 'evan@qiscus.com', 'password', 'Evan', "https://qiscuss3.s3.amazonaws.com/uploads/36976206a8b1fd2778938dbcd72b6624/qiscus-dp.png");
      qiscus.init();
      qiscus.setParticipants([
        {username: 'Developer', email: 'fikri@qiscus.com'},
        {username: 'Sales', email: 'apiep.test@gg.com'}
      ])
    </script>
    
```


### Fuul index.html looks like in code

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset=utf-8>
    <title>qiscus-sdk-web-sample</title>
    <link rel=stylesheet href=https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css>
    <link href="http://DRAGONFLY.qiscus.com/css/qiscus.css" rel="stylesheet">
  </head>
  <body>
    <h1>Qiscus SDK Demo</h1>
    <qiscus-widget></qiscus-widget>
    <script type="text/javascript" src="http://DRAGONFLY.qiscus.com/js/manifest.qiscus.js"></script>
    <script type="text/javascript" src="http://DRAGONFLY.qiscus.com/js/app.qiscus.js"></script>
    <script>
      // Let's initiate the SDK
      qiscus.setUser('DRAGONFLY', 'evan@qiscus.com', 'password', 'Evan', "https://qiscuss3.s3.amazonaws.com/uploads/36976206a8b1fd2778938dbcd72b6624/qiscus-dp.png");
      qiscus.init();
      qiscus.setParticipants([
        {username: 'Developer', email: 'fikri@qiscus.com'},
        {username: 'Sales', email: 'apiep.test@gg.com'}
      ])
    </script>
  </body>
</html>
```

screen shot

![alt tag](https://qiscuss3.s3.amazonaws.com/example@mail.com/xxx/311543ed845d72b45612c4b4d8f7f17d/Screen+Shot+2016-09-13+at+2.49.44+PM.png)
