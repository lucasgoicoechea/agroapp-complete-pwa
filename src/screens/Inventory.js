import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Button, TextInput, Alert} from 'react-native';
import { supabase } from '../lib/supabase';

export default function Inventory() {
  const [items,setItems] = useState([]);
  const [product,setProduct] = useState('');
  const [qty,setQty] = useState('');
  const [type,setType] = useState('entry');

  useEffect(()=>{ fetchItems(); },[]);

  const fetchItems = async () => {
    const { data, error } = await supabase.from('stock_movements').select('*').order('id', { ascending: false });
    if (error) return Alert.alert('Error', error.message);
    setItems(data || []);
  };

  const add = async () => {
    if (!product || !qty) return;
    const { data, error } = await supabase.from('stock_movements').insert([{ product_name: product, type, quantity: Number(qty) }]);
    if (error) return Alert.alert('Error', error.message);
    setProduct(''); setQty('');
    fetchItems();
  };

  return (
    <View style={{padding:16}}>
      <Text style={{fontSize:18}}>Inventario</Text>
      <TextInput placeholder="Producto" value={product} onChangeText={setProduct} style={{borderWidth:1, padding:8, marginVertical:8}} />
      <TextInput placeholder="Cantidad" value={qty} onChangeText={setQty} keyboardType="numeric" style={{borderWidth:1, padding:8, marginBottom:8}} />
      <Button title={type==='entry' ? 'Registrar Entrada' : 'Registrar Salida'} onPress={add} />
      <View style={{height:8}} />
      <Button title="Alternar Entrada/Salida" onPress={()=>setType(t=> t==='entry' ? 'exit' : 'entry')} />
      <FlatList data={items} keyExtractor={i=>String(i.id)} renderItem={({item})=>(
        <View style={{padding:8, borderBottomWidth:1}}>
          <Text>{item.product_name} — {item.type} — {item.quantity}</Text>
        </View>
      )} />
    </View>
  );
}
