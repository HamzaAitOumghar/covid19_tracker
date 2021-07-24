import axios from "axios";

const URL_API = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = URL_API;

  if (country) {
    changeableUrl = `${URL_API}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);
    const modifiedData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
    return modifiedData;
  } catch (err) {
    console.error(err);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${URL_API}/daily`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (err) {
    console.error(err);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${URL_API}/countries`);

    return countries.map((c) => c.name);
  } catch (err) {
    console.log(err);
  }
};
