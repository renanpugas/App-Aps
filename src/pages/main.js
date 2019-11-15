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

export default class Main extends Component{
  static navigationOptions = {
    title: "Projeto Sei Lá",
    headerLeft: null
   };

   state = {
    nomeUsuario: "",
    email: "",
    senha: "",
    status: ""
   };
   
  //  componentDidMount(){
  //      this.loadUser();
  //  };
  
  render(){
    return (
      
        <View style={styles.container}>

          <View style={styles.postContainer}>
            <Text style={styles.postTitle}>Login</Text>
            <TextInput style={styles.input}  onChangeText={this.onChangeTextEmail} placeholder="Email" />
            <TextInput style={styles.input} onChangeText={this.onChangeTextSenha} placeholder="Senha" secureTextEntry={true} />
            <View style={styles.button}>
              <Button onPress={this.onPress} title="Logar"/>
            </View>
            <Button style={styles.buttonMain} title="Cadastrar" onPress={()=>{
              
              this.props.navigation.navigate("Cadastro");
            
            }}/>
          </View>

        </View> 
      );
  };

  onPress = async ()=>{
    try {

      console.log(this.state.email);
      console.log(this.state.senha);

      const response = await api.post("/login", {
        email: this.state.email,
        senha: this.state.senha
      });

      const docs = response.data;
      const status = response.status;

      this.setState({ nomeUsuario: docs.email});
      this.setState({ status: "logado" });

      this.props.navigation.navigate("Home", {
        email: this.state.email
      });

    } catch(e){
      this.setState({ status: "Email e/ou senha incorretos!" });
      alert("Email e/ou senha incorretos!");
      console.log(e);
    }
  };

  onChangeTextEmail = (text)=>{
    this.setState({email: text});
  };

  onChangeTextSenha = (text)=>{
    this.setState({senha: text});
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
    borderBottomWidth: 0.5,
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
