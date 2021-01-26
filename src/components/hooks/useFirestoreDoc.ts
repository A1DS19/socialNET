import { dataFromSnapshot } from './../../firestore/firestoreService';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from './../../actions/loading';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
  query: any;
  data: any;
  dependencies: any;
  shouldExecute?: boolean;
}

export function useFirestoreDoc({
  query,
  data,
  dependencies,
  shouldExecute = true,
}: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!shouldExecute) return;

    dispatch(asyncActionStart());
    const unsubcribe = query().onSnapshot(
      (snapshot: any) => {
        if (!snapshot.exists) {
          dispatch(asyncActionError('No se encuentra el documento'));
          return;
        }

        data(dataFromSnapshot(snapshot));
        dispatch(asyncActionFinish());
      },
      (error: any) => dispatch(asyncActionError(error))
    );
    return () => {
      unsubcribe();
    };
  }, dependencies); //eslint-disable-line react-hooks/exhaustive-deps
}
