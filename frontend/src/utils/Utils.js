import moment from "moment";

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value);

export function calculateSalePrice(price, salePrice) {
  return ((100 - salePrice) * price) / 100;
}

export function calculateTimeout(timeStart, timeEnd) {
  let diff = new Date() - new Date(timeStart || new Date());
  let timeout = Math.max(timeEnd - diff, 0);
  return timeout || 0;
}

export const history = {
  navigate: null,
  location: null,
};

export let store;

export const injectStore = (_store) => {
  store = _store;
};

export function calculateTimeLine() {
  const format = "HH:mm A";
  const minutesBreakPoint = [0, 15, 30, 45, 60];
  const currentMinutes = +moment().minutes();
  const rounderMinutes =
    minutesBreakPoint.find((m) => m >= currentMinutes) - currentMinutes;
  const hoursDelivery = [];
  let step = 15;
  const endTime = moment("04:01", format);
  const startTime = moment("09:59", format);
  const deliveryTime = moment("10:29", format);
  while (1) {
    step += 15;
    const h = moment()
      .add(step + rounderMinutes, "minutes")
      .format(format);
    const time = moment(h + "", format);
    if (!time.isBetween(endTime, startTime)) {

      if (!time.isBetween(endTime,deliveryTime)) {
        hoursDelivery.push({
          _id: h,
          title: h,
        });
      }
    } else {
      break;
    }
  }
  return hoursDelivery;
}

export function calculateHoursDelivery() {
  const minutesBreakPoint = [0, 15, 30, 45, 60];
  const currentMinutes = +moment().minutes();
  const rounderMinutes =
    minutesBreakPoint.find((m) => m >= currentMinutes) - currentMinutes;
  const h = moment()
    .add(30 + rounderMinutes, "minutes")
    .format("HH:mm ");
  const startTime = moment("10:00", "HH:mm");
  const beginningTime = moment(moment().format("HH:mm"), "HH:mm");
  if (beginningTime.isBefore(startTime)) {
    return "10:30";
  }
  return h;
}

import resolveConfig from "tailwindcss/resolveConfig";

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig("./src/css/tailwind.config.js");
};
