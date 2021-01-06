import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { Color } from '../../global_config'

// 
export class MemoIndex extends Component {


    /**
     * lifecycle
     * 
     */

    constructor(props) {
        super(props)

    }
    /**
     * action
     * 
     */
    onPresskNew = () => {
        // alert(1)
        this.props.navigation.navigate('メモ')
    }



    /**
     * render 
     * 
     */
    // HomeScreen = () => {
    //     return (
    //         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //             <Text>Home Screen</Text>
    //         </View>
    //     );
    // }
    // Stack = createStackNavigator();

    listCell = (text) => {
        return (
            <View style={styles.cell}>
                <Text style={styles.cell__text}>{text}</Text>
            </View>
        )
    }

    render = () => {
        return (
            // <> フラグメントの省略記法
            <SafeAreaView style={styles.center}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.onPresskNew}>
                        <Text>+ 新規追加</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={data}
                    renderItem={(data, index) => this.listCell(data.item)}
                    style={styles.listView}
                />
                {/* <View style={styles.header}>
                    <TouchableOpacity
                        onPress={this.onPresskNew}
                    >
                        <Text>+ 新規追加</Text>
                    </TouchableOpacity>
                </View> */}

            </SafeAreaView>
            // </> フラグメントの省略記法
        );

    }
}


const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        height: 60,
        backgroundColor: Color.textBackgroundColor,
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    listView: {
        width: "100%",
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    cell: {
        // minHeight: 44,
        height: 50,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        width: "100%",
        // flex: 1,
        flexDirection: 'row',//文字折返し
        flexWrap: 'wrap',//文字折返し

    },
    cell__text: {
        fontSize: 16,
        color: "#333",
    },


});


const data = [
    '1 Hello World.Hello ',
    '2 Hello World.Hello World.Hello World.Hello World.Hello World.Hello World.Hell',
    '2 Hello World.Hello World.Hello World.Hello World.Hello World.Hello World.Hell',
    '2 Hello World.Hello World.Hello World.Hello World.Hello World.Hello World.Hell',
    '2 Hello World.Hello World.Hello World.Hello World.Hello World.Hello World.Hell',
    '2 Hello World.Hello World.Hello World.Hello World.Hello World.Hello World.Hell',
    '2 Hello World.Hello World.Hello World.Hello World.Hello World.Hello World.Hell',
]


