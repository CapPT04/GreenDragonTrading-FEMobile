import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainNavigator } from './MainNavigator';
import { LoginScreen, RegisterScreen, NotificationScreen, UserProfileScreen } from '@/screens';
import { RootStackParamList, AuthStackParamList } from '@/types';
import { AuthProvider, useAuth } from '@/context/AuthContext';

const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

const RootNavigatorContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <>
          <RootStack.Screen name="Main" component={MainNavigator} />
          <RootStack.Screen name="Notification" component={NotificationScreen} />
          <RootStack.Screen name="UserProfile" component={UserProfileScreen} />
        </>
      )}
    </RootStack.Navigator>
  );
};

export const RootNavigator: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigatorContent />
      </NavigationContainer>
    </AuthProvider>
  );
};
