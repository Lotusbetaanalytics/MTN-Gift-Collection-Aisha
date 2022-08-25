import * as React from 'react';
import styles from "./styles.module.scss";
import { AiOutlineSearch } from 'react-icons/ai';
var SearchWidget = function (_a) {
    var value = _a.value, onchange = _a.onchange, type = _a.type, placeholder = _a.placeholder;
    var _b = React.useState(""), search = _b[0], setSearch = _b[1];
    return (React.createElement("div", { className: styles.pageTitle },
        React.createElement("div", { className: styles.search },
            React.createElement(AiOutlineSearch, null),
            React.createElement("input", { type: type, placeholder: placeholder, value: value, onChange: onchange }))));
};
export default SearchWidget;
//# sourceMappingURL=index.js.map