import { isValidJson } from "../helpers/json_helper";

const solveProblemTwoWithEndLine = (mergedRequest: string) : any => {
  const data = JSON.parse(mergedRequest);
  const results = JSON.stringify({ id: data.id, result: { message: data.params.message } }) + "\n";
  return results;
}

const solveProblemTwoWithContinousRequest = (mergedRequest: string, data: any) : string => {
  return (!mergedRequest.includes(data.toString())) ? mergedRequest + data.toString() : data.toString();
}

export { solveProblemTwoWithContinousRequest, solveProblemTwoWithEndLine }