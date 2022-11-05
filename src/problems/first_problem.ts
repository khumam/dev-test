const solveProblemOne = (data: any): string => {
  const message = data.params.message;
  const results = JSON.stringify({ id: data.id, result: { message: message } }) + "\n";
  return results;
}

export { solveProblemOne }