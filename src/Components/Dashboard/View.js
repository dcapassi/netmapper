import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { v4 } from "uuid";

// import { Container } from './styles';

function View(props) {
  const [typeData, setTypeData] = useState([]);

  useEffect(() => {
    console.log(props.dashboardData);
  }, [props.dashboardData]);

  let formatPieData = (obj) => {
    let data;
    try {
      data = {
        labels: Object.keys(obj),
        datasets: [
          {
            data: Object.values(obj),
            backgroundColor: ["#FF6384", "#36A2EB"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB"],
          },
        ],
      };
    } catch {}
    return data;
  };

  let data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <>
      <h3>AP Type:</h3>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflow: "scroll",
        }}
      >
        {props.dashboardData !== undefined ? (
          props.dashboardData.map((entry) => {
            return (
              <>
                <div key={v4()}>
                  <strong
                    style={{
                      marginLeft: "100px",
                    }}
                  >
                    {entry.name}
                  </strong>
                  <div
                    style={{
                      width: "250px",
                      heigth: "400px",
                    }}
                  >
                    <Pie key={v4()} data={formatPieData(entry.apType)} />
                  </div>
                  <br />
                  <div
                    style={{
                      width: "250px",
                      heigth: "400px",
                    }}
                  >
                    <Bar
                      key={v4()}
                      data={formatPieData(entry.uniqueVendorCounted)}
                    />
                  </div>
                  <br />
                  <div
                    style={{
                      width: "250px",
                      heigth: "400px",
                    }}
                  >
                    <Bar
                      key={v4()}
                      data={formatPieData(entry.uniqueApsCounted)}
                    />
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default View;
