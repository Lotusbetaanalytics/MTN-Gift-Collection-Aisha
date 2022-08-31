import * as React from "react";
import { Header, Sidebar } from "../../../Containers";
import styles from "./styles.module.scss";
import { useHistory } from "react-router-dom";
import { HiHome } from 'react-icons/Hi';
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp } from "@pnp/sp/presets/all";
import Text from "../../../Containers/Text";
import swal from "sweetalert";
import Spinner from "../../../Containers/Spinner";
var Document = function (_a) {
    var match = _a.match;
    var itemID = match.params.id;
    var history = useHistory();
    var backHandler = function () {
        history.push("/locationchampion/report");
    };
    var homeHanler = function () {
        history.push("/locationchampion");
    };
    var _b = React.useState(""), employeeEmail = _b[0], setEmployeeEmail = _b[1];
    var _c = React.useState(""), phone = _c[0], setPhone = _c[1];
    var _d = React.useState(""), surname = _d[0], setSurname = _d[1];
    var _e = React.useState(""), FirstName = _e[0], setFirstName = _e[1];
    var _f = React.useState(""), jobTitle = _f[0], setJobTitle = _f[1];
    var _g = React.useState(""), Email = _g[0], setEmail = _g[1];
    var _h = React.useState(""), location = _h[0], setLocation = _h[1];
    var _j = React.useState(""), pickupLocation = _j[0], setPickupLocation = _j[1];
    var _k = React.useState(""), pickupPerson = _k[0], setPickupPerson = _k[1];
    var _l = React.useState(""), division = _l[0], setDivision = _l[1];
    var _m = React.useState(""), vendor = _m[0], setVendor = _m[1];
    var _o = React.useState(false), modal = _o[0], setModal = _o[1];
    var _p = React.useState(""), collectionStatus = _p[0], setCollectionStatus = _p[1];
    var _q = React.useState(false), loading = _q[0], setLoading = _q[1];
    var _r = React.useState(""), proxyType = _r[0], setProxyType = _r[1];
    var _s = React.useState(""), ID = _s[0], setID = _s[1];
    React.useEffect(function () {
        sp.profiles.myProperties.get().then(function (response) {
            setEmployeeEmail(response.UserProfileProperties[19].Value);
            var userEmail = response.UserProfileProperties[19].Value;
            sp.web.lists
                .getByTitle("Admin")
                .items.filter("Email eq '" + userEmail + "'").get().then(function (response) {
                console.log(response);
                if (response.length === 0) {
                    swal("Warning!", "you are not authorize to use this portal", "error");
                    history.push("/");
                }
            });
        });
    }, []);
    React.useEffect(function () {
        setLoading(true);
        sp.profiles.myProperties.get().then(function (response) {
            setEmployeeEmail(response.DisplayName);
        });
        sp.web.lists.getByTitle("Report").items.filter("ID eq '" + itemID + "'").get().then(function (res) {
            setLoading(false);
            console.log(res);
            setPhone(res[0].Phone);
            setSurname(res[0].Surname);
            setFirstName(res[0].FirstName);
            setJobTitle(res[0].JobTitle);
            setEmail(res[0].Email);
            setLocation(res[0].Location);
            setPickupLocation(res[0].PickupLocation);
            setPickupPerson(res[0].PickupPerson);
            setDivision(res[0].Division);
            setVendor(res[0].Vendor);
            setID(res[0].ID);
            setCollectionStatus(res[0].CollectionStatus);
        });
    }, []);
    return (React.createElement("div", { className: "appContainer" },
        React.createElement(Sidebar, null),
        React.createElement("div", { className: "contentsRight" },
            React.createElement(Header, { title: "Employees", userEmail: employeeEmail }),
            React.createElement("div", { className: "spaceBetween" },
                React.createElement("div", null,
                    React.createElement("div", { className: "iconBtn", onClick: homeHanler },
                        " ",
                        React.createElement(HiHome, null))),
                React.createElement("div", null,
                    " ",
                    React.createElement("button", { className: "mtn__btn mtn__yellow", onClick: backHandler }, "Report"))),
            React.createElement("div", { className: styles.header },
                React.createElement("h3", null, "Employee Details")),
            loading ? React.createElement(Spinner, null) : React.createElement("div", { style: { display: "flex", flexDirection: "column", marginBottom: "2rem" } },
                React.createElement(Text, { title: "Phone Number", value: phone, size: "medium" }),
                React.createElement(Text, { title: "Surname", value: surname, size: "medium" }),
                React.createElement(Text, { title: "First Name", value: FirstName, size: "medium" }),
                React.createElement(Text, { title: "Job Title", value: jobTitle, size: "medium" }),
                React.createElement(Text, { title: "Email", value: Email, size: "medium" }),
                React.createElement(Text, { title: "Location", value: location, size: "medium" }),
                React.createElement(Text, { title: "Pickup Location", value: pickupLocation, size: "medium" }),
                React.createElement(Text, { title: "Pickup Person", value: pickupPerson, size: "medium" }),
                React.createElement(Text, { title: "Division", value: division, size: "medium" }),
                React.createElement(Text, { title: "Vendor", value: vendor, size: "medium" }),
                collectionStatus === "Collected" ? React.createElement("h4", { style: { marginLeft: "1%", color: "rgba(0, 0, 0)", marginTop: "10px" } },
                    " Gift Status : ",
                    React.createElement("span", { style: { backgroundColor: "green", color: "rgba(255, 255, 255, 1)", marginLeft: "15%", padding: "5px", borderRadius: "10px", fontWeight: "200" } }, collectionStatus)) : React.createElement(Text, { title: "Gift Status", value: collectionStatus, size: "medium" }),
                React.createElement("div", { style: { width: "40%", display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "2rem" } },
                    React.createElement("button", { onClick: backHandler, className: "mtn__btn mtn__white" }, " Back"))))));
};
export default Document;
//# sourceMappingURL=index.js.map