import * as React from 'react';
import styles from './styles.module.scss';
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp } from "@pnp/sp";
var AdminHeader = function (_a) {
    var title = _a.title;
    var _b = React.useState({ DisplayName: "", Email: "" }), data = _b[0], setData = _b[1];
    React.useEffect(function () {
        sp.profiles.myProperties.get()
            .then(function (response) {
            setData(response);
        });
    }, []);
    return (React.createElement("div", { className: styles.header },
        React.createElement("div", { className: styles.title }, title),
        React.createElement("div", { className: styles.info },
            React.createElement("h3", null, data.DisplayName),
            React.createElement("p", null, data.Email))));
};
export default AdminHeader;
//# sourceMappingURL=index.js.map