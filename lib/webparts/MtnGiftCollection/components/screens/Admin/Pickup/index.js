import * as React from "react";
import { Header, Navigation, Sidebar, TextArea } from "../../../Containers";
import { useHistory } from "react-router-dom";
import { sp } from "@pnp/sp";
import MaterialTable from "material-table";
import swal from "sweetalert";
import Select from "../../../Containers/Select";
import Modal from "../../../Containers/Modal";
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
            title: "Pick up location",
            field: "PickupLocation",
            type: "string",
        },
    ]), columns = _a[0], setColumns = _a[1];
    var _b = React.useState(""), employeeEmail = _b[0], setEmployeeEmail = _b[1];
    var _c = React.useState([]), data = _c[0], setData = _c[1];
    var _d = React.useState(""), query = _d[0], setQuery = _d[1];
    var _e = React.useState(""), email = _e[0], setEmail = _e[1];
    var _f = React.useState(false), loading = _f[0], setLoading = _f[1];
    var _g = React.useState(false), edit = _g[0], setEdit = _g[1];
    var _h = React.useState(null), ID = _h[0], setID = _h[1];
    var _j = React.useState(""), reason = _j[0], setReason = _j[1];
    var _k = React.useState(false), modal = _k[0], setModal = _k[1];
    var selectOption = [
        { value: "Pending" },
        { value: "Approved" },
        { value: "Declined" }
    ];
    var selectHandler = function (e) {
        e.preventDefault();
        setQuery(e.target.value);
    };
    React.useEffect(function () {
        setLoading(true);
        sp.web.lists
            .getByTitle("GiftBeneficiaries")
            .items.filter("ApprovalStatus eq '" + query + "'")
            .get()
            .then(function (res) {
            setData(res);
            setLoading(false);
        });
    }, [query]);
    React.useEffect(function () {
        sp.profiles.myProperties.get().then(function (response) {
            console.log(response);
            setEmployeeEmail(response.Email);
        });
    }, []);
    console.log(query);
    var approveHandler = function (rowData) {
        setID(rowData.ID);
        sp.web.lists.getByTitle("GiftBeneficiaries").items.getById(Number(rowData.ID)).update({
            ApprovalStatus: "Approved",
        }).then(function (res) {
            swal("Success", "Pick up approved successfully", "success");
            sp.web.lists
                .getByTitle("GiftBeneficiaries")
                .items.filter("ApprovalStatus eq '" + query + "'")
                .get().then(function (res) {
                setData(res);
            });
        }).catch(function (e) {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });
    };
    var declineHandler = function (rowData) {
        setID(rowData.ID);
        setModal(true);
    };
    var reasonHandler = function (e) {
        e.preventDefault();
        sp.web.lists.getByTitle("GiftBeneficiaries").items.getById(Number(ID)).update({
            ApprovalStatus: "Declined",
            DeclinedReason: reason
        }).then(function (res) {
            swal("Success", "Pick up declined successfully", "success");
            sp.web.lists
                .getByTitle("GiftBeneficiaries")
                .items.filter("ApprovalStatus eq '" + query + "'")
                .get().then(function (res) {
                setData(res);
            });
        }).catch(function (e) {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
            setModal(false);
        });
    };
    return (React.createElement("div", { className: "appContainer" },
        React.createElement(Sidebar, null),
        React.createElement("div", { className: "contentsRight" },
            React.createElement(Header, { title: "Pickups", userEmail: employeeEmail }),
            React.createElement("div", { className: "spaceBetween" },
                React.createElement("div", null,
                    React.createElement(Select, { onChange: selectHandler, title: query, value: query, options: selectOption, size: "mtn__adult" })),
                React.createElement(Navigation, { pickups: "active" })),
            React.createElement("div", { className: "center", style: { marginTop: "50px" } }, loading ? (React.createElement(Spinner, null)) : (React.createElement(MaterialTable, { title: "", columns: columns, data: data, options: {
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
                        iconProps: { style: { fontSize: "11px", backgroundColor: "gold" } },
                        tooltip: "Approve",
                        onClick: function (event, rowData) {
                            approveHandler(rowData);
                        },
                    },
                    {
                        icon: "visibility",
                        iconProps: { style: { fontSize: "11px", color: "gold" } },
                        tooltip: "Decline",
                        onClick: function (event, rowData) {
                            declineHandler(rowData);
                        },
                    },
                ], components: {
                    Action: function (props) { return (React.createElement("button", { onClick: function (event) { return props.action.onClick(event, props.data); }, className: query === "Declined" || query === "Approved" ? "no_display" : "mtn__btn_table mtn__black" }, props.action.tooltip)); },
                } }))),
            React.createElement(Modal, { isVisible: modal, title: "Reason for decline?", size: "sm", content: React.createElement("form", { onSubmit: reasonHandler },
                    React.createElement("div", { className: "mtn__InputFlex" },
                        React.createElement(TextArea, { value: reason, onChange: function (e) { return setReason(e.target.value); }, required: true }),
                        React.createElement("button", { style: { marginTop: "1rem" }, type: "submit", className: "mtn__btn mtn__yellow" }, "Submit"))), onClose: function () { return setModal(false); }, footer: "" }))));
};
export default Pickup;
//# sourceMappingURL=index.js.map