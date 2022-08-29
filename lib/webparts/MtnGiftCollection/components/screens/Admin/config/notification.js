import * as React from "react";
import { useHistory } from "react-router-dom";
import { MenuBar, Sidebar, Header, } from "../../../Containers";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import { HiHome } from "react-icons/Hi";
var Division = function () {
    // Helpers
    var history = useHistory();
    var string = "string";
    var _a = React.useState([
        { title: "Division", field: "Title", type: "string" },
        { title: "Department", field: "Department", type: "string" },
    ]), columns = _a[0], setColumns = _a[1];
    var _b = React.useState([]), data = _b[0], setData = _b[1];
    var _c = React.useState(""), Divisions = _c[0], setDivisions = _c[1];
    var _d = React.useState(""), Department = _d[0], setDepartment = _d[1];
    var _e = React.useState(false), open = _e[0], setOpen = _e[1];
    var _f = React.useState(false), loading = _f[0], setLoading = _f[1];
    var _g = React.useState(false), edit = _g[0], setEdit = _g[1];
    var _h = React.useState(null), id = _h[0], setID = _h[1];
    var _j = React.useState(""), email = _j[0], setEmail = _j[1];
    var _k = React.useState(false), smsNotification = _k[0], setSmsNotification = _k[1];
    var _l = React.useState(false), emailNotification = _l[0], setEmailNotification = _l[1];
    var _m = React.useState(false), changePickupLocation = _m[0], setChangePickupLocation = _m[1];
    React.useEffect(function () {
        sp.web.lists
            .getByTitle("Notification")
            .items.get()
            .then(function (res) {
            setEmailNotification(res[1].Switch);
            if (res[1].Switch === "On") {
                setEmailNotification(true);
            }
            else {
                setEmailNotification(false);
            }
            setSmsNotification(res[0].Switch);
            if (res[0].Switch === "On") {
                setSmsNotification(true);
            }
            else {
                setSmsNotification(false);
            }
            setChangePickupLocation(res[2].Switch);
            if (res[2].Switch === "On") {
                setChangePickupLocation(true);
            }
            else {
                setChangePickupLocation(false);
            }
        });
    }, []);
    React.useEffect(function () {
        sp.profiles.myProperties.get().then(function (response) {
            setEmail(response.UserProfileProperties[19].Value);
        });
    }, []);
    // Menubar Items
    var menu = [
        { name: "Admin", url: "/admin/config" },
        { name: "Roles", url: "/admin/roles" },
        { name: "Location", url: "/admin/location" },
        { name: "Notification", url: "/admin/division", active: true },
    ];
    var onSmsHandler = function (e) {
        e.preventDefault();
        sp.web.lists
            .getByTitle("Notification")
            .items.getById(1)
            .update({
            Switch: "On",
        })
            .then(function (res) {
            setOpen(false);
            swal("Success", "SMS notication Successfully turned on ", "success");
            sp.web.lists
                .getByTitle("Notification")
                .items.get()
                .then(function (res) {
                setSmsNotification(res[0].Switch);
                if (res[0].Switch === "On") {
                    setSmsNotification(true);
                }
                else {
                    setSmsNotification(false);
                }
                console.log(res);
            });
        })
            .catch(function (e) {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });
    };
    var onEmailHandler = function (e) {
        e.preventDefault();
        sp.web.lists
            .getByTitle("Notification")
            .items.getById(2)
            .update({
            Switch: "On",
        })
            .then(function (res) {
            setOpen(false);
            swal("Success", "Email notication Successfully turned on ", "success");
            sp.web.lists
                .getByTitle("Notification")
                .items.get()
                .then(function (res) {
                setSmsNotification(res[1].Switch);
                if (res[1].Switch === "On") {
                    setEmailNotification(true);
                }
                else {
                    setEmailNotification(false);
                }
                console.log(res);
            });
        })
            .catch(function (e) {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });
    };
    var onLocationHandler = function (e) {
        e.preventDefault();
        sp.web.lists
            .getByTitle("Notification")
            .items.getById(3)
            .update({
            Switch: "On",
        })
            .then(function (res) {
            setOpen(false);
            swal("Success", "Pickup location enable", "success");
            sp.web.lists
                .getByTitle("Notification")
                .items.get()
                .then(function (res) {
                setChangePickupLocation(res[2].Switch);
                if (res[2].Switch === "On") {
                    setChangePickupLocation(true);
                }
                else {
                    setChangePickupLocation(false);
                }
                console.log(res);
            });
        })
            .catch(function (e) {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });
    };
    var offSmsHandler = function (e) {
        e.preventDefault();
        sp.web.lists
            .getByTitle("Notification")
            .items.getById(1)
            .update({
            Switch: "Off",
        })
            .then(function (res) {
            setOpen(false);
            swal("Success", "SMS notication Successfully turned off ", "success");
            sp.web.lists
                .getByTitle("Notification")
                .items.get()
                .then(function (res) {
                setSmsNotification(res[0].Switch);
                if (res[0].Switch === "Off") {
                    setSmsNotification(false);
                }
                else {
                    setSmsNotification(true);
                }
                console.log(res);
            });
        })
            .catch(function (e) {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });
    };
    var offEmailHandler = function (e) {
        e.preventDefault();
        sp.web.lists
            .getByTitle("Notification")
            .items.getById(2)
            .update({
            Switch: "Off",
        })
            .then(function (res) {
            setOpen(false);
            swal("Success", "Email notication Successfully turned off ", "success");
            sp.web.lists
                .getByTitle("Notification")
                .items.get()
                .then(function (res) {
                setEmailNotification(res[1].Switch);
                if (res[1].Switch === "Off") {
                    setEmailNotification(false);
                }
                else {
                    setEmailNotification(true);
                }
                console.log(res);
            });
        })
            .catch(function (e) {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });
    };
    var offLocationHandler = function (e) {
        e.preventDefault();
        sp.web.lists
            .getByTitle("Notification")
            .items.getById(3)
            .update({
            Switch: "Off",
        })
            .then(function (res) {
            setOpen(false);
            swal("Success", "Pickup location is disabled ", "success");
            sp.web.lists
                .getByTitle("Notification")
                .items.get()
                .then(function (res) {
                setChangePickupLocation(res[2].Switch);
                if (res[2].Switch === "Off") {
                    setChangePickupLocation(false);
                }
                else {
                    setChangePickupLocation(true);
                }
                console.log(res);
            });
        })
            .catch(function (e) {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });
    };
    var homeHandler = function () {
        history.push("/admin/document");
    };
    return (React.createElement("div", { className: "appContainer" },
        React.createElement(Sidebar, null),
        React.createElement("div", { className: "contentsRight" },
            React.createElement(Header, { title: "Document", userEmail: email }),
            React.createElement("div", { className: "spaceBetween" },
                React.createElement("div", null,
                    React.createElement(MenuBar, { menu: menu })),
                React.createElement("div", null,
                    React.createElement("div", { className: "iconBtn", onClick: homeHandler },
                        " ",
                        React.createElement(HiHome, null)))),
            React.createElement("div", { className: "center", style: {
                    marginTop: "50px",
                    display: "flex",
                    flexDirection: "column",
                } },
                React.createElement("div", { className: "space" },
                    React.createElement("div", { style: { display: "flex", fontSize: "16px" } }, "SMS Notification"),
                    React.createElement("div", { className: smsNotification ? "switchBtn yellow" : "switchBtn gray" },
                        React.createElement("div", { className: smsNotification ? "offbtn yellow" : "offbtn white", onClick: offSmsHandler }),
                        React.createElement("div", { className: smsNotification ? "onbtn white" : "onbtn gray", onClick: onSmsHandler }))),
                React.createElement("div", { className: "space" },
                    React.createElement("div", { style: { display: "flex", fontSize: "16px" } }, "Email Notification"),
                    React.createElement("div", { className: emailNotification ? "switchBtn yellow" : "switchBtn gray" },
                        React.createElement("div", { className: emailNotification ? "offbtn yellow" : "offbtn white", onClick: offEmailHandler }),
                        React.createElement("div", { className: emailNotification ? "onbtn white" : "onbtn gray", onClick: onEmailHandler }))),
                React.createElement("div", { className: "space" },
                    React.createElement("div", { style: { display: "flex", fontSize: "16px" } }, "Pickup Location"),
                    React.createElement("div", { className: changePickupLocation ? "switchBtn yellow" : "switchBtn gray" },
                        React.createElement("div", { className: changePickupLocation ? "offbtn yellow" : "offbtn white", onClick: offLocationHandler }),
                        React.createElement("div", { className: changePickupLocation ? "onbtn white" : "onbtn gray", onClick: onLocationHandler })))))));
};
export default Division;
//# sourceMappingURL=notification.js.map