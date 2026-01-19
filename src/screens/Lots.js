import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Button, TextInput, Alert} from 'react-native';
import { supabase } from '../lib/supabase';

export default function Lots() {
  const [items,setItems] = useState([]);
  const [name,setName] = useState('');
  const [estId,setEstId] = useState('');

  useEffect(()=>{ fetchItems(); },[]);

  const fetchItems = async () => {
    const { data, error } = await supabase.from('fields').select('*').order('id', { ascending: false });
    if (error) return Alert.alert('Error', error.message);
    setItems(data || []);
  };

  const add = async () => {
    if (!name || !estId) return Alert.alert('Faltan datos','Completa nombre y establishment_id');
    const { data, error } = await supabase.from('fields').insert([{ name, establishment_id: estId }]);
    if (error) return Alert.alert('Error', error.message);
    setName(''); setEstId('');
    fetchItems();
  };

  const remove = async (id) => {
    const { error } = await supabase.from('fields').delete().eq('id', id);
    if (error) return Alert.alert('Error', error.message);
    fetchItems();
  };

  return (
    <View style={{padding:16}}>
      <Text style={{fontSize:18}}>Lotes</Text>
      <TextInput placeholder="Nombre lote" value={name} onChangeText={setName} style={{borderWidth:1, padding:8, marginVertical:8}} />
      <TextInput placeholder="Establishment ID" value={estId} onChangeText={setEstId} style={{borderWidth:1, padding:8, marginBottom:8}} />
      <Button title="Agregar lote" onPress={add} />
      <FlatList data={items} keyExtractor={i=>String(i.id)} renderItem={({item})=>(
        <View style={{padding:8, borderBottomWidth:1}}>
          <Text>{item.name} (est: {item.establishment_id})</Text>
          <Button title="Eliminar" onPress={()=>remove(item.id)} />
        </View>
      )} />
    </View>
  );
}
