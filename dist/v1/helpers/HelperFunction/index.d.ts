import { Masjid } from "../../redux/Types";
export declare const UtcDateConverter: (data: string, tZone: string) => string;
export declare const tmFormatter: (tm: number | undefined, tZone: string) => string;
export declare const dateFormatter: (date: Date | string) => string;
export declare const formatConvertDate: (date: Date | string) => string;
export declare const UTCTimeConverter: (time: string, date: string, tZone: string) => number;
export declare const confirmation: (tx?: string) => Promise<any>;
export declare const dateReverter: (tm: string | undefined, tZone: string) => string;
export declare const timeZoneHandler: (tm: number | string, tZone: string) => string;
export declare const UTCTimeReverter: (tm: number | undefined, tZone: string) => string;
export declare const timeZoneGetter: (Masjid: Masjid) => string;
export declare const LocationBasedToday: (tzone: string | undefined) => Date;
export declare const getAccessToken: () => string | undefined;
export declare const getRefreshToken: () => string | undefined;
//# sourceMappingURL=index.d.ts.map