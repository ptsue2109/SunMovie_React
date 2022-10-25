export const formatCurrency = (money?: number) => {
   let newMoney;
   if (!money || money < 0) {
     newMoney = 0;
   } else {
     newMoney = money;
   }
   return newMoney?.toLocaleString("it-IT")+ " đ";
 };

 export const formatDate = (dateString: Date) => {
  const date = new Date(dateString || "");
  return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
};