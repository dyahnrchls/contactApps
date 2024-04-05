import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RootStackParamList} from '../App';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAppDispatch, useAppSelector} from '../store';
import {
  detailSelector,
  fetchDetail,
  update,
  updateSelector,
} from '../store/slices';
import {RouteProp} from '@react-navigation/native';
import {Contact} from '../store/types';

type EditScreenRouteProp = RouteProp<RootStackParamList, 'Edit'>;
type EditScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Edit'>;

type Props = {
  route: EditScreenRouteProp;
  navigation: EditScreenNavigationProp;
};
const EditScreen: React.FC<Props> = ({
  navigation,
  route,
}): React.JSX.Element => {
  const id = route?.params?.id ?? '';

  const dispatch = useAppDispatch();
  const contact = useAppSelector(detailSelector);
  const updateContactSelector = useAppSelector(updateSelector);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  // const [phoneNumber, setPhoneNumber] = useState<string>('');

  const disableButton = () => {
    if (firstName.length === 0 || lastName.length === 0 || age.length === 0) {
      return true;
    }

    if (updateContactSelector?.loading) {
      return true;
    }

    return false;
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const updateContact = async () => {
    let payload: Contact = {
      id,
      firstName,
      lastName,
      age: Number(age),
      photo: contact.data?.photo ?? '',
    };

    dispatch(update(payload)).then(() => navigation.goBack());
  };

  const getDetail = useCallback(() => {
    dispatch(fetchDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

  useEffect(() => {
    if (contact?.data) {
      setFirstName(contact?.data?.firstName);
      setLastName(contact?.data?.lastName);
      setAge(contact?.data?.age?.toString());
    }
  }, [contact]);

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleCancel}
          disabled={updateContactSelector?.loading}>
          <Text
            style={
              updateContactSelector?.loading
                ? styles.upperButtonDisable
                : styles.upperButton
            }>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={updateContact} disabled={disableButton()}>
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
          {contact?.data?.photo?.includes('http') ? (
            <Image
              source={{
                uri: contact?.data?.photo,
              }}
              style={styles.photo}
            />
          ) : (
            <Icon name="person-circle-sharp" size={150} color={'#C7C8CC'} />
          )}
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <View style={styles.inputContent}>
            <TextInput
              placeholder="First Name"
              defaultValue={contact?.data?.firstName}
              style={styles.inputBorder}
              onChangeText={setFirstName}
            />
            <TextInput
              placeholder="Last Name"
              defaultValue={contact?.data?.lastName}
              onChangeText={setLastName}
            />
          </View>
          <View style={styles.inputContent}>
            <TextInput
              placeholder="Age"
              keyboardType="number-pad"
              style={styles.inputBorder}
              defaultValue={contact?.data?.age?.toString()}
              onChangeText={setAge}
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

export default EditScreen;
