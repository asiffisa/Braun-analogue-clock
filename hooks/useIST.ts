import { IST_TIME_ZONE, useTimeZone } from './useTimeZone';

export { IST_TIME_ZONE } from './useTimeZone';

/** Legacy convenience hook. Prefer useTimeZone for configurable clocks. */
export const useIST = () => useTimeZone(IST_TIME_ZONE);
