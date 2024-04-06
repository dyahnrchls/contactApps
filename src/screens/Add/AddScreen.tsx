import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {RootStackParamList} from '../../App';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button} from '../../components/Button/Button';
import {useAddUtil} from './Add.util';

type AddScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Add'>;

type Props = {
  navigation?: AddScreenNavigationProp;
};
const AddScreen: React.FC<Props> = ({navigation}): React.JSX.Element => {
  const {
    setFirstName,
    setLastName,
    setAge,
    disableButton,
    handleCancel,
    addContact,
    createContact,
  } = useAddUtil(navigation);

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <Button
          title="Cancel"
          onPress={handleCancel}
          disabled={createContact?.loading}
        />
        <Button title="Done" onPress={addContact} disabled={disableButton()} />
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.photoContainer}>
          <Icon name="person-circle-sharp" size={150} color={'#C7C8CC'} />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <View style={styles.inputContent}>
            <TextInput
              placeholder="First Name"
              onChangeText={setFirstName}
              style={styles.inputWithBorder}
              placeholderTextColor={'gray'}
            />
            <TextInput
              placeholder="Last Name"
              onChangeText={setLastName}
              placeholderTextColor={'gray'}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContent}>
            <TextInput
              placeholder="Age"
              keyboardType="number-pad"
              onChangeText={setAge}
              style={styles.inputWithBorder}
              placeholderTextColor={'gray'}
            />
            <TextInput
              placeholder="Mobile Phone"
              keyboardType="number-pad"
              placeholderTextColor={'gray'}
              style={styles.input}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
  },
  upperButton: {
    color: '#2C7865',
    fontSize: 16,
  },
  upperButtonDisable: {
    color: '#B5C0D0',
    fontSize: 16,
  },
  content: {
    backgroundColor: '#F5F5F5',
    height: '100%',
  },
  photoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputContainer: {
    padding: 8,
    display: 'flex',
    gap: 8,
    flexDirection: 'column',
  },
  inputContent: {
    backgroundColor: '#DDDDDD',
    padding: 8,
    borderRadius: 4,
  },
  inputWithBorder: {
    borderBottomWidth: 0.2,
    borderBottomColor: 'white',
    color: 'black',
  },
  input: {
    color: 'black',
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 150,
    resizeMode: 'cover',
  },
});

export default AddScreen;
