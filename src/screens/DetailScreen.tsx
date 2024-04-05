import React, {useCallback, useEffect} from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAppDispatch, useAppSelector} from '../store';
import {
  detailSelector,
  fetchDetail,
  remove,
  removeSelector,
  resetRemove,
  // removeSelector,
} from '../store/slices';
import Ionicons from 'react-native-vector-icons/Ionicons';

let screenHeight = Dimensions.get('window').height;
let screenWidth = Dimensions.get('window').width;

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;
type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Detail'
>;

type Props = {
  route: DetailScreenRouteProp;
  navigation: DetailScreenNavigationProp;
};

const DetailScreen: React.FC<Props> = ({
  route,
  navigation,
}): React.JSX.Element => {
  const id = route?.params?.id ?? '';

  const dispatch = useAppDispatch();
  const contacts = useAppSelector(detailSelector);
  const deleteState = useAppSelector(removeSelector);

  const showToast = () => {
    ToastAndroid.show('Failed delete data', ToastAndroid.SHORT);
  };

  const handleNavigateToEdit = () => {
    navigation.navigate('Edit', {id});
  };

  const deleteContact = () => {
    dispatch(remove(id));
  };

  const deleteAlert = () => {
    Alert.alert('Hold on!', 'Are you sure you delete this contact?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: deleteContact},
    ]);
  };

  const getDetail = useCallback(() => {
    dispatch(fetchDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

  useEffect(() => {
    if (deleteState?.message === 'success') {
      dispatch(resetRemove());
      navigation.goBack();
    }
  }, [deleteState?.message, navigation, dispatch]);

  useEffect(() => {
    if (deleteState?.error) {
      showToast();
    }
  }, [deleteState]);

  useEffect(() => {
    const backAction = () => {
      dispatch(resetRemove());
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [dispatch, navigation]);

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      {contacts?.loading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          <View style={styles.container}>
            <View style={styles.photoContainer}>
              {contacts?.data?.photo?.includes('http') ? (
                <Image
                  source={{
                    uri: contacts?.data?.photo,
                  }}
                  style={styles.photo}
                />
              ) : (
                <Ionicons
                  name="person-circle-sharp"
                  size={150}
                  color={'#C7C8CC'}
                  style={styles.noPhoto}
                />
              )}
            </View>
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.name}>
                  {contacts?.data?.firstName + ' ' + contacts?.data?.lastName}
                </Text>
                <Text>{contacts?.data?.age}</Text>
                <Text style={styles.number}>{'+62 812 34567891'}</Text>
              </View>
            </View>
            <View style={styles.iconContainer}>
              <Icon name="call" size={20} color={'#2C7865'} />
              <Icon name="message" size={20} color={'#F2613F'} />
              <Icon name="video-call" size={30} color={'#008DDA'} />
            </View>
            <View style={styles.callLogContainer}>
              <Text style={styles.callLogTitle}>Call Logs</Text>

              <View style={styles.callLog}>
                <View style={styles.logInfo}>
                  <SimpleLineIcons name="call-in" />
                  <Text>Incoming Call</Text>
                </View>
                <Text>April 4, 16:46</Text>
              </View>

              <View style={styles.callLog}>
                <View style={styles.logInfo}>
                  <Icon name="message" />
                  <Text>Message</Text>
                </View>

                <Text>April 4, 15:46</Text>
              </View>

              <View style={styles.callLog}>
                <View style={styles.logInfo}>
                  <SimpleLineIcons name="call-out" />
                  <Text>Outgoing Call</Text>
                </View>

                <Text>April 4, 14:46</Text>
              </View>

              <View style={styles.callLog}>
                <View style={styles.logInfo}>
                  <SimpleLineIcons name="call-end" />
                  <Text>Missed Call</Text>
                </View>

                <Text>April 4, 13:46</Text>
              </View>
            </View>
          </View>
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleNavigateToEdit}>
              <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={deleteAlert}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  photoContainer: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  photo: {
    height: (40 / 100) * screenHeight,
    width: screenWidth,
    borderRadius: 60,
    resizeMode: 'cover',
  },
  noPhoto: {
    marginBottom: 40,
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
  logInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
});

export default DetailScreen;
