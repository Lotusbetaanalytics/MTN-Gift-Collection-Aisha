import * as React from "react";
import { Header, Input, Sidebar, } from "../../../Containers";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp } from "@pnp/sp/presets/all";
import { useHistory } from "react-router-dom";
import Select from "../../../Containers/Select";
import swal from "sweetalert";
import Spinner from "../../../Containers/Spinner";
var Document = function () {
    var history = useHistory();
    var Email = "johndoe@yahoo.com";
    var _a = React.useState(""), updateStatus = _a[0], setUpdateStatus = _a[1];
    var locationOption = [
        { value: "location 1" },
        { value: "location 2" },
        { value: "location 2" },
    ];
    var _b = React.useState(""), approvalStatus = _b[0], setApprovalStatus = _b[1];
    var collectorOption = [{ value: "Self" }, { value: "Delegate" }];
    var _c = React.useState(false), loading = _c[0], setLoading = _c[1];
    var _d = React.useState(""), Location = _d[0], setLocation = _d[1];
    var _e = React.useState([]), Locations = _e[0], setLocations = _e[1];
    var _f = React.useState(""), Collector = _f[0], setCollector = _f[1];
    var _g = React.useState(""), delegateFullname = _g[0], setDelegateFullname = _g[1];
    var _h = React.useState(""), delegatePhone = _h[0], setDelegatePhone = _h[1];
    var _j = React.useState(""), employeeEmail = _j[0], setEmployeeEmail = _j[1];
    var _k = React.useState(""), ID = _k[0], setID = _k[1];
    var _l = React.useState(""), uniqueNumber = _l[0], setUniqueNumber = _l[1];
    var _m = React.useState(""), pickupLocation = _m[0], setPickupLocation = _m[1];
    var editHandler = function () {
        history.push("/employee/location/edit");
    };
    var generateSerial = function () {
        var chars = "1234567890", serialLength = 5, randomSerial = "", i, randomNumber;
        for (i = 0; i < serialLength; i = i + 1) {
            randomNumber = Math.floor(Math.random() * chars.length);
            randomSerial += chars.substring(randomNumber, randomNumber + 1);
            setUniqueNumber(randomSerial);
        }
    };
    React.useEffect(function () {
        setLoading(true);
        generateSerial();
        sp.profiles.myProperties.get().then(function (response) {
            setEmployeeEmail(response.UserProfileProperties[19].Value);
            var userEmail = response.UserProfileProperties[19].Value;
            sp.web.lists
                .getByTitle("GiftBeneficiaries")
                .items.filter("UpdateStatus eq 'Approved' and Email eq '" + userEmail + "' ")
                .get()
                .then(function (res) {
                if (res.length > 0) {
                    setLocation(res[0].PickupLocation);
                    setCollector(res[0].CollectedBy);
                    setApprovalStatus(res[0].ApprovalStatus);
                    setCollector(res[0].PickupPerson);
                    setDelegateFullname(res[0].DelegateFullname);
                    setDelegatePhone(res[0].DelegatePhone);
                    setID(res[0].ID);
                }
                else {
                    swal("Warning!", "You are not eligble for a gift!", "error");
                    history.push("/");
                }
            });
            sp.web.lists
                .getByTitle("Notification")
                .items.get()
                .then(function (res) {
                setPickupLocation(res[2].Switch);
                console.log(res);
            });
            sp.web.lists
                .getByTitle("Location")
                .items.get()
                .then(function (res) {
                setLocations(res);
                setLoading(false);
            });
        });
    }, []);
    var updateHandler = function (e) {
        setLoading(true);
        if (Collector === "Self") {
            setDelegateFullname("");
            setDelegatePhone("");
        }
        e.preventDefault();
        sp.web.lists
            .getByTitle("GiftBeneficiaries")
            .items.getById(Number(ID))
            .update({
            ApprovalStatus: "Pending",
            UniqueCode: uniqueNumber,
            PickupLocation: Location,
            PickupPerson: Collector,
            DelegateFullname: delegateFullname,
            DelegatePhone: delegatePhone,
        })
            .then(function (res) {
            setLoading(false);
            swal("Success", "Successfull", "success");
            sp.web.lists
                .getByTitle("GiftBeneficiaries")
                .items.filter("Email eq '" + Email + "' ")
                .get()
                .then(function (res) {
                setApprovalStatus(res[0].ApprovalStatus);
            });
        })
            .catch(function (e) {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });
    };
    var homeHandler = function () {
        history.push("/home");
    };
    return (React.createElement("div", { className: "appContainer" },
        React.createElement(Sidebar, null),
        React.createElement("div", { className: "contentsRight" },
            React.createElement(Header, { title: "Pick up location", userEmail: employeeEmail }),
            React.createElement("div", { className: "spaceBetween" },
                React.createElement("div", null),
                React.createElement("div", null,
                    React.createElement("button", { className: "mtn__btn mtn__yellow", onClick: homeHandler }, "logout"))),
            loading ? (React.createElement(Spinner, null)) : (React.createElement("div", { style: {
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "2rem",
                } },
                React.createElement("div", { style: {
                        width: "40%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: "2rem",
                    } },
                    React.createElement("button", { onClick: editHandler, disabled: approvalStatus === "Pending" || approvalStatus === "Declined"
                            ? false
                            : true, className: "mtn__btn mtn__black" },
                        " ",
                        "Edit")),
                React.createElement("p", { style: { marginTop: "1rem" } }, "Preffered pickup location"),
                React.createElement("div", { style: { marginTop: "1rem", marginBottom: "1rem" } },
                    React.createElement(Select, { onChange: function (e) {
                            setLocation(e.target.value);
                        }, title: Location, value: Location, options: Locations, filterOption: "Title", filter: true, size: "mtn__adult", readOnly: approvalStatus === null ? false : true })),
                React.createElement("p", null, "Collector"),
                React.createElement("div", { style: { marginTop: "1rem", marginBottom: ".5rem" } },
                    React.createElement(Select, { onChange: function (e) {
                            setCollector(e.target.value);
                        }, title: Collector, value: Collector, options: collectorOption, size: "mtn__adult", readOnly: approvalStatus === null ? false : true })),
                Collector === "Delegate" ? (React.createElement("div", null,
                    React.createElement("p", { style: {
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            textAlign: "center",
                            backgroundColor: "rgba(217, 217, 217, 0.42)",
                        } }, "Delegate Info"),
                    React.createElement("div", { style: { marginTop: "1rem", marginBottom: ".5rem" } },
                        React.createElement(Input, { type: "text", onChange: function (e) {
                                setDelegateFullname(e.target.value);
                            }, title: "Delegate Fullname", value: delegateFullname, readOnly: approvalStatus === null ? false : true, size: "mtn__adult" })),
                    React.createElement("div", { style: { marginTop: "1rem", marginBottom: ".5rem" } },
                        React.createElement(Input, { type: "tel", onChange: function (e) {
                                setDelegatePhone(e.target.value);
                            }, title: "Delegate Phone number", value: delegatePhone, readOnly: approvalStatus === null ? false : true, size: "mtn__adult" })))) : null,
                React.createElement("div", { style: {
                        width: "40%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: "2rem",
                    } },
                    React.createElement("button", { disabled: approvalStatus === "Approved" ||
                            approvalStatus === "Pending" ||
                            approvalStatus === "Declined" ||
                            pickupLocation === "Off"
                            ? true
                            : false, className: "mtn__btn mtn__yellow", onClick: updateHandler },
                        " ",
                        "Submit")))))));
};
export default Document;
//# sourceMappingURL=index.js.map