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
   };

   state = {
    nomeUsuario: [],
    email: "",
    senha: "",
    status: "",
    idDelete: ""
   };
   
   componentDidMount(){
       this.loadUser();
   }

   loadUser = async () =>{
        try {
          const response = await api.get(`/alagamentos?email=${this.props.navigation.getParam("email", "")}`);

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

      <ScrollView style={styles.containerScrollView}>
        <View style={styles.container}>

            {this.state.nomeUsuario.map(usuario =>{
                return <View style={styles.postContainer} key={usuario._id}>
                    <Text>Rua: {usuario.rua}</Text>
                    <Text>Cidade: {usuario.cidade}</Text>
                    <Text>Estado: {usuario.estado}</Text>
                    <Button title="Excluir" onPress={()=>{
                      this.onPress(usuario._id);
                    }}/>
                </View>
            })} 

        </View> 
      </ScrollView>

      );
  };

  onPress = async (id)=>{
    try {

      const response = await api.delete(`/alagamentos/${id}`);

      const docs = response.data;

      console.log(docs);

      alert("Excluido com sucesso!");

      this.loadUser();

    } catch(e){

      alert("Erro ao excluir!");

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
