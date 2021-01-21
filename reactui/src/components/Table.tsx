import MaterialTable from "material-table";
import React, { forwardRef } from "react";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import {
  FILTER__ALL,
  FILTER__DAY,
  FILTER__WEEK,
  FILTER__MONTH,
} from "../constants/Filter";
import { ICryptoHistoricalData } from "../../../shared/interfaces/ICryptoHistoricalData";

interface IProps {
  currentFilter: string;
  data: ICryptoHistoricalData[];
}

/** 
 * This constant is used for specifying the icons used in material-ui table
 * @type {*} */
const tableIcons = {
  DetailPanel: forwardRef<SVGSVGElement>((props, ref) => (
    <ChevronRight {...props} ref={ref as any} />
  )),
  SortArrow: forwardRef<SVGSVGElement>((props, ref) => (
    <ArrowDownward {...props} ref={ref as any} />
  )),
  LastPage: forwardRef<SVGSVGElement>((props, ref) => (
    <LastPage {...props} ref={ref as any} />
  )),
  NextPage: forwardRef<SVGSVGElement>((props, ref) => (
    <ChevronRight {...props} ref={ref as any} />
  )),
  FirstPage: forwardRef<SVGSVGElement>((props, ref) => (
    <FirstPage {...props} ref={ref as any} />
  )),
  PreviousPage: forwardRef<SVGSVGElement>((props, ref) => (
    <ChevronLeft {...props} ref={ref as any} />
  )),
};

export default function Table({ currentFilter, data }: IProps) {
  const columns: any[] = [
    { title: "name", field: "name" },
    { title: "price", type: "numeric", field: "price" },
  ];
  // swith among filter options
  switch (currentFilter) {
    case FILTER__ALL.value:
      columns.push({
        title: "day(%)",
        type: "numeric",
        field: "day",
        render: (data) =>
          data.day > 0 ? (
            <p style={{ color: "green" }}>{data.day}</p>
          ) : (
            <p style={{ color: "red" }}>{data.day}</p>
          ),
      });
      columns.push({
        title: "week(%)",
        type: "numeric",
        field: "week",
        render: (data) =>
          data.week > 0 ? (
            <p style={{ color: "green" }}>{data.week}</p>
          ) : (
            <p style={{ color: "red" }}>{data.week}</p>
          ),
      });
      columns.push({
        title: "month(%)",
        type: "numeric",
        field: "month",
        render: (data) =>
          data.month > 0 ? (
            <p style={{ color: "green" }}>{data.month}</p>
          ) : (
            <p style={{ color: "red" }}>{data.month}</p>
          ),
      });
      break;

    case FILTER__DAY.value:
      columns.push({
        title: "day(%)",
        type: "numeric",
        field: "day",
        render: (data) =>
          data.day > 0 ? (
            <p style={{ color: "green" }}>{data.day}</p>
          ) : (
            <p style={{ color: "red" }}>{data.day}</p>
          ),
      });
      break;

    case FILTER__WEEK.value:
      columns.push({
        title: "week(%)",
        type: "numeric",
        field: "week",
        render: (data) =>
          data.week > 0 ? (
            <p style={{ color: "green" }}>{data.week}</p>
          ) : (
            <p style={{ color: "red" }}>{data.week}</p>
          ),
      });
      break;

    case FILTER__MONTH.value:
      columns.push({
        title: "month(%)",
        type: "numeric",
        field: "month",
        render: (data) =>
          data.month > 0 ? (
            <p style={{ color: "green" }}>{data.month}</p>
          ) : (
            <p style={{ color: "red" }}>{data.month}</p>
          ),
      });
      break;
    default:
      break;
  }
  
  columns.push({ title: "volume(millions)", type: "numeric", field: "volume" });
  columns.push({
    title: "market_cap(millions)",
    type: "numeric",
    field: "market_cap",
  });

  return (
    <div>
        <MaterialTable
          icons={tableIcons}
          options={{
            search: false,
            paging: true,
            filtering: false,
            pageSizeOptions: [5, 6, 7],
          }}
          columns={columns}
          data={data}
          title="Crypto Currency"
        />
      
    </div>
  );
}
