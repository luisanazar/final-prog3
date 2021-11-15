import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Camera } from 'expo-camera';
import {db, storage} from '../firebase/config'


class MyCamera extends Component {
    constructor(props){
        super(props);
        this.state ={
            permission: false, //permiso de la camara en el dispositivo
            photo: '', //url de la foto
            showCamera: true, //la quiero ver
        }
        this.camera //referencia a esta camara
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=>{
            this.setState({
                permission: true,
            })
        })
        .catch (error => console.log(error));
        //investigar
        // console.log(Camera);
        // console.log(this.camera);
    }

    takePicture(){
        this.camera.takePictureAsync()
        .then(photo => {
            this.setState({
                photo: photo.uri, //ruta interna temporal a la foto
                showCamera: false, 
            })
        })
        .catch (error => console.log(error));
    }

    savePhoto(){
        fetch(this.state.photo) //aca esta la url temporal
        .then(res=>res.blob()) //blob es lo mismo que json pero cuando usas archuvos binarios
        .then(image => {
            //guardamos la foto a storage y obetenemos la url publica
            //crear el nombre del archivo
            const ref = storage.ref(`photos/${Date.now()}.jpg`)// ruta interna de firebase
            ref.put(image) //put: metodo de firebase que se encarga de guardar datos
            //put: metodo asincronico --> then
                .then(()=>{
                    ref.getDownloadURL()
                    // una vez que storage gardo el arcihvo, 
                    //me devuelve la url (con esta voy a poder ver la foto)
                        .then(url =>{
                            this.props.onImageUpload(url) //le pasamos info al padre
                            this.setState({ 
                                photo: '', 
                            })
                        })
                        .catch (error => console.log(error));
                    
                })
                .catch (error => console.log(error));
        })
        .catch (error => console.log(error));


    }

    clearPhoto(){
        //cambiar el estado de photo a ""
        //cambiar de showCamera a true
    }

    render(){
        return(
            <View style= {styles.container}>
            {
                this.state.permission ?

                    this.state.showCamera == false ? //si la camara esta en falso:
                <React.Fragment>
                    <Image 
                        style={styles.cameraBody}
                        source={{uri:this.state.photo}}
                    /> 
                    <View>
                        <TouchableOpacity onPress={()=> this.savePhoto()}>
                            <Text>Aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.clearPhoto()}>
                            <Text>Rechazar</Text>
                        </TouchableOpacity>
                    </View>
                </React.Fragment> :
                    

                    // render de la camara
                <View style= {styles.container}> 
                    <Camera 
                        style={styles.cameraBody}
                        type= {Camera.Constants.Type.back}
                        ref={reference=> this.camera = reference}
                    />
                    <TouchableOpacity style={styles.button} onPress={()=> this.takePicture()}>
                        <Text>Sacar foto</Text>
                    </TouchableOpacity>
                    
                </View>
                //si tiene permiso renderiza la camara sino: 
                :
                //render mensaje
                <Text>No tienes permisos para usar la camara</Text>
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
    button:{
        flex: 1,
        justifyContent: 'center',
    },

})






export default MyCamera;