import { PATHS } from "../constants";
import { parseJson } from "../helpers";

export function getRequestBody(file: string) {
  return parseJson(PATHS.API_TEST_DATA + file + ".json");
}
