import { PRIMARY_UC_PHONE_DISPLAY, PRIMARY_UC_PHONE_TEL } from './constants/contact';

export type AccidentCityKey = "royal-palm-beach" | "lake-worth" | "palm-springs" | "lantana";

export const accidentCities: Record<AccidentCityKey, {
  name: string;
  displayName?: string; // For branding (e.g., "Lantana / Jog Rd")
  address: string;
  city: string; // GBP city name
  postalCode: string;
  phoneDisplay: string;
  phoneHref: string;
  phone: string;
  gmbCid: string; // Google Business Profile CID
  gmbPlaceId?: string; // Google Place ID
  gmbUrl: string; // Maps URL with CID
  coordinates?: { lat: number; lng: number };
}> = {
  "royal-palm-beach": {
    name: "Royal Palm Beach",
    address: "11476 Okeechobee Blvd",
    city: "Royal Palm Beach",
    postalCode: "33411",
    phoneDisplay: PRIMARY_UC_PHONE_DISPLAY,
    phoneHref: `tel:${PRIMARY_UC_PHONE_TEL}`,
    phone: `+1-${PRIMARY_UC_PHONE_DISPLAY}`,
    gmbCid: "16691066410736001367",
    gmbPlaceId: "ChIJPwCtc_ou2YgRV6FfrneUouc",
    gmbUrl: "https://www.google.com/maps?cid=16691066410736001367",
    coordinates: { lat: 26.7054883, lng: -80.2249158 }
  },
  "lake-worth": {
    name: "Lake Worth",
    address: "6447 Lake Worth Rd",
    city: "Lake Worth Beach",
    postalCode: "33463",
    phoneDisplay: PRIMARY_UC_PHONE_DISPLAY,
    phoneHref: `tel:${PRIMARY_UC_PHONE_TEL}`,
    phone: `+1-${PRIMARY_UC_PHONE_DISPLAY}`,
    gmbCid: "7327887939704951975",
    gmbPlaceId: "ChIJjen-gjUm2YgRp5T7n0HjsWU",
    gmbUrl: "https://www.google.com/maps?cid=7327887939704951975",
    coordinates: { lat: 26.619606, lng: -80.145805 }
  },
  "palm-springs": {
    name: "Palm Springs",
    address: "3460 S Congress Ave",
    city: "Palm Springs",
    postalCode: "33461",
    phoneDisplay: PRIMARY_UC_PHONE_DISPLAY,
    phoneHref: `tel:${PRIMARY_UC_PHONE_TEL}`,
    phone: `+1-${PRIMARY_UC_PHONE_DISPLAY}`,
    gmbCid: "8758270440044365995",
    gmbPlaceId: "ChIJmwXvjQ_Y2IgRqwim2Y-gi3k",
    gmbUrl: "https://www.google.com/maps?cid=8758270440044365995",
    coordinates: { lat: 26.625354, lng: -80.088456 }
  },
  "lantana": {
    name: "Lantana",
    displayName: "Lantana / Jog Rd", // Branding allowed
    address: "6169 Jog Rd Unit 4B",
    city: "Lake Worth Beach", // GBP city - must use in NAP
    postalCode: "33463", // GBP ZIP
    phoneDisplay: PRIMARY_UC_PHONE_DISPLAY,
    phoneHref: `tel:${PRIMARY_UC_PHONE_TEL}`,
    phone: `+1-${PRIMARY_UC_PHONE_DISPLAY}`,
    gmbCid: "6581069000649192112",
    gmbPlaceId: "ChIJ4d1n_Dcn2YgRsLIHWmOnVFs",
    gmbUrl: "https://www.google.com/maps?cid=6581069000649192112",
    coordinates: { lat: 26.587833, lng: -80.1490233 }
  }
};
