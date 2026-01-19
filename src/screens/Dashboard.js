import React from 'react';
import {View, Text, Button} from 'react-native';

export default function Dashboard({navigation}) {
  return (
    <View style={{padding:16}}>
      <Text style={{fontSize:20, marginBottom:12}}>Dashboard</Text>
      <Button title="Establecimientos" onPress={()=>navigation.navigate('Establishments')} />
      <View style={{height:8}} />
      <Button title="Lotes" onPress={()=>navigation.navigate('Lots')} />
      <View style={{height:8}} />
      <Button title="Inventario" onPress={()=>navigation.navigate('Inventory')} />
      <View style={{height:8}} />
      <Button title="Aplicaciones" onPress={()=>navigation.navigate('Applications')} />
      <View style={{height:8}} />
      <Button title="Ganadería" onPress={()=>navigation.navigate('Livestock')} />
      <View style={{height:8}} />
      <Button title="Maquinaria" onPress={()=>navigation.navigate('Machines')} />
      <View style={{height:8}} />
      <Button title="Personal" onPress={()=>navigation.navigate('Personnel')} />
      <View style={{height:8}} />
      <Button title="Finanzas" onPress={()=>navigation.navigate('Finance')} />
    </View>
  );
}
