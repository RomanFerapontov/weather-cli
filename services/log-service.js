import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
  console.log(`${chalk.bgRed("ERROR")} ${error}`);
};

const printSucsess = (sucsess) => {
  console.log(`${chalk.bgGreen("SUCSESS")} ${sucsess}`);
};

const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan("HELP")}
        Без параметров - вывод погоды
        -s [CITY] - для установки города
        -h для вывода помощи
        -t [API_KEY] для сохранения токена
        `
  );
};

export { printError, printSucsess, printHelp };
