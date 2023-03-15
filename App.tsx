import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

import Constants from "expo-constants";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';



export default function Upload() {

  const [avatar, setAvatar] = useState();

  async function uploadImage() {
    if (Constants.platform.ios) {
     const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

     if (status === 'granted') {
      alert("Nós precisamos dessa permissão.");
      return;
     }
    }

    const data = await  ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All
    });
   
    if (data.cancelled){
      return;
    }
    if (!data.uri){
      return;
    }
    setAvatar(data);
  }

  return (
    <View style={styles.container}>
      <Image 
      source={{
        uri: avatar ? avatar.uri :
      'https://as1.ftcdn.net/v2/jpg/01/71/25/36/1000_F_171253635_8svqUJc0BnLUtrUOP5yOMEwFwA8SZayX.jpg'
    }}
      style={styles.avatar}
      />
      <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Text style={styles.buttonText}>Escolher Imagem</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button} onPress={() => setAvatar(null)} disabled={!avatar}>
        <Text style={styles.buttonText}>Remover Imagem</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 140,
    height: 30,
    borderRadius: 3,
    backgroundColor: '#7159c1',
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 10,
  },
  buttonText:{
    color: '#fff'
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  }
})

