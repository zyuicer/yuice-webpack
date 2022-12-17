export default () => {
  return {
    type: "checkbox",
    name: "plugins",
    message: "change plugin",
    choices: [
      {
        name: "html-webpack-plugin",
        checked: true,
      },
      {
        name: "clean-webpack-plugin",
        checked: true,
      },
      {
        name: "copy-webpack-plugin",
        checked: true,
      },
    ],
  };
};
