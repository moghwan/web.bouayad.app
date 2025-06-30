/**
 * API response and error types for the application
 */

/**
 * Generic API error interface
 */
export interface ApiError {
  error: boolean;
  message: string;
  details?: string;
  status?: number;
}

/**
 * Generic API response interface
 */
export interface ApiResponse<T> {
  data: T;
  error?: ApiError;
}

/**
 * City interface
 */
export interface City {
  id: number;
  name: string;
  name_ar: string;
}

/**
 * Prayer time interface
 */
export interface SalateTime {
  day: number;
  month: number;
  monthName: string;
  dayHij: number;
  monthNameHij: string;
  dayNameHij: string;
  fajr: string;
  chourouq: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  ishae: string;
  key?: string;
}

/**
 * Date information interface
 */
export interface DateInfo {
  day: number;
  month: number;
  year: number;
  monthName: {
    ar: string;
    fr: string;
  };
}

/**
 * Hikam data interface
 */
export interface HikamData {
  dates: {
    dateCr: DateInfo;
    dateHj: DateInfo;
    dateFl: {
      day: number;
      monthName: {
        ar: string;
        fr: string;
      };
    };
    dayName: {
      ar: string;
      fr: string;
    };
  };
  events: {
    hikams_front: string[];
    hikams_back: string[];
  };
  salate_times: {
    fajr: string;
    chourouq: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    ishae: string;
  };
}