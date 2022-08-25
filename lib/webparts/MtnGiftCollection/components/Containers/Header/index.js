import * as React from "react";
import styles from "./header.module.scss";
var Header = function (_a) {
    var title = _a.title, userEmail = _a.userEmail;
    return (React.createElement("div", { className: styles.mtn__header },
        React.createElement("div", { className: styles.mtn__header__text },
            React.createElement("h1", null, title)),
        React.createElement("div", { className: styles.userEmail },
            React.createElement("h3", null, userEmail))));
};
export default Header;
//# sourceMappingURL=index.js.map