import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.WEATHER_API_KEY;
const LAT = process.env.WEATHER_LAT;
const LON = process.env.WEATHER_LON;
function fooBar(s) {
  let map = [];
  for (let i = 100; i >= s; i--) {
    let char = "";

    if (i % 3 === 0) char += "Foo";
    if (i % 5 === 0) char += "Bar";

    map.push(char || i.toString());
  }
  return map;
}
console.log("1.", fooBar(1));

async function weatherApi() {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`
    );

    // filter to only show one per day (e.g. at 12:00 AM)
    const forecastList = await res.data.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );
    console.log("");
    console.log("2. Weather Forecast:");
    forecastList.slice(0, 5).forEach((item) => {
      const date = new Date(item.dt_txt);
      const hari = date.toLocaleDateString("in-ID", { weekday: "short" });
      const tanggal = date.toLocaleDateString("in-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      const formattedDate = `${hari}, ${tanggal}`;
      const temp = item.main.temp.toFixed(1);
      console.log(`${formattedDate}: ${temp}°C`);
    });
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
}

weatherApi();
