import axios from "axios";

export const fetchSheetData = async (sheetId, range) => {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=AIzaSyA6XyVvgdO5it1whpCEgk_3bH4HNcqW_Hg`;
    const response = await axios.get(url);
    return response.data.values || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
