// Ignore call to setInterval and setTimeout because:
// - React calls setTimeout and we cannot disable this
// - React.NET checks if setTimeout exists and creates a function that throws an error if it doesn't:
//   https://github.com/reactjs/React.NET/blob/master/src/React.Core/Resources/shims.js
//
// This results in React calling the setTimeout function of React.NET which throws an error

import canUseDOM from './canUseDOM';

const mockServersideFunction = (checkFunctionName, functionNames: string[]) => {
  if (canUseDOM) return;

  if (
    typeof globalThis[checkFunctionName] !== 'function' ||
    globalThis[checkFunctionName].length === 0 // Because they are empty functions on the server: function() { throw new Error(...) };
  ) {
    functionNames.forEach((functionName) => {
      globalThis[functionName] = () => undefined;
    });
  }
};

mockServersideFunction('setTimeout', ['setTimeout', 'clearTimeout']);
mockServersideFunction('setInterval', ['setInterval', 'clearInterval']);