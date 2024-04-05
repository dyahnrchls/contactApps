import React, {useCallback, useEffect} from 'react';
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
import {detailSelector, fetchDetail} from '../store/slices';
import {RouteProp} from '@react-navigation/native';

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
  const contacts = useAppSelector(detailSelector);

  const handleCancel = () => {
    navigation.goBack();
  };

  const getDetail = useCallback(() => {
    dispatch(fetchDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.upperButton}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.upperButton}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.photoContainer}>
          {contacts?.data?.photo?.includes('http') ? (
            <Image
              source={{
                uri: contacts?.data?.photo,
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
              defaultValue={contacts?.data?.firstName}
              style={styles.inputBorder}
            />
            <TextInput
              placeholder="Last Name"
              defaultValue={contacts?.data?.lastName}
            />
          </View>
          <View style={styles.inputContent}>
            <TextInput
              placeholder="Age"
              keyboardType="number-pad"
              style={styles.inputBorder}
              defaultValue={contacts?.data?.age?.toString()}
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
  upperButton: {color: '#2C7865', fontSize: 16},
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
