import axios, { AxiosResponse } from "axios";
import {getData} from "../api/services";

it("should call api", async () => {
  // arrange
  const apiRequest = jest
    .spyOn(axios, "request")
    .mockImplementation(async (_) => {
      return Promise.resolve("secret");
    });
  // act
  const result = await getData();
  // assert
  expect(result).toBe("secret");
  expect(apiRequest).toBeCalledTimes(1);
});
