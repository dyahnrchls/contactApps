import {Alert, BackHandler, ToastAndroid} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store';
import {
  detailSelector,
  fetchDetail,
  fetchLists,
  remove,
  removeSelector,
  resetRemove,
} from '../../store/slices';
import {useCallback, useEffect} from 'react';

export const useDetailUtil = (route: any, navigation: any) => {
  const id = route?.params?.id ?? '';

  const dispatch = useAppDispatch();
  const contacts = useAppSelector(detailSelector);
  const deleteState = useAppSelector(removeSelector);

  const showToast = (title: string) => {
    ToastAndroid.show(title, ToastAndroid.SHORT);
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
      showToast('Success delete data');
      dispatch(fetchLists());
      dispatch(resetRemove());
      navigation.goBack();
    }
  }, [deleteState?.message, navigation, dispatch]);

  useEffect(() => {
    if (deleteState?.error) {
      showToast('Failed delete data');
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

  return {
    contacts,
    handleNavigateToEdit,
    deleteAlert,
  };
};
