import React,{useState,useEffect} from 'react'
import { StyleSheet, Alert, View,Dimensions,ScrollView, Text } from 'react-native'
import { Avatar, Button, Icon, Image, Input } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import {map, size,filter} from 'lodash'
import MapView from 'react-native-maps'

import { getCurrentLocation, loadImageFromGallery } from '../../utils/helpers'
import Modal from '../../components/Modal'

/*Para obtener el ancho de la pantalla */
const widthScreen = Dimensions.get("window").width

export default function AddRestaurantForm({toasRef,setLoading, navigation}) {

    const [formData, setFormData] = useState(defaultFormValues())

    const [errorDescription, setErrorDescription] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [errorName, setErrorName] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])
    const [isVisibleMap, setIsVisibleMap] = useState(false)
    const [locationRestaurant, setLocationRestaurant] = useState(null)


    const addRestaurant =() =>{
        console.log(formData)
    }

    return (
        <ScrollView style={styles.viewContainer}>
            <ImageRestaurant imageRestaurant={imagesSelected[0]} />
            <FormAdd 
                formData={formData}
                setFormData={setFormData}

                errorName={errorName}
                errorDescription={errorDescription}
                errorEmail={errorEmail}
                errorAddres={errorAddress}
                errorPhone={errorPhone}
                setIsVisibleMap ={setIsVisibleMap}
                locationRestaurant={locationRestaurant}
            />
            <UploadImage 
                toasRef={toasRef}
                imagesSelected={imagesSelected}
                setImagesSelected= {setImagesSelected}
            />
            <Button
                title="Crear Restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            />
            <MapRestaurant 
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                locationRestaurant={locationRestaurant}
                setLocationRestaurant={setLocationRestaurant}
                toasRef={toasRef}
            />
        </ScrollView>
    )
}

