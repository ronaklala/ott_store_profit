import axios from "axios";

const GOOGLE_SHEET_ID = "1vI4CpUqkCoxxW4AWsJDBSSn-l390Ycps671jccKfKCM";
const SHEET_NAME = "Hisab and Spendings"; // Sheet tab name
const API_KEY = "AIzaSyA6XyVvgdO5it1whpCEgk_3bH4HNcqW_Hg";

export const fetchDealersTotalAmount = async (setDealers, setLoading) => {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${SHEET_NAME}!C2:H?key=${API_KEY}`;
    const response = await axios.get(url);
    const rows = response.data.values;

    // Dealer names list
    const dealerNames = [
      "Harsh",
      "Abrar",
      "Tanishk",
      "Abhishek",
      "Bhaiya",
      "Aman Singh",
      "Naveen",
    ];

    // Process the data for required dealers
    const dealerData = dealerNames.map((dealer) => {
      const totalAmount = rows
        .filter((row) => row[5] === dealer) // Column H (Dealer Name) -> index 4
        .reduce((sum, row) => sum + (parseFloat(row[0]) || 0), 0); // Column C (Amount Sent) -> index 0

      return {
        dealer_name: dealer,
        total_amount: totalAmount,
      };
    });

    const sortedDealers = dealerData.sort(
      (a, b) => b.total_amount - a.total_amount
    );
    setDealers(sortedDealers);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchTotalSales = async (setTotalSale) => {
  try {
    // Fetch data from the first sheet (R3)
    const urlSheet1 = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${SHEET_NAME}!S3?key=${API_KEY}`;
    const responseSheet1 = await axios.get(urlSheet1);
    const valueSheet1 = responseSheet1.data.values
      ? responseSheet1.data.values[0][0]
      : 0;

    // Fetch data from the second sheet (E2:H)
    const urlSheet2 = `https://sheets.googleapis.com/v4/spreadsheets/1frJJO0XBdRtgbObJ8_Ia9ow8W9yQs-CvlnhRVadVQEY/values/Sheet1!E2:H?key=${API_KEY}`;
    const responseSheet2 = await axios.get(urlSheet2);

    // Sum the values from column H for the filtered rows
    const totalSheet2 = responseSheet2.data.values.reduce(
      (sum, row) => sum + (parseFloat(row[3]) || 0),
      0
    );

    // Combine the values from both sheets and set the total
    const total = (parseFloat(valueSheet1) || 0) + totalSheet2;
    setTotalSale(total);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Function to fetch today's total sales from two sheets
export const fetchTotalSalesToday = async (setTotalSalesToday) => {
  try {
    // Fetch data from the first sheet (columns A to E)
    const urlSheet1 = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/Hisab and Spendings!A2:E?key=${API_KEY}`;
    const responseSheet1 = await axios.get(urlSheet1);

    // Fetch data from the second sheet (columns E to H)
    const urlSheet2 = `https://sheets.googleapis.com/v4/spreadsheets/1frJJO0XBdRtgbObJ8_Ia9ow8W9yQs-CvlnhRVadVQEY/values/Sheet1!E2:H?key=${API_KEY}`;
    const responseSheet2 = await axios.get(urlSheet2);

    // Get today's date in 'MM/DD/YYYY' format (for both sheets)
    const todayOtt = new Date().toLocaleDateString("en-GB");
    const todayVideos = new Date().toLocaleDateString("en-US"); // MM/DD/YYYY format

    // Function to convert 'MM/DD/YY' to 'MM/DD/YYYY' for comparison (used for Sheet2)
    const formatDate = (dateStr) => {
      const [month, day, year] = dateStr.split("/");
      return `${month}/${day}/${year}`; // Convert 'YY' to 'YYYY'
    };

    // Sum for the first sheet (column A where date in column E matches today)
    const filteredRowsSheet1 = responseSheet1.data.values.filter(
      (row) => row[4] === todayOtt
    );
    const totalSheet1 = filteredRowsSheet1.reduce(
      (sum, row) => sum + (parseFloat(row[0]) || 0), // Sum from column A
      0
    );

    // Sum for the second sheet (column H where date in column E matches today)
    const filteredRowsSheet2 = responseSheet2.data.values.filter((row) => {
      const rowDate = formatDate(row[0]); // Convert date to 'MM/DD/YYYY'
      return rowDate === todayVideos; // Compare with today's date
    });

    const totalSheet2 = filteredRowsSheet2.reduce(
      (sum, row) => sum + (parseFloat(row[3]) || 0), // Sum from column H
      0
    );

    // Combine the totals from both sheets
    const totalSalesToday = totalSheet1 + totalSheet2;

    // Set the combined sum
    setTotalSalesToday(totalSalesToday);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

/**
 * The function fetches data from two Google Sheets, calculates the total profit by summing specific
 * values, and sets the result using a provided callback function.
 */
export const fetchTotalProfit = async (setTotalProfit) => {
  try {
    // Fetch data from the first sheet (Q3)
    const urlSheet1 = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${SHEET_NAME}!R3?key=${API_KEY}`;
    const responseSheet1 = await axios.get(urlSheet1);
    const valueSheet1 = responseSheet1.data.values
      ? responseSheet1.data.values[0][0]
      : 0;

    // Fetch data from the second sheet (E2:H)
    const urlSheet2 = `https://sheets.googleapis.com/v4/spreadsheets/1frJJO0XBdRtgbObJ8_Ia9ow8W9yQs-CvlnhRVadVQEY/values/Sheet1!E2:H?key=${API_KEY}`;
    const responseSheet2 = await axios.get(urlSheet2);

    // Sum the values from column H in the second sheet (no date filtering)
    const totalSheet2 = responseSheet2.data.values.reduce(
      (sum, row) => sum + (parseFloat(row[3]) || 0),
      0
    );

    // Combine the values from both sheets and set the total profit
    const totalProfit = (parseFloat(valueSheet1) || 0) + totalSheet2;
    setTotalProfit(totalProfit);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchTotalProfitToday = async (setTotalProfitToday) => {
  try {
    // Get today's date in both formats
    const todayGB = new Date().toLocaleDateString("en-GB"); // Format: DD/MM/YY
    const todayUS = new Date().toLocaleDateString("en-US"); // Format: MM/DD/YY

    // Fetch data from first sheet (B2:E)
    const urlSheet1 = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${SHEET_NAME}!B2:E?key=${API_KEY}`;
    const responseSheet1 = await axios.get(urlSheet1);

    // Filter rows where the date (last column) matches today in en-GB format
    const filteredSheet1 = responseSheet1.data.values.filter(
      (row) => row[3] === todayGB
    );

    // Sum all values from column B (first sheet) where the date matches
    const totalSheet1 = filteredSheet1.reduce(
      (sum, row) => sum + (parseFloat(row[0]) || 0),
      0
    );

    // Fetch data from second sheet (E2:H)
    const urlSheet2 = `https://sheets.googleapis.com/v4/spreadsheets/1frJJO0XBdRtgbObJ8_Ia9ow8W9yQs-CvlnhRVadVQEY/values/Sheet1!E2:H?key=${API_KEY}`;
    const responseSheet2 = await axios.get(urlSheet2);

    // Filter rows where the date (first column) matches today in en-US format
    const filteredSheet2 = responseSheet2.data.values.filter(
      (row) => row[0] === todayUS
    );

    // Sum all values from column H (last column of second sheet) where the date matches
    const totalSheet2 = filteredSheet2.reduce(
      (sum, row) => sum + (parseFloat(row[3]) || 0),
      0
    );

    // Calculate total profit today
    const totalProfitToday = totalSheet1 + totalSheet2;

    // Set the total profit today in state
    setTotalProfitToday(totalProfitToday);
  } catch (error) {
    console.error("Error fetching total profit today:", error);
  }
};

export const fetchMonthlySales = async (
  setTotalMonthlySales,
  setMonthWiseCategory,
  setYearlyReport
) => {
  try {
    // Get the current month and year
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // JavaScript months are 0-based, so +1
    const currentYear = today.getFullYear();

    // Fetch data from both sheets
    const sheet1URL = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${SHEET_NAME}!A2:F?key=${API_KEY}`;
    const sheet2URL = `https://sheets.googleapis.com/v4/spreadsheets/1frJJO0XBdRtgbObJ8_Ia9ow8W9yQs-CvlnhRVadVQEY/values/Sheet1!E2:H?key=${API_KEY}`;

    const [response1, response2] = await Promise.all([
      axios.get(sheet1URL),
      axios.get(sheet2URL),
    ]);

    const data1 = response1.data.values;
    const data2 = response2.data.values;
    if (!data1 || !data2) return;

    // Objects to store aggregated data
    const salesData = {}; // Daily sales data for the current month
    const assetCount = {}; // Asset distribution
    const yearlySales = {}; // Yearly sales report (month-wise)

    // ✅ Process Sheet 1 Data
    data1.forEach((row) => {
      const amount = parseFloat(row[0]) || 0; // Column A (amount)
      const profit = parseFloat(row[1]) || 0; // Column B (profit)
      const dateStr = row[4]; // Column E (date in DD/MM/YYYY format)
      const asset = row[5]?.trim(); // Column F (category/asset)

      if (dateStr) {
        // Extract day, month, and year from the date
        const [day, month, year] = dateStr.split("/").map(Number);

        // ✅ Yearly Report (Aggregating Monthly Sales)
        if (year === currentYear) {
          if (!yearlySales[month]) {
            yearlySales[month] = { sales: 0, profit: 0 };
          }
          yearlySales[month].sales += amount;
          yearlySales[month].profit += profit;
        }

        // ✅ Current Month Sales & Asset Distribution
        if (month === currentMonth && year === currentYear) {
          const formattedDate = `${day}/${month}/${year}`;

          // --- Daily Sales Data ---
          if (!salesData[formattedDate]) {
            salesData[formattedDate] = { sale: 0, profit: 0 };
          }
          salesData[formattedDate].sale += amount;
          salesData[formattedDate].profit += profit;

          // --- Asset Count ---
          if (asset) {
            assetCount[asset] = (assetCount[asset] || 0) + 1;
          }
        }
      }
    });

    // ✅ Process Sheet 2 Data (MM/DD/YY Format)
    data2.forEach((row) => {
      const dateStr = row[0]; // Column E (Date in MM/DD/YY format)
      const amount = parseFloat(row[3]) || 0; // Column H (Amount)

      if (dateStr) {
        // Extract month, day, and year from the date
        const [month, day, year] = dateStr.split("/").map(Number);
        const fullYear = year; // Convert YY to YYYY format (assuming this approach for 2-digit year)

        // ✅ Yearly Report (Add amount to both sales & profit)
        if (fullYear === currentYear) {
          if (!yearlySales[month]) {
            yearlySales[month] = { sales: 0, profit: 0 };
          }
          yearlySales[month].sales += amount;
          yearlySales[month].profit += amount;
        }
      }
    });

    // Convert daily sales data to array [{ date: "DD", sale: total, profit: total }]
    const dailySales = Object.entries(salesData).map(([date, values]) => ({
      date: date.split("/")[0], // Keep only the day
      sale: values.sale,
      profit: values.profit,
    }));

    // Convert asset counts into array [{ asset: "Category", amount: count }]
    const assetDistribution = Object.entries(assetCount).map(
      ([asset, amount]) => ({
        asset,
        amount,
      })
    );

    // Convert yearly sales data to array [{ month: "January", sales: total, profit: total }]
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const yearlyReport = Object.entries(yearlySales).map(([month, values]) => ({
      month: monthNames[month - 1], // Convert month index to name
      sales: values.sales,
      profit: values.profit,
    }));

    // ✅ Update States
    setTotalMonthlySales((prevState) => ({
      ...prevState,
      data: dailySales, // Updating only 'data'
    }));

    setMonthWiseCategory((prevState) => ({
      ...prevState,
      data: assetDistribution, // Updating only 'data'
    }));

    setYearlyReport((prevState) => ({
      ...prevState,
      data: yearlyReport, // Updating only 'data'
    }));
  } catch (error) {
    console.error("Error fetching monthly sales:", error);
  }
};
