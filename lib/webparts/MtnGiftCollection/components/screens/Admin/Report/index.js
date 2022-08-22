import * as React from "react";
import { Header, Navigation, Sidebar } from "../../../Containers";
import { useHistory } from "react-router-dom";
import { sp } from "@pnp/sp";
import MaterialTable from "material-table";
import swal from "sweetalert";
import Select from "../../../Containers/Select";
// import Spinner from "../../../../Containers/Spinner";
var Pickup = function () {
    var history = useHistory();
    var string = "string";
    var _a = React.useState([
        { title: "Phone Number", field: "Phone", type: "string" },
        {
            title: "Surname",
            field: "Surname",
            type: "string",
        },
        {
            title: "First Name",
            field: "FirstName",
            type: "string",
        },
        {
            title: "Job Title",
            field: "JobTitle",
            type: "string",
        },
        { title: "Email", field: "Email", type: "string" },
        { title: "Department", field: "Department", type: "string" },
        { title: "Location", field: "Location", type: "string" },
    ]), columns = _a[0], setColumns = _a[1];
    var _b = React.useState(""), employeeEmail = _b[0], setEmployeeEmail = _b[1];
    var _c = React.useState(""), uploadFile = _c[0], setUploadedFile = _c[1];
    var _d = React.useState([]), data = _d[0], setData = _d[1];
    var _e = React.useState(""), name = _e[0], setName = _e[1];
    var _f = React.useState(""), query = _f[0], setQuery = _f[1];
    var _g = React.useState(""), role = _g[0], setRole = _g[1];
    var _h = React.useState(""), email = _h[0], setEmail = _h[1];
    var _j = React.useState(false), loading = _j[0], setLoading = _j[1];
    var _k = React.useState(false), edit = _k[0], setEdit = _k[1];
    var _l = React.useState(null), id = _l[0], setID = _l[1];
    var selectOption = [
        { value: "pending" },
        { value: "approved" },
        { value: "declined" }
    ];
    React.useEffect(function () {
        setLoading(true);
        sp.web.lists
            .getByTitle("Confirmation")
            .items.filter("ConfirmationStatus eq 'Pending'")
            .get()
            .then(function (res) {
            setData(res);
            setLoading(false);
        });
    }, []);
    React.useEffect(function () {
        sp.profiles.myProperties.get().then(function (response) {
            console.log(response);
            setEmployeeEmail(response.Email);
        });
    }, []);
    var deleteHandler = function (id) {
        if (window.confirm("Are you sure you want to delete")) {
            sp.web.lists
                .getByTitle("Confirmation")
                .items.getById(id)
                .delete()
                .then(function (res) {
                swal("Success", "Confirmation has been deleted", "success");
                sp.web.lists
                    .getByTitle("Confirmation")
                    .items.get()
                    .then(function (res) {
                    setData(res);
                });
            });
        }
    };
    return (React.createElement("div", { className: "appContainer" },
        React.createElement(Sidebar, null),
        React.createElement("div", { className: "contentsRight" },
            React.createElement(Header, { title: "Reports", userEmail: employeeEmail }),
            React.createElement("div", { className: "spaceBetween" },
                React.createElement("div", null,
                    React.createElement(Select, { onChange: function (e) { setQuery(e.target.value); }, title: query, value: query, options: selectOption, size: "mtn__adult" })),
                React.createElement(Navigation, { report: "active" })),
            React.createElement("div", { className: "center", style: { marginTop: "50px" } },
                React.createElement(MaterialTable, { title: "", columns: columns, data: data, options: {
                        exportButton: true,
                        actionsCellStyle: {
                            backgroundColor: "none",
                            color: "#FF00dd",
                        },
                        actionsColumnIndex: -1,
                        headerStyle: {
                            backgroundColor: "black",
                            color: "white",
                            paddingLeft: "10px"
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
                            tooltip: "View",
                            onClick: function (event, rowData) {
                                history.push("/admin/pending/" + rowData.ID);
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
                    } })))));
};
export default Pickup;
//# sourceMappingURL=index.js.map