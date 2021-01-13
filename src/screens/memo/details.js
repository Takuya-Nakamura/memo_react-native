import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    Text,
    Animated,
    Image,
    Alert,
    Dimensions
} from 'react-native';
import { Color } from '../../global_config'

import Realm from 'realm'
import { realmOptions } from '../../storage/realm'

const width = Dimensions.get('window').width
const iconMargin = 44
const iconSize = 65


//class
export class MemoDetail extends React.Component {

    /**
     * lifecycle
     * 
     */
    constructor(props) {
        super(props)
        const { params } = this.props.route;
        this.state = {
            id: (params && params.id) ? params.id : this.id(),
            isEdit: (params && params.id) ? true : false,
            text: '',
            hand: 'left' //left, right

        }
    }
    componentDidMount = () => {
        this.loadSetting()
        if (this.state.isEdit) {
            this.load(this.state.id)

        }
    }


    /**
     * action
     * 
     */
    save = (text) => {
        const { isEdit, created } = this.state
        if (!text) return
        Realm.open(realmOptions).then(realm => {
            realm.write(() => {
                const date = new Date()
                const params = {
                    memo: {},
                    id: this.state.id,
                    text: text,
                    updated: date,
                    created: isEdit ? created : date
                }

                realm.create(
                    'Memo',
                    params,
                    true)
            })
            this.setState({ text: text })
        });
    }

    load = (id) => {
        Realm.open(realmOptions).then(realm => {
            let memos = realm.objects('Memo').filtered('id == $0', id);//全件取得
            this.setState({
                memo: memos[0],
                text: memos[0].text,
                created: memos[0].created,
                updated: memos[0].updated
            })
        });
    }
    loadSetting = () => {
        Realm.open(realmOptions).then(realm => {
            let setting = realm.objects('Setting').filtered('id == $0', '1')[0];
            console.log("loadSetting", setting)
            this.setState({
                hand: setting.hand
            })
        });
    }

    delete = () => {
        this.props.navigation.goBack()
        Realm.open(realmOptions).then(realm => {
            realm.write(() => {
                realm.delete(this.state.memo)
            })
        });

    }
    deleteAlert = () => {
        Alert.alert(
            "削除してよいですか？",
            '',
            [
                { text: 'Cancel' },
                { text: 'OK', onPress: this.delete }
            ]
        )
    }

    // truncate = () => {
    //     Realm.open(realmOptions).then(realm => {
    //         realm.write(() => {
    //             realm.delete(realm.objects('Memo'))
    //         })
    //     });
    // }

    // deleteModel = () => {
    //     console.log("deleteModel")
    //     Realm.open(realmOptions).then(realm => {
    //         realm.write(() => {
    //             realm.deleteModel('Memo')
    //         })
    //     });
    // }

    id = () => {
        var strong = 1000;
        return new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16)
    }

    /**
     * render
     * 
     */
    render = () => {
        const { isEdit, hand } = this.state
        const footer__item1 = hand == 'left' ? styles.footer__item1 : styles.footer__item3
        const footer__item2 = hand == 'left' ? styles.footer__item2 : styles.footer__item4

        return (
            <SafeAreaView style={styles.center}>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    onChangeText={(text) => this.save(text)}
                    defaultValue={this.state.text}
                    autoFocus={true}

                />

                <Animated.View style={[styles.footer]}>
                    <View style={footer__item1}>
                        <TouchableOpacity onPress={this.props.navigation.goBack}>
                            <Image style={styles.icon} source={require('../../assets/back_mark.png')} />
                        </TouchableOpacity>
                    </View>

                    {/*  */}

                    {isEdit && <View style={footer__item2}>
                        <TouchableOpacity onPress={this.deleteAlert} >
                            <Image style={styles.icon} source={require('../../assets/cross_mark.png')} />
                        </TouchableOpacity>
                    </View>
                    }
                </Animated.View>


            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    center: {
        flex: 1,
        backgroundColor: Color.textBackgroundColor,

    },
    textInput: {
        backgroundColor: Color.textBackgroundColor,
        flex: 1,
        fontSize: 21,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },

    backButton: {
        height: iconSize,
        width: iconSize,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#f59542',

        justifyContent: "center",
        alignItems: "center"
    },
    backButton__text: {
        color: "#f59542",
        fontSize: 40,
    },
    absolueBottom1: {
        position: 'absolute',
        bottom: 30,
        left: 30
    },


    // styles footer
    footer: {
        flexDirection: 'row',
    },
    footer__item1: {
        position: 'absolute',
        bottom: 0,
        left: iconMargin
    },
    footer__item2: {
        position: 'absolute',
        bottom: 0,
        left: iconMargin * 3
    },


    footer__item3: {
        position: 'absolute',
        bottom: 0,
        right: iconMargin
    },
    footer__item4: {
        position: 'absolute',
        bottom: 0,
        right: iconMargin * 3
    },
    icon: {
        width: iconSize,
        height: iconSize,
    }
});



