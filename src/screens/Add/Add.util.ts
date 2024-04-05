import {ToastAndroid} from 'react-native';
import {create, createSelector, resetCreate} from '../../store/slices';
import {useAppDispatch, useAppSelector} from '../../store';
import {Contact} from '../../store/types';
import {useEffect, useState} from 'react';

export const useAddUtil = (navigation: any) => {
  const dispatch = useAppDispatch();
  const createContact = useAppSelector(createSelector);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  // const [phoneNumber, setPhoneNumber] = useState<string>('');

  const showToast = () => {
    ToastAndroid.show('Failed create data', ToastAndroid.SHORT);
  };

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
    dispatch(resetCreate());
    navigation?.goBack();
  };

  const addContact = async () => {
    let payload: Omit<Contact, 'id'> = {
      firstName,
      lastName,
      age: Number(age),
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    };

    try {
      const response = await fetch(
        'https://source.unsplash.com/random/?people',
      );

      if (response.ok) {
        const imageUrl = response.url;
        payload.photo = imageUrl;
      } else {
        console.error('Failed to fetch image');
      }

      dispatch(create(payload));
    } catch (error) {
      console.error('Error fetching image:', error);
      dispatch(create(payload));
    }
  };

  useEffect(() => {
    if (createContact?.message === 'success') {
      dispatch(resetCreate());
      navigation?.goBack();
    }
  }, [createContact?.message, navigation, dispatch]);

  useEffect(() => {
    if (createContact?.error) {
      showToast();
    }
  }, [createContact]);

  return {
    setFirstName,
    setLastName,
    setAge,
    disableButton,
    handleCancel,
    addContact,
    createContact,
  };
};
