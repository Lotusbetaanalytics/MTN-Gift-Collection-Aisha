import * as React from "react";
import styles from "./textarea.module.scss";
var TextArea = function (_a) {
    var onChange = _a.onChange, value = _a.value, _b = _a.required, required = _b === void 0 ? false : _b, _c = _a.readOnly, readOnly = _c === void 0 ? false : _c;
    return (React.createElement("div", { className: styles.textArea__container },
        React.createElement("textarea", { placeholder: "", value: value, onChange: onChange, required: required, readOnly: readOnly })));
};
export default TextArea;
export var TextAreaSmall = function (_a) {
    var onChange = _a.onChange, value = _a.value, 
    // style,
    _b = _a.rows, 
    // style,
    rows = _b === void 0 ? 3 : _b, _c = _a.required, required = _c === void 0 ? false : _c, _d = _a.readOnly, readOnly = _d === void 0 ? false : _d;
    return (React.createElement("div", null,
        React.createElement("textarea", { maxLength: 60, value: value, 
            // style={style}
            onChange: onChange, rows: rows, required: required, readOnly: readOnly })));
};
//# sourceMappingURL=index.js.map