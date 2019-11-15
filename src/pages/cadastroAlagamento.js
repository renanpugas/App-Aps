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

export default class CadastroAlagamento extends Component{
  static navigationOptions = {
    title: "Projeto Sei Lá"
  };

   state = {
    rua: "",
    cidade: "",
    estado: "",
    email_criador: this.props.navigation.getParam("email", "")
   };
  
  render(){
    return (
      
        <View style={styles.container}>

          <View style={styles.postContainer}>
            <Text style={styles.postTitle}>Cadastrar Ponto de Alagamento</Text>
            <TextInput style={styles.input} onChangeText={this.onChangeTextRua} placeholder="Nome da Rua" />
            <TextInput style={styles.input} onChangeText={this.onChangeTextCidade} placeholder="Nome da Cidade" />
            <TextInput style={styles.input} onChangeText={this.onChangeTextEstado} placeholder="Nome do Estado" />
            <View style={styles.button}>
              <Button onPress={this.onPress} title="Cadastrar"/>
            </View>
          </View>
        </View> 
      );
  };

  onPress = async ()=>{

    if(this.state.rua.length < 2){
        this.setState({ status: "O Nome da rua deve conter no mínimo 2 caracteres" });
    } else if(this.state.cidade.length < 2){
        this.setState({ status: "O Nome da cidade conter no mínimo 2 caracteres" });
    } else if(this.state.estado.length < 2){
        this.setState({ status: "O nome do estado deve conter no mínimo 3 caracteres" });
    } else {
    
        try {
        const response = await api.post("/alagamentos", {
            rua: this.state.rua,
            cidade: this.state.cidade,
            estado: this.state.estado,
            email_criador: this.state.email_criador
        });

        const docs = response.data;
        const status = response.status;

        console.log(docs);
        console.log(response);

        alert("Cadastrado com sucesso!");

        this.props.navigation.navigate("Home", {
          email: this.state.email_criador
        });

        } catch(e){
          alert("Erro ao cadastrar!");
          console.log(e);
        }
    }
  };

  onChangeTextRua = (text)=>{
    this.setState({rua: text});
  };

  onChangeTextCidade = (text)=>{
    this.setState({cidade: text});
  };

  onChangeTextEstado = (text)=>{
    this.setState({estado: text});
  };

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
  },
  
  postContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    margin: 20,
    padding: 20,
    width: "80%",
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
    marginVertical: 20
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
