/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/admin` | `/(tabs)/browse` | `/(tabs)/map` | `/(tabs)/profile` | `/_sitemap` | `/admin` | `/auth` | `/auth/login` | `/auth/role-selection` | `/auth/welcome` | `/browse` | `/map` | `/profile` | `/request-details`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
