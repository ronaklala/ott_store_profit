import React, { useEffect, useState } from "react";
import { fetchDealersTotalAmount } from "../Helpers/Queries";

const DealersList = () => {
  const [loading, setLoading] = useState(true);
  const [dealers, setDealers] = useState([]);

  useEffect(() => {
    fetchDealersTotalAmount(setDealers, setLoading);
  }, []);

  return (
    <>
      <div className="col-xl-6 mt-4">
        <div className="card border-0">
          <div className="d-flex justify-content-between p-4 shadow rounded-top">
            <h6 className="fw-bold mb-0">Dealers List</h6>
          </div>
          <div
            className="table-responsive shadow rounded-bottom"
            data-simplebar=""
            style={{ height: 575 }}
          >
            <table className="table table-center bg-white mb-0">
              <thead>
                <tr>
                  <th className="border-bottom p-3">No.</th>
                  <th className="border-bottom p-3" style={{ minWidth: 220 }}>
                    Client Name
                  </th>
                  <th className="text-center border-bottom p-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <>
                    <h6 className="fw-bold mb-0 p-4">
                      Loading Dealers Data......
                    </h6>
                  </>
                ) : (
                  <>
                    {dealers.map((d, i) => (
                      <>
                        <tr>
                          <th className="p-3">{i + 1}</th>
                          <td className="p-3">
                            <a href="#" className="text-primary">
                              <div className="d-flex align-items-center">
                                <span className="ms-2 text-bold">
                                  {d.dealer_name}
                                </span>
                              </div>
                            </a>
                          </td>
                          <td className="text-center p-3">
                            {d.total_amount.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </td>
                        </tr>
                      </>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealersList;
