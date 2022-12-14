import * as React from "react";
import { Header, Input, Search, Select, Sidebar, } from "../../../Containers";
import styles from "./styles.module.scss";
import { useHistory } from "react-router-dom";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp } from "@pnp/sp/presets/all";
import Text from "../../../Containers/Text";
import swal from "sweetalert";
import Modal from "../../../Containers/Modal";
var Document = function () {
    var _a = React.useState(""), query = _a[0], setQuery = _a[1];
    var collectorOption = [{ value: "Self" }, { value: "Delegate" }];
    var proxyOption = [{ value: "By the Portal" }, { value: "By Email" }];
    var history = useHistory();
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
    var _m = React.useState(""), delegateFullname = _m[0], setDelegateFullname = _m[1];
    var _o = React.useState(""), delegatePhone = _o[0], setDelegatePhone = _o[1];
    var _p = React.useState(""), vendor = _p[0], setVendor = _p[1];
    var _q = React.useState(false), modal = _q[0], setModal = _q[1];
    var _r = React.useState(""), collectionStatus = _r[0], setCollectionStatus = _r[1];
    var _s = React.useState(false), loading = _s[0], setLoading = _s[1];
    var _t = React.useState(""), proxyType = _t[0], setProxyType = _t[1];
    var _u = React.useState(""), date = _u[0], setDate = _u[1];
    var _v = React.useState(""), time = _v[0], setTime = _v[1];
    var _w = React.useState(""), ID = _w[0], setID = _w[1];
    React.useEffect(function () {
        sp.profiles.myProperties.get().then(function (response) {
            setEmployeeEmail(response.UserProfileProperties[19].Value);
            var userEmail = response.UserProfileProperties[19].Value;
            sp.web.lists
                .getByTitle("Admin")
                .items.filter("Role eq 'Location Champion' and Email eq '" + userEmail + "'")
                .get()
                .then(function (response) {
                if (response.length === 0) {
                    swal("Warning!", "you are not authorize to use this portal", "error");
                    history.push("/");
                }
            });
        });
    }, []);
    React.useEffect(function () {
        var today = new Date();
        var getYear = today.getFullYear();
        var getToday = today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        setTime(time);
        var months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        var d = new Date();
        var monthName = months[d.getMonth()]; // "July" (or current month)
        setDate(getToday + "-" + monthName + "-" + getYear);
        sp.web.lists
            .getByTitle("GiftBeneficiaries")
            .items.filter("ApprovalStatus eq 'Approved' and Phone eq '" + phone + "'")
            .get()
            .then(function (res) {
            console.log(res);
            setPhone(res[0].Phone);
            setSurname(res[0].Surname);
            setFirstName(res[0].FirstName);
            setJobTitle(res[0].JobTitle);
            setEmail(res[0].Email);
            setLocation(res[0].EmployeeLocation);
            setPickupLocation(res[0].PickupLocation);
            setPickupPerson(res[0].PickupPerson);
            setDelegateFullname(res[0].DelegateFullname);
            setDelegatePhone(res[0].DelegatePhone);
            setDivision(res[0].Division);
            setVendor(res[0].Vendor);
            setID(res[0].ID);
            setCollectionStatus(res[0].CollectionStatus);
        });
    }, [time, phone]);
    var openUpadate = function () {
        setModal(true);
    };
    var homeHandler = function () {
        history.push("/home");
    };
    var updateHandler = function () {
        setLoading(true);
        sp.web.lists
            .getByTitle("GiftBeneficiaries")
            .items.getById(Number(ID))
            .update({
            CollectionStatus: "Collected",
            LocationChampionEmail: employeeEmail,
            CollectedBy: pickupPerson,
            ProxyType: proxyType,
        });
        sp.web.lists
            .getByTitle("Report")
            .items.add({
            Phone: phone,
            Surname: surname,
            FirstName: FirstName,
            JobTitle: jobTitle,
            Email: Email,
            Location: location,
            PickupLocation: pickupLocation,
            PickupPerson: pickupPerson,
            Division: division,
            Vendor: vendor,
            CollectionStatus: "Collected",
            Date: date,
            Time: time,
        })
            .then(function (res) {
            setLoading(false);
            setModal(false);
            swal("Success", "Confirmation successfully", "success");
            sp.web.lists
                .getByTitle("GiftBeneficiaries")
                .items.filter("ApprovalStatus eq 'Approved' and Phone eq '" + phone + "'")
                .get()
                .then(function (res) {
                setCollectionStatus(res[0].CollectionStatus);
            });
        })
            .catch(function (e) {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });
    };
    var handler = function (e) {
        e.preventDefault();
        setPhone(e.target.value);
    };
    var backHandler = function () {
        history.push("/locationchampion/report");
    };
    return (React.createElement("div", { className: "appContainer" },
        React.createElement(Sidebar, null),
        React.createElement("div", { className: "contentsRight" },
            React.createElement(Header, { title: "Employees", userEmail: employeeEmail }),
            React.createElement("div", { className: "spaceBetween" },
                React.createElement("div", null,
                    React.createElement(Search, { value: phone, onchange: handler, type: "Tel", placeholder: "Input phone number" })),
                React.createElement("div", { style: { display: "flex", flexDirection: "row" } },
                    React.createElement("button", { className: "mtn__btn mtn__yellow", onClick: homeHandler, style: { marginRight: "10px" } }, "Logout"),
                    React.createElement("button", { className: "mtn__btn mtn__white", onClick: backHandler }, "Report"))),
            React.createElement("div", { className: styles.header },
                React.createElement("h3", null, "Employee Details")),
            React.createElement("div", { style: {
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "2rem",
                } },
                React.createElement(Text, { title: "Phone Number", value: phone, size: "medium" }),
                React.createElement(Text, { title: "Surname", value: surname, size: "medium" }),
                React.createElement(Text, { title: "First Name", value: FirstName, size: "medium" }),
                React.createElement(Text, { title: "Job Title", value: jobTitle, size: "medium" }),
                React.createElement(Text, { title: "Email", value: Email, size: "medium" }),
                React.createElement(Text, { title: "Location", value: location, size: "medium" }),
                React.createElement(Text, { title: "Pickup Location", value: pickupLocation, size: "medium" }),
                React.createElement(Text, { title: "Pickup Person", value: pickupPerson, size: "medium" }),
                pickupPerson === "Delegate" ? (React.createElement("div", null,
                    React.createElement(Text, { title: "Delegate Fullname", value: delegateFullname, size: "medium" }),
                    React.createElement(Text, { title: "Delegate Phone number", value: delegatePhone, size: "medium" }),
                    " ")) : null,
                React.createElement(Text, { title: "Division", value: division, size: "medium" }),
                React.createElement(Text, { title: "Vendor", value: vendor, size: "medium" }),
                collectionStatus === "Collected" ? (React.createElement("h4", { style: {
                        marginLeft: "1%",
                        color: "rgba(0, 0, 0)",
                        marginTop: "10px",
                    } },
                    " ",
                    "Gift Status :",
                    " ",
                    React.createElement("span", { style: {
                            backgroundColor: "green",
                            color: "rgba(255, 255, 255, 1)",
                            marginLeft: "15%",
                            padding: "5px",
                            borderRadius: "10px",
                            fontWeight: "200",
                        } }, collectionStatus))) : (React.createElement(Text, { title: "Gift Status", value: collectionStatus, size: "medium" })),
                React.createElement("div", { style: {
                        width: "40%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: "2rem",
                    } },
                    React.createElement("button", { onClick: openUpadate, disabled: collectionStatus === "Collected" || Email === " " ? true : false, className: "mtn__btn mtn__yellow" },
                        " ",
                        "Confirm Collector")))),
        React.createElement(Modal, { isVisible: modal, title: "", size: "sm", content: React.createElement("form", { onSubmit: updateHandler }, pickupPerson === "Self" ? (React.createElement("div", null,
                React.createElement(Input, { value: pickupPerson, onChange: function (e) { return setPickupPerson(e.target.value); }, required: true, title: "Collected by", readOnly: true, size: "sm", type: "text" }),
                React.createElement("button", { style: { marginTop: "1rem" }, type: "submit", className: "mtn__btn mtn__yellow" }, "Submit"))) : (React.createElement("div", null,
                React.createElement(Input, { value: pickupPerson, onChange: function (e) { return setPickupPerson(e.target.value); }, required: true, title: "Collected by", readOnly: true, size: "sm", type: "text" }),
                React.createElement("div", { style: { marginTop: "1rem" } },
                    React.createElement(Select, { value: proxyType, onChange: function (e) { return setProxyType(e.target.value); }, required: true, title: "Proxy pickup authorization method", options: proxyOption })),
                React.createElement("button", { style: { marginTop: "1rem" }, type: "submit", className: "mtn__btn mtn__yellow" }, "Submit")))), onClose: function () { return setModal(false); }, footer: "" })));
};
export default Document;
//# sourceMappingURL=index.js.map