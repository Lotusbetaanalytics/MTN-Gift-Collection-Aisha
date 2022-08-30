import * as React from "react";
import { useHistory } from "react-router-dom";
import { HiHome } from "react-icons/Hi";
import { Select, MenuBar, Sidebar, Header, } from "../../../Containers";
import { SPHttpClient, } from "@microsoft/sp-http";
import MaterialTable from "material-table";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import { PeoplePicker, PrincipalType, } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import Modal from "../../../Containers/Modal";
import Spinner from "../../../Containers/Spinner";
var Roles = function (_a) {
    var context = _a.context;
    // Helpers
    var history = useHistory();
    var string = "string";
    var _b = React.useState([
        { title: "Name", field: "Title", type: "string" },
        { title: "Role", field: "Role", type: "string" },
    ]), columns = _b[0], setColumns = _b[1];
    var _c = React.useState(""), employeeEmail = _c[0], setEmployeeEmail = _c[1];
    var _d = React.useState([]), data = _d[0], setData = _d[1];
    var _e = React.useState([]), roles = _e[0], setRoles = _e[1];
    var _f = React.useState(""), name = _f[0], setName = _f[1];
    var _g = React.useState(""), role = _g[0], setRole = _g[1];
    var _h = React.useState(""), email = _h[0], setEmail = _h[1];
    var _j = React.useState(false), open = _j[0], setOpen = _j[1];
    var _k = React.useState(false), loading = _k[0], setLoading = _k[1];
    var _l = React.useState(false), edit = _l[0], setEdit = _l[1];
    var _m = React.useState(null), id = _m[0], setID = _m[1];
    React.useEffect(function () {
        sp.web.lists
            .getByTitle("Admin")
            .items.get()
            .then(function (res) {
            setData(res);
        });
        sp.web.lists
            .getByTitle("Role")
            .items.get()
            .then(function (res) {
            setRoles(res);
        });
    }, []);
    React.useEffect(function () {
        sp.profiles.myProperties.get().then(function (response) {
            setEmployeeEmail(response.UserProfileProperties[19].Value);
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
        { name: "Admin", url: "/admin/config", active: true },
        { name: "Roles", url: "/admin/roles" },
        { name: "Location", url: "/admin/location" },
        { name: "Notification", url: "/admin/division" },
    ];
    var submitHandler = function (e) {
        e.preventDefault();
        sp.web.lists
            .getByTitle("Admin")
            .items.add({
            Title: name,
            Email: email,
            Role: role,
        })
            .then(function (res) {
            setOpen(false);
            swal("Success", "Admin added Successfully", "success");
            sp.web.lists
                .getByTitle("Admin")
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
            .getByTitle("Admin")
            .items.getById(id)
            .update({
            Title: name,
            Email: email,
            Role: role,
        })
            .then(function (res) {
            setOpen(false);
            swal("Success", "Admin Edited Successfully", "success");
            sp.web.lists
                .getByTitle("Admin")
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
                .getByTitle("Admin")
                .items.getById(id)
                .delete()
                .then(function (res) {
                swal("Success", "Admin has been deleted", "success");
                sp.web.lists
                    .getByTitle("Admin")
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
        console.log("yes");
    };
    function getPeoplePickerItems(items) {
        var staff = items[0].secondaryText;
        setName(items[0].text);
        setEmail(items[0].secondaryText);
        context.spHttpClient.get("https://mtncloud.sharepoint.com/sites/MTNNigeriaComplianceUniverse/testenv/_api/lists/GetByTitle('CURRENT HCM STAFF LIST')/items?$filter=EMAIL_ADDRESS eq '" + staff + "'", SPHttpClient.configurations.v1);
    }
    var homeHandler = function () {
        history.push("/admin/document");
    };
    return (React.createElement("div", { className: "appContainer" },
        React.createElement(Sidebar, null),
        React.createElement("div", { className: "contentsRight" },
            React.createElement(Header, { title: "Document", userEmail: employeeEmail }),
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
                    React.createElement("button", { onClick: openHandler, className: "mtn__btns mtn__black", type: "button" }, "Add Admin"))),
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
                                setName(rowData.Title);
                                setRole(rowData.Role);
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
            React.createElement(Modal, { isVisible: open, title: "Admin", size: "lg", content: loading ? (React.createElement(Spinner, null)) : (React.createElement("div", { className: "mtn__InputFlex" },
                    React.createElement("div", { className: "mtn__InputContainer mtn__adult" },
                        React.createElement(PeoplePicker, { context: context, titleText: "Employee Name", personSelectionLimit: 1, groupName: "" // Leave this blank in case you want to filter from all users
                            , showtooltip: true, required: true, disabled: false, onChange: getPeoplePickerItems, showHiddenInUI: false, principalTypes: [PrincipalType.User], resolveDelay: 1000 })),
                    React.createElement("div", { style: {
                            display: "flex",
                            marginTop: "1rem",
                            marginBottom: ".5rem",
                            width: "100%",
                        } },
                        React.createElement(Select, { title: "Role", value: role, onChange: function (e) { return setRole(e.target.value); }, size: "mtn__adult", options: roles, filter: true, filterOption: "Title" })),
                    React.createElement("div", { style: {
                            display: "flex",
                            marginTop: "1rem",
                            marginBottom: ".5rem",
                        } },
                        React.createElement("button", { onClick: edit ? editHandler : submitHandler, type: "button", className: "mtn__btn mtn__yellow" }, edit ? "Edit Admin" : "Add Admin")))), onClose: function () { return setOpen(false); }, footer: "" }))));
};
export default Roles;
//# sourceMappingURL=index.js.map