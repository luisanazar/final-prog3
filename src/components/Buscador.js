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
        marginTop: 20,
        flex: 1,
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },
    error: {
        marginBottom: 10,
    },
    botonMostrarTodo:{
        paddingBottom: 10,
        paddingTop: 10,
    }
})


export default Buscador;