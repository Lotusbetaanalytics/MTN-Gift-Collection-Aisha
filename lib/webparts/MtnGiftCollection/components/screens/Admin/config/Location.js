import * as React from "react";
import { useHistory } from "react-router-dom";
import { Input, MenuBar, Sidebar, Header, } from "../../../Containers";
import MaterialTable from "material-table";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import Modal from "../../../Containers/Modal";
import Spinner from "../../../Containers/Spinner";
import { HiHome } from "react-icons/Hi";
var Location = function () {
    // Helpers
    var history = useHistory();
    var string = "string";
    var _a = React.useState([
        { title: "Location", field: "Title", type: "string" },
    ]), columns = _a[0], setColumns = _a[1];
    var _b = React.useState([]), data = _b[0], setData = _b[1];
    var _c = React.useState(""), Location = _c[0], setLocation = _c[1];
    var _d = React.useState(false), open = _d[0], setOpen = _d[1];
    var _e = React.useState(false), loading = _e[0], setLoading = _e[1];
    var _f = React.useState(false), edit = _f[0], setEdit = _f[1];
    var _g = React.useState(null), id = _g[0], setID = _g[1];
    var _h = React.useState(""), email = _h[0], setEmail = _h[1];
    React.useEffect(function () {
        sp.web.lists
            .getByTitle("Location")
            .items.get()
            .then(function (res) {
            setData(res);
        });
    }, []);
    React.useEffect(function () {
        sp.profiles.myProperties.get().then(function (response) {
            setEmail(response.UserProfileProperties[19].Value);
            var userEmail = (response.UserProfileProperties[19].Value);
            sp.web.lists
                .getByTitle("Admin")
                .items.filter("Role eq 'Admin' and Email eq '" + userEmail + "'")
                .get()
                .then(function (response) {
                if (response.length === 0) {
                    sweetAlert("Warning!", "you are not authorize to use this portal", "error");
                    history.push("/");
                }
            });
        });
    }, []);
    // Menubar Items
    var menu = [
        { name: "Admin", url: "/admin/config" },
        { name: "Roles", url: "/admin/roles" },
        { name: "Location", url: "/admin/location", active: true },
        { name: "Notification", url: "/admin/division" },
    ];
    var submitHandler = function (e) {
        e.preventDefault();
        sp.web.lists
            .getByTitle("Location")
            .items.add({
            Title: Location,
        })
            .then(function (res) {
            setOpen(false);
            swal("Success", "Location added Successfully", "success");
            sp.web.lists
                .getByTitle("Location")
                .items.get()
                .then(function (res) {
                setData(res);
            });
        })
            .catch(function (e) {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });
    };
    var editHandler = function (e) {
        e.preventDefault();
        sp.web.lists
            .getByTitle("Location")
            .items.getById(id)
            .update({
            Title: Location,
        })
            .then(function (res) {
            setOpen(false);
            swal("Success", "Location Edited Successfully", "success");
            sp.web.lists
                .getByTitle("Location")
                .items.get()
                .then(function (res) {
                setData(res);
            });
        })
            .catch(function (e) {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });
    };
    var deleteHandler = function (id) {
        if (window.confirm("Are you sure you want to delete")) {
            sp.web.lists
                .getByTitle("Location")
                .items.getById(id)
                .delete()
                .then(function (res) {
                swal("Success", "Location has been deleted", "success");
                sp.web.lists
                    .getByTitle("Location")
                    .items.get()
                    .then(function (res) {
                    setData(res);
                });
            });
        }
    };
    var openHandler = function () {
        setOpen(true);
        setEdit(false);
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
            React.createElement("div", { style: { marginTop: "20px", marginBottom: "20px" } }),
            React.createElement("div", { className: "spaceBetween" },
                React.createElement("div", null),
                React.createElement("div", { className: "btnContainer right" },
                    React.createElement("button", { onClick: openHandler, className: "mtn__btns mtn__black", type: "button" }, "Add Location"))),
            React.createElement("div", { className: "center", style: { marginTop: "50px" } },
                React.createElement(MaterialTable, { title: "", columns: columns, data: data, options: {
                        exportButton: true,
                        actionsCellStyle: {
                            backgroundColor: "none",
                            color: "#FF00dd",
                        },
                        actionsColumnIndex: -1,
                        headerStyle: {
                            backgroundColor: "#FFCC00",
                            color: "black",
                        },
                        rowStyle: {
                            fontSize: 13,
                        },
                    }, style: {
                        boxShadow: "none",
                        width: "100%",
                        background: "none",
                        fontSize: "13px",
                    }, 
                    // icons={{Add: () => 'Add Row'}}
                    actions: [
                        {
                            icon: "visibility",
                            iconProps: { style: { fontSize: "11px", color: "gold" } },
                            tooltip: "Edit",
                            onClick: function (event, rowData) {
                                setEdit(true);
                                setOpen(true);
                                setID(rowData.ID);
                                setLocation(rowData.Title);
                            },
                        },
                        {
                            icon: "visibility",
                            iconProps: { style: { fontSize: "11px", color: "gold" } },
                            tooltip: "Delete",
                            onClick: function (event, rowData) {
                                deleteHandler(rowData.ID);
                            },
                        },
                    ], components: {
                        Action: function (props) { return (React.createElement("button", { onClick: function (event) { return props.action.onClick(event, props.data); }, className: "mtn__btn_table mtn__black" }, props.action.tooltip)); },
                    } })),
            React.createElement(Modal, { isVisible: open, title: "Location", size: "lg", content: loading ? (React.createElement(Spinner, null)) : (React.createElement("div", { className: "mtn__InputFlex" },
                    React.createElement("div", { style: {
                            display: "flex",
                            marginTop: "1rem",
                            marginBottom: ".5rem",
                            width: "100%",
                        } },
                        React.createElement(Input, { title: "Location", value: Location, onChange: function (e) { return setLocation(e.target.value); }, type: "text", size: "mtn__adult" })),
                    React.createElement("button", { onClick: edit ? editHandler : submitHandler, type: "button", className: "mtn__btn mtn__yellow" }, edit ? "Edit Location" : "Add Location"))), onClose: function () { return setOpen(false); }, footer: "" }))));
};
export default Location;
//# sourceMappingURL=Location.js.map