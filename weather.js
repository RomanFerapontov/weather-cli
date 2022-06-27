#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printHelp, printSucsess, printError } from "./services/log-service.js";
import {
  getKeyValue,
  saveKeyValue,
  TOKEN_DICTIONARY,
} from "./services/storage-service.js";
import { getWeather } from "./services/api-services.js";
import dedent from "dedent-js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Не передан токен");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSucsess("Токен сохранён");
  } catch (err) {
    printError(err.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("Город не введён");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSucsess("Город сохранён");
  } catch (err) {
    printError(err.message);
  }
};

const getForecast = async () => {
  try {
    const city = await getKeyValue("city");
    const weather = await getWeather(city);
    return console.log(
      dedent(`В городе ${weather.name} ${weather.weather[0]["description"]}. 
    Температура воздуха ${weather.main.temp} градусов.
    Скорость ветра ${weather.wind["speed"]} м/с`)
    );
  } catch (err) {
    if (err?.response?.status == 404) {
      printError("Неверно указан город");
    } else if (err?.response?.status == 401) {
      printError("Неверно указан город");
    } else {
      printError(err.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  getForecast();
};

initCLI();
