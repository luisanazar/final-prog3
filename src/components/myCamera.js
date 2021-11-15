import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { Camera } from 'expo-camera';
import { db, storage } from '../firebase/config';

class MyCamera extends Component{
    constructor(props){
        super(props);
        this.state = {
            permission: false, //permisos de la cámara en el dispositivo
            photo: '', //para guardar la url de la foto
            showCamera: true,
        }
        this.camera //la referencia a esta cámara.
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then(()=> {
                this.setState({
                    permission: true,
                })
            })
            .catch( error => console.log(error))
        //Investigar
        //console.log(Camera);
        //console.log(this.camera);
    }

    takePicture(){
        this.camera.takePictureAsync()
            .then((photo) => {
                this.setState({
                    photo: photo.uri //tiene la ruta interna temporal a la foto.

                })
                
            })
            .catch( error => console.log(error))
    }

    savePhoto(){
        fetch(this.state.photo)
         .then(res => res.blob()) //blob es lo mismo que el json pero para cuando usas archivos binarios. la imagen tiene simbolos raros, es un archivo binario hecho con 0 y 1s, la manera de procesarlo es a través de blob
         .then(image => {
             //Vamos a guardar la foto en storage y obtener la url pública.
           const ref = storage.ref(`photos/${Date.now()}.jpg`)
           ref.put(image) //put es un método asincrónico que le dice a firebase que guarde la foto en algun lugar
                .then(() => {
                   ref.getDownloadURL() 
                        .then(url => {
                            this.props.onImageUpload(url); //método inventado
                            this.setState({
                                   photo:'',
                            })
                         })
                         .catch (error => console.log(error))
                 })
                 .catch (error => console.log(error))
         })
         .catch(error => console.log(error))
       }
       

    clearPhoto(){
        //cambiar el estado de photo a ''
        //cambiar showCamera a true
        this.setState({
            photo: '',
            showCamera: true,
        })
    }

    render(){
        return(
            <View style={styles.container}>
                {
                    this.state.permission ?
                        this.state.showCamera === false ?
                        <React.Fragment>

                            <Image
                                style={styles.cameraBody}
                                source={{uri: this.state.photo}}
                            />
                            <View>
                                <TouchableOpacity onPress={()=> this.savePhoto}>
                                    <Text>Aceptar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> this.clearPhoto}>
                                    <Text>Rechazar</Text>
                                </TouchableOpacity>
                            </View>

                        </React.Fragment>
                    :

                    //render de la cámara

                    <View style={styles.container}>
                        <Camera
                            style= {styles.cameraBody}
                            type={Camera.Constants.Type.back}
                            ref= {reference => this.camera = reference}
                        />
                        <TouchableOpacity style = {styles.button} onPress = {() => this.takePicture()}>
                            <Text>Sacar Foto</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    //render mensaje
                    <Text>No tienes permisos para usar la cámara</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    cameraBody:{
        flex: 7,
       
    },
    button: {
        flex: 1,
        justifyContent: 'center',
    }
})

export default MyCamera;