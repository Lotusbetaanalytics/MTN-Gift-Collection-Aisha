import * as React from "react";
import { FileUpload, Header, Navigation, Search, Sidebar } from "../../../Containers";
import styles from "./styles.module.scss";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp } from "@pnp/sp/presets/all";
import Text from "../../../Containers/Text";



const Document = () => {
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  
  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      console.log(response);
      setEmployeeEmail(response.Email);
    });
  }, []);
  return (
    <div className="appContainer">
      <Sidebar />
      <div className="contentsRight">
        <Header title={"Report"} userEmail={employeeEmail} />
        <div className="spaceBetween">
        <div></div>
          <div> <button className="mtn__btn mtn__yellow">Report</button></div>
        </div>
        <div className={styles.header}><h3>Employee Details</h3></div>
        <div>
         <Text title={"Phone Number"} value={"09076733763"} size={"medium"} />
         <Text title={"Location"} value={"55, lekki road maruwa"} size={"medium"} />
         <Text title={"Location"} value={"55, lekki road maruwa"} size={"medium"} />
         <Text title={"Location"} value={"55, lekki road maruwa"} size={"medium"} />
         <Text title={"Location"} value={"55, lekki road maruwa"} size={"medium"} />
         <Text title={"Location"} value={"55, lekki road maruwa"} size={"medium"} />
          <div style={{width:"40%",display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:"2rem"}}> 
            <button className="mtn__btn mtn__black"> back</button>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document;
