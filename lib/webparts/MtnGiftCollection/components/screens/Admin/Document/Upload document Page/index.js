import * as React from "react";
import { FileUpload, Header, Navigation, Sidebar } from "../../../../Containers";
import styles from "./styles.module.scss";
import { sp } from "@pnp/sp";
// const XLSX = require("xlsx");
var Document = function () {
    var _a = React.useState(""), employeeEmail = _a[0], setEmployeeEmail = _a[1];
    var _b = React.useState(""), uploadFile = _b[0], setUploadedFile = _b[1];
    var _c = React.useState(false), upload = _c[0], setUpload = _c[1];
    var _d = React.useState(false), loading = _d[0], setLoading = _d[1];
    var _e = React.useState(false), data = _e[0], setData = _e[1];
    React.useEffect(function () {
        sp.profiles.myProperties.get().then(function (response) {
            console.log(response);
            setEmployeeEmail(response.Email);
        });
    }, []);
    // const fileUpload = (e) => {
    //   e.preventDefault();
    //   setLoading(true);
    //  var files = e.target.files,
    //     f = files[0];
    //   var allowedExtensions =
    //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    //     "application/vnd.ms-excel" ||
    //     ".csv";
    //   if (f.type !== allowedExtensions) {
    //     swal("Warning!", "Invalid File", "warning");
    //   } else {
    //     var reader = new FileReader();
    //     reader.onload = function (e) {
    //       setLoading(true);
    //       var data = reader.result;
    //       let readedData = XLSX.read(data, { type: "binary" });
    //       const wsname = readedData.SheetNames[0];
    //       const ws = readedData.Sheets[wsname];
    //       /* Convert array to json*/
    //       const dataParse = XLSX.utils.sheet_to_json(ws);
    //       if (dataParse.length === 0) {
    //         setLoading(false);
    //         swal("Warning!", "Document is empty", "warning");
    //       } else {
    //         setData(dataParse);
    //         setUpload(true);
    //         setLoading(false);
    //       }
    //     };
    //    reader.readAsBinaryString(f);
    //   }
    // };
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
                        React.createElement(FileUpload, { title: "single upload", onChange: function (e) { return setUploadedFile(e.target.value); } }))),
                React.createElement("div", { className: styles.imageContainer },
                    React.createElement("div", { className: styles.imgBox },
                        React.createElement("img", { src: require("../../../../assets/upload.png"), alt: "" })),
                    React.createElement("div", { className: styles.uploadBtn },
                        React.createElement(FileUpload, { title: "bulk upload", onChange: function (e) { return setUploadedFile(e.target.value); } })))))));
};
export default Document;
//# sourceMappingURL=index.js.map