export default () => {
  return {
    type: "list",
    name: "language",
    message: "change language loader",
    choices: [
      {
        name: "ts",
      },
      {
        name: "js",
      },
    ],
  };
};
