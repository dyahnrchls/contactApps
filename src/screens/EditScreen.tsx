import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {RootStackParamList} from '../App';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';

let screenHeight = Dimensions.get('window').height;
let screenWidth = Dimensions.get('window').width;

type EditScreenRouteProp = StackNavigationProp<RootStackParamList, 'Edit'>;

type Props = {
  navigation: EditScreenRouteProp;
};
const EditScreen: React.FC<Props> = ({navigation}): React.JSX.Element => {
  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 16,
          paddingHorizontal: 16,
          backgroundColor: 'white',
        }}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={{color: '#2C7865', fontSize: 16}}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: '#2C7865', fontSize: 16}}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.photoContainer}>
          <Icon name="person-circle-sharp" size={150} color={'#C7C8CC'} />
        </TouchableOpacity>
        <View
          style={{
            padding: 8,
            display: 'flex',
            gap: 8,
            flexDirection: 'column',
          }}>
          <View
            style={{backgroundColor: '#F6F5F5', padding: 8, borderRadius: 4}}>
            <TextInput
              placeholder="First Name"
              style={{borderBottomWidth: 0.2, borderBottomColor: '#DDDDDD'}}
            />
            <TextInput placeholder="Last Name" />
          </View>
          <View
            style={{backgroundColor: '#F6F5F5', padding: 4, borderRadius: 4}}>
            <TextInput
              placeholder="Age"
              keyboardType="number-pad"
              style={{borderBottomWidth: 0.2, borderBottomColor: '#DDDDDD'}}
            />
            <TextInput placeholder="Mobile Phone" keyboardType="number-pad" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  photoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  photo: {
    height: (30 / 100) * screenHeight,
    width: (30 / 100) * screenHeight,
    borderRadius: 10000,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    top: -40,
  },
  card: {
    width: (70 / 100) * screenWidth,
    padding: 16,
    borderRadius: 10,
    backgroundColor: 'white',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  name: {
    fontSize: 18,
    color: 'black',
  },
  number: {
    color: 'black',
    paddingTop: 18,
  },
  iconContainer: {
    top: -20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  callLogContainer: {
    paddingHorizontal: 16,
  },
  callLogTitle: {
    fontSize: 16,
    paddingBottom: 16,
    fontWeight: '500',
  },
  callLog: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    fontSize: 12,
  },
  footerContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    bottom: 0,
    width: '100%',
    borderTopWidth: 0.2,
    backgroundColor: 'white',
  },
  button: {
    width: (50 / 100) * screenWidth,
    paddingVertical: 16,
    display: 'flex',
    alignItems: 'center',
    fontSize: 18,
  },
});

export default EditScreen;
