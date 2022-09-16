import { useRef, useEffect } from 'react';
import { StatusBar, Text } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-modules-core';
import Loading from './src/components/Loading';
import { BackGround } from './src/components/Background';
import { Routes } from './src/routes';
import { getPushNotificationToken } from './src/service/getPushNotificationToken';
import './src/service/notificationConfig';

export default function App() {
  const getNotificationListener = useRef<Subscription>();
  const reposneNotificationListener = useRef<Subscription>();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  useEffect(() => {
    getPushNotificationToken();
  }, []);

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationResponseReceivedListener((notification) => {
      console.log(notification);
    });

    reposneNotificationListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      if (getNotificationListener.current && reposneNotificationListener.current) {
        Notifications.removeNotificationSubscription(getNotificationListener.current)
        Notifications.removeNotificationSubscription(reposneNotificationListener.current)
      }
    }
  });

  return (
    <BackGround>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      { fontsLoaded ? <Routes /> : <Loading /> }
    </BackGround>
  );
}
