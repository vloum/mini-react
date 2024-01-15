import ReactDom from "./core/ReactDom.js";
import React from "./core/React.js";

import APP from "./App.jsx";

console.log(APP)

ReactDom.createRoot(document.getElementById('root')).render(<APP></APP>)
