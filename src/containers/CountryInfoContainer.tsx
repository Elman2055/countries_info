import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import CountryName from "../components/countryName/CountryName";
import CountryInfo from "../components/countryInfo/CountryInfo";
import { TNameCountry, TInfoCountry } from "./ContainerData";
import "./CountryInfoContainer.scss";

const CountryInfoContainer = () => {
  const [countryName, setCountryName] = useState<TNameCountry[]>([]);
  const [countryInfo, setCountryInfo] = useState<TInfoCountry[]>([]);
  const [flag, setFlag] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [filteredCountries, setFilteredCountries] = useState<TNameCountry[]>(
    []
  );

  const GetCountryName = useCallback(async () => {
    setFlag(true);
    const { data } = await axios.get("https://restcountries.com/v3.1/all");

    const sortedCountries = data.sort((a: TNameCountry, b: TNameCountry) => {
      return a.name.common.localeCompare(b.name.common);
    });

    setCountryName(sortedCountries);
    setFlag(false);
  }, []);

  const GetcountryInfo = useCallback(
    async (name: string, borders: string[]) => {
      setFlag(true);
      const { data } = await axios.get("https://restcountries.com/v3.1/all");

      const country = data.filter(
        (elem: TNameCountry) => elem.name.common === name
      );

      const border = borders
        ? await Promise.all(
            borders.map(async (elem) => {
              const { data } = await axios.get(
                `https://restcountries.com/v3.1/alpha/${elem}`
              );
              return data[0];
            })
          )
        : [""];

      const borderNames =
        border.length > 1
          ? border.map((elem) => elem.name.common)
          : ["Not borders"];

      setCountryInfo([
        {
          name: country[0].name.common,
          capital: country[0].capital,
          population: country[0].population,
          area: country[0].area,
          region: country[0].region,
          srcImg: country[0].flags.png,
          borders: borderNames,
        },
      ]);
      setFlag(false);
    },
    []
  );

  useEffect(() => {
    GetCountryName();
  }, []);

  useEffect(() => {
    const newFilteredCountries = countryName.filter((country) =>
      country.name.common.toLowerCase().includes(searchText)
    );
    setFilteredCountries(newFilteredCountries);
  }, [searchText, countryName]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
  };

  return (
    <>
      <div className="countryInfoContainer">
        <div className="name sameInfoName">
          <div className="search">
            <input
              type="text"
              className="countrySearchInput "
              placeholder="Search"
              onChange={handleSearchChange}
            />
          </div>
          {filteredCountries.map((elem) => (
            <CountryName
              key={elem.name.common}
              name={elem.name.common}
              onClick={() => GetcountryInfo(elem.name.common, elem.borders)}
            />
          ))}
        </div>
        {flag && (
          <div className="backdrop">
            <span className="loader"></span>
          </div>
        )}
        <div className="info sameInfoName">
          {countryInfo.map((elem) => (
            <CountryInfo
              key={elem.name}
              country={elem.name}
              capital={elem.capital}
              population={elem.population}
              area={elem.area}
              region={elem.region}
              srcImg={elem.srcImg}
              borders={elem.borders.join(", ")}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CountryInfoContainer;
