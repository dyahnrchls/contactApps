import {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../store';
import {
  detailSelector,
  fetchDetail,
  resetUpdate,
  update,
  updateSelector,
} from '../../store/slices';
import {ToastAndroid} from 'react-native';
import {Contact} from '../../store/types';

export const useEditUtil = (route: any, navigation: any) => {
  const id = route?.params?.id ?? '';

  const dispatch = useAppDispatch();
  const contact = useAppSelector(detailSelector);
  const updateContactSelector = useAppSelector(updateSelector);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  // const [phoneNumber, setPhoneNumber] = useState<string>('');

  const showToast = (title: string) => {
    ToastAndroid.show(title, ToastAndroid.SHORT);
  };

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
    dispatch(resetUpdate());
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

    dispatch(update(payload));
  };

  const getDetail = useCallback(() => {
    dispatch(fetchDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

  useEffect(() => {
    if (updateContactSelector?.message === 'success') {
      showToast('Success update data');
      dispatch(fetchDetail(id));
      dispatch(resetUpdate());

      navigation.goBack();
    }
  }, [updateContactSelector?.message, navigation, dispatch, id]);

  useEffect(() => {
    if (updateContactSelector?.error) {
      showToast('Failed update data');
    }
  }, [updateContactSelector]);

  useEffect(() => {
    if (contact?.data) {
      setFirstName(contact?.data?.firstName);
      setLastName(contact?.data?.lastName);
      setAge(contact?.data?.age?.toString());
    }
  }, [contact]);

  return {
    setFirstName,
    setLastName,
    setAge,
    disableButton,
    handleCancel,
    updateContact,
    contact,
    updateContactSelector,
  };
};
