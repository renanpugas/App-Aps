import { createAppContainer } from "react-native";
import { createStackNavigator } from "react-navigation";

import Main from "./pages/main";
import Home from "./pages/home";
import Cadastro from "./pages/cadastro";
import MeusAlagamentos from "./pages/meusAlagamentos";
import CadastroAlagamento from "./pages/cadastroAlagamento";
import BuscarAlagamento from "./pages/buscarAlagamento";

export default createStackNavigator({
    Main:{
        screen: Main
    }, 
    Home:{
        screen: Home
    },
    Cadastro: {
        screen: Cadastro
    },
    MeusAlagamentos: {
        screen: MeusAlagamentos
    },
    CadastroAlagamento: {
        screen: CadastroAlagamento
    },
    BuscarAlagamento: {
        screen: BuscarAlagamento
    }
    }, {
        initialRouteName: "Main",
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#DA552F"
            },
            headerTintColor: "#FFF"
    }
});