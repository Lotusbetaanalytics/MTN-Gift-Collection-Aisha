import * as React from "react";
var Select = function (_a) {
    var onChange = _a.onChange, value = _a.value, title = _a.title, options = _a.options, _b = _a.required, required = _b === void 0 ? false : _b, _c = _a.filter, filter = _c === void 0 ? false : _c, _d = _a.filterOption, filterOption = _d === void 0 ? "" : _d, _e = _a.onBlur, onBlur = _e === void 0 ? null : _e, _f = _a.size, size = _f === void 0 ? "mtn__child" : _f, _g = _a.readOnly, readOnly = _g === void 0 ? false : _g;
    return (React.createElement("div", { className: "mtn__InputContainer " + size },
        React.createElement("select", { onChange: onChange, value: value, 
            // defaultValue={title}
            onBlur: onBlur, required: required },
            React.createElement("option", { value: "", disabled: true }, title),
            options &&
                options.map(function (item) {
                    return !filter ? (React.createElement("option", { value: item.value }, item.value)) : (React.createElement("option", { value: item[filterOption] }, item[filterOption]));
                }))));
};
export default Select;
//# sourceMappingURL=index.js.map