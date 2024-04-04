import React from 'react';
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

const mockData: Contact[] = [
  {
    id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
    firstName: 'Bilbo',
    lastName: 'Baggins',
    age: 111,
    photo:
      'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    age: 50,
    photo:
      'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    id: '0d7481f0-f1e8-11ee-be77-1531bc1edd89',
  },
  {
    firstName: 'Bilbo',
    lastName: 'Baggins',
    age: 111,
    photo:
      'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    id: '5d793160-f1f1-11ee-be77-1531bc1edd89',
  },
  {
    firstName: 'Bilbso',
    lastName: 'Baggins',
    age: 111,
    photo:
      'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    id: '6570d5d0-f1f1-11ee-be77-1531bc1edd89',
  },
  {
    firstName: 'Pokemon',
    lastName: 'Dot',
    age: 20,
    photo:
      'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    id: '6e083cb0-f1f1-11ee-be77-1531bc1edd89',
  },
  {
    firstName: 'Luke',
    lastName: 'Skywalker',
    age: 20,
    photo:
      'file:///Users/loratech/Library/Developer/CoreSimulator/Devices/503A1561-8C8C-4239-BA09-173716F26369/data/Containers/Data/Application/2CC53E6C-BD1D-41EB-B2D0-0EFEDE3DD58C/Library/Caches/ExponentExperienceData/%2540anonymous%252Fcontact-app-e58fc7ae-3f69-45f5-bc0c-cdc9aabf3bf3/ImagePicker/ACE8E92F-306A-4C2E-8691-A89725E4FB0E.jpg',
    id: '2aba5be0-f1f2-11ee-be77-1531bc1edd89',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    age: 22,
    photo:
      'file:///Users/loratech/Library/Developer/CoreSimulator/Devices/503A1561-8C8C-4239-BA09-173716F26369/data/Containers/Data/Application/2CC53E6C-BD1D-41EB-B2D0-0EFEDE3DD58C/Library/Caches/ExponentExperienceData/%2540anonymous%252Fcontact-app-e58fc7ae-3f69-45f5-bc0c-cdc9aabf3bf3/ImagePicker/AB80BFC8-B376-4B49-9ADE-CE091EE371B1.jpg',
    id: '2a8573c0-f1f3-11ee-be77-1531bc1edd89',
  },
  {
    firstName: 'Mawar',
    lastName: 'Melati',
    age: 33,
    photo:
      'file:///Users/loratech/Library/Developer/CoreSimulator/Devices/503A1561-8C8C-4239-BA09-173716F26369/data/Containers/Data/Application/2CC53E6C-BD1D-41EB-B2D0-0EFEDE3DD58C/Library/Caches/ExponentExperienceData/%2540anonymous%252Fcontact-app-e58fc7ae-3f69-45f5-bc0c-cdc9aabf3bf3/ImagePicker/86309FAF-ED66-41B2-8242-679927A2EE88.jpg',
    id: '7d6a4ed0-f1f3-11ee-be77-1531bc1edd89',
  },
  {
    firstName: 'Daun',
    lastName: 'Hijau',
    age: 33,
    photo:
      'file:///Users/loratech/Library/Developer/CoreSimulator/Devices/503A1561-8C8C-4239-BA09-173716F26369/data/Containers/Data/Application/2CC53E6C-BD1D-41EB-B2D0-0EFEDE3DD58C/Library/Caches/ExponentExperienceData/%2540anonymous%252Fcontact-app-e58fc7ae-3f69-45f5-bc0c-cdc9aabf3bf3/ImagePicker/4C48FCD7-191C-4818-BC0F-805DD9F9587B.jpg',
    id: 'ec83ed80-f1f3-11ee-be77-1531bc1edd89',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    age: 33,
    photo:
      'file:///Users/loratech/Library/Developer/CoreSimulator/Devices/503A1561-8C8C-4239-BA09-173716F26369/data/Containers/Data/Application/2CC53E6C-BD1D-41EB-B2D0-0EFEDE3DD58C/Library/Caches/ExponentExperienceData/%2540anonymous%252Fcontact-app-e58fc7ae-3f69-45f5-bc0c-cdc9aabf3bf3/ImagePicker/AB80BFC8-B376-4B49-9ADE-CE091EE371B1.jpg',
    id: '37fb89d0-f1f4-11ee-be77-1531bc1edd89',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    age: 33,
    photo:
      'file:///Users/loratech/Library/Developer/CoreSimulator/Devices/503A1561-8C8C-4239-BA09-173716F26369/data/Containers/Data/Application/2CC53E6C-BD1D-41EB-B2D0-0EFEDE3DD58C/Library/Caches/ExponentExperienceData/%2540anonymous%252Fcontact-app-e58fc7ae-3f69-45f5-bc0c-cdc9aabf3bf3/ImagePicker/AB80BFC8-B376-4B49-9ADE-CE091EE371B1.jpg',
    id: '4d888190-f1f4-11ee-be77-1531bc1edd89',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    age: 33,
    id: '5f392980-f1f4-11ee-be77-1531bc1edd89',
    photo: 'N/A',
  },
  {
    firstName: 'Bambang',
    lastName: 'Pacul',
    age: 27,
    photo:
      'file:///Users/loratech/Library/Developer/CoreSimulator/Devices/503A1561-8C8C-4239-BA09-173716F26369/data/Containers/Data/Application/2CC53E6C-BD1D-41EB-B2D0-0EFEDE3DD58C/Library/Caches/ExponentExperienceData/%2540anonymous%252Fcontact-app-e58fc7ae-3f69-45f5-bc0c-cdc9aabf3bf3/ImagePicker/1B2F0AA0-BD0C-47EC-A058-7040E729D33E.jpg',
    id: '6bd31af0-f1f6-11ee-be77-1531bc1edd89',
  },
  {
    firstName: 'Bilbo',
    lastName: 'Baggins',
    age: 111,
    photo:
      'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    id: '9e6d8870-f209-11ee-be77-1531bc1edd89',
  },
];

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Contacts'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({navigation}): React.JSX.Element => {
  const handleNavigateToDetail = (item: Contact) => {
    navigation.navigate('Detail', {item});
  };

  return (
    <SafeAreaView>
      <AlphabetList
        style={styles.container}
        data={mockData?.map(item => ({
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
});

export default HomeScreen;