function MapRestaurant({isVisibleMap,setIsVisibleMap,locationRestaurant,setLocationRestaurant,toasRef}){

    const [newRegion, setNewRegion] = useState(null)

    useEffect(() => {
       (async()=>{
           const response = await getCurrentLocation()
           if(response.status){
                setNewRegion(response.location)
           
           }
       })()
    }, [])

    const confirmLocation =() =>{
        setLocationRestaurant(newRegion)
        toasRef.current.show("Localización guardada correctamente.",3000)
        setIsVisibleMap(false)
    }


    return (
        <Modal isVisible={isVisibleMap} setVisible={setIsVisibleMap}>
            <View>
                {
                    newRegion && (
                        <MapView
                            style={styles.mapStyle}
                            initialRegion={newRegion}
                            showsUserLocation ={true}
                            onRegionChange ={(region) => setNewRegion(region)}
                        >
                            <MapView.Marker 
                                coordinate={{
                                    latitude: newRegion.latitude,
                                    longitude: newRegion.longitude
                                }}
                                draggable // el usuario va poder cambiar la posicion del marcado
                            />
                        </MapView>
                    )
                }
                <View style={styles.viewMapBtn}>
                    <Button 
                    
                        title="Guardar Ubicación."
                        containerStyle ={styles.viewMapBtnContainerSave}
                        buttonStyle={styles.viewMapBtnSave}
                        onPress={confirmLocation}
                    />
                    <Button 
                    
                        title="Cancelar Ubicación."
                        containerStyle ={styles.viewMapBtnContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                        onPress={() => setIsVisibleMap(false)}
                    />
                </View>
            </View>
        </Modal>
    )
}

const defaultFormValues =() =>{
    return {
        name:"",
        description: "",
        email:"",
        phone:"",
        address:"",
        country:"CO",
        callingCode: "57"
    }
}

function ImageRestaurant({imageRestaurant}){
    return (
        <View
            style={styles.viewPhoto}
        >
            <Image 
                style={{ width: widthScreen,height: 200}}
                source ={
                    imageRestaurant
                    ? {uri: imageRestaurant}
                    : require  ("../../assets/no-image.png")
                }
            />
        </View>
    )
}

function UploadImage({toasRef,imagesSelected,setImagesSelected}){

    const imageSelect = async() =>{
        const response = await loadImageFromGallery([4,3]) // imagen mas rectangular, horizontalmente 25 mas largo que alto
        if(!response.status){
            toasRef.current.show("No has seleccionado ninguna imagen",3000)
            return
        }
        setImagesSelected([...imagesSelected, response.image])
    }

    const removeImage =(image) =>{
        Alert.alert(
            "Eliminar Imagen", //
            "¿Estas seguro de eliminar?",
            [
                {
                    text:"No",
                    style:"cancer"
                },
                {
                    text:"Si",
                    onPress:() =>{
                        setImagesSelected(
                            filter(imagesSelected,(imageUrl) => imageUrl !== image)
                        )
                    }
                }
            ]
            ,
            {
                cancelable:true
            }
        )
    }

    return(
        <ScrollView
            horizontal
            style={styles.viewImage}
        >
            {
                size(imagesSelected) <10 && (

                    <Icon
                        type="material-community"
                        name="camera"
                        color="#7a7a7a"
                        containerStyle={styles.containerIcon}
                        onPress={imageSelect}
                    />
                )
            }
            {

                map(imagesSelected,(imageRestaurant, index) => (
                    <Avatar 
                        key={index}
                        style={styles.miniatureStyle}
                        source={{ uri: imageRestaurant}}  
                        onPress={() => removeImage(imageRestaurant)}  
                    />
                ))
            }


        </ScrollView>
    )
}

function FormAdd({
    formData,setFormData,errorName,errorDescription,errorEmail,
    errorAddress,errorPhone,setIsVisibleMap,locationRestaurant
}){
    const [country, setCountry] = useState("CO")
    const [callingCode, setCallingCode] = useState("57")
    const [phone, setPhone] = useState("")

    const onChange =(e,type) =>{
        setFormData({...formData,[type] : e.nativeEvent.text})
    }

    return (
        <View style={styles.viewForm}>
            <Input 
                placeholder="Nombre del restaurante..."
                defaultValue={formData.name}
                onChange={(e) => onChange(e, "name")}
                errorMessage={errorName}
            />
            <Input 
                placeholder="Dirección del restaurante..."
                defaultValue={formData.addres}
                onChange={(e) => onChange(e, "address")}
                errorMessage={errorAddress}
                rightIcon ={{
                    type:"material-community",
                    name:"google-maps",
                    color: locationRestaurant ? "#442484" :"#c2c2c2",
                    onPress:() => setIsVisibleMap(true)
                }}
            />
            <Input 
                placeholder="Email del restaurante..."
                keyboardType= "email-address"
                defaultValue={formData.email}
                onChange={(e) => onChange(e, "email")}
                errorMessage={errorEmail}
            />
            <View style={styles.phoneView}>
                <CountryPicker 
                    withFlag //banderita
                    withCallingCode //Codigo pais
                    withFilter // buscar
                    withCallingCodeButton //Boton de codigo de llamada
                    containerStyle={styles.countryPicker}
                    countryCode ={country}
                    onSelect= {(country) =>{
                        setFormData({
                            ...formData,
                            "country": country.cca2,
                            "callingCode": country.callingCode[0]})

                    }}
                
                />
                <Input 
                    placeholder="WhatsApp del restaurante..."
                    keyboardType ="phone-pad"
                    containerStyle={styles.inputPhone}
                    defaultValue={formData.phone}
                    onChange={(e) => onChange(e, "phone")}
                    errorMessage={errorPhone}
                    
                />
                
            </View>
            <Input 
                    placeholder="Descripcion del restaurante..."
                    multiline
                    containerStyle={styles.textArea}
                    defaultValue={formData.description}
                    onChange={(e) => onChange(e, "description")}
                    errorMessage={errorDescription}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer:{
        height: "100%",
    },
    viewForm:{
        marginHorizontal: 10,
    },
    textArea:{
        height: 100,
        width: "100%"
    },
    phoneView:{
        width: "80%",
        flexDirection:"row",
       
    },
    inputPhone:{
        width: "80%"
    },
    btnAddRestaurant:{
        margin: 20,
        backgroundColor: "#442484"
    },
    viewImage:{
        flexDirection :"row",
        marginHorizontal:20,
        marginTop:30
    },
    containerIcon:{
        alignItems:"center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle:{
        width: 70,
        height: 70,
        marginRight: 10
    },
    viewPhoto:{
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },
    mapStyle:{
        width: "100%",
        height: 550
    },
    viewMapBtn:{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    viewMapBtnContainerCancel:{
        paddingLeft: 5
    },
    viewMapBtnContainerSave:{
        paddingRight: 5
    },
    viewMapBtnCancel:{
        backgroundColor: "#a65273"
    },
    viewMapBtnSave:{
        backgroundColor: "#442484"
    }
})
