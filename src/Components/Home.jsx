import React, { useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";
import DealersList from "./DealersList";
import {
  fetchMonthlySales,
  fetchTotalProfit,
  fetchTotalProfitToday,
  fetchTotalSales,
  fetchTotalSalesToday,
} from "../Helpers/Queries";

const Home = () => {
  const [totalSale, setTotalSale] = useState(null);
  const [totalSaleToday, setTotalSalesToday] = useState(null);
  const [totalProfit, setTotalProfit] = useState(null);
  const [totalProfitToday, setTotalProfitToday] = useState(null);
  const [totalMonthlySales, setTotalMonthlySales] = useState({
    data: [],
    series: [
      {
        type: "line",
        xKey: "date",
        yKey: "sale",
        yName: "sale",
      },
      {
        type: "line",
        xKey: "date",
        yKey: "profit",
        yName: "profit",
      },
    ],
  });

  const [monthWiseCategory, setMonthWiseCategory] = useState({
    data: [],
    series: [
      {
        type: "pie",
        angleKey: "amount",
        legendItemKey: "asset",
      },
    ],
  });

  const [yearlyReport, setYearlyReport] = useState({
    // Data: Data to be displayed in the chart
    data: [],
    // Series: Defines which chart type and data to use
    series: [
      { type: "bar", xKey: "month", yKey: "sales", yName: "sale" },
      { type: "bar", xKey: "month", yKey: "profit", yName: "profit" },
    ],
  });

  useEffect(() => {
    fetchTotalSales(setTotalSale);
    fetchTotalSalesToday(setTotalSalesToday);
    fetchTotalProfit(setTotalProfit);
    fetchTotalProfitToday(setTotalProfitToday);
    fetchMonthlySales(
      setTotalMonthlySales,
      setMonthWiseCategory,
      setYearlyReport
    );
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="layout-specing">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h6 className="text-muted mb-1">Welcome back, Ronak!</h6>
              <h5 className="mb-0">Dashboard</h5>
            </div>
          </div>
          <div className="row row-cols-xl-4 row-cols-md-2 row-cols-1">
            <div className="col mt-4">
              <a
                href="#!"
                className="features feature-primary d-flex justify-content-between align-items-center rounded shadow p-3"
              >
                <div className="d-flex align-items-center">
                  <div className="icon text-center rounded-pill">
                    <i className="uil uil-usd-circle fs-4 mb-0" />
                  </div>
                  <div className="flex-1 ms-3">
                    <h6 className="mb-0 text-muted">Total Sales to date</h6>
                    <p className="fs-5 text-dark fw-bold mb-0">
                      <span className="counter-value" data-target={4589}>
                        {totalSale
                          ? totalSale.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })
                          : "Loading...."}
                      </span>
                    </p>
                  </div>
                </div>
              </a>
            </div>
            {/*end col*/}
            <div className="col mt-4">
              <a
                href="#!"
                className="features feature-primary d-flex justify-content-between align-items-center rounded shadow p-3"
              >
                <div className="d-flex align-items-center">
                  <div className="icon text-center rounded-pill">
                    <i className="uil uil-shopping-bag fs-4 mb-0" />
                  </div>
                  <div className="flex-1 ms-3">
                    <h6 className="mb-0 text-muted">
                      Total Profit To This Date
                    </h6>
                    <p className="fs-5 text-dark fw-bold mb-0">
                      <span className="counter-value" data-target={4800}>
                        {totalProfit
                          ? totalProfit.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })
                          : "Loading...."}
                      </span>
                    </p>
                  </div>
                </div>
              </a>
            </div>
            {/*end col*/}
            <div className="col mt-4">
              <a
                href="#!"
                className="features feature-primary d-flex justify-content-between align-items-center rounded shadow p-3"
              >
                <div className="d-flex align-items-center">
                  <div className="icon text-center rounded-pill">
                    <i className="uil uil-usd-circle fs-4 mb-0" />
                  </div>
                  <div className="flex-1 ms-3">
                    <h6 className="mb-0 text-muted">Total Sales Today</h6>
                    <p className="fs-5 text-dark fw-bold mb-0">
                      <span className="counter-value" data-target={48575}>
                        {totalSaleToday === 0
                          ? "No Sales Today"
                          : totalSaleToday
                          ? totalSaleToday.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })
                          : "Loading...."}
                      </span>
                    </p>
                  </div>
                </div>
              </a>
            </div>
            {/*end col*/}
            <div className="col mt-4">
              <a
                href="#!"
                className="features feature-primary d-flex justify-content-between align-items-center rounded shadow p-3"
              >
                <div className="d-flex align-items-center">
                  <div className="icon text-center rounded-pill">
                    <i className="uil uil-store fs-4 mb-0" />
                  </div>
                  <div className="flex-1 ms-3">
                    <h6 className="mb-0 text-muted">Total Profits Today</h6>
                    <p className="fs-5 text-dark fw-bold mb-0">
                      <span className="counter-value" data-target={145}>
                        {totalProfitToday === 0
                          ? "No Profits Today"
                          : totalProfitToday
                          ? totalProfitToday.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })
                          : "Loading...."}
                      </span>
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          {/*end row*/}
          <div className="row">
            <div className="col-xl-12 col-lg-7 mt-4">
              <div className="card shadow border-0 p-4 pb-0 rounded">
                <div className="d-flex justify-content-between">
                  <h6 className="mb-0 fw-bold">Sales Analytics</h6>
                  <div className="mb-0 position-relative">
                    <select className="form-select form-control" id="yearchart">
                      <option selected="">2021</option>
                      <option value={2020}>2020</option>
                      <option value={2019}>2019</option>
                    </select>
                  </div>
                </div>
                <AgCharts options={yearlyReport} />
              </div>
            </div>
          </div>
          {/*end row*/}
          <div className="row">
            <div className="col-xl-6">
              <div className="row">
                <div className="col-xl-12 mt-4">
                  <div className="card rounded shadow border-0 p-4">
                    <div className="d-flex justify-content-between mb-4">
                      <h6 className="mb-0">Monthly Sales Report</h6>
                      <div className="text-end">
                        <h6 className="text-muted mb-0">
                          {new Date().toLocaleString("en-US", {
                            month: "long",
                          })}
                        </h6>
                      </div>
                    </div>
                    <AgCharts options={totalMonthlySales} />
                  </div>
                </div>
                {/*end col*/}
                <div className="col-xl-12 mt-4">
                  <div className="card rounded shadow border-0 p-4">
                    <div className="d-flex justify-content-between mb-4">
                      <h6 className="mb-0">Monthly Sold Items</h6>
                      <div className="text-end">
                        <h6 className="text-muted mb-0">
                          {new Date().toLocaleString("en-US", {
                            month: "long",
                          })}
                        </h6>
                      </div>
                    </div>
                    <AgCharts options={monthWiseCategory} />
                  </div>
                </div>
                {/*end col*/}
              </div>
              {/*end row*/}
            </div>
            {/*end col*/}
            <DealersList />
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
      </div>
    </>
  );
};

export default Home;
