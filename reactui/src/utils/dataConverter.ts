import { ICryptoHistoricalData } from "../../../shared/interfaces/ICryptoHistoricalData";

/**
 *This function convert the data from database to rounded data for presenting
 *
 * @export
 * @param {ICryptoHistoricalData} { name, price, day, week, month, volume, market_cap }
 * @return {*}  {ICryptoHistoricalData}
 */
export function convertICryptoData({ name, price, day, week, month, volume, market_cap }:ICryptoHistoricalData):ICryptoHistoricalData{
    const convertedData= {
          name,
          price: parseFloat(price).toFixed(2),
          day: (100 * parseFloat(day)).toFixed(2),
          week: (parseFloat(week) * 100).toFixed(2),
          month: (parseFloat(month) * 100).toFixed(2),
          volume: (parseFloat(volume) / 1000000).toFixed(2),
          market_cap: (parseFloat(market_cap) / 1000000).toFixed(2),
    };

    return convertedData;
}