import * as React from 'react';
var DateInput = function (_a) {
    var onChange = _a.onChange, value = _a.value, type = _a.type, title = _a.title, _b = _a.readOnly, readOnly = _b === void 0 ? false : _b, _c = _a.required, required = _c === void 0 ? false : _c, _d = _a.size, size = _d === void 0 ? "mtn__child" : _d;
    return React.createElement("div", { className: "mtn__InputContainer " + size },
        React.createElement("label", null, title),
        React.createElement("input", { type: type, onChange: onChange, value: value, placeholder: title, readOnly: readOnly, onFocus: function (e) { return (e.currentTarget.type = "date"); }, onBlur: function (e) { return (e.currentTarget.type = "text"); }, required: required }));
};
export default DateInput;
//# sourceMappingURL=DateInput.js.map