import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {StackNavigationProp} from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from '../../components/Button/Button';
import {CallLog} from '../../components/CallLog/CallLog';
import {useDetailUtil} from './Detail.util';

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
  const {contacts, handleNavigateToEdit, deleteAlert} = useDetailUtil(
    route,
    navigation,
  );

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      {contacts?.loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
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

              <CallLog
                title="Incoming Call"
                date="April 4, 16:46"
                icon={<SimpleLineIcons name="call-in" color="gray" />}
              />

              <CallLog
                title="Message"
                date="April 4, 15:46"
                icon={<Icon name="message" color="gray" />}
              />

              <CallLog
                title="Outgoing Call"
                date="April 4, 14:46"
                icon={<SimpleLineIcons name="call-out" color="gray" />}
              />

              <CallLog
                title="Missed Call"
                date="April 4, 13:46"
                icon={<SimpleLineIcons name="call-end" color="gray" />}
              />
            </View>
          </View>
          <View style={styles.footerContainer}>
            <Button
              disabled={false}
              onPress={handleNavigateToEdit}
              title="Edit"
              style={styles.button}
            />
            <Button
              disabled={false}
              onPress={deleteAlert}
              title="Delete"
              style={styles.button}
            />
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
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    color: 'black',
  },
  container: {
    backgroundColor: '#F5F5F5',
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
    color: 'gray',
  },
  footerContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    bottom: 0,
    width: '100%',
    borderTopWidth: 0.2,
    backgroundColor: '#F5F5F5',
  },
  button: {
    width: (50 / 100) * screenWidth,
    paddingVertical: 16,
    display: 'flex',
    alignItems: 'center',
    fontSize: 18,
  },
});

export default DetailScreen;
