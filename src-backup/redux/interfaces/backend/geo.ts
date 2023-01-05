export interface GeoDataInterface {
  city: string;
  state: string;
}

export interface APIGeoResponse {
  name: string;
  state: string;
}

export interface GeoObject {
  [key: string]: string;
}

export interface GeoAPIResponseInterface {
  states: string[];
  cities: string[];
}
