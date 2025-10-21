export type AccidentCityKey = "royal-palm-beach" | "lake-worth" | "palm-springs" | "lantana";

export const accidentCities: Record<AccidentCityKey, {
  name: string;
  address: string;
  phoneDisplay: string;
  phoneHref: string;
  gmb?: string; // optional Google Maps URL if available
}> = {
  "royal-palm-beach": {
    name: "Royal Palm Beach",
    address: "11476 Okeechobee Blvd., Royal Palm Beach, FL 33411",
    phoneDisplay: "(561) 223-8024",
    phoneHref: "tel:+15612238024",
    gmb: undefined
  },
  "lake-worth": {
    name: "Lake Worth",
    address: "6447 Lake Worth Road, Lake Worth, FL 33463",
    phoneDisplay: "(561) 223-8024",
    phoneHref: "tel:+15612238024",
    gmb: undefined
  },
  "palm-springs": {
    name: "Palm Springs",
    address: "3696 S. Congress Ave., Palm Springs, FL 33461",
    phoneDisplay: "(561) 223-8024",
    phoneHref: "tel:+15612238024",
    gmb: undefined
  },
  "lantana": {
    name: "Lantana",
    address: "6169 S Jog Road, Unit 4B, Lantana, FL 33467",
    phoneDisplay: "(561) 223-8024",
    phoneHref: "tel:+15612238024",
    gmb: undefined
  }
};
