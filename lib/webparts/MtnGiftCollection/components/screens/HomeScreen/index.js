import * as React from 'react';
import styles from './home.module.scss';
import { Link } from 'react-router-dom';
var HomeScreen = function () {
    return React.createElement("div", { className: styles.app },
        React.createElement("div", { className: styles.header },
            React.createElement("div", { className: styles.header_logo },
                React.createElement("img", { src: require('../../assets/Vector.png'), alt: "logo" }))),
        React.createElement("div", { className: styles.liner },
            React.createElement("div", { className: styles.mtn__banner },
                React.createElement("div", { className: styles.mtn__logoContainer },
                    React.createElement("div", { className: styles.text },
                        React.createElement("h3", null, "End of the year"),
                        React.createElement("h1", null, "GIFT COLLECTION "),
                        React.createElement("h1", null, "PORTAL"))),
                React.createElement("div", { className: styles.btnContainer },
                    React.createElement(Link, { to: "/home", className: "mtn__btn mtn__black" }, "Proceed")))));
};
export default HomeScreen;
//# sourceMappingURL=index.js.map