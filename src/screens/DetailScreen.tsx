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
import {Contact, RootStackParamList} from '../App';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {StackNavigationProp} from '@react-navigation/stack';

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
  const item = route.params.item as Contact;

  const handleNavigateToEdit = () => {
    navigation.navigate('Edit', {item});
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <Image
            source={{
              uri: item?.photo?.includes('http')
                ? item?.photo
                : 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg',
            }}
            style={styles.photo}
          />
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.name}>
              {item?.firstName + ' ' + item?.lastName}
            </Text>
            <Text>{item?.age}</Text>
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
            <SimpleLineIcons name="call-in" />
            <Text>Incoming Call</Text>
            <Text>April 4, 16:46</Text>
          </View>

          <View style={styles.callLog}>
            <Icon name="message" />
            <Text>Message</Text>
            <Text>April 4, 15:46</Text>
          </View>
          <View style={styles.callLog}>
            <SimpleLineIcons name="call-out" />
            <Text>Outgoing Call</Text>
            <Text>April 4, 14:46</Text>
          </View>

          <View style={styles.callLog}>
            <SimpleLineIcons name="call-end" />
            <Text>Missed Call</Text>
            <Text>April 4, 13:46</Text>
          </View>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNavigateToEdit}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Delete</Text>
        </TouchableOpacity>
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
    backgroundColor: 'transparent',
  },
  photo: {
    height: (40 / 100) * screenHeight,
    borderRadius: 60,
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

export default DetailScreen;
