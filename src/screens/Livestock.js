import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Button, TextInput, Alert} from 'react-native';
import { supabase } from '../lib/supabase';

export default function Livestock() {
  const [items,setItems] = useState([]);
  const [tag,setTag] = useState('');
  const [category,setCategory] = useState('');

  useEffect(()=>{ fetchItems(); },[]);
  const fetchItems = async () => {
    const { data, error } = await supabase.from('animals').select('*').order('id', { ascending: false });
    if (error) return Alert.alert('Error', error.message);
    setItems(data || []);
  };

  const add = async () => {
    if (!tag) return Alert.alert('Faltan datos','Ingrese tag');
    const { data, error } = await supabase.from('animals').insert([{ tag, category }]);
    if (error) return Alert.alert('Error', error.message);
    setTag(''); setCategory('');
    fetchItems();
  };

  return (
    <View style={{padding:16}}>
      <Text style={{fontSize:18}}>Ganadería</Text>
      <TextInput placeholder="Caravana / Tag" value={tag} onChangeText={setTag} style={{borderWidth:1, padding:8, marginVertical:8}} />
      <TextInput placeholder="Categoría" value={category} onChangeText={setCategory} style={{borderWidth:1, padding:8, marginBottom:8}} />
      <Button title="Agregar animal" onPress={add} />
      <FlatList data={items} keyExtractor={i=>String(i.id)} renderItem={({item})=>(
        <View style={{padding:8, borderBottomWidth:1}}>
          <Text>{item.tag} — {item.category}</Text>
        </View>
      )} />
    </View>
  );
}
