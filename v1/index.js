import ReactDom from "./ReactDom.js";
import React from "./React.js";

const APP = React.createElement('div', { class: 'app' }, '哈哈哈哈')

ReactDom.createRoot(document.getElementById('root')).render(APP)
