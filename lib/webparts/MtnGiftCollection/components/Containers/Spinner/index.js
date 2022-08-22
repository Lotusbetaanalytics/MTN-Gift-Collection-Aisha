import * as React from 'react';
import styles from './spinner.module.scss';
var Spinner = function (_a) {
    var _b = _a.size, size = _b === void 0 ? "60" : _b;
    return (React.createElement("div", { className: styles.spinner },
        React.createElement("svg", { className: styles.loader, xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
            React.createElement("circle", { cx: "12", cy: "12", r: "10" }))));
};
export default Spinner;
//# sourceMappingURL=index.js.map