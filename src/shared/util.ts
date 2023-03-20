const FormatDate = (dateIso: string) => {
  let returned = "";
  if (dateIso && dateIso !== "") {
    const date = new Date(dateIso);
    const year = date.getFullYear();
    let _month = date.getMonth() + 1;
    const _day = date.getDate();
    let day = "";
    let month = "";
    if (_day < 10) {
      day = "0" + _day;
    }
    if (_month < 10) {
      month = "0" + _month;
    }
    returned = day + "/" + month + "/" + year;
  }

  return returned;
};

export default FormatDate;
