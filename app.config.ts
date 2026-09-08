import type { ExpoConfig } from 'expo/config';

const googleMapsApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

const config: ExpoConfig = {
  name: 'SafeTwin',
  slug: 'safetwin',
  version: '1.0.0',
  description: 'AI-powered landslide and flash-flood warnings for safer communities.',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  scheme: 'safetwin',
  platforms: ['android', 'ios', 'web'],
  sdkVersion: '57.0.0',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.safetwin.citizen',
    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        'SafeTwin uses your location to send warnings for your area and find the nearest evacuation route.',
      NSLocationAlwaysAndWhenInUseUsageDescription:
        'SafeTwin uses your location in the background only to deliver location-specific emergency warnings.',
      NSCameraUsageDescription: 'SafeTwin uses the camera so you can attach photos to hazard reports.',
      NSPhotoLibraryUsageDescription:
        'SafeTwin uses your photo library so you can attach photos to hazard reports.',
      NSPhotoLibraryAddUsageDescription: 'SafeTwin may save report photos on your device for offline retry.',
      UIBackgroundModes: ['location', 'remote-notification'],
    },
    config: {
      googleMapsApiKey,
    },
  },
  android: {
    package: 'com.safetwin.citizen',
    adaptiveIcon: {
      backgroundColor: '#FFFFFF',
      foregroundImage: './assets/android-icon-foreground.png',
    },
    permissions: [
      'ACCESS_COARSE_LOCATION',
      'ACCESS_FINE_LOCATION',
      'POST_NOTIFICATIONS',
      'CAMERA',
      'VIBRATE',
      'RECEIVE_BOOT_COMPLETED',
    ],
    config: {
      googleMaps: {
        apiKey: googleMapsApiKey,
      },
    },
    ...(process.env.GOOGLE_SERVICES_JSON ? { googleServicesFile: process.env.GOOGLE_SERVICES_JSON } : {}),
  },
  web: {
    bundler: 'metro',
    favicon: './assets/favicon.png',
  },
  plugins: [
    'expo-secure-store',
    'expo-localization',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#FFFFFF',
        image: './assets/splash-icon.png',
        imageWidth: 200,
      },
    ],
    'expo-image',
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission:
          'SafeTwin uses your location to send warnings for your area and find the nearest evacuation route.',
        locationWhenInUsePermission:
          'SafeTwin uses your location to send warnings for your area and find the nearest evacuation route.',
        isAndroidBackgroundLocationEnabled: false,
      },
    ],
    [
      'expo-notifications',
      {
        icon: './assets/icon.png',
        color: '#B42318',
        defaultChannel: 'safetwin-default',
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission: 'SafeTwin uses your photos so you can attach evidence to hazard reports.',
        cameraPermission: 'SafeTwin uses the camera so you can attach photos to hazard reports.',
      },
    ],
  ],
  extra: {
    demoMode: process.env.EXPO_PUBLIC_DEMO_MODE !== 'false',
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://api.safetwin.example/api',
    wsUrl: process.env.EXPO_PUBLIC_WS_URL ?? 'wss://api.safetwin.example/ws',
  },
};

export default config;
