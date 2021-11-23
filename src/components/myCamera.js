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
        this.setState({
            photo: '',
            showCamera: true,
        })
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
                    <View style={styles.opciones}>
                        <TouchableOpacity onPress={()=> this.clearPhoto()} style={styles.rechazar}>
                            <Image 
                        source={{uri:"https://img.icons8.com/color/48/000000/delete-sign--v1.png"}}
                        style={{'height':50, 'width':50}}
                        resizeMode = 'contain'   
                        />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.savePhoto()} style={styles.aceptar}>
                        <Image 
                        source={{uri:"https://img.icons8.com/color/48/000000/ok--v1.png"}}
                        style={{'height':50, 'width':50}}
                        resizeMode = 'contain'   
                        />
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
                    <Image 
                        source={{uri:"https://img.icons8.com/material/24/000000/camera--v1.png"}}
                        style={{'height':50, 'width':50}}
                        resizeMode = 'contain'   
                        />
                    </TouchableOpacity>
                    
                </View>
                //si tiene permiso renderiza la camara sino: 
                :
                //render mensaje
                <Text style={styles.permiso}>No tienes permisos para usar la camara</Text>
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
        margin: 20
    },
    button:{
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    },
    opciones: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap', 
    },
    aceptar: {
        justifyContent: 'center',
        textAlign: 'center',
        marginLeft: 5,
        marginTop: 0,
        marginBottom: 20,
        paddingTop: 2,
        paddingBottom: 2,
        paddingHorizontal: 10,
        width: 83,
        height: 30,
    },
    rechazar:{
        justifyContent: 'center',
        textAlign: 'center',
        marginLeft: 5,
        marginTop: 0,
        marginBottom: 20,
        paddingTop: 2,
        paddingBottom: 2,
        paddingHorizontal: 10,
        width: 83,
        height: 30,
    },
    permiso: {
        marginLeft:10,
        color: 'red',
        marginTop: 10
    }

})






export default MyCamera;