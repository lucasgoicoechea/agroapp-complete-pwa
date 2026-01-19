import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Button, TextInput, Alert} from 'react-native';
import { supabase } from '../lib/supabase';

export default function Personnel() {
  const [items,setItems] = useState([]);
  const [email,setEmail] = useState('');
  const [fullName,setFullName] = useState('');
  const [role,setRole] = useState('operario');

  useEffect(()=>{ fetchItems(); },[]);
  const fetchItems = async () => {
    const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false });
    if (error) return Alert.alert('Error', error.message);
    setItems(data || []);
  };

  const add = async () => {
    if (!email) return Alert.alert('Faltan datos','Ingrese email');
    const { data, error } = await supabase.from('users').insert([{ email, full_name: fullName, role }]);
    if (error) return Alert.alert('Error', error.message);
    setEmail(''); setFullName(''); setRole('operario');
    fetchItems();
  };

  return (
    <View style={{padding:16}}>
      <Text style={{fontSize:18}}>Personal</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{borderWidth:1, padding:8, marginVertical:8}} />
      <TextInput placeholder="Nombre completo" value={fullName} onChangeText={setFullName} style={{borderWidth:1, padding:8, marginBottom:8}} />
      <TextInput placeholder="Rol (admin/encargado/operario)" value={role} onChangeText={setRole} style={{borderWidth:1, padding:8, marginBottom:8}} />
      <Button title="Agregar usuario" onPress={add} />
      <FlatList data={items} keyExtractor={i=>String(i.id)} renderItem={({item})=>(
        <View style={{padding:8, borderBottomWidth:1}}>
          <Text>{item.full_name || item.email} — {item.role}</Text>
        </View>
      )} />
    </View>
  );
}
