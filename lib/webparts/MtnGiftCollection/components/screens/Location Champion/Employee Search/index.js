import * as React from "react";
import { Header, Sidebar } from "../../../Containers";
import { useHistory } from "react-router-dom";
import { sp } from "@pnp/sp/presets/all";
// import Spinner from "../../../../Containers/Spinner";
var Pickup = function () {
    var history = useHistory();
    var _a = React.useState(""), query = _a[0], setQuery = _a[1];
    var _b = React.useState(""), employeeEmail = _b[0], setEmployeeEmail = _b[1];
    React.useEffect(function () {
        sp.profiles.myProperties.get().then(function (response) {
            console.log(response);
            setEmployeeEmail(response.Email);
        });
    }, []);
    return (React.createElement("div", { className: "appContainer" },
        React.createElement(Sidebar, null),
        React.createElement("div", { className: "contentsRight" },
            React.createElement(Header, { title: "Employees", userEmail: employeeEmail }),
            React.createElement("div", { className: "spaceBetween" },
                React.createElement("div", null),
                React.createElement("div", null,
                    " ",
                    React.createElement("button", { className: "mtn__btn mtn__white" }, "Report"))))));
};
export default Pickup;
//# sourceMappingURL=index.js.map