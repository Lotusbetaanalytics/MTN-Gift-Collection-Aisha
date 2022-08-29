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
import './assets/icon.scss';
import * as jQuery from "jquery";
import { AdminViewDocument, AdminViewReport, configDivision, configLocation, configRole, DocumentPage, EmployeePickLocation, EmployeePickLocationEdit, HomeScreen, LocationReport, LocationResult, LocationView, Pickup, Report, Roles, UploadDocument } from './screens';
var mtnGiftCollection = /** @class */ (function (_super) {
    __extends(mtnGiftCollection, _super);
    function mtnGiftCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    mtnGiftCollection.prototype.render = function () {
        var _this = this;
        jQuery("#workbenchPageContent").prop("style", "max-width: none");
        jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
        jQuery(".CanvasZone").prop("style", "max-width: none");
        // this.props.context.spHttpClient
        // .get(
        //   `https://mtncloud.sharepoint.com/sites/MTNNigeriaComplianceUniverse/testenv/_api/lists/GetByTitle('CURRENT HCM STAFF LIST')/items?$skiptoken=Paged=TRUE`,
        //   SPHttpClient.configurations.v1
        // )
        // .then((response: SPHttpClientResponse) => {
        //   response.json().then((responseJSON: any) => {
        //     // console.log(responseJSON);
        //   });
        // });
        return (React.createElement(React.Fragment, null,
            React.createElement(HashRouter, null,
                React.createElement(Switch, null,
                    React.createElement(Route, { path: "/", exact: true, component: HomeScreen }),
                    React.createElement(Route, { path: "/admin/document/upload", exact: true, component: UploadDocument }),
                    React.createElement(Route, { path: "/admin/document", exact: true, component: DocumentPage }),
                    React.createElement(Route, { path: "/admin/document/:id", exact: true, component: AdminViewDocument }),
                    React.createElement(Route, { path: "/admin/pickup", exact: true, component: Pickup }),
                    React.createElement(Route, { path: "/admin/report", exact: true, component: Report }),
                    React.createElement(Route, { path: "/admin/report/:id", exact: true, component: AdminViewReport }),
                    React.createElement(Route, { path: "/admin/config", exact: true, render: function (props) { return (React.createElement(Roles, { context: _this.props.context })); } }),
                    React.createElement(Route, { path: "/admin/division", exact: true, component: configDivision }),
                    React.createElement(Route, { path: "/admin/location", exact: true, component: configLocation }),
                    React.createElement(Route, { path: "/admin/roles", exact: true, component: configRole }),
                    React.createElement(Route, { path: "/locationchampion", exact: true, component: LocationResult }),
                    React.createElement(Route, { path: "/locationchampion/report", exact: true, component: LocationReport }),
                    React.createElement(Route, { path: "/locationchampion/report/view/:id", exact: true, component: LocationView }),
                    React.createElement(Route, { path: "/employee/location", exact: true, component: EmployeePickLocation }),
                    React.createElement(Route, { path: "/employee/location/edit", exact: true, component: EmployeePickLocationEdit })))));
    };
    return mtnGiftCollection;
}(React.Component));
export default mtnGiftCollection;
//# sourceMappingURL=MtnGiftCollection.js.map