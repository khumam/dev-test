const isValidJson = (str: any) => {
  try {
    JSON.parse(str)
    return true;
  } catch (e) {
    return false
  };
}

export { isValidJson }