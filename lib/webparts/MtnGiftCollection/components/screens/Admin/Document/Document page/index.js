import * as React from "react";
import { Header, Navigation, Sidebar } from "../../../../Containers";
import { useHistory } from "react-router-dom";
import { sp } from "@pnp/sp";
import MaterialTable from "material-table";
import Spinner from "../../../../Containers/Spinner";
var Document = function () {
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
        { title: "Location", field: "EmployeeLocation", type: "string" },
        {
            title: "Pickup Location",
            field: "PickupLocation",
            type: "string",
        },
        { title: "Pickup Person", field: "PickupPerson", type: "string" },
        { title: "Division", field: "Division", type: "string" },
        { title: "Vendor", field: "Vendor", type: "string" },
    ]), columns = _a[0], setColumns = _a[1];
    var _b = React.useState(""), employeeEmail = _b[0], setEmployeeEmail = _b[1];
    var _c = React.useState(""), uploadFile = _c[0], setUploadedFile = _c[1];
    var _d = React.useState([]), data = _d[0], setData = _d[1];
    var _e = React.useState(""), name = _e[0], setName = _e[1];
    var _f = React.useState(""), role = _f[0], setRole = _f[1];
    var _g = React.useState(""), email = _g[0], setEmail = _g[1];
    var _h = React.useState(false), loading = _h[0], setLoading = _h[1];
    var _j = React.useState(false), edit = _j[0], setEdit = _j[1];
    var _k = React.useState(null), id = _k[0], setID = _k[1];
    React.useEffect(function () {
        setLoading(true);
        sp.web.lists
            .getByTitle("GiftBeneficiaries")
            .items.get()
            .then(function (res) {
            console.log(res);
            setData(res);
            setLoading(false);
        });
    }, []);
    React.useEffect(function () {
        sp.profiles.myProperties.get().then(function (response) {
            setEmployeeEmail(response.UserProfileProperties[19].Value);
        });
    }, []);
    return (React.createElement("div", { className: "appContainer" },
        React.createElement(Sidebar, null),
        React.createElement("div", { className: "contentsRight" },
            React.createElement(Header, { title: "Document", userEmail: employeeEmail }),
            React.createElement("div", { className: "spaceBetween" },
                React.createElement("div", null),
                React.createElement(Navigation, { document: "active" })),
            React.createElement("div", { className: "center", style: { marginTop: "50px" } }, loading ? (React.createElement(Spinner, null)) : (React.createElement(MaterialTable, { title: "", columns: columns, data: data, options: {
                    exportButton: true,
                    actionsCellStyle: {
                        backgroundColor: "none",
                        color: "#FF00dd",
                    },
                    headerStyle: {
                        backgroundColor: "black",
                        color: "white",
                        paddingLeft: "10px",
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
                            history.push("/admin/document/" + rowData.ID);
                        },
                    },
                ], components: {
                    Action: function (props) { return (React.createElement("button", { onClick: function (event) { return props.action.onClick(event, props.data); }, className: "mtn__btn_table mtn__yellow" }, props.action.tooltip)); },
                } }))))));
};
export default Document;
//# sourceMappingURL=index.js.map