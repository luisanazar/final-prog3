import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList, Image} from 'react-native';
import firebase from 'firebase';
import {db, auth} from '../firebase/config';


class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
            likes: 0, //cantidad de likes q tiene el post
            myLike: false, //mi like
            showModal: false,
            comment: '', //limpiar el campo despues de enviar
 
        }
    }

    componentDidMount(){ //le preguntamsos al psoteo si tiene el array de likes
        if (this.props.postData.data.likes) {
            this.setState({
                likes: this.props.postData.data.likes.length, //dato se actualiza en likes
                myLike: this.props.postData.data.likes.includes(auth.currentUser.email), //includes devuelve t o f
            })
        } //si no existe manda undefined (no existe)

    }

    darLike(){

        //agregar mi usuario a un array de usuarios que likearon
            //updatear el registro (documento)
        db.collection('posts').doc(this.props.postData.id).update({
            //que actualizo
            likes: firebase.firestore.FieldValue.arrayUnion (auth.currentUser.email)
        })
        //cambiar estado
        .then(()=> {
            this.setState({
                likes: this.state.likes + 1, //this.props.postData.data.likes.length
                myLike: true,
            })
        })
    }

    quitarLike(){
            db.collection('posts').doc(this.props.postData.id).update({
                likes: firebase.firestore.FieldValue.arrayRemove (auth.currentUser.email)
            })
            .then(()=> {
                this.setState({
                    likes: this.state.likes - 1, //this.props.postData.data.likes.length
                    myLike: false,
                })
            })
    }

    showModal(){
        this.setState({
          showModal: true,
        })
    }

    hideModal(){
        this.setState({
            showModal: false,
          })
    }

    guardarComentario(){
        console.log('guardando comentario');
        //Armar el comentario que vamos a guardar
        let oneComment = {
            createdAt: Date.now(),
            author: auth.currentUser.email,
            comment: this.state.comment, //para limpiar el campo dsp de enviar
        }
        //Guardarlo en una coleccion: modificar un posteo
        //Identificar el documento que queremos modificar
        db.collection('posts').doc(this.props.postData.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion(oneComment),
            //Field value: en que campo qeres guardar los datos
            //Array union: adentro del campo genera un array y le pone el elemento que esta adentro de los parentesis
        })
         //Conseguir y limpiar el estado
        .then(()=>{
            this.setState({
                comment: ''
            })
        })
        
           
        
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Texto del post: {this.props.postData.data.texto}</Text>
                <Text>User: {this.props.postData.data.owner}</Text>
                <Text>Likes: {this.state.likes} </Text>
                <Image source={{uri:this.props.postData.data.photo}}
                    style={{'height': 350}}
                    resizeMode = 'contain'   
                /> 
                {this.state.myLike == false ? 
                    <TouchableOpacity onPress={()=> this.darLike()}>
                        <Text>Me gusta</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={()=> this.quitarLike()}>
                        <Text>Quitar like</Text>
                    </TouchableOpacity>
                }
                {/* VER MODAL */}
                <TouchableOpacity onPress={()=>this.showModal()}>
                    <Text>Ver comentarios</Text>
                </TouchableOpacity>
                {/* MODAL PARA COMENTARIOS */}
                { this.state.showModal ?
                     <Modal 
                     style={styles.modalContainer}
                     visible= {this.state.showModal}
                     animationType= 'slide'
                     transparent={false}
                     
                    >
                        <TouchableOpacity onPress={()=>this.hideModal()}>
                            <Text style={styles.closeButton}>X</Text>
                        </TouchableOpacity>
                        {/* FLAT LIST PARA MOSTRAR COMENTARIO */}
                        { ! this.props.postData.data.comments || this.props.postData.data.comments.length == 0 ? 
                        <Text> Aún no hay comentarios. Sé el primero en opinar.</Text>
                        : 
                                <FlatList
                                data={this.props.postData.data.comments} //array
                                keyExtractor={(comment)=> comment.createdAt.toString()} //un parametro que es cada uno de los elementos del array.
                                //busca la fecha de creacion y lo pasa a cadena de texto 
                                renderItem= {({item})=> <Text>{item.author}: {item.comment}</Text>}
                            
                            />  
                    }
                            


                        {/* FORMULARIO PARA NUEVO COMENTARIO */}
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Comentar"
                                keyboardType="default"
                                multiline
                                onChangeText={text => this.setState({comment: text})}
                                value={this.state.comment}
                            />
                            <TouchableOpacity  
                                style={styles.button}
                                disabled={this.state.comment.length == 0 ? true : false} 
                                onPress={()=>this.guardarComentario()}>
                                    <Text style={styles.textButton}>Guardar comentario</Text>
                            </TouchableOpacity>
                        </View>
                        

                     </Modal>    :
                     <Text></Text>
                }
                
            </View>
            
        )
    }


}

const styles = StyleSheet.create({
    container:{
        marginBottom: 20,
        borderRadius:4,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginTop: 80,
    },
    modalContainer:{
        width:'97%',
        borderRadius:4,
        padding: 5,
        alignSelf:'center',
        boxShadow: 'rgb(204 204 204) 0px 0px 9px 7px',
        marginVertical: 10,
        marginTop:20,
        marginBottom: 10, 

    },
    closeButton:{
        color:'#fff',
        padding:5,
        backgroundColor:'#dc3545',
        alignSelf: 'flex-end',
        borderRadius:4,
        paddingHorizontal:8,
    },
    input:{
        height:20,
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
    }

})

export default Post;