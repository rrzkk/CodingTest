
import { ICryptoHistoricalData } from "../../../shared/interfaces/ICryptoHistoricalData";
import {convertICryptoData} from "../utils/dataConverter"

it("should convert the data",  () => {
  // arrange
  const rawData:ICryptoHistoricalData={ name:"test",
    price: "100",
    day: "0.2",
    week: "-0.2",
    month: "1",
    volume: "1000000",
    market_cap: "2000000"}
    const aimedData:ICryptoHistoricalData={ name:"test",
    price: "100.00",
    day: "20.00",
    week: "-20.00",
    month: "100.00",
    volume: "1.00",
    market_cap: "2.00"}
  // act
  const result =  convertICryptoData(rawData);
  // assert
  expect(result.toString()).toBe(aimedData.toString());
 
});