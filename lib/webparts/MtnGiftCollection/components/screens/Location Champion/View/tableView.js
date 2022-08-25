import * as React from "react";
import { Header, Sidebar } from "../../../Containers";
import styles from "./styles.module.scss";
import { useHistory } from "react-router-dom";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp } from "@pnp/sp/presets/all";
import Text from "../../../Containers/Text";
import Spinner from "../../../Containers/Spinner";
var Document = function (_a) {
    var match = _a.match;
    var _b = React.useState(""), query = _b[0], setQuery = _b[1];
    var collectorOption = [{ value: "Self" }, { value: "Delegate" }];
    var proxyOption = [{ value: "By the Portal" }, { value: "By Email" }];
    var history = useHistory();
    var backHanler = function () {
        history.push("/locationchampion/report");
    };
    var _c = React.useState(""), employeeEmail = _c[0], setEmployeeEmail = _c[1];
    var _d = React.useState(""), phone = _d[0], setPhone = _d[1];
    var _e = React.useState(""), surname = _e[0], setSurname = _e[1];
    var _f = React.useState(""), FirstName = _f[0], setFirstName = _f[1];
    var _g = React.useState(""), jobTitle = _g[0], setJobTitle = _g[1];
    var _h = React.useState(""), Email = _h[0], setEmail = _h[1];
    var _j = React.useState(""), location = _j[0], setLocation = _j[1];
    var _k = React.useState(""), pickupLocation = _k[0], setPickupLocation = _k[1];
    var _l = React.useState(""), pickupPerson = _l[0], setPickupPerson = _l[1];
    var _m = React.useState(""), division = _m[0], setDivision = _m[1];
    var _o = React.useState(""), vendor = _o[0], setVendor = _o[1];
    var _p = React.useState(false), modal = _p[0], setModal = _p[1];
    var _q = React.useState(""), collectionStatus = _q[0], setCollectionStatus = _q[1];
    var _r = React.useState(false), loading = _r[0], setLoading = _r[1];
    var _s = React.useState(""), proxyType = _s[0], setProxyType = _s[1];
    var _t = React.useState(""), ID = _t[0], setID = _t[1];
    React.useEffect(function () {
        sp.profiles.myProperties.get().then(function (response) {
            console.log(response);
            setEmployeeEmail(response.Email);
        });
    }, []);
    React.useEffect(function () {
        sp.profiles.myProperties.get().then(function (response) {
            setEmployeeEmail(response.DisplayName);
        });
        sp.web.lists.getByTitle("GiftBeneficiaries").items.filter("ApprovalStatus eq 'Approved' and Phone eq '" + phone + "'").get().then(function (res) {
            console.log(res);
            setPhone(res[0].Phone);
            setSurname(res[0].Surname);
            setFirstName(res[0].FirstName);
            setJobTitle(res[0].JobTitle);
            setEmail(res[0].Email);
            setLocation(res[0].EmployeeLocation);
            setPickupLocation(res[0].PickupLocation);
            setPickupPerson(res[0].PickupPerson);
            setDivision(res[0].Division);
            setVendor(res[0].Vendor);
            setID(res[0].ID);
            setCollectionStatus(res[0].CollectionStatus);
        });
    }, [phone]);
    return (React.createElement("div", { className: "appContainer" },
        React.createElement(Sidebar, null),
        React.createElement("div", { className: "contentsRight" },
            React.createElement(Header, { title: "Employees", userEmail: employeeEmail }),
            React.createElement("div", { className: "spaceBetween" },
                React.createElement("div", null),
                React.createElement("div", null,
                    " ",
                    React.createElement("button", { className: "mtn__btn mtn__yellow" }, "Report"))),
            React.createElement("div", { className: styles.header },
                React.createElement("h3", null, "Employee Details")),
            loading ? (React.createElement(Spinner, null)) : React.createElement("div", { style: { display: "flex", flexDirection: "column", marginBottom: "2rem" } },
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
                React.createElement(Text, { title: "Collection Status", value: collectionStatus, size: "medium" }),
                React.createElement("div", { style: { width: "40%", display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "2rem" } },
                    React.createElement("button", { onClick: backHanler, className: "mtn__btn mtn__white" }, " Back"))))));
};
export default Document;
//# sourceMappingURL=tableView.js.map