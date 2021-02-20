import React, { Component } from 'react';
import InputScrollView from 'react-native-input-scroll-view';
import { AdMobBanner } from 'react-native-admob';

import {
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    Text,
    Animated,
    Image,
    Alert,
    Dimensions,
    Platform,
    Keyboard,
} from 'react-native';
import { Color } from '../../global_config'

import Realm from 'realm'
import { realmOptions } from '../../storage/realm'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { ScrollView } from 'react-native-gesture-handler';
import { adUnitID } from '../../config/admob'


const { width, height } = Dimensions.get('window')
const iconMargin = (width / 100) * 4
const iconSize = 50
const bottomPosition = 44 * 2

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
            order: 0,
            hand: 'left', //left, right
            bottomPosition: bottomPosition,
        }


    }
    componentDidMount = () => {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        );

        this.keyboardWillShowListener = Keyboard.addListener(
            'keyboardWillShow',
            this._keyboardWillShow,
        );
        this.keyboardWillHideListener = Keyboard.addListener(
            'keyboardWillHide',
            this._keyboardWillHide,
        );

        this.loadSetting()
        if (this.state.isEdit) {
            this.load(this.state.id)
        }
    }
    componentWillUnmount() {
    }

    _keyboardWillShow = (event) => {
        console.log("TEST")
        const keybordHeight = event.endCoordinates.screenY
        const textInputHeihgt = height - keybordHeight + 80
        this.setState({
            bottomPosition: iconSize,
            keyBoard: true,
            height: textInputHeihgt,

        })
    }

    _keyboardWillHide = () => {
        this.setState({
            bottomPosition: bottomPosition,
            keyBoard: false,
            height: height,
            pointerEvents: 'none',
        })
    }

    /**
     * action
     * 
     */
    save = (text) => {
        const { isEdit, created, order } = this.state
        if (!text) return
        Realm.open(realmOptions).then(realm => {
            realm.write(() => {
                const date = new Date()
                const params = {
                    memo: {},
                    id: this.state.id,
                    text: text,
                    order: order,
                    updated: date,
                    created: isEdit ? created : date,
                    keyBoard: false,
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
                order: memos[0].order,
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
            "削除しますか？",
            '',
            [
                { text: 'Cancel' },
                { text: 'OK', onPress: this.delete }
            ]
        )
    }

    keybordDissMiss = () => {
        console.log("keybordDissMiss")
        Keyboard.dismiss()
    }

    id = () => {
        var strong = 1000;
        return new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16)
    }


    /**
     * render
     * 
     */
    render = () => {
        const { isEdit, hand, bottomPosition } = this.state
        const footer__item1 = hand == 'left' ? styles.footer__item1 : styles.footer__item3
        const footer__item2 = hand == 'left' ? styles.footer__item2 : styles.footer__item4
        const footer_upper_item1 = hand == 'left' ? styles.footer__upper_item_left : styles.footer__upper_item_right


        const dynamicStyle = StyleSheet.create({
            bottom: {
                bottom: bottomPosition,
            },
        })
        return (
            <>
                <SafeAreaView style={styles.center}>
                    <TextInput
                        style={[styles.textInput,]}//高さを指定するとscrollがそこで止まる
                        multiline={true}
                        onChangeText={(text) => this.save(text)}
                        defaultValue={this.state.text}
                        // autoFocus={!this.state.isEdit}
                        autoFocus={true}
                    />
                    <View style={[styles.footer, dynamicStyle.bottom]}>
                        <View style={[footer__item1]}>
                            <TouchableOpacity onPress={this.props.navigation.goBack}>
                                <Image style={styles.icon} source={require('../../assets/back_mark.png')} />
                            </TouchableOpacity>
                        </View>

                        {isEdit && <View style={[footer__item2]}>
                            <TouchableOpacity onPress={this.deleteAlert} >
                                <Image style={styles.icon} source={require('../../assets/cross_mark.png')} />
                            </TouchableOpacity>
                        </View>
                        }

                        {this.state.keyBoard && <View style={[footer_upper_item1]}>
                            <TouchableOpacity onPress={this.keybordDissMiss} >
                                <Image style={styles.icon} source={require('../../assets/down_mark.png')} />
                            </TouchableOpacity>
                        </View>
                        }

                    </View>
                    {/* {!this.state.keyBoard && */}
                    <AdMobBanner
                        adSize="fullBanner"
                        adUnitID={adUnitID()}
                        testDevices={[AdMobBanner.simulatorId]}
                        onAdFailedToLoad={(error) => console.error(error)}
                    />
                    {/* } */}
                </SafeAreaView >
                { Platform.OS == 'ios' && <KeyboardSpacer />}

            </>
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
        textAlignVertical: 'top' //for andtorid
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
        // bottom: bottomPos,
        left: iconMargin * 2
    },
    footer__item2: {
        position: 'absolute',
        // bottom: bottomPos,
        left: iconMargin * 7

    },


    footer__item3: {
        position: 'absolute',
        // bottom: bottomPos,
        right: iconMargin * 2
    },
    footer__item4: {
        position: 'absolute',
        // bottom: bottomPos,
        right: iconMargin * 7
    },


    footer__upper_item_left: {
        position: 'absolute',
        bottom: iconMargin * 2,
        left: iconMargin * 2
    },

    footer__upper_item_right: {
        position: 'absolute',
        bottom: iconMargin * 2,
        right: iconMargin * 2
    },

    icon: {
        width: iconSize,
        height: iconSize,
    }
});



