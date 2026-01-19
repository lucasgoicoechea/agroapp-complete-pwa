import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import { supabase } from '../lib/supabase';

export default function LoginScreen({navigation}) {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const signIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigation.replace('Dashboard');
    } catch (err) {
      Alert.alert('Login error', err.message);
    }
  };

  const signUp = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      Alert.alert('Registro', 'Confirma tu email en Supabase (si aplica).');
    } catch (err) {
      Alert.alert('Signup error', err.message);
    }
  };

  return (
    <View style={{padding:16}}>
      <Text style={{fontSize:18, marginBottom:8}}>Iniciar sesión</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" style={{borderWidth:1, padding:8, marginBottom:8}} />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry style={{borderWidth:1, padding:8, marginBottom:8}} />
      <Button title="Login" onPress={signIn} />
      <View style={{height:8}} />
      <Button title="Registrarse" onPress={signUp} />
    </View>
  );
}
