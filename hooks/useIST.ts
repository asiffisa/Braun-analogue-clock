import { useTime } from './useTime';

export const useIST = () => {
  const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000; // +5:30
  return useTime(IST_OFFSET_MS);
};