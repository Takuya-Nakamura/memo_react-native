import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Animated,
    Easing,
    Image,
    Dimensions
} from 'react-native';
import { Color } from '../../global_config'

import Realm from 'realm'
import { realmOptions } from '../../storage/realm'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width
const iconMargin = 44
const iconSize = 65


export class MemoIndex extends Component {


    /******************************
     * lifecycle
     ******************************/

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            footerXAnim: new Animated.Value(-300),
            footerItem1: new Animated.Value(iconMargin),
            footerItem2: new Animated.Value(width - iconSize - iconMargin),


            icon: new Animated.Value(0),
            hand: 'left' //left, right
        }



    }

    componentDidMount = () => {
        this.load()
        this.loadSetting()
        this.footerSlideIn()

        //詳細から戻って来た時にloadするように
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.load();
        });


    }

    componentWillUnmount() {
        this._unsubscribe;
    }

    /******************************
     * animation
     ******************************/
    footerSlideIn = () => {
        // slide X
        Animated.timing(
            this.state.footerXAnim,
            {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }
        ).start();
    }

    changeIconPosition = (hand) => {
        const leftPosition = iconMargin
        const rightPostioin = width - iconMargin - iconSize
        const item1 = hand == 'left' ? leftPosition : rightPostioin
        const item2 = hand == 'left' ? rightPostioin : leftPosition
        const conf = {
            duration: 300,
            useNativeDriver: true
        }
        Animated.parallel([
            Animated.timing(
                this.state.footerItem1,
                {
                    toValue: item1,
                    ...conf
                }
            ),
            Animated.timing(
                this.state.footerItem2,
                {
                    toValue: item2,
                    ...conf
                }
            )
        ]).start()
    }

    /**
     * dynamic style
     */
    dynamicStyle = () => {
        return {
            transformX: {
                transform: [{ translateX: this.state.footerXAnim }]
            },
            transFormItem1: {
                transform: [{ translateX: this.state.footerItem1 }]
            },
            transFormItem2: {
                transform: [{ translateX: this.state.footerItem2 }],
            },
            touchIcon: {
            }
        }
    }

    /******************************
     * action
     ******************************/
    load = () => {
        Realm.open(realmOptions).then(realm => {
            let memos = realm.objects('Memo').sorted('created', true);// true=降順
            this.setState({
                data: memos
            })
        });
    }


    saveSetting = () => {
        Realm.open(realmOptions).then(realm => {
            const { hand } = this.state
            const newHand = hand == 'left' ? 'right' : 'left'
            realm.write(() => {
                const params = {
                    id: '1',
                    hand: newHand
                }
                realm.create(
                    'Setting',
                    params,
                    true)
            })
            this.setState({ hand: newHand })
            this.changeIconPosition(newHand)
        });

    }

    loadSetting = () => {
        Realm.open(realmOptions).then(realm => {
            let setting = realm.objects('Setting').filtered('id == $0', '1')[0];
            this.setState({
                hand: setting.hand
            })
        });

    }

    onPressNew = () => {
        this.props.navigation.navigate('メモ')
    }

    onPressEdit = (id) => {
        this.props.navigation.navigate('メモ', { id: id })
    }

    onPressChange = () => {
        this.saveSetting()
    }

    /******************************
     * render
     ******************************/
    listCell = (memo, index) => {
        const { data } = this.state
        return (
            <>
                <TouchableOpacity key={index} style={styles.cell} onPress={() => this.onPressEdit(memo.id)}>
                    <Text numberOfLines={1} ellipsizeMode={'clip'} style={styles.cell__text}>{this.titleOneLine(memo.text)}</Text>
                </TouchableOpacity>
                {/* 最後の要素の場合、ボタンと被らないで表示できるように余白要素を追加する */}
                { index == data.length - 1 && <View style={styles.last_cell}></View>}
            </>
        )
    }

    titleOneLine = (text) => {
        return text.split('\n')[0]
    }

    render = () => {
        const { hand } = this.state
        //animation style
        const dStyle = this.dynamicStyle()

        // //icon position
        // const footer__item1 = hand == 'left' ? styles.footer__item1 : styles.footer__item2
        // const footer__item2 = hand == 'right' ? styles.footer__item1 : styles.footer__item2


        return (
            // <> フラグメントの省略記法
            <SafeAreaView style={styles.center}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item, index }) => this.listCell(item, index)}
                    style={styles.listView}
                />

                <Animated.View style={[styles.footer, dStyle.transformX]}>
                    <Animated.View style={[styles.footer__item1, dStyle.transFormItem1]}>
                        <TouchableWithoutFeedback onPress={this.onPressNew} >
                            <Image style={styles.icon} source={require('../../assets/plus_mark.png')} />
                        </TouchableWithoutFeedback>
                    </ Animated.View>

                    <Animated.View style={[styles.footer__item2, dStyle.transFormItem2]}>
                        <TouchableWithoutFeedback onPress={this.onPressChange} >
                            <Image style={styles.icon} source={require('../../assets/change_mark.png')} />
                        </TouchableWithoutFeedback>
                    </ Animated.View>

                </Animated.View>

            </SafeAreaView>
            // </> フラグメントの省略記法
        );
    }

}



const styles = StyleSheet.create({
    center: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        height: 120,
        width: '100%',
        padding: 20,
        flexDirection: "row",
    },
    listView: {
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    cell: {
        height: 65,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        backgroundColor: '#fdfdfd',
    },
    last_cell: {
        height: 100,
    },
    cell__text: {
        fontSize: 20,
        color: "#555",
    },

    // styles footer
    footer: {

    },

    footer__item1: {
        position: 'absolute',
        bottom: 0,
        // left: 44
    },
    footer__item2: {
        position: 'absolute',
        bottom: 0,
        // right: 44
    },

    icon: {
        width: iconSize,
        height: iconSize,
    }


});


