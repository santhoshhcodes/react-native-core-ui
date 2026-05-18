import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from '../config/env';

export const getImageUrl = async (path: string) => {
  const base = await AsyncStorage.getItem('BASE_URL') || ENV.API_URL;
  return `${base}${path}`;
};