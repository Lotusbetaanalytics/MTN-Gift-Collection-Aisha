import * as React from "react";
import { Header, Sidebar } from "../../../Containers";
import styles from "./styles.module.scss";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp } from "@pnp/sp/presets/all";
import Text from "../../../Containers/Text";
var Document = function () {
    var _a = React.useState(""), employeeEmail = _a[0], setEmployeeEmail = _a[1];
    React.useEffect(function () {
        sp.profiles.myProperties.get().then(function (response) {
            console.log(response);
            setEmployeeEmail(response.Email);
        });
    }, []);
    return (React.createElement("div", { className: "appContainer" },
        React.createElement(Sidebar, null),
        React.createElement("div", { className: "contentsRight" },
            React.createElement(Header, { title: "Report", userEmail: employeeEmail }),
            React.createElement("div", { className: "spaceBetween" },
                React.createElement("div", null),
                React.createElement("div", null,
                    " ",
                    React.createElement("button", { className: "mtn__btn mtn__yellow" }, "Report"))),
            React.createElement("div", { className: styles.header },
                React.createElement("h3", null, "Employee Details")),
            React.createElement("div", null,
                React.createElement(Text, { title: "Phone Number", value: "09076733763", size: "medium" }),
                React.createElement(Text, { title: "Location", value: "55, lekki road maruwa", size: "medium" }),
                React.createElement(Text, { title: "Location", value: "55, lekki road maruwa", size: "medium" }),
                React.createElement(Text, { title: "Location", value: "55, lekki road maruwa", size: "medium" }),
                React.createElement(Text, { title: "Location", value: "55, lekki road maruwa", size: "medium" }),
                React.createElement(Text, { title: "Location", value: "55, lekki road maruwa", size: "medium" }),
                React.createElement("div", { style: { width: "40%", display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "2rem" } },
                    React.createElement("button", { className: "mtn__btn mtn__black" }, " back"))))));
};
export default Document;
//# sourceMappingURL=index.js.map