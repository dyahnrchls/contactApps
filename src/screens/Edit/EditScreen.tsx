import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RootStackParamList} from '../../App';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';

import {RouteProp} from '@react-navigation/native';
import {Button} from '../../components/Button/Button';
import {useEditUtil} from './Edit.util';

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
  const {
    disableButton,
    handleCancel,
    updateContact,
    contact,
    updateContactSelector,
    setFirstName,
    setLastName,
    setAge,
  } = useEditUtil(route, navigation);

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <Button
          title="Cancel"
          onPress={handleCancel}
          disabled={updateContactSelector?.loading}
        />
        <Button
          title="Done"
          disabled={disableButton()}
          onPress={updateContact}
        />
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
