'use strict';

self.addEventListener('push', function(e) {

    // const title = 'Comunicacion Angular Web Push Notification';
    // const options = {
    //     body: event.data.text(),
    // };

    // event.waitUntil(self.registration.showNotification(title, options));

    // console.log(e);
    console.log(e.data.text());

    const data = JSON.parse(e.data.text());

    console.log(data);

    const title = data.titulo;
    const options = {
        body: data.cuerpo,
        // icon: 'img/icons/icon-72x72.png',
        //  badge: 'img/favicon.ico',
        //  image: 'https://datainfox.com/wp-content/uploads/2017/10/avengers-tower.jpg',
        vibrate: [125, 75, 125, 275, 200, 275, 125, 75, 125, 275, 200, 600, 200, 600]
    };

    e.waitUntil(self.registration.showNotification(title, options));

});