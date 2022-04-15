import React from "react";

export default function Header(props) {
  return (
    <div className="f-row flex-center lr-padding-50px" id="navbar">
      <div className="width-30">
        <div>Logo</div>
      </div>
      <div className="width-70">
        <ul id="menu" className="f-row no-bullets flex-end">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Account: {props.account}</li>
        </ul>
      </div>
    </div>
  );
}
