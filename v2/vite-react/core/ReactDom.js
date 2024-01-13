import React from "./React.js";

const ReactDom = {
  createRoot(root) {
    return {
      render(app) {
        return React.render(app, root);
      },
    };
  },
};

export default ReactDom