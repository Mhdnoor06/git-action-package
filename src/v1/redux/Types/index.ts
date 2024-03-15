export interface IExternalLinks {
  name: string;
  url: string;
}

export interface Masjid {
  address: string;
  contact: string;
  createdAt: string;
  description: string;
  externalLinks: IExternalLinks[];
  isAssigned: boolean;
  masjidPhotos?: any[];
  lastEditor: {
    _id: string;
    name: string;
  };
  location: {
    coordinates: number[];
  };
  masjidName: string;
  masjidProfilePhoto: string;
  updatedAt: string;
  _id: string;
  assignedUser?: { name: string; _id: string };
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface NearbyMasjidsPayload {
  // Define the structure of your nearby masjids payload
  // ...
  masjid: [];
}

export type AnnouncementType = {
  body: string;
  createdAt: string;
  expiresAt: string;
  masjidId: string;
  masjids: any[];
  title: string;
  type: number;
  updatedAt: string;
  __v: number;
  _id: string;
  createdBy?: any;
};

export type Action = {
  type: string;
  payload: Masjid[] | any;
};
export type CommonActionType = {
  type: string;
  payload: any;
};
export type User = {
  autoPrefillingTiming: boolean;
  email: string;
  isVerified: boolean;
  masjids: any[];
  name: string;
  role: string;
  _id: string;
  updatedAt?: string;
  createdAt?: string;
};

export type UserActionType = {
  type: string;
  payload: User;
};
export type SidebarType = {
  snackbarOpen: boolean;
  snackbarType: string;
  snackbarMessage: string;
};

export type SidebarTypeAction = {
  type: string;
  payload: SidebarType;
};

export interface Admin {
  autoPrefillingTiming: boolean;
  email: string;
  isVerified: boolean;
  masjids: any[];
  name: string;
  role: string;
  _id: string;
}

export type AdminActionType = {
  type: string;
  payload: Admin | any;
};

interface LastEditor {
  _id: string;
  name: string;
}

export interface MetaData {
  startDate: string;
  endDate: string;
  recurrenceId?: string;
  recurrenceType: string;
}

export interface Timing {
  startTime: number;
  endTime: number;
  _id?: string;
}
// export type AddingEvent = {
//   eventName: string;
//   address: string;
//   mazjidName: string;
//   description: string;
//   location: {
//     type: string;
//     coordinates: number[];
//   };
//   metaData: MetaData;
//   timings: Timing[];
// };

export interface EventType {
  address: string;
  date?: any;
  description: string;
  eventName: string;
  eventProfilePhoto: string;
  eventPhoto: { url: string };
  isCancelled: boolean;
  lastEditor: LastEditor;
  eventPhotos: any[];
  guests: any[];
  location: {
    type: string;
    coordinates: number[];
  };
  recurrenceType: string;
  masjid: {
    _id: string;
    masjidName: string;
  };
  metaData: MetaData;
  timings: Timing[];
  _id: string;
}

export type AddingEvent = Pick<
  EventType,
  "eventName" | "address" | "description" | "metaData" | "timings" | "location"
> & {
  masjidName: string;
};
export interface RecurrenceDatesType {
  date: string;
  lastEditor: {
    _id: string;
    name: string;
  };
  metaData: {
    recurrenceId: string;
  };
  _id: string;
}

export type EventActionType = {
  type: string;
  payload: EventType | any;
};
export type ResponseType = {
  res: any;
  data: any;
  status?: number;
  success: boolean;
  message?: string;
};

export type CellDataType = {
  api: any;
  cellMode: string;
  colDef: any;
  field: string;
  formattedValue: string;
  getValue: () => any;
  hasFocus: boolean;
  id: string;
  isEditable: boolean;
  row: any;
  rowNode: any;
  tabIndex: number[];
  value: string;
};
export type AdminInterFace = {
  autoPrefillingTiming: boolean;
  email: string;
  isVerified: boolean;
  masjids: any[];
  name: string;
  role: string;
  _id: string;
  updatedAt?: string;
  createdAt?: string;
};
export type AuthDataType = {
  password: string;
  token: string;
  email: string;
  type: string;
};

export type NamajTiming<T extends string | number> = {
  namazName: string;
  type?: number;
  azaanTime: T;
  jamaatTime: T;
  TimesByAzaan?: string;
  TimesByJamaat?: string;
  ExtendedJamaatMinutes?: number;
  ExtendedAzaanMinutes?: number;
  isSkipped?: boolean;
};

export type SpecialPrayer<T extends string | number> = {
  name: string;
  azaanTime?: T;
  jamaatTime: T;
  startDate: string;
  endDate: string;
  _id?: string;
};
export interface PrayerTimings<T extends string | number> {
  _id: string;
  date: string;
  prayerType?: string;
  timings: NamajTiming<T>[];
}

export type optionalTimings<T extends string | number> = Partial<
  NamajTiming<T>
>;
export type NamazTimings<T extends string | number> = {
  date: string;
  timings: NamajTiming<T>[];
};

export type WidgetNamazTiming<T extends string | number> = {
  namazName: string;
  type?: number;
  azaanTime: T;
  jamaatTime: T;
  _id: string;
};

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  token?: string;
}
export type PresetTimings = Record<
  string,
  {
    Asar: string;
    Dhur: string;
    Fajr: string;
    Firstthird: string;
    Imsak: string;
    Isha: string;
    Lastthird: string;
    Maghrib: string;
    Midnight: string;
    Sunrise: string;
    Sunset: string;
  }
>;
