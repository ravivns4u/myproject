import citiesJson from '../../local/cities.json';
import type { GeoAPIResponseInterface } from '../../redux/interfaces';
interface CityInterface {
  name: string;
  id: string;
  state: string;
}
export const citiesArray = [
  ...new Set(citiesJson.map((element) => element.name)),
] as string[];
const states = citiesJson.map((element) => element.state) as string[];
export const statesArray = [...new Set(states)].sort();

export const getCitiesAndStates = () => {
  if (process.env.NODE_ENV === 'development') {
    return {
      cities: citiesArray.slice(0, 50).sort(),
      states: statesArray.sort(),
    } as GeoAPIResponseInterface;
  } else {
    return {
      cities: citiesArray.sort() as string[],
      states: statesArray.sort() as string[],
    } as GeoAPIResponseInterface;
  }
};

export const getStateFromCity = (city: string) => {
  const cityValue = city.toLowerCase();
  const state = citiesJson.find(
    (element) => element.name.toLowerCase() === cityValue
  );
  if (state) {
    return state.state;
  } else return 'Other';
};
