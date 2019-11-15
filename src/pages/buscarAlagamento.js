import React, {Component} from 'react';
import api from "../services/api";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class BuscarAlagamento extends Component{
  static navigationOptions = {
    title: "Projeto Sei Lá"
   };

   state = {
    busca: "",
    dadosBusca: []
   };
   
  //  componentDidMount(){
  //      this.loadUser();
  //  };
  
  render(){
    return (
        
        <ScrollView style={styles.containerScrollView}>
            <View style={styles.container}>

            <View style={styles.postContainer}>
                <Text style={styles.postTitle}>Buscar Ponto de Alagamento</Text>
                <TextInput style={styles.input} onChangeText={this.onChangeTextBusca} placeholder="Nome da Rua, Cidade ou Estado" />
                <View style={styles.button}>
                <Button onPress={this.onPressRua} title="Buscar por Rua"/>
                </View>
                <View style={styles.button}>
                <Button onPress={this.onPressCidade} title="Buscar por Cidade"/>
                </View>
                <View style={styles.button}>
                <Button onPress={this.onPressEstado} title="Buscar por Estado"/>
                </View>

            </View>

            {this.state.dadosBusca.map(pontoAlagamento =>{
                return <View style={styles.postContainer}>
                    <Text>Rua: {pontoAlagamento.rua}</Text>
                    <Text>Cidade: {pontoAlagamento.cidade}</Text>
                    <Text>Estado: {pontoAlagamento.estado}</Text>
                </View>
            })}

            </View> 
        </ScrollView>
      );
  };

  onPressRua = async ()=>{
    try {

      const response = await api.get(`/alagamentos?rua=${this.state.busca}`);

      const docs = response.data;

      this.setState({ dadosBusca: docs});

      console.log(docs);

    //   this.props.navigation.navigate("Home", {
    //     email: this.state.email
    //   });

    } catch(e){
      alert(e);

      console.log(e);
    }
  };

  onPressCidade = async ()=>{
    try {

      const response = await api.get(`/alagamentos?cidade=${this.state.busca}`);

      const docs = response.data;

      this.setState({ dadosBusca: docs});

      console.log(docs);

    //   this.props.navigation.navigate("Home", {
    //     email: this.state.email
    //   });

    } catch(e){
      alert(e);

      console.log(e);
    }
  };

  onPressEstado = async ()=>{
    try {

      const response = await api.get(`/alagamentos?estado=${this.state.busca}`);

      const docs = response.data;

      this.setState({ dadosBusca: docs});

      console.log(docs);

    //   this.props.navigation.navigate("Home", {
    //     email: this.state.email
    //   });

    } catch(e){
      alert(e);

      console.log(e);
    }
  };

  onChangeTextBusca = (text)=>{
    this.setState({busca: text});
  };

};

const styles = StyleSheet.create({
  containerScrollView: {
    backgroundColor: "#333",
  },

  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  
  postContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    margin: 20,
    padding: 20,
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 3
  },
  
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },

  input: {
    //borderBottomColor: "blue",
    borderBottomWidth: 0.5
  },

  button:{
    marginVertical: 10
  },

  postDescription: {
    color: "#666",
  }, 

  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
