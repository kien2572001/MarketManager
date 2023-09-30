const tourTimeParser = (tourTime, type = "daily") => {
  if (type === "daily") {
    let arr = tourTime.split(" ");
    let hour = arr[0];
    let day = arr[1];
    return `${dayParser(day)} hàng tuần, lúc ${hour}`;
  } else if (type === "weekly") {
    let arr = tourTime.map((item) => {
      return dayParser(item);
    });
    return `Hàng tuần vào ${arr.join(", ")}`;
  }
};

const tourTimeParserToArr = (tourTime, type = "daily") => {
  console.log(tourTime);
  if (type === "daily") {
    let arr = tourTime.split(" ");
    return {
      hour: arr[0],
      day: arr[1],
    };
  } else if (type === "weekly") {
    return tourTime;
  }
};

const dayMap = {
  t2: "Thứ 2",
  t3: "Thứ 3",
  t4: "Thứ 4",
  t5: "Thứ 5",
  t6: "Thứ 6",
  t7: "Thứ 7",
  cn: "Chủ nhật",
};

const dayParser = (day) => {
  return dayMap[day] || "Không xác định";
};

export { tourTimeParser, tourTimeParserToArr };
