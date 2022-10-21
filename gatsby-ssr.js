const React = require("react");

export const onRenderBody = ({setHeadComponents}) => {
  setHeadComponents([
    <script src="/jquery-1.7.1.min.js" />,
    <script src="/jquery.arctext.js" />
  ]);
}
