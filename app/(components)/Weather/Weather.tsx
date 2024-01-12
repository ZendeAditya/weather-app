"use client";
import getCurrentDateTime from "@/app/helpers/datatime";
import { utimes } from "fs";
// import getWeatherDataByCity from "@/app/helpers/getdata";
import React, { FormEvent, useState, useEffect } from "react";
import { BsClouds } from "react-icons/bs";
import { getSunriseTime, getSunsetTime } from "@/app/helpers/datatime";
type Props = {};
interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
  cod: number;
}
const getWeatherDataByCity = async ({ city }: any) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1f35c8ef8dc8bea125f4b34149a0b553`
  );
  const data = await res.json();
  console.log(data);
  return data;
};
const Weather = (props: Props) => {
  const [city, setCity] = useState("");
  const [apiData, setApiData] = useState<WeatherData | null>(null);
  const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime);
  const [sunriseTimestamp, setSunriseTimestamp] = useState<number | undefined>(
    apiData?.sys.sunrise!
  );
  const [sunsetTimestamp, setSunsetTimestamp] = useState<number | undefined>(
    apiData?.sys.sunset!
  );

  const [sunriseTime, setSunriseTime] = useState("");
  const [sunsetTime, setSunsetTime] = useState("");
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(getCurrentDateTime);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = await getWeatherDataByCity({ city });
    setApiData(data);
  };
  useEffect(() => {
    setSunriseTimestamp(apiData?.sys.sunrise!);
    setSunsetTimestamp(apiData?.sys.sunset!);
  }, [
    apiData?.sys.sunrise,
    apiData?.sys.sunset,
    sunriseTimestamp,
    sunsetTimestamp,
  ]);

  // Update sunriseTime and sunsetTime whenever timestamps change
  useEffect(() => {
    setSunriseTime(getSunriseTime(sunriseTimestamp!));
    setSunsetTime(getSunsetTime(sunsetTimestamp!));
  }, [sunriseTimestamp, sunsetTimestamp]);

  return (
    <>
      <main>
        <form
          method="post"
          onSubmit={handleSubmit}
          className="flex items-center justify-center"
        >
          <input
            type="search"
            className="w-80 py-3 rounded-full m-2 px-2 outline-none border-2 focus:border-green-500 focus:ring-green-300 p-2"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </form>

        {/* {apiData && ( */}
        <section className="w-[80vw] h-[30rem] bg-gray-200/40 shadow-xl border-2 backdrop-blur-sm">
          <section>
            <div>
              <h2 className="text-center text-5xl font-semibold p-2">
                {currentDateTime.time}
              </h2>
              <div className="flex items-center justify-between px-4 text-2xl bg-gray-200 border-2  m-2 rounded-full">
                <h2>{currentDateTime.day}</h2>
                <h2>{currentDateTime.date}</h2>
              </div>
            </div>
          </section>
          {apiData && (
            <section>
              <div>
                <div>
                  <h2 className="text-3xl p-3">
                    {apiData.name},
                    <span className="text-lg">{apiData.sys.country}</span>
                  </h2>
                  <h2 className="flex items-center justify-start gap-2 text-3xl font-bold p-2">
                    <BsClouds />
                    {apiData.clouds.all}%
                  </h2>
                </div>
                <div className="flex items-center justify-between gap-2 w-full bg-slate-100 px-6  rounded-md py-2 text-lg">
                  <h2>
                    sunrise <p>{sunriseTime}</p>
                  </h2>
                  <h2>
                    Sunset <p>{sunsetTime}</p>
                  </h2>
                </div>
                <h2></h2>
              </div>
              <div>
                <h2 className="flex gap-2 py-2">
                  Temp <p>{apiData.main.temp - 273.15} &deg;C</p>
                </h2>
                <h2 className="flex gap-2 py-2">
                  minTemp <p>{apiData.main.temp_min - 273.15} &deg;C</p>
                </h2>
                <h2 className="flex gap-2 py-2">
                  maxTemp <p>{apiData.main.temp_max - 273.15} &deg;C</p>
                </h2>
              </div>
              {/* details  */}
            </section>
          )}
        </section>
      </main>
    </>
  );
};

export default Weather;
