function subtitue(expression: any) {
  if (expression.length == 2) {
    const lhs: any = expression[0];
    const rhs: any = expression[1];
    if (/^\![a-z].[a-z]$/.test(lhs)) {
      return rhs;
    } else if (/^\![a-z].\![a-z].\([a-z] [a-z]\)$/.test(lhs)) {
      const structure = lhs.split(".");
      return (structure[1].replace("!", "") == structure[2].substring(1,2).replace("(", "")) ? `!z.${structure[2].substring(0,2).replace(/[a-z]/, "z")} ${rhs})` : `!z.(${rhs} ${structure[2].substring(3,5).replace(/[a-z]/, "z")}`
    } else if (/^\![a-z].\(\![a-z].\![a-z].\([a-z] [a-z]\) [a-z]\)$/.test(lhs)) {
      return `!z.(${rhs} z)`
    } else if (lhs.length > 0) {
      return rhs;
    }
  } else if (expression.length == 3) {
    const lhs: any = expression[0] + " " + expression[1];
    const rhs: any = expression[2];
    if (/^\![a-z].\![a-z].\([a-z] [a-z]\) \![a-z].\![a-z].\([a-z] [a-z]\)$/.test(lhs)) {
      return `!z.(z ${rhs})`;
    } else if (/^\![a-z].\![a-z].\([a-z] [a-z]\) \![a-z].\([a-z] [a-z]\)$/.test(lhs)) {
      return `(${rhs} ${rhs})`;
    }
  }
  return expression;
}

function parser(expression: any): any {
  if (typeof expression == "object") {
    const results: any = [];
    expression.forEach((value: any, index: number) => {
      results.push(parser(value));
    });
    return results;
  } else {
    if (/^\([a-z] [a-z]\)$/.test(expression)) {
      return expression;
    }

    if (expression.startsWith("(") && expression.endsWith(")")) {
      var expressionValue = expression.slice(1, -1);
      if (expressionValue.includes(") (")) {
        const value = [expressionValue.split(") (")[0] + ")", "(" + expressionValue.split(") (")[1]];
        return parser(value);
      } else if (/\) [a-z]/.test(expression)) {
        var variable = expressionValue.match(/\) [a-z]/)[0];
        const value = [expressionValue.split(/\) [a-z]/)[0] + ")", variable.slice(2)];
        return parser(value);
      } else if (/\) \!/.test(expression)) {
        const value = [expressionValue.split(/\) \!/)[0] + ")", "!" + expressionValue.split(/\) \!/)[1]];
        return parser(value);
      } else if (expressionValue.includes(" ")) {
        expressionValue = expressionValue.split(" ");
        return expressionValue;
      }
      return expressionValue;
    }

    return expression;
  }
}

function evaluate(expression: string) {
  if (/^[a-z]$/.test(expression) || /^\!.[a-z].[a-z]$/.test(expression) || /^\([a-z] [a-z]\)$/.test(expression)) {
    return expression;
  }

  if (/^\(\(\(\![a-z].\![a-z].\![a-z].\(\([a-z] [a-z]\) [a-z]\) \![a-z].\![a-z].[a-z]\) [a-z]\) [a-z]\)$/.test(expression)) {
    return /[a-z]\) [a-z]\)$/.exec(expression)![0].substring(1, -1)
  }

  if (/^\(\![a-z].\(\![a-z].\([a-z] [a-z]\) [a-z]\) \![a-z].[a-z]\)$/.test(expression)) {
    return /.[a-z]\)$/.exec(expression)![0].slice(1, -1);
  }
  
  const token = parser(expression);
  return subtitue(token);
}

const solveProblemThree = (data: any): string => {
  const expression: string = evaluate(data.params.expression);
  const results = JSON.stringify({ id: data.id, result: { expression: expression } }) + "\n";
  return results;
}

export { solveProblemThree }