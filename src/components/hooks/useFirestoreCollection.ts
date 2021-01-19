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
}

export function useFirestoreCollection({ query, data, dependencies }: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubcribe = query().onSnapshot(
      (snapshot: any) => {
        const docs = snapshot.docs.map((doc: any) => dataFromSnapshot(doc));
        data(docs);
        dispatch(asyncActionFinish());
      },
      (error: any) => dispatch(asyncActionError(error))
    );
    return () => {
      unsubcribe();
    };
  }, dependencies); //eslint-disable-line react-hooks/exhaustive-deps
}
