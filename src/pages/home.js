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

export default class Home extends Component{
  static navigationOptions = {
    title: "Projeto Sei Lá",
    headerLeft: null
   };

   state = {
    email: ""
   };
   
   componentDidMount(){
       this.loadUser();
   }

   loadUser = async () =>{
      const email = this.props.navigation.getParam('email', "");
      this.setState({ email });
   };
  
  render(){

    return (
        <View style={styles.container}>

          <View style={styles.postContainer}>
            <Text style={styles.postTitle}>Bem vindo {this.state.email}</Text>
            <View style={styles.button}>
              <Button title="Cadastrar Alagamento" />
            </View>
            <View style={styles.button}>
              <Button title="Meus Alagamentos Cadastrados" />
            </View>
            <View style={styles.button}>
              <Button title="Buscar Ponto de Alagamento" />
            </View>
          </View>

        </View> 
      );
  };

  onPress = ()=>{
    this.props.navigation.navigate("Home", {
      email: this.state.email
    });
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
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 3
  },
  
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },

  button:{
    marginVertical: 10,
    width: "60%",
    marginLeft: "20%"
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
