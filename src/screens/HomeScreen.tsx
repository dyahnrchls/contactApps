import React, {useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Contact, RootStackParamList} from '../App';
import {AlphabetList} from 'react-native-section-alphabet-list';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAppDispatch, useAppSelector} from '../store';
import {listSelector, fetchLists} from '../store/slices/list-slice';

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Contacts'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({navigation}): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(listSelector);

  const handleNavigateToDetail = (item: Contact) => {
    navigation.navigate('Detail', {item});
  };

  const handleNavigateToAdd = () => {
    navigation.navigate('Add');
  };

  const getList = useCallback(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  useEffect(() => {
    getList();
  }, [getList]);

  return contacts?.loading ? (
    <View style={styles.loadingContainer}>
      <Text>Loading...</Text>
    </View>
  ) : (
    <SafeAreaView>
      <AlphabetList
        style={styles.container}
        data={contacts?.list?.map(item => ({
          value: item.firstName + ' ' + item.lastName,
          key: item.id,
        }))}
        renderCustomItem={item => (
          <TouchableOpacity
            key={item.key}
            style={styles.contactContainer}
            onPress={() => handleNavigateToDetail(item as any)}>
            <Text style={styles.contactName}>{item.value}</Text>
          </TouchableOpacity>
        )}
        renderCustomSectionHeader={section => (
          <View style={styles.contactTitleContainer}>
            <Text style={styles.contactTitle}> {section.title}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButtonContainer}
        onPress={handleNavigateToAdd}>
        <Icon name="add-circle" size={50} color={'#2C7865'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  contactContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 0.2,
  },
  contactName: {
    fontSize: 16,
    color: 'black',
  },
  contactTitleContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 0.2,
  },
  contactTitle: {
    paddingBottom: 8,
    borderBottomWidth: 0.2,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  loadingContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
