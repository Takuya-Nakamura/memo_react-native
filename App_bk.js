import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

/**
 * Stack
 */
const Stack = createStackNavigator()

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Detail"
        onPress={() => navigation.navigate('Detail')}
      />
      <Button
        title="Go to Tab"
        onPress={() => navigation.navigate('Tab')}
      />
      <Button
        title="Go to TopTab"
        onPress={() => navigation.navigate('TopTab')}
      />
      <Button
        title="Go to Drawer"
        onPress={() => navigation.navigate('Drawer')}
      />
      <Button
        title="Open Modal"
        onPress={() => navigation.navigate('MyModal')}
      />
    </View>
  );
}

function DetailScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

function Tab1Screen({ navigation }) {
  return (<View style={styles.screen}><Text>Tab1 Screen</Text></View>);
}
function Tab2Screen({ navigation }) {
  return (<View style={styles.screen}><Text>Tab2 Screen</Text></View>);
}

/**
 * bottom-tab
 * 
 */
const Tab = createBottomTabNavigator()
function TabRouting({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tab1Screen" component={Tab1Screen} />
      <Tab.Screen name="Tab2Screen" component={Tab2Screen} />
    </Tab.Navigator>
  );
}

/**
 * toptab
 * 
 */
const TopTab = createMaterialTopTabNavigator()
function TopTabRouting() {
  return (
    <TopTab.Navigator>
      <Tab.Screen name="Tab1Screen" component={Tab1Screen} />
      <Tab.Screen name="Tab2Screen" component={Tab2Screen} />
    </TopTab.Navigator>
  );
}

/**
 * Drawer
 * 
 */
function Drawer1Screen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text>Drawer1 Screen</Text>
      <Button
        title="toggle Drawer"
        onPress={() => navigation.toggleDrawer()}
      />
    </View>
  );
}

function Drawer2Screen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text>Drawer2 Screen</Text>
      <Button
        title="toggle Drawer"
        onPress={() => navigation.toggleDrawer()}
      />
    </View>
  );
}

const Drawer = createDrawerNavigator();
function DrawerRouting() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Drawer1" component={Drawer1Screen} />
      <Drawer.Screen name="Drawer2" component={Drawer2Screen} />
    </Drawer.Navigator>
  )
}

/**
 * Modal
 * 
 */
const RootStack = createStackNavigator()
function ModalScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text>Modal Screen</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  )
}


function MainStacK() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Tab" component={TabRouting} />
      <Stack.Screen name="TopTab" component={TopTabRouting} />
      <Stack.Screen name="Drawer" component={DrawerRouting} />
    </Stack.Navigator>
  )
}

/****************************************
 * Render
 *****************************************/
{/*modalを使う場合にはMainの上に一つStackを増やして挙げないと行けない*/ }
{/* headerShownしないと2重にでる */ }
function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode='modal'>
        <RootStack.Screen name="Main" component={MainStacK} options={{ headerShown: false }} />
        <RootStack.Screen name="MyModal" component={TabRouting} />

      </RootStack.Navigator>
    </NavigationContainer>
  );
}

// function App() {
//   return (
//     <NavigationContainer>
//       <RootStack.Navigator mode='modal'>
//         <Stack.Navigator initialRouteName="Home">
//           <Stack.Screen name="Home" component={HomeScreen} />
//           <Stack.Screen name="Detail" component={DetailScreen} />
//           <Stack.Screen name="Tab" component={TabRouting} />
//           <Stack.Screen name="TopTab" component={TopTabRouting} />
//           <Stack.Screen name="Drawer" component={DrawerRouting} />

//         </Stack.Navigator>
//       </RootStack.Navigator>
//     </NavigationContainer>
//   );
// }

const styles = StyleSheet.create({
  screen: {
    flex: 1, alignItems: 'center', justifyContent: 'center'
  }
})

export default App;