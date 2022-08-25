import * as React from 'react';
import styles from './styles.module.scss';
var ImageUpload = function (_a) {
    var onChange = _a.onChange, title = _a.title, value = _a.value, _b = _a.loading, loading = _b === void 0 ? false : _b;
    return React.createElement("div", { className: "mtn__InputContainer mtn__child" },
        React.createElement("div", { className: styles.uploadWrapper },
            React.createElement("button", { className: "mtn__btn " + styles.uploadBtn_, disabled: loading },
                title,
                " ",
                loading && React.createElement("span", { className: styles.loading })),
            React.createElement("input", { type: "file", onChange: onChange, value: value })));
};
export default ImageUpload;
//# sourceMappingURL=imageFile.js.map