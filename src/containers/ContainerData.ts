export type TNameCountry = {
  id: number;
  name: {
    common: string;
  };
  borders: string[];
};

export type TInfoCountry = {
  name: string;
  capital: string;
  population: string;
  area: string;
  region: string;
  srcImg: string;
  borders: string[];
};
