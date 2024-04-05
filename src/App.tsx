import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/Home/HomeScreen';
import DetailScreen from './screens/Detail/DetailScreen';
import AddScreen from './screens/Add/AddScreen';
import EditScreen from './screens/Edit/EditScreen';
import {Provider} from 'react-redux';
import store from './store';

export type RootStackParamList = {
  Contacts: undefined; // no params
  Detail: {id: string};
  Add: undefined;
  Edit: {id: string};
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Contacts" component={HomeScreen} />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Add"
            component={AddScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Edit"
            component={EditScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
