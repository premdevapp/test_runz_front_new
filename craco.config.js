module.exports = {
  reactScriptsVersion: "react-scripts",
  babel: {
    plugins: [
      [
        "babel-plugin-import",
        {
          libraryName: "@mui/material",
          libraryDirectory: "esm",
          camel2DashComponentName: false,
        },
        "core",
      ],
      [
        "babel-plugin-import",
        {
          libraryName: "@mui/icons-material",
          libraryDirectory: "esm",
          camel2DashComponentName: false,
        },
        "icons",
      ],
    ],
  },
  resolve: {
       alias: {
         '@mui/styled-engine': '@mui/styled-engine-sc'
       },
     },
};
