import * as React from "react";
import { FileUpload, Header, Navigation, Search, Sidebar } from "../../../../Containers";
import styles from "./styles.module.scss";
import { sp } from "@pnp/sp";
import * as XLSX from 'xlsx';
import swal from "sweetalert";
import { readFile, utils } from 'xlsx';
// const XLSX = require("xlsx");


const Document = ({history}) => {
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [uploadFile,setUploadedFile] = React.useState("")
  const [upload,setUpload] = React.useState(false)
  const [loading,setLoading]= React.useState(false)
  const [data,setData] = React.useState([])

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      console.log(response);
      setEmployeeEmail(response.Email);
      
    });
  }, []);
 
  const fileUpload = (e) => {
  //   e.preventDefault();
  //   console.log("yess")
  //   setLoading(true);
   let files = e.target.files
  //     f = files[0];
  //   var allowedExtensions =
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
  //     "application/vnd.ms-excel" ||
  //     ".csv";
  //   if (f.type !== allowedExtensions) {
  //     swal("Warning!", "Invalid File", "warning");
  //   } else {
     
  //         setLoading(false);
  //       }
  //      var reader = new FileReader();
  //     reader.onload = function (e) {
  //       setLoading(true);
  //       var data = reader.result;
  //       let readedData = XLSX.read(data, { type: "binary" });
  //       const wsname = readedData.SheetNames[0];
  //       const ws = readedData.Sheets[wsname] ;
  //       /* Convert array to json*/
  //       const dataParse = XLSX.utils.sheet_to_json(ws);
  //       if (dataParse.length === 0) {
  //         setLoading(false);
  //         swal("Warning!", "Document is empty", "warning");
  //       } else {
  //         console.log(dataParse)
  //         setData(dataParse);
  //         console.log(data)
  //         setUpload(true);

  //    reader.readAsBinaryString(f);
  //   }
  //     }
  const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    console.log(rABS)
    reader.onload = e => {
      /* Parse data */
      console.log(e.target.result,"result")
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      console.log(rABS, wb);
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      /* Update state */
      setData(data);
      console.log(data)
    };
   
}
  console.log(data)

const bulkUpload = (e) => {
    e.preventDefault;
    setUpload(true);
    console.log("yess")
    setLoading(true);
    if (data.length === 0) {
      setLoading(false);
      swal("Warning!", "Document is empty", "warning");
    } else {
      for (let i = 0; i < data.length; i++) {
        if (
          data[i]["Surname"] &&
          data[i]["FirstName"] &&
          data[i]["JobTitle"] &&
          data[i]["Email"] &&
          data[i]["EmployeeLocation"] &&
          data[i]["PickupLocation"] &&
          data[i]["PickupPerson"] &&
          data[i]["Division"] &&
          data[i]["Vendor"] &&
          data[i]["Phone"] 
          
        ) {
          console.log("sinsins")
          sp.web.lists
            .getByTitle("GiftBeneficiaries")
            .items.add({
              Title: "",
              Surname: data[i]["Surname"],
              FirstName: data[i]["FirstName"],
              JobTitle: data[i]["JobTitle"],
              Email: data[i]["Email"],
              EmployeeLocation: data[i]["EmployeeLocation"],
              PickupLocation: data[i]["PickupLocation"],
              PickupPerson: data[i]["PickupPerson"],
              Division: data[i]["Division"],
              Vendor: data[i]["Vendor"],
              Phone: data[i]["Phone"],
            })
            .then((b) => {
              swal("Success", "Success", "success");
              setLoading(false);
              setTimeout(function () {
                history.push(`/admin/document`);
              }, 3000);
            });
        } else {
          setLoading(false);
          console.log("uessss")
          swal("Warning!", "Some Fields are required!", "warning");
        }
      }
    
    console.log("yessssss")
  };
}
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
                onChange={fileUpload}
              />
            </div>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imgBox}>
              <img src={require("../../../../assets/upload.png")} alt="" />
            </div>

            <div className={styles.uploadBtn}>
              {/* <FileUpload
                title="bulk upload"
                onChange={bulkUpload}
              /> */}
              <input type="file" onChange={bulkUpload} multiple/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document;
