import * as React from 'react';
import { graph } from "@pnp/graph";
import '@pnp/graph/users';
var PeoplePicker = function (_a) {
    var onChange = _a.onChange, value = _a.value, title = _a.title, _b = _a.required, required = _b === void 0 ? false : _b, filter = _a.filter, _c = _a.size, size = _c === void 0 ? "mtn__child" : _c, _d = _a.readOnly, readOnly = _d === void 0 ? false : _d;
    var _e = React.useState([]), user = _e[0], setUser = _e[1];
    React.useEffect(function () {
        graph.users.top(999).get().then(function (u) { return setUser(u); });
    }, []);
    return React.createElement("div", { className: "mtn__InputContainer " + size },
        React.createElement("label", null,
            title,
            " ",
            required && React.createElement("span", { className: 'required' }, "*")),
        React.createElement("input", { onChange: onChange, value: value, list: "users", required: required, placeholder: title, readOnly: readOnly }),
        React.createElement("datalist", { id: "users" },
            React.createElement("option", { value: "" }, title),
            user.map(function (users) { return (React.createElement("option", { value: users[filter], key: users[filter] }, users.displayName)); })));
};
export default PeoplePicker;
//# sourceMappingURL=PeoplePicker.js.map