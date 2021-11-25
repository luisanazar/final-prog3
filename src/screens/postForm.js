import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { auth, db } from "../firebase/config";
import MyCamera from "../components/MyCamera";

class postForm extends Component{
    constructor(props){
        super(props)
        this.state={
            textoPost:'',
            showCamera: true,
            url: '',
            description: '',
        }
    }


    submitPost(){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            texto: this.state.textoPost,
            createdAt: Date.now(),
            photo: this.state.url,
        })
        .then( ()=>{ //limpiar el form de carga
            this.setState({
                textoPost:'', //los datos en el campo input se guardan en el estado.        // para que limpie lo dejamos vacio denuevo y que redireccione a la home
            })
            //redireccion
            this.props.drawerProps.navigation.navigate('Home')
        })
        .catch()
    }

    onImageUpload(url){
        this.setState({
            showCamera: false,
            url: url
        })
    }

    render(){
        return(
            <View style= {styles.container}>
                {this.state.showCamera ? 
                <MyCamera onImageUpload={(url)=> {this.onImageUpload(url)}}/> : //sino, renderiza el resto del form
                <View style={styles.formContainer}>
                    <Text>New post</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text)=>this.setState({textoPost: text})}
                        placeholder='Escribi aqui'
                        keyboardType='default'
                        multiline //campo input en text align
                        value= {this.state.textoPost}
                    />
                    <TouchableOpacity style={styles.button} onPress={()=>this.submitPost()}>
                        <Text style={styles.textButton}>Guardar</Text>    
                    </TouchableOpacity>
                </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:100,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    },
    container:{
        flex: 1,
    },

})

export default postForm;