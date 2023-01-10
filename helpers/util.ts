import { useEffect } from "react";

export { prepStringForSearch, generateUID, censorAccountNumber, getTimeAgo, useOutsideAlerter, padWithZero, uploadToClient, calculateCut, getFormattedDate, file2Base64, getUIValuesFromListingStatus, getStringFromReservationStatus, delay, tryParseInt, constructQueryFromObject, abbreviate, randstr, guid, convertListToQueryListString };

///[object] a regular object
///[prefix] a prefix path without the ?
function constructQueryFromObject(object: any, prefix: string) {

  let query: string = prefix + '?';

  Object.keys(object).forEach((key: string) => {
    query = query + `${key}=${object[key]}&`;
  });

  query = query.substring(0, query.length - 1); //Cut off last & symbol

  return query;
}

function generateUID(length: number) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

function prepStringForSearch(str: string) {
  //Remove all non-alphanumeric characters and spaces
  //Convert to lowercase
  //Remove all spaces
  //all step by step and console.log to see what happens
  let s = str.replaceAll(/[^a-zA-Z0-9 ]/g, "");
  s = s.toLowerCase();
  s = s.replaceAll(/\s/g, "");
  return s;
}


type ListingStatusUI = {
  color: string;
  text: string;
}

function censorAccountNumber(num: string) {
  return (
    num.substring(0, 4) +
    " **** **** **** **** " +
    num.substring(num.length - 2, num.length)
  );
}


const uploadToClient = (event: any, updateFunction: any) => {
  if (event.target.files && event.target.files[0]) {
    const i = event.target.files[0];
    updateFunction(URL.createObjectURL(i));
  }
};

const file2Base64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    if (!file) {
      reject("No file given");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = error => reject(error);
  })
}

function useOutsideAlerter(ref: any, cb: Function) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) cb(event.target)
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => { document.removeEventListener("mousedown", handleClickOutside) }
  }, [ref])
}

function getFormattedDate(date: Date) {
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let isToday =
    new Date().getDate() == dayOfMonth &&
    new Date().getMonth() + 1 == month &&
    new Date().getFullYear() == year;
  if (isToday) return "Heute";
  else {
    let dayString = dayOfMonth.toString().length == 1 ? '0' + dayOfMonth.toString() : dayOfMonth.toString();
    let monthString = month.toString().length == 1 ? '0' + month.toString() : month.toString();
    let yearString = year.toString();
    return `${dayString}.${monthString}.${yearString}`;
  }
}

function getTimeAgo(date: any) {
  var seconds = Math.floor(((new Date()).valueOf() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    let years = Math.floor(interval);
    if (years == 1) return `vor 1 Jahr`;
    else return `vor ${years} Jahren`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    let months = Math.floor(interval);
    if (months == 1) return `vor 1 Monat`;
    else return `vor ${months} Monaten`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    let days = Math.floor(interval);
    if (days == 1) return `vor 1 Tag`;
    else return `vor ${days} Tagen`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    let hours = Math.floor(interval);
    if (hours == 1) return `vor 1 Stunde`;
    else return `vor ${hours} Stunden`;

  }
  interval = seconds / 60;
  if (interval > 1) {
    let minutes = Math.floor(interval);
    if (minutes == 1) return `vor 1 Minute`;
    else return `vor ${minutes} Minuten`;
  }
  return `grade eben`;
}

function calculateCut(price: number) {
  return Math.ceil(price * 0.0299);
}

function padWithZero(input: string) {
  if (input.length == 1) {
    return "0" + input;
  } else return input;
}

function getUIValuesFromListingStatus(status: number): ListingStatusUI {
  switch (status) {
    case -1: return { text: "Gelöscht", color: '#FF2C55' };
    case 0: return { text: "Aktiv", color: '#39EB69' };
    case 1: return { text: "Unsichtbar", color: '#797676' };
    case 2: return { text: "Unvollständig", color: '#E3AE1D;' };
    case 3: return { text: "Reserviert", color: '#FFA01F' };
    case 4: return { text: "Verkauft", color: '#C3C0C0' };
    default: return { text: "Unsichtbar", color: '#797676' };
  }
}

function getStringFromReservationStatus(status: number) {
  switch (status) {
    case 0: return "Offen";
    case 1: return "Warten auf Zahlung";
    case 2: return "Fehlgeschlagen";
    case 3: return "Erfolgreich";
    case 4: return "Abgebrochen";
    default: return "Fehlgeschlagen";
  }
}

function delay(time: any) {
  return new Promise(resolve => setTimeout(resolve, time));
}


function convertListToQueryListString(list: any[]) {
  return list.toString().replaceAll('[', '').replaceAll(']', '');
}

function tryParseInt(str: string): number | undefined {
  if (!str || str.length == 0) return undefined;
  try {
    return parseInt(str);
  } catch (e) {
    return undefined;
  }
}

function randstr(prefix: string) {
  return Math.random()
    .toString(36)
    .replace("0.", prefix || "");
}

function abbreviate(s: string, maxLength: number) {
  if (!s) return "";
  if (s.length <= maxLength) return s;
  else return s.substring(0, maxLength) + "...";
}

let guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}