import * as React from "react";
import "./styles.scss";
import { ImtnGiftCollectionProps } from "./IMtnGiftCollectionProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { Route, Switch, HashRouter } from "react-router-dom";
import { sp } from "@pnp/sp";
import * as jQuery from "jquery";
 import { AdminViewDocument, DocumentPage, EmployeePickLocation, EmployeePickLocationEdit, HomeScreen, LocationReport, LocationResult, LocationSearch, LocationView, Pickup, Report, UploadDocument } from './screens';

export default class mtnGiftCollection extends React.Component<ImtnGiftCollectionProps,{}> {
 
  public render(): React.ReactElement<ImtnGiftCollectionProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none");
    jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
    jQuery(".CanvasZone").prop("style", "max-width: none");

    return (
      <>
        <HashRouter>
        <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/admin/document/upload" exact component={UploadDocument} /> 
        <Route path="/admin/document" exact component={DocumentPage} />
        <Route path="/admin/document/:id" exact component={AdminViewDocument} />   
        <Route path="/admin/pickup" exact component={Pickup} />  
        <Route path="/admin/report" exact component={Report} />  
        <Route path="/locationchampion/search" exact component={LocationSearch} />
        <Route path="/locationchampion/search/result" exact component={LocationResult} /> 
        <Route path="/locationchampion/report" exact component={LocationReport} />  
        <Route path="/locationchampion/report/view" exact component={LocationView} />  
        <Route path="/employee/location" exact component={EmployeePickLocation} />   
        <Route path="/employee/location/edit" exact component={EmployeePickLocationEdit} />         
      </Switch>
             
               
        </HashRouter>
      </>
    );
  }
}
