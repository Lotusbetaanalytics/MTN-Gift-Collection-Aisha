import * as React from "react";
import { FileUpload, Header, Navigation, Search, Sidebar } from "../../../../Containers";
import styles from "./styles.module.scss";
import { sp } from "@pnp/sp";
import * as XLSX from 'xlsx';
import swal from "sweetalert";
import { readFile, utils } from 'xlsx';
// const XLSX = require("xlsx");


const Document = () => {
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [uploadFile,setUploadedFile] = React.useState("")
  const [upload,setUpload] = React.useState(false)
  const [loading,setLoading]= React.useState(false)
  const [data,setData] = React.useState(false)

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      console.log(response);
      setEmployeeEmail(response.Email);
      
    });
  }, []);
 
  // const fileUpload = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //  var files = e.target.files,
  //     f = files[0];
  //   var allowedExtensions =
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
  //     "application/vnd.ms-excel" ||
  //     ".csv";
  //   if (f.type !== allowedExtensions) {
  //     swal("Warning!", "Invalid File", "warning");
  //   } else {
  //     var reader = new FileReader();
  //     reader.onload = function (e) {
  //       setLoading(true);
  //       var data = reader.result;
  //       let readedData = XLSX.read(data, { type: "binary" });
  //       const wsname = readedData.SheetNames[0];
  //       const ws = readedData.Sheets[wsname];
  //       /* Convert array to json*/
  //       const dataParse = XLSX.utils.sheet_to_json(ws);
  //       if (dataParse.length === 0) {
  //         setLoading(false);
  //         swal("Warning!", "Document is empty", "warning");
  //       } else {
  //         setData(dataParse);
  //         setUpload(true);
  //         setLoading(false);
  //       }
  //     };

  //    reader.readAsBinaryString(f);
  //   }
  // };

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
              <img src={require("../../../../assets/upload.png")} alt="" />
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
              <img src={require("../../../../assets/upload.png")} alt="" />
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
