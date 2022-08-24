import * as React from "react";
import { Header, Navigation, Sidebar } from "../../../Containers";
import { useHistory } from "react-router-dom";
import { sp } from "@pnp/sp";
import MaterialTable from "material-table";
import Spinner from "../../../Containers/Spinner";
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
        { title: "Pickup Location", field: "PickupLocation", type: "string" },
        { title: "Location", field: "Location", type: "string" },
        { title: "Pickup Person", field: "PickupPerson", type: "string" },
        { title: "Division", field: "Division", type: "string" },
        { title: "Vendor", field: "Vendor", type: "string" },
        { title: "Date", field: "Date", type: "string" },
        { title: "Time", field: "Time", type: "time" },
    ]), columns = _a[0], setColumns = _a[1];
    var _b = React.useState(""), employeeEmail = _b[0], setEmployeeEmail = _b[1];
    var _c = React.useState([]), data = _c[0], setData = _c[1];
    var _d = React.useState(false), loading = _d[0], setLoading = _d[1];
    React.useEffect(function () {
        setLoading(true);
        sp.web.lists.getByTitle("Report").items.get().then(function (res) {
            console.log(res);
            setData(res);
            setLoading(false);
        });
    }, []);
    React.useEffect(function () {
        sp.profiles.myProperties.get().then(function (response) {
            console.log(response);
            setEmployeeEmail(response.DisplayName);
        });
    }, []);
    return (React.createElement("div", { className: "appContainer" },
        React.createElement(Sidebar, null),
        React.createElement("div", { className: "contentsRight" },
            React.createElement(Header, { title: "Reports", userEmail: employeeEmail }),
            React.createElement("div", { className: "spaceBetween" },
                React.createElement("div", null),
                React.createElement(Navigation, { report: "active" })),
            React.createElement("div", { className: "center", style: { marginTop: "50px" } }, loading ? (React.createElement(Spinner, null)) : (React.createElement(MaterialTable, { title: "", columns: columns, data: data, options: {
                    exportButton: true,
                    actionsCellStyle: {
                        backgroundColor: "none",
                        color: "#FF00dd",
                    },
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
                            history.push("/admin/report/" + rowData.ID);
                        },
                    },
                ], components: {
                    Action: function (props) { return (React.createElement("button", { onClick: function (event) { return props.action.onClick(event, props.data); }, className: "mtn__btn_table mtn__yellow" }, props.action.tooltip)); },
                } }))))));
};
export default Pickup;
//# sourceMappingURL=index.js.map