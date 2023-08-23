const serialize = require('serialize-javascript');

let componentId = 1;

const ReactInitJavaScript =() => {
  let str = '';

  const manifest = require('../../../dist/assets/js/asset-manifest.json');
  manifest.entrypoints.forEach((entry) => {
    str += `
      <script src=${entry}></script>
    `;
  });
  return str;
};

const React = (componentName, viewModel) => {
  componentId++;
  return (`
    <div id="react_0HM${componentId}"></div>
    <script>
      window.hydrationQueue.push({
        componentName: "${componentName}",
        initComponent: function() {
          return React.createElement(${componentName},
            ${serialize(viewModel)}
          ); 
        },
        selector: "#react_0HM${componentId}"
      });
    </script>
  `);
};

module.exports = {
  Html: {
    ReactInitJavaScript,
    React
  },
}
