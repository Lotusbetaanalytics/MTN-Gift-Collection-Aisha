import * as React from "react";
import styles from "./styles.module.scss";
var CustomBtn = function (_a) {
    var handler = _a.handler, buttonName = _a.buttonName;
    return (React.createElement("div", null,
        React.createElement("button", { type: "button", onClick: handler, className: styles.customBtn }, buttonName)));
};
export default CustomBtn;
//# sourceMappingURL=index.js.map