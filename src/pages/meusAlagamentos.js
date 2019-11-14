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

export default class MeusAlagamentos extends Component{
  static navigationOptions = {
    title: "Projeto Sei Lá",
    headerLeft: null
   };

   state = {
    nomeUsuario: [],
    email: "",
    senha: "",
    status: ""
   };
   
   componentDidMount(){
       this.loadUser();
   }

   loadUser = async () =>{
        try {
          const response = await api.get("/alagamentos?email=ronaldo@example.com");

          const docs = response.data;

          console.log(docs);

          console.log(docs.email_criador);

          this.setState({ nomeUsuario: docs});

          console.log(this.state.nomeUsuario);

        } catch(e){

          console.log(e);
        }
   };
  
  render(){
    return (
      
        <View style={styles.container}>

                <Text style={styles.postTitle}>Oi</Text>
                {this.state.nomeUsuario.map(usuario =>{
                    return <View style={styles.postContainer}>
                        <Text>Rua: {usuario.rua}</Text>
                        <Text>Cidade: {usuario.cidade}</Text>
                        <Text>Estado: {usuario.estado}</Text>
                        <Button title="Excluir" />
                    </View>
                })}          

        </View> 
      );
  };

  onPress = async ()=>{
    try {

      const response = await api.post("/login", {
        email: this.state.email,
        senha: this.state.senha
      });

      const docs = response.data;
      const status = response.status;

      console.log(docs);
      console.log(response);

      this.setState({ nomeUsuario: docs.email});
      this.setState({ status: "logado" });
    } catch(e){
      this.setState({ status: "Email e/ou senha incorretos!" });

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
    justifyContent: "flex-start",
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
