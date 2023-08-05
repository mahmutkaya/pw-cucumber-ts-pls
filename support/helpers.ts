import * as fs from "fs";
import xlsx from "node-xlsx";
import { testContext } from "./testFactory";

export const REGEX = {
  NON_ALPHANUMERIC: /[^a-zA-Z0-9]+(.)/g,
  NBSP: /\u00A0/g,
};

/**
 * @param days: <number> day after current date
 * @returns date as day/month/year format
 */
export function getDate(days?: number) {
  let date = new Date();
  date.setDate(date.getDate() + (days ? days : 0));
  return date.toLocaleDateString("en-GB");
}

/**
 * formats current date as year-month-day
 * @returns "yyyy-mm-dd"
 */
export function formatDate() {
  let d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  month.length < 2 && (month = "0" + month);
  day.length < 2 && (day = "0" + day);

  return [year, month, day].join("-");
}

export function getDateFromCurrentDate(value: string) {
  const dateValue = {
    CURRENT_DATE: getDate(),
    NEXT_DAY: getDate(1),
  };
  return dateValue[value];
}

export function toCamelCase(str: string) {
  return str
    .toLowerCase()
    .replace(REGEX.NON_ALPHANUMERIC, (m, chr) => chr.toUpperCase());
}

export function generateUniqueValueAndStore(key: string, value: string) {
  const uniqueValue: string = value + " - " + +new Date();
  testContext[toCamelCase(key)] = uniqueValue;
  return uniqueValue;
}

export function deleteFile(filePath: string) {
  fs.unlink(filePath, (err) => {
    if (err) throw new Error(`${filePath} could not be deleted`);
  });
}

export function parseJson(filePath: string) {
  const jsonString = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonString);
}

export function parseExcel(filePath: string) {
  return xlsx.parse(filePath)[0].data;
}

export function readFile(file: string) {
  return fs.readFileSync(file, { encoding: "utf8" });
}

export async function executeWithDelay(callback: any, timeout: number) {
  return new Promise<any>((resolve) =>
    setTimeout(async () => {
      resolve(callback);
    }, 1000)
  );
}

export function getIndexOfDay(day: string) {
  return [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ].indexOf(day);
}
