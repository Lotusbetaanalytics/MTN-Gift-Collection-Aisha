import * as React from "react";
import { FileUpload, Header, Navigation, Search, Sidebar } from "../../../Containers";
import styles from "./styles.module.scss";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp } from "@pnp/sp/presets/all";


const Document = () => {
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [uploadFile,setUploadedFile] = React.useState("")
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
        <Header title={"Document"} userEmail={employeeEmail} />
        <div className="spaceBetween">
          <div></div>
          <Navigation />
        </div>
        <div className="center">
          <div className={styles.imageContainer}>
            <div className={styles.imgBox}>
              <img src={require("../../../assets/upload.png")} alt="" />
            </div>

            <div className={styles.uploadBtn}>
              <FileUpload
                title="single upload"
                onChange={(e) => setUploadedFile(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imgBox}>
              <img src={require("../../../assets/upload.png")} alt="" />
            </div>

            <div className={styles.uploadBtn}>
              <FileUpload
                title="bulk upload"
                onChange={(e) => setUploadedFile(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document;
