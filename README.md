# SafeTwin

SafeTwin is an Android-first Expo / React Native citizen-safety app for landslide and flash-flood warnings. It presents backend Digital Twin predictions as direct, accessible actions: current safety, active warnings, evacuation routing, nearby community reports, and SOS calling.

## Run it

1. Install Node.js 22.13 or newer (Expo SDK 57 requirement).
2. Copy `.env.example` to `.env` if you need to configure a production service. The default is **demo mode**, so no backend or API key is required to explore the full flow.
3. Install dependencies with `npm install`.
4. Start the app with `npm start`, then select Android or iOS.

The Profile tab contains a developer-only **Demo data** selector with five safety scenarios, including a critical evacuation scenario.

## Production configuration

- Supply only HTTPS API and WSS endpoints through `EXPO_PUBLIC_API_BASE_URL` and `EXPO_PUBLIC_WS_URL`.
- Set a restricted `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` for Google Maps. Restrict it by Android package/signing certificate and iOS bundle identifier.
- Configure FCM credentials with EAS/your build system and provide `GOOGLE_SERVICES_JSON` at build time. The project deliberately does not include credential files or production API keys.
- Build a custom development/production client for remote push. Expo Notifications manages Android notification channels; critical alerts use a maximum-priority dedicated channel. Notification responses deep-link to the matching alert.

## Safety and privacy behavior

- Location is foreground, balanced-accuracy, and distance/time throttled. Users can continue without it.
- The app sends rounded coordinates and shows community locations approximately. It never publishes another person’s exact location.
- Last known risk, alerts, safe zones, emergency guidance, and contacts are cached for offline mode. Stale data is explicitly labelled with its last update time.
- Authentication tokens use secure device storage. The API layer attaches JWT credentials, handles expiry, supports report rate limiting, and keeps model inference on the backend.

## Backend contract

The app expects the SafeTwin Digital Twin service to provide endpoints for current risk, alerts, zones, safe zones, evacuation routes, reports, device tokens, and location heartbeats. `src/services/api.ts` contains the typed client surface and demo fallbacks. The GNN / Transformer inference stays entirely on the backend.
