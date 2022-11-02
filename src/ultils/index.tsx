import moment from "moment";
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

