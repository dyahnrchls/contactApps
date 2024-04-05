import React, {useState} from 'react';
import {
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
import {useAppDispatch, useAppSelector} from '../store';
import {create, createSelector} from '../store/slices/create-slice';
import {Contact} from '../store/types';

type AddScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Add'>;

type Props = {
  navigation: AddScreenNavigationProp;
};
const AddScreen: React.FC<Props> = ({navigation}): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const createContact = useAppSelector(createSelector);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  // const [phoneNumber, setPhoneNumber] = useState<string>('');

  const disableButton = () => {
    if (firstName.length === 0 || lastName.length === 0 || age.length === 0) {
      return true;
    }

    if (createContact?.loading) {
      return true;
    }

    return false;
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const addContact = async () => {
    let payload: Omit<Contact, 'id'> = {
      firstName,
      lastName,
      age: Number(age),
      photo: '',
    };
    const response = await fetch('https://source.unsplash.com/random/?people');

    if (response) {
      payload.photo = response.url;
    }

    dispatch(create(payload)).then(() => navigation.goBack());
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleCancel}
          disabled={createContact?.loading}>
          <Text
            style={
              createContact?.loading
                ? styles.upperButtonDisable
                : styles.upperButton
            }>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={addContact} disabled={disableButton()}>
          <Text
            style={
              disableButton() ? styles.upperButtonDisable : styles.upperButton
            }>
            Done
          </Text>
        </TouchableOpacity>
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
              style={styles.inputBorder}
            />
            <TextInput placeholder="Last Name" onChangeText={setLastName} />
          </View>
          <View style={styles.inputContent}>
            <TextInput
              placeholder="Age"
              keyboardType="number-pad"
              onChangeText={setAge}
              style={styles.inputBorder}
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
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
    backgroundColor: 'white',
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
    backgroundColor: '#F6F5F5',
    padding: 8,
    borderRadius: 4,
  },
  inputBorder: {
    borderBottomWidth: 0.2,
    borderBottomColor: '#DDDDDD',
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 150,
    resizeMode: 'cover',
  },
});

export default AddScreen;
