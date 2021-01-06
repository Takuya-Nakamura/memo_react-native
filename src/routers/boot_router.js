import * as React from 'react';
import { MemoIndex } from '../screens/memo/index'
import { MemoDetail } from '../screens/memo/details'
import { createStackNavigator } from '@react-navigation/stack';


export function StacK() {
    console.log("___stack___")
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator initialRouteName="MemoIndex">
            <Stack.Screen name="一覧" component={MemoIndex} />
            <Stack.Screen name="メモ" component={MemoDetail} />
        </Stack.Navigator>
    )
}

