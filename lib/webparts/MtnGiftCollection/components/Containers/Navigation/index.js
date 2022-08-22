import * as React from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
var Navigation = function (_a) {
    var _b = _a.document, document = _b === void 0 ? "" : _b, _c = _a.config, config = _c === void 0 ? "" : _c, _d = _a.report, report = _d === void 0 ? "" : _d, _e = _a.pickups, pickups = _e === void 0 ? "" : _e;
    return (React.createElement("div", { className: styles.mtn__navigation },
        React.createElement("div", { className: styles.mtn__url },
            React.createElement("ul", null,
                React.createElement("li", { className: styles[document] },
                    React.createElement(Link, { to: "/admin/document" }, "Document")),
                React.createElement("li", { className: styles[pickups] },
                    React.createElement(Link, { to: "/admin/pickup" }, "Pickups")),
                React.createElement("li", { className: styles[report] },
                    React.createElement(Link, { to: "/admin/report" }, "Report")),
                React.createElement("li", { className: styles[config] },
                    React.createElement(Link, { to: "/admin/config" }, "Config"))))));
};
export default Navigation;
//# sourceMappingURL=index.js.map