import * as React from 'react';
import styles from './styles.module.scss';
var FileUpload = function (_a) {
    var onChange = _a.onChange, title = _a.title, multiple = _a.multiple;
    return React.createElement("div", { className: "mtn__InputContainer mtn__child" },
        React.createElement("div", { className: styles.uploadWrapper },
            React.createElement("button", { className: "mtn__btn " + styles.uploadBtn }, title),
            React.createElement("input", { type: "file", multiple: multiple, onChange: onChange, accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" })));
};
export default FileUpload;
//# sourceMappingURL=FileUpload.js.map