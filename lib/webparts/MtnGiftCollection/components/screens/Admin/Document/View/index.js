import * as React from "react";
import { Header, Navigation, Sidebar } from "../../../../Containers";
import styles from "./styles.module.scss";
import { sp } from "@pnp/sp";
import Text from "../../../../Containers/Text";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import Spinner from "../../../../Containers/Spinner";
var Document = function (_a) {
    var match = _a.match;
    var history = useHistory();
    var _b = React.useState(""), employeeEmail = _b[0], setEmployeeEmail = _b[1];
    var _c = React.useState(""), phone = _c[0], setPhone = _c[1];
    var _d = React.useState(""), surname = _d[0], setSurname = _d[1];
    var _e = React.useState(""), FirstName = _e[0], setFirstName = _e[1];
    var _f = React.useState(""), jobTitle = _f[0], setJobTitle = _f[1];
    var _g = React.useState(""), Email = _g[0], setEmail = _g[1];
    var _h = React.useState(""), Department = _h[0], setDepartment = _h[1];
    var _j = React.useState(""), location = _j[0], setLocation = _j[1];
    var _k = React.useState(""), pickupLocation = _k[0], setPickupLocation = _k[1];
    var _l = React.useState(""), pickupPerson = _l[0], setPickupPerson = _l[1];
    var _m = React.useState(""), division = _m[0], setDivision = _m[1];
    var _o = React.useState(""), vendor = _o[0], setVendor = _o[1];
    var _p = React.useState(false), loading = _p[0], setLoading = _p[1];
    var _q = React.useState(""), updateStatus = _q[0], setUpdateStatus = _q[1];
    var itemID = match.params.id;
    React.useEffect(function () {
        setLoading(true);
        sp.profiles.myProperties.get().then(function (response) {
            setEmployeeEmail(response.DisplayName);
        });
        sp.web.lists.getByTitle("GiftBeneficiaries").items.filter("ID eq '" + itemID + "'").get().then(function (res) {
            setPhone(res[0].Phone);
            setSurname(res[0].Surname);
            setFirstName(res[0].FirstName);
            setJobTitle(res[0].JobTitle);
            setEmail(res[0].Email);
            setDepartment(res[0].Department);
            setLocation(res[0].EmployeeLocation);
            setPickupLocation(res[0].PickupLocation);
            setPickupPerson(res[0].PickupPerson);
            setDivision(res[0].Division);
            setVendor(res[0].Vendor);
            setUpdateStatus(res[0].UpdateStatus);
            setLoading(false);
        });
    }, []);
    var backHandler = function () {
        history.push("/admin/document");
    };
    var updateHandler = function (e) {
        setLoading(true);
        e.preventDefault();
        sp.web.lists.getByTitle("GiftBeneficiaries").items.getById(itemID).update({
            UpdateStatus: "Approved"
        }).then(function (res) {
            setLoading(false);
            swal("Success", "Update Successfull", "success");
        }).catch(function (e) {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });
    };
    return (React.createElement("div", { className: "appContainer" },
        React.createElement(Sidebar, null),
        React.createElement("div", { className: "contentsRight" },
            React.createElement(Header, { title: "Document", userEmail: employeeEmail }),
            React.createElement("div", { className: "spaceBetween" },
                React.createElement("div", null),
                React.createElement(Navigation, { document: "active" })),
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
                React.createElement("div", { style: { width: "40%", display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "2rem" } },
                    React.createElement("button", { onClick: backHandler, className: "mtn__btn mtn__black" }, " Back"),
                    React.createElement("button", { onClick: updateHandler, disabled: updateStatus === "Approved" ? true : false, className: updateStatus === "Approved" ? "mtn__btn mtn__blackOutline" : "mtn__btn mtn__yellow" }, " Update"))))));
};
export default Document;
//# sourceMappingURL=index.js.map