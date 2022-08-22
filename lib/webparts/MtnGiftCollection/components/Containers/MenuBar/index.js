import * as React from 'react';
import styles from "./styles.module.scss";
import { Link } from 'react-router-dom';
var MenuBar = function (_a) {
    var _b = _a.menu, menu = _b === void 0 ? [] : _b;
    return (React.createElement("div", { className: styles.menubar }, menu.map(function (item, i) { return (React.createElement(Link, { key: i, to: item.url, className: styles.menu + " " + (item.active && styles.active) }, item.name)); })));
};
export default MenuBar;
//# sourceMappingURL=index.js.map