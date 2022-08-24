import * as React from "react";
import { Header, Input, Sidebar } from "../../../Containers";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp } from "@pnp/sp/presets/all";
import { useHistory } from "react-router-dom";
import Select from "../../../Containers/Select";
import swal from "sweetalert";
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
    var _e = React.useState(""), Collector = _e[0], setCollector = _e[1];
    var _f = React.useState(""), delegateFullname = _f[0], setDelegateFullname = _f[1];
    var _g = React.useState(""), delegatePhone = _g[0], setDelegatePhone = _g[1];
    var _h = React.useState(""), employeeEmail = _h[0], setEmployeeEmail = _h[1];
    var _j = React.useState(""), ID = _j[0], setID = _j[1];
    var _k = React.useState(""), uniqueNumber = _k[0], setUniqueNumber = _k[1];
    var generateSerial = function () {
        var chars = "1234567890", serialLength = 5, randomSerial = "", i, randomNumber;
        for (i = 0; i < serialLength; i = i + 1) {
            randomNumber = Math.floor(Math.random() * chars.length);
            randomSerial += chars.substring(randomNumber, randomNumber + 1);
            setUniqueNumber(randomSerial);
        }
    };
    var backHandler = function () {
        history.push("/employee/location");
    };
    React.useEffect(function () {
        generateSerial();
        sp.profiles.myProperties.get().then(function (response) {
            setEmployeeEmail(response.DisplayName);
        });
        sp.web.lists
            .getByTitle("GiftBeneficiaries")
            .items.filter("Email eq '" + Email + "' ")
            .get()
            .then(function (res) {
            console.log(res);
            if (res.length > 0) {
                setUpdateStatus(res[0].UpdateStatus);
            }
            if (res[0].UpdateStatus === "Approved") {
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
    }, []);
    var updateHandler = function (e) {
        setLoading(true);
        e.preventDefault();
        if (Collector === "Self") {
            setDelegateFullname("");
            setDelegatePhone("");
        }
        sp.web.lists.getByTitle("GiftBeneficiaries").items.getById(Number(ID)).update({
            ApprovalStatus: "Pending",
            UniqueCode: uniqueNumber,
            PickupLocation: Location,
            PickupPerson: Collector,
            DelegateFullname: delegateFullname,
            DelegatePhone: delegatePhone
        }).then(function (res) {
            setLoading(false);
            swal("Success", "Successfull", "success");
        }).catch(function (e) {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });
    };
    return (React.createElement("div", { className: "appContainer" },
        React.createElement(Sidebar, null),
        React.createElement("div", { className: "contentsRight" },
            React.createElement(Header, { title: "Pick up location", userEmail: employeeEmail }),
            React.createElement("div", { style: {
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
                    React.createElement("button", { onClick: backHandler, className: "mtn__btn mtn__black" }, " Back")),
                React.createElement("p", { style: { marginTop: "1rem" } }, "Preffered pickup location"),
                React.createElement("div", { style: { marginTop: "1rem", marginBottom: "1rem" } },
                    React.createElement(Select, { onChange: function (e) {
                            setLocation(e.target.value);
                        }, title: Location, value: Location, options: locationOption, size: "mtn__adult" })),
                React.createElement("p", null, "Collector"),
                React.createElement("div", { style: { marginTop: "1rem", marginBottom: ".5rem" } },
                    React.createElement(Select, { onChange: function (e) {
                            setCollector(e.target.value);
                        }, title: Collector, value: Collector, options: collectorOption, size: "mtn__adult" })),
                Collector === "Delegate" ?
                    (React.createElement("div", null,
                        React.createElement("p", { style: { marginTop: "1rem", marginBottom: "1rem", textAlign: "center", backgroundColor: "rgba(217, 217, 217, 0.42)" } }, "Delegate Info"),
                        React.createElement("div", { style: { marginTop: "1rem", marginBottom: ".5rem" } },
                            React.createElement(Input, { type: "text", onChange: function (e) {
                                    setDelegateFullname(e.target.value);
                                }, title: "Delegate Fullname", value: delegateFullname, size: "mtn__adult" })),
                        React.createElement("div", { style: { marginTop: "1rem", marginBottom: ".5rem" } },
                            React.createElement(Input, { type: "tel", onChange: function (e) {
                                    setDelegatePhone(e.target.value);
                                }, title: "Delegate Phone number", value: delegatePhone, size: "mtn__adult" })))) : null,
                React.createElement("div", { style: {
                        width: "40%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: "2rem",
                    } },
                    React.createElement("button", { className: "mtn__btn mtn__yellow", onClick: updateHandler, disabled: approvalStatus === "Approved" ? true : false }, " Save"))))));
};
export default Document;
//# sourceMappingURL=index.js.map