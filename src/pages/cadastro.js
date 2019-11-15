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

export default class Cadastro extends Component{
  static navigationOptions = {
    title: "Projeto Sei Lá"
  };

   state = {
    nome: "",
    email: "",
    celular: "",
    senha: "",
    confirmarSenha: "",
    status: ""
   };
  
  render(){
    return (
      
        <View style={styles.container}>

          <View style={styles.postContainer}>
            <Text style={styles.postTitle}>Cadastrar Usuário</Text>
            <TextInput style={styles.input} onChangeText={this.onChangeTextNome} placeholder="Nome" />
            <TextInput style={styles.input} onChangeText={this.onChangeTextEmail} placeholder="Email" />
            <TextInput style={styles.input} onChangeText={this.onChangeTextCelular} placeholder="Celular" />
            <TextInput style={styles.input} onChangeText={this.onChangeTextSenha} placeholder="Senha" secureTextEntry={true} />
            <TextInput style={styles.input} onChangeText={this.onChangeTextConfirmarSenha} placeholder="Confirmar Senha" secureTextEntry={true} />
            <View style={styles.button}>
              <Button onPress={this.onPress} title="Cadastrar"/>
            </View>
          </View>

        </View> 
      );
  };

  onPress = async ()=>{

    if(this.state.nome.length < 2){
        this.setState({ status: "O Nome deve conter no mínimo 3 caracteres" });
    } else if(this.state.celular.length < 9){
        this.setState({ status: "O Celular deve conter no mínimo 9 caracteres" });
    } else if(!this.state.email.includes("@")){
        this.setState({ status: "Email digitado inválido" });
    } else if(this.state.senha.length < 6){
        this.setState({ status: "A senha deve conter no mínimo 6 caracteres" });
    } else if(this.state.senha != this.state.confirmarSenha){
        this.setState({ status: "As senhas não são iguais"});
    } else {
    
        try {
        const response = await api.post("/usuarios", {
            nome: this.state.nome,
            email: this.state.email,
            celular: this.state.celular,
            senha: this.state.senha
        });

        const docs = response.data;
        const status = response.status;

        console.log(docs);
        console.log(response);

        alert("Cadastrado com sucesso!");
        this.props.navigation.navigate("Main");

        } catch(e){
          alert("Erro ao cadastrar! Tente Novamente");
          console.log(e);
        }
    }
  };

  onChangeTextNome = (text)=>{
    this.setState({nome: text});
  };

  onChangeTextEmail = (text)=>{
    this.setState({email: text});
  };

  onChangeTextCelular = (text)=>{
    this.setState({celular: text});
  };

  onChangeTextSenha = (text)=>{
    this.setState({senha: text});
  };

  onChangeTextConfirmarSenha = (text)=>{
    this.setState({confirmarSenha: text});
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
