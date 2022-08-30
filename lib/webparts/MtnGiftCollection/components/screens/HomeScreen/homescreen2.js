import * as React from 'react';
import styles from './home.module.scss';
import { useHistory } from "react-router-dom";
var homescreen2 = function () {
    var history = useHistory();
    var admin = function () {
        history.push("/admin/document");
    };
    var employee = function () {
        history.push("/employee/location");
    };
    var locationchampion = function () {
        history.push("/locationchampion");
    };
    return (React.createElement("div", { className: 'appContainer' },
        React.createElement("div", { className: 'half' },
            React.createElement("div", { className: "left" },
                React.createElement("div", { className: 'center_logo' },
                    React.createElement("img", { src: require("../../assets/Vector.png") })))),
        React.createElement("div", { className: 'hal' },
            React.createElement("div", { style: { display: "flex", justifyContent: "center", backgroundColor: "#ffcc00", borderRadius: "60%", height: "50px", width: "100px", alignItems: "center", marginBottom: "10px", fontSize: "1.2rem" } }, "Y'ello"),
            React.createElement("div", { className: styles.mtn__logoContainer },
                React.createElement("div", { className: styles.text },
                    React.createElement("h3", null, "End of the year"),
                    React.createElement("h1", null, "GIFT COLLECTION"),
                    React.createElement("h1", null, "PORTAL"))),
            React.createElement("div", { className: 'down' },
                React.createElement("div", { className: 'pageCard', onClick: admin, style: { textDecoration: "none" } }, "Admin"),
                React.createElement("div", { className: 'pageCard', onClick: employee }, "Employee"),
                React.createElement("div", { className: 'pageCard', onClick: locationchampion }, "Location")))));
};
export default homescreen2;
//# sourceMappingURL=homescreen2.js.map