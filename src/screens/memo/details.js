import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TextInput
} from 'react-native';
import { Color } from '../../global_config'

//async storage
// import Storage from 'react-native-storage';
// import AsyncStorage from '@react-native-community/async-storage';
// import realm from '../../storage/realm'


import Realm from 'realm'

const MemoSchema = {
    name: 'Memo',
    properties: {
        name: 'string',
        body: 'string',
    }
};




//class
export class MemoDetail extends Component {


    /**
     * lifecycle
     * 
     */
    constructor(props) {
        super(props)
        const realm = Realm.open({ schema: [MemoSchema] }).then(realm => {
            this.setState({
                realm: realm
            })
        })
    }

    /**
     * lifecycle
     * 
     */

    // save = () => {
    //     storage.save({
    //         key: 'memo',
    //         data: [
    //             {
    //                 id: 1,
    //                 name: 'kabaya',
    //                 age: 25,
    //             },
    //         ]
    //     })
    // }

    // load = () => {
    //     storage
    //         .load({ key: 'memo' })
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err))
    // }


    save = () => {
        Realm.open({ schema: [MemoSchema] }).then(realm => {
            //save
            realm.write(() => {
                realm.create('Memo', {
                    name: 'name1',
                    body: 'body1'
                })
            })
        });
    }

    load = () => {
        console.log("load")
        Realm.open({ schema: [MemoSchema] }).then(realm => {
            let memos = realm.objects('Memo');//全件取得
            for (let m of memos) {
                console.log(m);
                console.log(m.name);
            }
        });

    }

    /**
     * render
     * 
     */

    render = () => {
        console.log("render")
        this.save()
        this.load()

        return (
            <SafeAreaView style={styles.center}>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                >

                </TextInput>

            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    center: {
        flex: 1,
        backgroundColor: Color.textBackgroundColor,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: "blue"
    },
    textInput: {
        backgroundColor: Color.textBackgroundColor,
        flex: 1,
        fontSize: 21
    }
});



