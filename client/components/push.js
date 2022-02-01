const useNotifications = (notificationListener) => {
    useEffect(() => {
      registerForPushNotifications();
  
      if (notificationListener) Notifications.addListener(notificationListener);
    }, [])}