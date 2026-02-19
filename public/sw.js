self.addEventListener("push", (event) => {
  if (!event.data) return;

  let payload = {};
  try {
    payload = event.data.json();
  } catch (error) {
    payload = {
      title: "Garage Boost",
      body: "You have a new notification",
      url: "/garage/bookings",
    };
  }

  const title = payload.title || "Garage Boost";
  const options = {
    body: payload.body || "You have a new notification",
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    tag: payload.tag || "garage-notification",
    data: {
      url: payload.url || "/garage/bookings",
    },
    renotify: true,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification?.data?.url || "/garage/bookings";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
      return undefined;
    })
  );
});
