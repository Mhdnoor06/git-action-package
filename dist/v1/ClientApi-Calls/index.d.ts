import { AddingEvent } from "../redux/Types";
export declare const SignUpEmail: (requestBody: any) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const fetchUserLocationByIp: () => Promise<import("axios").AxiosResponse<any, any>>;
export declare const fetchSearchedMasjids: (name_or_address: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const fetchNearByMasjids: (requestBody: any) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getTimingsByDate: (masjidId: string, date: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const fetchMasjidById: (masjidId: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const fetchEventWithMasjidId: (masjidId: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getTimingByDateRange: (startDate: string, endDate: string, masjidId: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getDatesByDateRange: (masjidId: string, startDate: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const fetchEventId: (id: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const specialTimingsByMasjidId: (masjidId: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const addEvent: (masjidId: string, formData: AddingEvent) => Promise<import("axios").AxiosResponse<any, any>>;
//# sourceMappingURL=index.d.ts.map