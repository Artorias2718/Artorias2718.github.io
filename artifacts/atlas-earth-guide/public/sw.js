self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  var action = event.action;
  var targetUrl = "https://www.atlasearth.com";

  if (action === "ios") {
    targetUrl = "https://apps.apple.com/us/app/atlas-earth/id1546871912";
  } else if (action === "android") {
    targetUrl = "https://play.google.com/store/apps/details?id=com.atlasreality.atlasearth";
  }

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if ("focus" in client) {
            client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});

self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "SHOW_NOTIFICATION") {
    self.registration.showNotification(event.data.title, event.data.options);
  }
});
