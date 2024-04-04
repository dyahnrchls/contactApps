import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

type Props = {
  route: DetailScreenRouteProp;
};

const DetailScreen: React.FC<Props> = ({route}): React.JSX.Element => {
  const {item} = route.params;

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{item?.firstName}</Text>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}>
        <Image
          source={{
            uri: item?.photo?.includes('http')
              ? item?.photo
              : 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg',
          }}
          style={styles.photo}
        />
        <Text>{item?.firstName}</Text>
        <Text>{item?.lastName}</Text>
        <Text>{item?.age}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {},
  photo: {
    height: 200,
    resizeMode: 'cover',
  },
});

export default DetailScreen;
