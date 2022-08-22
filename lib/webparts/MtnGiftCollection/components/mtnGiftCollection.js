var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from "react";
import "./styles.scss";
import { Route, Switch, HashRouter } from "react-router-dom";
import * as jQuery from "jquery";
import { AdminViewDocument, DocumentPage, EmployeePickLocation, EmployeePickLocationEdit, HomeScreen, LocationReport, LocationResult, LocationSearch, LocationView, Pickup, Report, UploadDocument } from './screens';
var mtnGiftCollection = /** @class */ (function (_super) {
    __extends(mtnGiftCollection, _super);
    function mtnGiftCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    mtnGiftCollection.prototype.render = function () {
        jQuery("#workbenchPageContent").prop("style", "max-width: none");
        jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
        jQuery(".CanvasZone").prop("style", "max-width: none");
        return (React.createElement(React.Fragment, null,
            React.createElement(HashRouter, null,
                React.createElement(Switch, null,
                    React.createElement(Route, { path: "/", exact: true, component: HomeScreen }),
                    React.createElement(Route, { path: "/admin/document/upload", exact: true, component: UploadDocument }),
                    React.createElement(Route, { path: "/admin/document", exact: true, component: DocumentPage }),
                    React.createElement(Route, { path: "/admin/document/:id", exact: true, component: AdminViewDocument }),
                    React.createElement(Route, { path: "/admin/pickup", exact: true, component: Pickup }),
                    React.createElement(Route, { path: "/admin/report", exact: true, component: Report }),
                    React.createElement(Route, { path: "/locationchampion/search", exact: true, component: LocationSearch }),
                    React.createElement(Route, { path: "/locationchampion/search/result", exact: true, component: LocationResult }),
                    React.createElement(Route, { path: "/locationchampion/report", exact: true, component: LocationReport }),
                    React.createElement(Route, { path: "/locationchampion/report/view", exact: true, component: LocationView }),
                    React.createElement(Route, { path: "/employee/location", exact: true, component: EmployeePickLocation }),
                    React.createElement(Route, { path: "/employee/location/edit", exact: true, component: EmployeePickLocationEdit })))));
    };
    return mtnGiftCollection;
}(React.Component));
export default mtnGiftCollection;
//# sourceMappingURL=MtnGiftCollection.js.map