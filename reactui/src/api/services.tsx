import axios, { AxiosResponse } from "axios";
import config from "../configuration.json";
import { ICryptoHistoricalData } from "../../../shared/interfaces/ICryptoHistoricalData";

const BACKEND_URL = process.env.NODE_ENV === "production" ? config.exUrlProd : config.exUrlDev;

/**
 * Get data from server.
 *
 * @export
 * @return {*}  {Promise<AxiosResponse<ICryptoHistoricalData[]>>}
 */
export function getData(): Promise<AxiosResponse<ICryptoHistoricalData[]>> {
    return axios.request({
      url: BACKEND_URL + "api/getSelectedEntry",
      method: "GET",
    });
};
