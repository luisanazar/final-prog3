import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';

class Buscador extends Component{
    constructor(props){
        super(props);
        this.state = {
            search:''
        }
    }

    render(){
        return(
            <View style= {styles.containerBuscador}>
                <TextInput
                style= {styles.input}
                onChangeText={(texto)=>this.setState ({search: texto})}
                placeholder= 'Buscar'
                keyboardType='default' />

            <TouchableOpacity onPress={() => this.props.buscar (this.state.search)}> 
            <Text>Buscar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.mostrarTodo()}> 
            <Text>Mostrar todos los posteos</Text>
            </TouchableOpacity>
            </View>
          
        )
    }
}
const styles = StyleSheet.create({
    containerBuscador:{
        flex: 1,
    },
    input: {
        height: 20,
    }
})


export default Buscador;