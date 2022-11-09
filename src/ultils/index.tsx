import moment from "moment";
import isBefore from "date-fns/isBefore";
import { formatDistance, isEqual, parseISO } from "date-fns";

export const formatCurrency = (money?: number) => {
  let newMoney;
  if (!money || money < 0) {
    newMoney = 0;
  } else {
    newMoney = money;
  }
  return newMoney?.toLocaleString("it-IT") + " đ";
};

export const formatDate = (dateString: Date) => {
  const date = new Date(dateString || "");
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const formatDateString = (dateString: Date) => {
  const date = new Date(dateString || "");
  return `${date.getDate()} Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
};

export const convertDateToNumber = (date: Date) => {
  const dateConvert = new Date(date);
  return dateConvert.getTime();
};


export const formatTime = (dateString: Date) => {
  const date = moment(new Date(dateString || "")).format("HH:mm");
  return date
};


export const discountPercent = (money?: any, discount?:any) => {
  let moneyPrice  = (money * discount)/100;
  let newMoney = money - moneyPrice
  return newMoney?.toLocaleString("it-IT") + " đ";
};
