export default () => {
  return {
    type: "checkbox",
    name: "loaders",
    message: "change loaders",
    choices: [
      {
        name: "css-loader",
        checked: true,
      },
      {
        name: "less-loader",
        checked: true,
      },
      {
        name: "sass-loader",
      },
    ],
  };
};
