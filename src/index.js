import * as React from "react";
import * as ReactDOM from "react-dom";
import "./style/index.scss";

class Greeting extends React.Component {
  render() {
    return <div className="hello">hello</div>;
  }
}

ReactDOM.render(<Greeting />, document.getElementById("app"));
