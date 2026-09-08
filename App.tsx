import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './src/i18n';
import { RootNavigator } from './src/navigation/RootNavigator';
import { navigationRef } from './src/navigation/ref';
import { useAppStore } from './src/store/appStore';
import { useAuthStore } from './src/store/authStore';
import { useContactsStore } from './src/store/contactsStore';
import { useBootstrapLiveData } from './src/hooks/useBootstrapLiveData';
import { subscribeNotificationResponses } from './src/services/notifications';
import { registerFcmHandlers } from './src/services/firebase';
import { LoadingState } from './src/components/States';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

function AppReady() {
  useBootstrapLiveData();
  return (
    <>
      <StatusBar style="dark" />
      <RootNavigator />
    </>
  );
}

export default function App() {
  const hydrated = useAppStore((s) => s.hydrated);
  const hydrateApp = useAppStore((s) => s.hydrate);
  const hydrateAuth = useAuthStore((s) => s.hydrate);
  const hydrateContacts = useContactsStore((s) => s.hydrate);

  useEffect(() => {
    void (async () => {
      await Promise.all([hydrateApp(), hydrateAuth(), hydrateContacts()]);
      await registerFcmHandlers();
      await SplashScreen.hideAsync().catch(() => undefined);
    })();
  }, [hydrateApp, hydrateAuth, hydrateContacts]);

  useEffect(() => {
    const sub = subscribeNotificationResponses((alertId) => {
      if (alertId && navigationRef.isReady()) {
        navigationRef.navigate('AlertDetail', { id: alertId });
      }
    });
    return () => sub.remove();
  }, []);

  if (!hydrated) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LoadingState />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppReady />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
