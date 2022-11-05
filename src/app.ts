import { createServer } from "net";
import { isValidJson } from "./helpers/json_helper";
import { logRequest } from "./helpers/logger_helper";
import { solveProblemOne } from "./problems/first_problem";
import { solveProblemTwoWithContinousRequest, solveProblemTwoWithEndLine } from "./problems/second_problem";
import { solveProblemThree } from "./problems/third_problems";
const args: any = process.argv.slice(2);
const server: any = createServer(function (socket) {
  let mergedRequest: string = "";
  socket.on("data", function (request) {
    logRequest(request);
    if (typeof request === "object" && isValidJson(request)) {
      const data = JSON.parse(request.toString());
      if (data.method == "echo") {
        const results = solveProblemOne(data);
        socket.write(results);
      } else if (data.method == "evaluate") {
        const results = solveProblemThree(data);
        socket.write(results);
      }
    } else {
      if (/\n/.exec(request.toString())) {
        const splitedReqWithLineBreak = request.toString().split(/\n/);
        mergedRequest = mergedRequest + splitedReqWithLineBreak[0];
        if (isValidJson(mergedRequest)) {
          const results = solveProblemTwoWithEndLine(mergedRequest);
          socket.write(results);
        }
        mergedRequest = splitedReqWithLineBreak[1];
      } else {
        mergedRequest = solveProblemTwoWithContinousRequest(mergedRequest, request);
      }
    }
  });
});
server.listen(args[0] || "/var/run/dev-test/sock");