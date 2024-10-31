export const JsonParse = (input: string): Object | any => {
  try {
    return JSON.parse(input);
  } catch (error: any) {
    console.log("JsonParse - error", error);
    return {};
  }
};
