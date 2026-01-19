import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Button, TextInput, Alert} from 'react-native';
import { supabase } from '../lib/supabase';

export default function Establishments() {
  const [items,setItems] = useState([]);
  const [name,setName] = useState('');

  useEffect(()=>{ fetchItems(); },[]);

  const fetchItems = async () => {
    const { data, error } = await supabase.from('establishments').select('*').order('id', { ascending: false });
    if (error) return Alert.alert('Error', error.message);
    setItems(data || []);
  };

  const add = async () => {
    if (!name) return;
    const { data, error } = await supabase.from('establishments').insert([{ name }]);
    if (error) return Alert.alert('Error', error.message);
    setName('');
    fetchItems();
  };

  const remove = async (id) => {
    const { error } = await supabase.from('establishments').delete().eq('id', id);
    if (error) return Alert.alert('Error', error.message);
    fetchItems();
  };

  return (
    <View style={{padding:16}}>
      <Text style={{fontSize:18}}>Establecimientos</Text>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={{borderWidth:1, padding:8, marginVertical:8}} />
      <Button title="Agregar" onPress={add} />
      <FlatList data={items} keyExtractor={i=>String(i.id)} renderItem={({item})=>(
        <View style={{padding:8, borderBottomWidth:1}}>
          <Text>{item.name}</Text>
          <Button title="Eliminar" onPress={()=>remove(item.id)} />
        </View>
      )} />
    </View>
  );
}
