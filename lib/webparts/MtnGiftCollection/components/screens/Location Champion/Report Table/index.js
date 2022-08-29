import * as React from "react";
import { Header, Sidebar } from "../../../Containers";
import { useHistory } from "react-router-dom";
import { sp } from "@pnp/sp";
import MaterialTable from "material-table";
import Spinner from "../../../Containers/Spinner";
import { HiHome } from 'react-icons/Hi';
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
    var homeHandler = function () {
        history.push("/locationchampion");
    };
    React.useEffect(function () {
        setLoading(true);
        sp.profiles.myProperties.get().then(function (response) {
            setEmployeeEmail(response.UserProfileProperties[19].Value);
            var userEmail = response.UserProfileProperties[19].Value;
            sp.web.lists
                .getByTitle("Admin")
                .items.filter("Email eq '" + userEmail + "'").get().then(function (response) {
                console.log(response);
                if (response.length === 0) {
                    sweetAlert("Warning!", "you are not authorize to use this portal", "error");
                    history.push("/");
                }
            });
            sp.web.lists.getByTitle("Report").items.get().then(function (res) {
                console.log(res);
                setData(res);
                setLoading(false);
            });
        });
    }, []);
    return (React.createElement("div", { className: "appContainer" },
        React.createElement(Sidebar, null),
        React.createElement("div", { className: "contentsRight" },
            React.createElement(Header, { title: "Reports", userEmail: employeeEmail }),
            React.createElement("div", { className: "spaceBetween" },
                React.createElement("div", null,
                    React.createElement("div", { className: "iconBtn", onClick: homeHandler },
                        " ",
                        React.createElement(HiHome, null))),
                React.createElement("div", null,
                    " ",
                    React.createElement("button", { className: "mtn__btn mtn__yellow" }, "Report"))),
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
                            history.push("/locationchampion/report/view/" + rowData.ID);
                        },
                    },
                ], components: {
                    Action: function (props) { return (React.createElement("button", { onClick: function (event) { return props.action.onClick(event, props.data); }, className: "mtn__btn_table mtn__yellow" }, props.action.tooltip)); },
                } }))))));
};
export default Pickup;
//# sourceMappingURL=index.js.map