import React from "./core/React.js";

// const APP = React.createElement('div', { class: 'app' }, '哈哈哈哈')
function CountComponent() {
  return (
    <div>
      countComponent
    </div>
  )
}

function Component({ title }) {
  return <div>{title}<CountComponent></CountComponent></div>
}

function APP() {
  return (
          <div>
            <p>1</p>
            <Component></Component>
          </div>
        )
}


export default APP