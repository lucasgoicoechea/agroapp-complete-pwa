import React, {useState} from 'react';
import {View, Text, Button, Image, TextInput, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase, uploadImage } from '../lib/supabase';

export default function ApplicationScreen({route}) {
  const [photo, setPhoto] = useState(null);
  const [notes, setNotes] = useState('');
  const [productsText, setProductsText] = useState(''); // simple CSV or JSON text

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return Alert.alert('Permiso denegado');
    let result = await ImagePicker.launchImageLibraryAsync({quality:0.6});
    if (!result.cancelled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) return Alert.alert('Permiso denegado');
    let result = await ImagePicker.launchCameraAsync({quality:0.6});
    if (!result.cancelled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const submit = async () => {
    try {
      let photoUrl = null;
      if (photo) {
        photoUrl = await uploadImage(photo);
      }
      const products = productsText ? JSON.parse(productsText) : null;
      const { data, error } = await supabase.from('applications').insert([{
        field_id: route?.params?.fieldId || null,
        user_id: null, -- replace with actual user id after auth integration
        products,
        notes,
        photo_url: photoUrl
      }]);
      if (error) throw error;
      Alert.alert('Guardado', 'Registro de aplicación guardado.');
      setPhoto(null); setNotes(''); setProductsText('');
    } catch (err) {
      Alert.alert('Error', err.message || JSON.stringify(err));
    }
  };

  return (
    <View style={{padding:16}}>
      <Text style={{fontSize:18}}>Registrar Aplicación</Text>
      <TextInput placeholder='Productos JSON (ej: [{"name":"Adengo","dose":"1L"}])' value={productsText} onChangeText={setProductsText} style={{borderWidth:1,padding:8, marginVertical:8}} />
      <TextInput placeholder="Notas" value={notes} onChangeText={setNotes} style={{borderWidth:1, padding:8, marginVertical:8}} />
      <Button title="Tomar foto" onPress={takePhoto} />
      <View style={{height:8}} />
      <Button title="Seleccionar de galería" onPress={pickImage} />
      {photo ? <Image source={{uri:photo}} style={{width:200,height:150,marginTop:8}} /> : null}
      <View style={{height:8}} />
      <Button title="Guardar aplicación" onPress={submit} />
    </View>
  );
}
