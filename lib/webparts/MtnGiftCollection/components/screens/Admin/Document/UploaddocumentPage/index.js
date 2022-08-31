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
    var fileUpload = function (e) {
        //   e.preventDefault();
        //   console.log("yess")
        //   setLoading(true);
        var files = e.target.files;
        //     f = files[0];
        //   var allowedExtensions =
        //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        //     "application/vnd.ms-excel" ||
        //     ".csv";
        //   if (f.type !== allowedExtensions) {
        //     swal("Warning!", "Invalid File", "warning");
        //   } else {
        //         setLoading(false);
        //       }
        //      var reader = new FileReader();
        //     reader.onload = function (e) {
        //       setLoading(true);
        //       var data = reader.result;
        //       let readedData = XLSX.read(data, { type: "binary" });
        //       const wsname = readedData.SheetNames[0];
        //       const ws = readedData.Sheets[wsname] ;
        //       /* Convert array to json*/
        //       const dataParse = XLSX.utils.sheet_to_json(ws);
        //       if (dataParse.length === 0) {
        //         setLoading(false);
        //         swal("Warning!", "Document is empty", "warning");
        //       } else {
        //         console.log(dataParse)
        //         setData(dataParse);
        //         console.log(data)
        //         setUpload(true);
        //    reader.readAsBinaryString(f);
        //   }
        //     }
        var reader = new FileReader();
        var rABS = !!reader.readAsBinaryString;
        console.log(rABS);
        reader.onload = function (e) {
            /* Parse data */
            console.log(e.target.result, "result");
            var bstr = e.target.result;
            var wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
            /* Get first worksheet */
            var wsname = wb.SheetNames[0];
            var ws = wb.Sheets[wsname];
            console.log(rABS, wb);
            /* Convert array of arrays */
            var data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            /* Update state */
            setData(data);
            console.log(data);
        };
    };
    // const readUploadFile = (e) => {
    //   e.preventDefault();
    //   if (e.target.files) {
    //       const reader = new FileReader();
    //       reader.onload = (e) => {
    //           const data = e.target.result;
    //           const workbook = XLSX.read(data, { type: "array" });
    //           const sheetName = workbook.SheetNames[0];
    //           const worksheet = workbook.Sheets[sheetName];
    //           const json = XLSX.utils.sheet_to_json(worksheet);
    //           console.log(json);
    //       };
    //       reader.readAsArrayBuffer(e.target.files[0]);
    //   }
    // }
    var readUploadFile = function (e) {
        e.preventDefault;
        setLoading(true);
        if (e.target.files) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, { type: "array" });
                var sheetName = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[sheetName];
                var json = XLSX.utils.sheet_to_json(worksheet);
                console.log(json.length);
                for (var i = 0; i < json.length; i++) {
                    if (json[i]["Surname"] &&
                        json[i]["FirstName"] &&
                        json[i]["JobTitle"] &&
                        json[i]["Email"] &&
                        json[i]["EmployeeLocation"] &&
                        json[i]["PickupLocation"] &&
                        json[i]["PickupPerson"] &&
                        json[i]["Division"] &&
                        json[i]["Vendor"] &&
                        json[i]["Phone"]) {
                        console.log("sinsins");
                        sp.web.lists
                            .getByTitle("GiftBeneficiaries")
                            .items.add({
                            Title: "",
                            Surname: json[i]["Surname"],
                            FirstName: json[i]["FirstName"],
                            JobTitle: json[i]["JobTitle"],
                            Email: json[i]["Email"],
                            EmployeeLocation: json[i]["EmployeeLocation"],
                            PickupLocation: json[i]["PickupLocation"],
                            PickupPerson: json[i]["PickupPerson"],
                            Division: json[i]["Division"],
                            Vendor: json[i]["Vendor"],
                            Phone: json[i]["Phone"],
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
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
        else {
            console.log("i dont understand");
        }
    };
    var singleUploadFile = function (e) {
        e.preventDefault;
        setLoading(true);
        if (e.target.files) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, { type: "array" });
                var sheetName = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[sheetName];
                var json = XLSX.utils.sheet_to_json(worksheet);
                console.log(json.length);
                for (var i = 0; i < json.length; i++) {
                    if (json[i]["Surname"] &&
                        json[i]["FirstName"] &&
                        json[i]["JobTitle"] &&
                        json[i]["Email"] &&
                        json[i]["EmployeeLocation"] &&
                        json[i]["PickupLocation"] &&
                        json[i]["PickupPerson"] &&
                        json[i]["Division"] &&
                        json[i]["Vendor"] &&
                        json[i]["Phone"]) {
                        console.log("sinsins");
                        sp.web.lists
                            .getByTitle("GiftBeneficiaries")
                            .items.add({
                            Title: "",
                            Surname: json[i]["Surname"],
                            FirstName: json[i]["FirstName"],
                            JobTitle: json[i]["JobTitle"],
                            Email: json[i]["Email"],
                            EmployeeLocation: json[i]["EmployeeLocation"],
                            PickupLocation: json[i]["PickupLocation"],
                            PickupPerson: json[i]["PickupPerson"],
                            Division: json[i]["Division"],
                            Vendor: json[i]["Vendor"],
                            Phone: json[i]["Phone"],
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
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
        else {
            console.log("i dont understand");
        }
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
                        React.createElement(FileUpload, { multiple: false, title: "single upload", onChange: singleUploadFile }))),
                React.createElement("div", { className: styles.imageContainer },
                    React.createElement("div", { className: styles.imgBox },
                        React.createElement("img", { src: require("../../../../assets/upload.png"), alt: "" })),
                    React.createElement("div", { className: styles.uploadBtn },
                        React.createElement(FileUpload, { multiple: true, title: "bulk upload", onChange: readUploadFile })))))));
};
export default Document;
//# sourceMappingURL=index.js.map