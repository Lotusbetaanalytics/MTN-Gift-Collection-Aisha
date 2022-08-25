import * as React from 'react';
var Input = function (_a) {
    var onChange = _a.onChange, value = _a.value, type = _a.type, title = _a.title, _b = _a.required, required = _b === void 0 ? false : _b, _c = _a.readOnly, readOnly = _c === void 0 ? false : _c, _d = _a.size, size = _d === void 0 ? "mtn__child" : _d;
    return React.createElement("div", { className: "mtn__InputContainer " + size },
        React.createElement("label", null,
            title,
            " ",
            required && React.createElement("span", { className: 'required' }, "*")),
        React.createElement("input", { type: type, onChange: onChange, value: value, placeholder: title, readOnly: readOnly, required: required }));
};
export default Input;
//# sourceMappingURL=index.js.map