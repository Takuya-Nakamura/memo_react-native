import React, { Component } from 'react';
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard, Dimensions } from 'react-native';

import { Color } from '../../global_config'

import Realm from 'realm'
import { realmOptions } from '../../storage/realm'

const width = Dimensions.get('window').width
const iconMargin = 44
const iconSize = 65
const bottomPos = 44 * 2

//class
export class TestComponent extends React.Component {

    /**
     * lifecycle
     * 
     */
    constructor(props) {
        super(props)
        const { params } = this.props.route;
        this.state = {

        }
    }
    componentDidMount = () => {

    }



    /**
     * render
     * 
     */
    render = () => {
        return (

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}

                behavior='position'
                contentContainerStyle={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <Text style={styles.header}>Header</Text>
                        <TextInput placeholder="Username" style={styles.textInput} multiline={true} />
                        <View style={styles.btnContainer}>
                            <Button title="Submit" onPress={() => null} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={{ position: 'absolute', left: 100, bottom: 10 }}>test</Text>
            </KeyboardAvoidingView>
        );

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around"
    },
    header: {
        fontSize: 36,
        marginBottom: 400,
        backgroundColor: "#ccdddd"
    },
    textInput: {
        height: 120,
        borderColor: "#000000",
        borderWidth: 1,
        marginBottom: 36
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 12
    }
});



