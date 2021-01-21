import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "../App.css";
import { getData } from "../api/services";
import Table from "./Table";
import { ICryptoHistoricalData } from "../../../shared/interfaces/ICryptoHistoricalData";

import { FILTER__ALL } from "../constants/Filter";
import Filter from "./Filter";
import {convertICryptoData} from "../utils/dataConverter";

interface IResponsiveStyle {
  borderRadius: string;
  alignSelf: string;
}
/** 
 * responsive style defination
 * @type {*} */
const resStyleSmall: IResponsiveStyle = {
  borderRadius: "25px",
  alignSelf: "center",
};
const resStyleBig: IResponsiveStyle = {
  borderRadius: "0px",
  alignSelf: "flex-start",
};

function App() {
  //initial set up for the states
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ICryptoHistoricalData[]>([]);

  const [currentFilter, setCurrentFilter] = useState(FILTER__ALL.value);

  //responsive design for smaller devices

  const [width, setWidth] = useState(window.innerWidth);
  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
  };

  //get window size every time adjust the window
  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });
  //round the data get directly from databse and trasfer the units
  useEffect(() => {
    getData()
      .then((res) => {
        const results = res.data.map(convertICryptoData);
        setData(results);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("Cannot Fetch the Data" + err);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="bg">
        <p>loading!!!</p>
      </div>
    );
  }

  if (data) {
    return (
      <div className="bg">
        <div
          className="container center"
          style={width > 575 ? resStyleSmall : resStyleBig}
        >
          <div style={{ maxWidth: "100%", overflow: "auto" }}>
            <Filter setFilterValue={setCurrentFilter} />
            <Table currentFilter={currentFilter} data={data} />
            <p style={{ marginTop: 5 }}>*click on column header to sort</p>
          </div>
        </div>
      </div>
    );
  }

  return <div>Oops, failed to retrieve data from the backend.</div>;
}

export default App;
