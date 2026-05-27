import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/**
 * Global helper function to execute navigation actions from outside 
 * of the React tree (e.g., inside Axios network interceptors).
 */
export function navigateOutsideReact(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as any, params);
  }
}