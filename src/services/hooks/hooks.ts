import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
