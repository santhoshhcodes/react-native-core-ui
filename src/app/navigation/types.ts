import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  EmployeeDashboard: undefined;
  SandboxScreen: undefined;
};

export type AppNavigationProp<RouteName extends keyof RootStackParamList> = StackNavigationProp<
  RootStackParamList,
  RouteName
>;

export type AppRouteProp<RouteName extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  RouteName
>;