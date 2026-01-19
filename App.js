import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import Dashboard from './src/screens/Dashboard';
import Establishments from './src/screens/Establishments';
import Lots from './src/screens/Lots';
import Inventory from './src/screens/Inventory';
import ApplicationScreen from './src/screens/ApplicationScreen';
import Livestock from './src/screens/Livestock';
import Machines from './src/screens/Machines';
import Personnel from './src/screens/Personnel';
import Finance from './src/screens/Finance';
import { supabase } from './src/lib/supabase';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Establishments" component={Establishments} />
          <Stack.Screen name="Lots" component={Lots} />
          <Stack.Screen name="Inventory" component={Inventory} />
          <Stack.Screen name="Applications" component={ApplicationScreen} />
          <Stack.Screen name="Livestock" component={Livestock} />
          <Stack.Screen name="Machines" component={Machines} />
          <Stack.Screen name="Personnel" component={Personnel} />
          <Stack.Screen name="Finance" component={Finance} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
