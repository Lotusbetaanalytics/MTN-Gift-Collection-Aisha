import * as React from "react";
import { Header, Input, Navigation, Search, Select, Sidebar } from "../../../Containers";
import styles from "./styles.module.scss"
import { useHistory } from "react-router-dom";
import { HiHome } from 'react-icons/Hi'
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp } from "@pnp/sp/presets/all";
import Text from "../../../Containers/Text";
import Spinner from "../../../Containers/Spinner";




const Document = ({match}) => {
  const itemID = match.params.id
    const history = useHistory()

    const backHandler =() =>{
      history.push("/admin/report")
    }
    const homeHanler =() =>{
      history.push("/locationchampion/search/result")
    }

  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [FirstName, setFirstName] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [pickupLocation, setPickupLocation] = React.useState("");
  const [pickupPerson, setPickupPerson] = React.useState("");
  const [division, setDivision] = React.useState("");
  const [vendor, setVendor] = React.useState("");
  const [modal,setModal] = React.useState(false)
  const [collectionStatus,setCollectionStatus] = React.useState("")
  const [loading,setLoading]=React.useState(false)
  const [proxyType,setProxyType] = React.useState("")

  const [ID,setID] = React.useState("")
  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      console.log(response);
      setEmployeeEmail(response.Email);
    });
  }, []);
  

  React.useEffect(() => {
    setLoading(true)
    sp.profiles.myProperties.get().then((response) => {
      
      setEmployeeEmail(response.DisplayName);
    });
    sp.web.lists.getByTitle(`Report`).items.filter(`ID eq '${itemID}'`).get().then
            ((res) => {
              setLoading(false)
              console.log(res)
                setPhone(res[0].Phone)
                setSurname(res[0].Surname)
                setFirstName(res[0].FirstName)
                setJobTitle(res[0].JobTitle)
                setEmail(res[0].Email)
                setLocation(res[0].Location)
                setPickupLocation(res[0].PickupLocation)
                setPickupPerson(res[0].PickupPerson)
                setDivision(res[0].Division)
                setVendor(res[0].Vendor)
                setID(res[0].ID)
                setCollectionStatus(res[0].CollectionStatus)
                
            })
  }, []);
 
  
  return (
    <div className="appContainer">
      <Sidebar />
      <div className="contentsRight">
        <Header title={"Employees"} userEmail={employeeEmail} />
        <div className="spaceBetween">
        <div>
        </div>
        <Navigation report="active"/>
        </div>
        <div className={styles.header}><h3>Employee Details</h3></div>
        {loading ? <Spinner/> :<div style={{display:"flex",flexDirection:"column" ,marginBottom:"2rem"}}>
         <Text title={"Phone Number"} value={phone} size={"medium"} />
         <Text title={"Surname"} value={surname} size={"medium"} />
         <Text title={"First Name"} value={FirstName} size={"medium"} />
         <Text title={"Job Title"} value={jobTitle} size={"medium"} />
         <Text title={"Email"} value={Email} size={"medium"} />
         <Text title={"Location"} value={location} size={"medium"} />
         <Text title={"Pickup Location"} value={pickupLocation} size={"medium"} />
         <Text title={"Pickup Person"} value={pickupPerson} size={"medium"} />
         <Text title={"Division"} value={division} size={"medium"} />
         <Text title={"Vendor"} value={vendor} size={"medium"} />
         {collectionStatus === "Collected" ? <h4 style={{marginLeft:"1%",color:"rgba(0, 0, 0)",marginTop:"10px"}}> Gift Status : <span style={{backgroundColor:"green",color:"rgba(255, 255, 255, 1)",marginLeft:"15%",padding:"5px",borderRadius:"10px",fontWeight:"200"}}>{collectionStatus}</span></h4> : <Text title={"Gift Status"} value={collectionStatus} size={"medium"} /> }
        
          <div style={{width:"40%",display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:"2rem"}}> 
            <button onClick={backHandler}
            className="mtn__btn mtn__white"
            > Back</button>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Document;
