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

            <TouchableOpacity style= {styles.botonMostrarTodo} onPress={() => this.props.buscar (this.state.search)}> 
            <Text>Buscar</Text>
            </TouchableOpacity>
            <TouchableOpacity style= {styles.botonMostrarTodo} onPress={() => this.props.mostrarTodo()}> 
            <Text>Mostrar todos los posteos</Text>
            </TouchableOpacity>
            </View>
          
        )
    }
}
const styles = StyleSheet.create({
   containerBuscador:{
        paddingHorizontal: 10,
    },
    input: {
        height: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,

    },
    error: {
        marginBottom: 10,
    },
    botonMostrarTodo:{
        paddingBottom: 10,
        paddingTop: 10,
        border: 'black solid 1px'
    }
})


export default Buscador;