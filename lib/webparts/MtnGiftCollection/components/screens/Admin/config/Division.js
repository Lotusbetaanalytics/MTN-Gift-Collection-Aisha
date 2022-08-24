import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { AdminHeader, Input, Navigation, MenuBar, } from '../../../Containers';
import MaterialTable from "material-table";
import { sp, } from "@pnp/sp";
import swal from 'sweetalert';
import Modal from '../../../Containers/Modal';
import Spinner from '../../../Containers/Spinner';
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
    React.useEffect(function () {
        sp.web.lists.getByTitle("Division").items.get().then(function (res) {
            setData(res);
            console.log(data);
        });
    }, []);
    // Menubar Items
    var menu = [
        { name: "Admin", url: "/admin/config", },
        { name: "Roles", url: "/admin/roles", },
        { name: "Location", url: "/admin/location", },
        { name: "Division", url: "/admin/division", active: true, },
    ];
    var submitHandler = function (e) {
        e.preventDefault();
        console.log("i am here");
        sp.web.lists.getByTitle("Division").items.add({
            Title: Divisions,
            Department: Department,
        }).then(function (res) {
            setOpen(false);
            swal("Success", "Division added Successfully", "success");
            sp.web.lists.getByTitle("Division").items.get().then(function (res) {
                setData(res);
            });
        }).catch(function (e) {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });
    };
    var editHandler = function (e) {
        e.preventDefault();
        sp.web.lists.getByTitle("Division").items.getById(id).update({
            Title: Divisions,
            Department: Department,
        }).then(function (res) {
            setOpen(false);
            swal("Success", "Division Edited Successfully", "success");
            sp.web.lists.getByTitle("Division").items.get().then(function (res) {
                setData(res);
            });
        }).catch(function (e) {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });
    };
    var deleteHandler = function (id) {
        if (window.confirm("Are you sure you want to delete")) {
            sp.web.lists.getByTitle("Division").items.getById(id).delete().then(function (res) {
                swal("Success", "Division has been deleted", "success");
                sp.web.lists.getByTitle("Division").items.get().then(function (res) {
                    setData(res);
                });
            });
        }
    };
    var openHandler = function () {
        setOpen(true);
        setEdit(false);
    };
    return React.createElement("div", { className: "appContainer" },
        React.createElement(Navigation, { config: "active" }),
        React.createElement("div", { className: 'contentsRight' },
            React.createElement(AdminHeader, { title: "Division" }),
            React.createElement(MenuBar, { menu: menu }),
            React.createElement("div", { className: 'btnContainer right' },
                React.createElement("button", { onClick: openHandler, className: "mtn__btns mtn__blue", type: 'button' }, "Add Division")),
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
                    }
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
                            setDivisions(rowData.Title);
                            setDepartment(rowData.Department);
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
                } }),
            React.createElement(Modal, { isVisible: open, title: "Division", size: 'lg', content: loading ? React.createElement(Spinner, null) : React.createElement("div", { className: "mtn__InputFlex" },
                    React.createElement(Input, { title: "Division", value: Divisions, onChange: function (e) { return setDivisions(e.target.value); }, type: "text", size: 'mtn__adult' }),
                    React.createElement(Input, { title: "Department", value: Department, onChange: function (e) { return setDepartment(e.target.value); }, type: "text", size: 'mtn__adult' }),
                    React.createElement("button", { onClick: edit ? editHandler : submitHandler, type: "button", className: 'mtn__btn mtn__yellow' }, edit ? "Edit Division" : "Add Division")), onClose: function () { return setOpen(false); }, footer: "" })));
};
export default Division;
//# sourceMappingURL=Division.js.map