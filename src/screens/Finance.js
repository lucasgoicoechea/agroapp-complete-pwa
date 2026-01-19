import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Button, TextInput, Alert} from 'react-native';
import { supabase } from '../lib/supabase';

export default function Finance() {
  const [items,setItems] = useState([]);
  const [estId,setEstId] = useState('');
  const [category,setCategory] = useState('');
  const [amount,setAmount] = useState('');
  const [date,setDate] = useState('');

  useEffect(()=>{ fetchItems(); },[]);
  const fetchItems = async () => {
    const { data, error } = await supabase.from('expenses').select('*').order('date', { ascending: false });
    if (error) return Alert.alert('Error', error.message);
    setItems(data || []);
  };

  const add = async () => {
    if (!estId || !amount) return Alert.alert('Faltan datos','Completa establecimiento y monto');
    const { data, error } = await supabase.from('expenses').insert([{ establishment_id: Number(estId), category, amount: Number(amount), date }]);
    if (error) return Alert.alert('Error', error.message);
    setEstId(''); setCategory(''); setAmount(''); setDate('');
    fetchItems();
  };

  return (
    <View style={{padding:16}}>
      <Text style={{fontSize:18}}>Finanzas</Text>
      <TextInput placeholder="Establishment ID" value={estId} onChangeText={setEstId} style={{borderWidth:1, padding:8, marginVertical:8}} />
      <TextInput placeholder="Categoría" value={category} onChangeText={setCategory} style={{borderWidth:1, padding:8, marginBottom:8}} />
      <TextInput placeholder="Monto" value={amount} onChangeText={setAmount} keyboardType="numeric" style={{borderWidth:1, padding:8, marginBottom:8}} />
      <TextInput placeholder="Fecha (YYYY-MM-DD)" value={date} onChangeText={setDate} style={{borderWidth:1, padding:8, marginBottom:8}} />
      <Button title="Agregar gasto" onPress={add} />
      <FlatList data={items} keyExtractor={i=>String(i.id)} renderItem={({item})=>(
        <View style={{padding:8, borderBottomWidth:1}}>
          <Text>{item.date} — {item.category} — {item.amount}</Text>
        </View>
      )} />
    </View>
  );
}
