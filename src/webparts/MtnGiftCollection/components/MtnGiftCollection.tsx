import * as React from "react";
import "./styles.scss";
import { ImtnGiftCollectionProps } from "./IMtnGiftCollectionProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { Route, Switch, HashRouter } from "react-router-dom";
import { sp } from "@pnp/sp";
import './assets/icon.scss'
import * as jQuery from "jquery";
 import { AdminViewDocument, AdminViewReport, configDivision, configLocation, configRole,Config, DocumentPage, EmployeePickLocation, EmployeePickLocationEdit, HomeScreen, LocationReport, LocationResult, LocationSearch, LocationView, Pickup, Report, UploadDocument } from './screens';
 import {
  SPHttpClient,
  SPHttpClientConfiguration,
  SPHttpClientResponse,
} from "@microsoft/sp-http";
export default class mtnGiftCollection extends React.Component<ImtnGiftCollectionProps,{}> {
 
  public render(): React.ReactElement<ImtnGiftCollectionProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none");
    jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
    jQuery(".CanvasZone").prop("style", "max-width: none");
    this.props.context.spHttpClient
    .get(
      `https://mtncloud.sharepoint.com/sites/MTNNigeriaComplianceUniverse/testenv/_api/lists/GetByTitle('CURRENT HCM STAFF LIST')/items?$skiptoken=Paged=TRUE`,
      SPHttpClient.configurations.v1
    )
    .then((response: SPHttpClientResponse) => {
      response.json().then((responseJSON: any) => {
        // console.log(responseJSON);
      });
    });

    return (
      <>
       
        <HashRouter>
        <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/admin/document/upload" exact render={(props) => (<UploadDocument  context={this.props.pageContext}  /> )} /> 
        <Route path="/admin/document" exact component={DocumentPage} />
        <Route path="/admin/document/:id" exact component={AdminViewDocument} />   
        <Route path="/admin/pickup" exact component={Pickup} />  
        <Route path="/admin/report" exact component={Report} /> 
        <Route path="/admin/report/:id" exact component={AdminViewReport} /> 
        <Route path="/admin/config"  exact render={(props) => (<Config  context={this.props.pageContext}  /> )}/>
        <Route path="/admin/division" exact component={configDivision} /> 
        <Route path="/admin/location" exact component={configLocation} /> 
        <Route path="/admin/roles" exact component={configRole} /> 
        <Route path="/locationchampion/search" exact component={LocationSearch} />
        <Route path="/locationchampion/search/result" exact component={LocationResult} /> 
        <Route path="/locationchampion/report" exact component={LocationReport} />  
        <Route path="/locationchampion/report/view/:id" exact component={LocationView} />  
        <Route path="/employee/location" exact component={EmployeePickLocation} />   
        <Route path="/employee/location/edit" exact component={EmployeePickLocationEdit} />         
      </Switch>
             
               
        </HashRouter>
       
      </>
    );
  }
}

