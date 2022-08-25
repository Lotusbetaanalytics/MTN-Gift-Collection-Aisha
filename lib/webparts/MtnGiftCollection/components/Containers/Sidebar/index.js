import * as React from 'react';
import styles from "./styles.module.scss";
var Sidebar = function () {
    return (React.createElement("div", { className: styles.app },
        React.createElement("div", { className: styles.logo_container },
            React.createElement("div", { className: styles.header_logo },
                React.createElement("img", { src: require('../../assets/Vector.png'), alt: "logo" }))),
        React.createElement("div", { className: styles.mtn_logo },
            React.createElement("div", { className: styles.header_logo2 },
                React.createElement("img", { src: require('../../assets/Y’ello.png'), alt: "logo" })))));
};
export default Sidebar;
//# sourceMappingURL=index.js.map