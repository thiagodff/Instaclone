import React, { Component } from 'react';
import api from '../services/api';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Image, KeyboardAvoidingView } from 'react-native'; 
import { ImagePicker, Permissions, Constants } from 'expo';

export default class New extends Component {
  static navigationOptions = {
    headerTitle: 'Nova publicação',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      flex: 1,
    }
  };

  state = {
    author: '',
    place: '',
    description: '',
    hashtags: '',
    preview: null,
    image: null,
  };

  handleSelectImage = async () => {
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image, 
    });

    if (!result.cancelled) {
      const preview = {uri: result.uri};

      let prefix;
      let ext;

      /* Aparentemente o expo nao devolve um fileName
      if(result.fileName){
        [ prefix, ext ] = result.fileName.split('.');
        ext = ext.toLowerCase() === 'heic' ? 'jpg' : 'jpg';
      } else {
        prefix = new Date().getTime();
        ext = 'jpg';
      }*/

      prefix = new Date().getTime();
      ext = 'jpg';

      const image = {
        uri: result.uri,
        type: result.type,
        name: `${prefix}.${ext}`
      }

      this.setState({ preview, image });

    } else{
      this.setState({ preview: null });
    }
    
  };

  handleSubmit = async () => {
    const data = new FormData();
    data.append('image', this.state.image);
    data.append('author', this.state.author);
    data.append('place', this.state.place);
    data.append('description', this.state.description);
    data.append('hashtags', this.state.hashtags);
    

    await api.post('posts', data);

    this.props.navigation.navigate('Feed');   //envia o autor para rota inicial da aplicacao
  }

  render() {

    let { preview } = this.state;

    return (
      <View styles={styles.container}>
        
        <TouchableOpacity style={styles.selectButton} onPress={this.handleSelectImage }>
          <Text style={styles.selectButtontext} >Selecionar imagem</Text>
        </TouchableOpacity>

        { this.state.preview && <Image style={ styles.preview } source={ this.state.preview }  />}

        <TextInput        
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Nome do autor"
          placeholderTextColor="#999"
          value={this.state.author}
          onChangeText={author => this.setState({ author })}
        />

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Local da foto"
          placeholderTextColor="#999"
          value={this.state.place}
          onChangeText={place => this.setState({ place })}
        />
        
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Descrição"
          placeholderTextColor="#999"
          value={this.state.description}
          onChangeText={description => this.setState({ description })}
        />
        

        
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Hashtags"
          placeholderTextColor="#999"
          value={this.state.hashtags}
          onChangeText={hashtags => this.setState({ hashtags })}
        />

        
        <TouchableOpacity style={styles.shareButton} onPress={ this.handleSubmit }>
          <Text style={styles.shareButtontext} >Compartilhar</Text>
        </TouchableOpacity>

        

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  selectButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCC',
    borderStyle: 'dashed',
    height: 42,

    justifyContent: 'center',
    alignItems: 'center',
  },

  selectButtonText: {
    fontSize: 16,
    color: '#666',
  },

  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 4,
  },

  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginTop: 10,
    fontSize: 16,
  },

  shareButton: {
    backgroundColor: '#7159c1',
    borderRadius: 4,
    height: 42,
    marginTop: 15,

    justifyContent: 'center',
    alignItems: 'center',
  },

  shareButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
});
