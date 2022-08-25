import * as React from "react";
import { FileUpload, Header, Navigation, Sidebar } from "../../../../Containers";
import styles from "./styles.module.scss";
import { sp } from "@pnp/sp";
import * as XLSX from 'xlsx';
import swal from "sweetalert";
// const XLSX = require("xlsx");
var Document = function (_a) {
    var history = _a.history;
    var _b = React.useState(""), employeeEmail = _b[0], setEmployeeEmail = _b[1];
    var _c = React.useState(""), uploadFile = _c[0], setUploadedFile = _c[1];
    var _d = React.useState(false), upload = _d[0], setUpload = _d[1];
    var _e = React.useState(false), loading = _e[0], setLoading = _e[1];
    var _f = React.useState([]), data = _f[0], setData = _f[1];
    React.useEffect(function () {
        sp.profiles.myProperties.get().then(function (response) {
            console.log(response);
            setEmployeeEmail(response.Email);
        });
    }, []);
    var fileUpload = function (e) {
        e.preventDefault();
        setLoading(true);
        var files = e.target.files, f = files[0];
        //   var allowedExtensions =
        //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        //     "application/vnd.ms-excel" ||
        //     ".csv";
        //   if (f.type !== allowedExtensions) {
        //     swal("Warning!", "Invalid File", "warning");
        //   } else {
        var reader = new FileReader();
        reader.onload = function (e) {
            setLoading(true);
            var data = reader.result;
            var readedData = XLSX.read(data, { type: "binary" });
            var wsname = readedData.SheetNames[0];
            var ws = readedData.Sheets[wsname];
            /* Convert array to json*/
            var dataParse = XLSX.utils.sheet_to_json(ws);
            if (dataParse.length === 0) {
                setLoading(false);
                swal("Warning!", "Document is empty", "warning");
            }
            else {
                console.log(dataParse);
                setData(dataParse);
                console.log(data);
                setUpload(true);
                setLoading(false);
            }
            // };
            reader.readAsBinaryString(f);
        };
    };
    console.log(data);
    var bulkUpload = function () {
        var uploadBulkTemp = function (e) {
            e.preventDefault;
            setUpload(false);
            setLoading(true);
            if (data.length === 0) {
                setLoading(false);
                swal("Warning!", "Document is empty", "warning");
            }
            else {
                for (var i = 0; i < data.length; i++) {
                    if (data[i]["Surname"] &&
                        data[i]["FirstName"] &&
                        data[i]["JobTitle"] &&
                        data[i]["Email"] &&
                        data[i]["EmployeeLocation"] &&
                        data[i]["PickupLocation"] &&
                        data[i]["PickupPerson"] &&
                        data[i]["Division"] &&
                        data[i]["Vendor"] &&
                        data[i]["Phone"]) {
                        console.log("sinsins");
                        sp.web.lists
                            .getByTitle("GiftBeneficiaries")
                            .items.add({
                            Title: "",
                            Surname: data[i]["Surname"],
                            FirstName: data[i]["FirstName"],
                            JobTitle: data[i]["JobTitle"],
                            Email: data[i]["Email"],
                            EmployeeLocation: data[i]["EmployeeLocation"],
                            PickupLocation: data[i]["PickupLocation"],
                            PickupPerson: data[i]["PickupPerson"],
                            Division: data[i]["Division"],
                            Vendor: data[i]["Vendor"],
                            Phone: data[i]["Phone"],
                        })
                            .then(function (b) {
                            swal("Success", "Success", "success");
                            setLoading(false);
                            setTimeout(function () {
                                history.push("/admin/document");
                            }, 3000);
                        });
                    }
                    else {
                        setLoading(false);
                        console.log("uessss");
                        swal("Warning!", "Some Fields are required!", "warning");
                    }
                }
            }
            console.log("yessssss");
        };
    };
    return (React.createElement("div", { className: "appContainer" },
        React.createElement(Sidebar, null),
        React.createElement("div", { className: "contentsRight" },
            React.createElement(Header, { title: "Document", userEmail: employeeEmail }),
            React.createElement("div", { className: "spaceBetween" },
                React.createElement("div", null),
                React.createElement(Navigation, null)),
            React.createElement("div", { className: "center" },
                React.createElement("div", { className: styles.imageContainer },
                    React.createElement("div", { className: styles.imgBox },
                        React.createElement("img", { src: require("../../../../assets/upload.png"), alt: "" })),
                    React.createElement("div", { className: styles.uploadBtn },
                        React.createElement(FileUpload, { title: "single upload", onChange: fileUpload }))),
                React.createElement("div", { className: styles.imageContainer },
                    React.createElement("div", { className: styles.imgBox },
                        React.createElement("img", { src: require("../../../../assets/upload.png"), alt: "" })),
                    React.createElement("div", { className: styles.uploadBtn },
                        React.createElement(FileUpload, { title: "bulk upload", onChange: bulkUpload })))))));
};
export default Document;
//# sourceMappingURL=index.js.map