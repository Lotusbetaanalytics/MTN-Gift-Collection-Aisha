import * as React from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
var AdminCard = function (_a) {
    var title = _a.title, count = _a.count, Icon = _a.Icon, url = _a.url;
    return (React.createElement(Link, { to: url, className: styles.mtn__cards },
        React.createElement("div", { className: "" + styles.mtn__icons },
            React.createElement(Icon, null)),
        React.createElement("div", { className: styles.mtn__text },
            React.createElement("h5", null, title),
            React.createElement("h3", null, count))));
};
export default AdminCard;
//# sourceMappingURL=index.js.map