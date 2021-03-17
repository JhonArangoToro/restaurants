import React from 'react'
import { StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'

export default function Modal({isVisible, setVisible, children}) { //Childen los hijos que pertenecen al modal
    return (
        <Overlay
            isVisible={isVisible}
            overlayStyle ={styles.overlay}
            onBackdropPress ={() => setVisible(false)} //cuando presionen por fuera del modal
        >
            {
                children
            }
            
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay :{
        width:"90%"
    }
})
