import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Button, TextInput, Alert} from 'react-native';
import { supabase } from '../lib/supabase';

export default function Machines() {
  const [items,setItems] = useState([]);
  const [name,setName] = useState('');
  const [type,setType] = useState('');

  useEffect(()=>{ fetchItems(); },[]);
  const fetchItems = async () => {
    const { data, error } = await supabase.from('machine').select('*').order('id', { ascending: false });
    if (error) return Alert.alert('Error', error.message);
    setItems(data || []);
  };

  const add = async () => {
    if (!name) return Alert.alert('Faltan datos','Ingrese nombre');
    const { data, error } = await supabase.from('machine').insert([{ name, type }]);
    if (error) return Alert.alert('Error', error.message);
    setName(''); setType('');
    fetchItems();
  };

  return (
    <View style={{padding:16}}>
      <Text style={{fontSize:18}}>Maquinaria</Text>
      <TextInput placeholder="Nombre máquina" value={name} onChangeText={setName} style={{borderWidth:1, padding:8, marginVertical:8}} />
      <TextInput placeholder="Tipo" value={type} onChangeText={setType} style={{borderWidth:1, padding:8, marginBottom:8}} />
      <Button title="Agregar máquina" onPress={add} />
      <FlatList data={items} keyExtractor={i=>String(i.id)} renderItem={({item})=>(
        <View style={{padding:8, borderBottomWidth:1}}>
          <Text>{item.name} — {item.type}</Text>
        </View>
      )} />
    </View>
  );
}
