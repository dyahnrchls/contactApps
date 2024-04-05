import {useCallback, useEffect} from 'react';
import {fetchLists, listSelector} from '../../store/slices';
import {useAppDispatch, useAppSelector} from '../../store';

export const useHomeUtil = (navigation: any) => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(listSelector);

  const handleNavigateToDetail = (id: string) => {
    navigation?.navigate('Detail', {id});
  };

  const handleNavigateToAdd = () => {
    navigation?.navigate('Add');
  };

  const getList = useCallback(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  useEffect(() => {
    getList();
  }, [getList]);

  return {
    handleNavigateToDetail,
    handleNavigateToAdd,
    contacts,
    getList,
  };
};
