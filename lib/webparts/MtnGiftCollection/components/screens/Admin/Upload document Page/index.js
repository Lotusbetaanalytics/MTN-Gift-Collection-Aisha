import * as React from "react";
import { FileUpload, Header, Navigation, Sidebar } from "../../../Containers";
import styles from "./styles.module.scss";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp } from "@pnp/sp/presets/all";
var Document = function () {
    var _a = React.useState(""), employeeEmail = _a[0], setEmployeeEmail = _a[1];
    var _b = React.useState(""), uploadFile = _b[0], setUploadedFile = _b[1];
    React.useEffect(function () {
        sp.profiles.myProperties.get().then(function (response) {
            console.log(response);
            setEmployeeEmail(response.Email);
        });
    }, []);
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
                        React.createElement("img", { src: require("../../../assets/upload.png"), alt: "" })),
                    React.createElement("div", { className: styles.uploadBtn },
                        React.createElement(FileUpload, { title: "single upload", onChange: function (e) { return setUploadedFile(e.target.value); } }))),
                React.createElement("div", { className: styles.imageContainer },
                    React.createElement("div", { className: styles.imgBox },
                        React.createElement("img", { src: require("../../../assets/upload.png"), alt: "" })),
                    React.createElement("div", { className: styles.uploadBtn },
                        React.createElement(FileUpload, { title: "bulk upload", onChange: function (e) { return setUploadedFile(e.target.value); } })))))));
};
export default Document;
//# sourceMappingURL=index.js.map