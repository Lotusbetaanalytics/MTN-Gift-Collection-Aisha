import * as React from 'react';
import styles from './styles.module.scss';
var Text = function (_a) {
    var title = _a.title, value = _a.value, _b = _a.size, size = _b === void 0 ? "medium" : _b;
    return (React.createElement("div", { className: styles.textContainer + " " + styles[size] },
        React.createElement("h5", null, title),
        React.createElement("p", null, value)));
};
export default Text;
//# sourceMappingURL=index.js.map