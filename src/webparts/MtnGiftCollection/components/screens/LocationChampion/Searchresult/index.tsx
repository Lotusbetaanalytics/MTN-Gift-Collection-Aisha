import * as React from "react";
import {
  Header,
  Input,
  Navigation,
  Search,
  Select,
  Sidebar,
} from "../../../Containers";
import styles from "./styles.module.scss";
import { useHistory } from "react-router-dom";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp } from "@pnp/sp/presets/all";
import Text from "../../../Containers/Text";
import swal from "sweetalert";
import Modal from "../../../Containers/Modal";

const Document = () => {
  const [query, setQuery] = React.useState("");
  const collectorOption = [{ value: "Self" }, { value: "Delegate" }];
  const proxyOption = [{ value: "By the Portal" }, { value: "By Email" }];
  const history = useHistory();

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
  const [delegateFullname, setDelegateFullname] = React.useState("");
  const [delegatePhone, setDelegatePhone] = React.useState("");
  const [vendor, setVendor] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [collectionStatus, setCollectionStatus] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [proxyType, setProxyType] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [ID, setID] = React.useState("");

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setEmployeeEmail(response.UserProfileProperties[19].Value);
      const userEmail = response.UserProfileProperties[19].Value;

      sp.web.lists
        .getByTitle("Admin")
        .items.filter(`Role eq 'Location Champion' and Email eq '${userEmail}'`)
        .get()
        .then((response) => {
          if (response.length === 0) {
            swal(
              "Warning!",
              "you are not authorize to use this portal",
              "error"
            );
            history.push("/");
          }
        }) 
      })
  }, []);

  React.useEffect(() => {
    let today = new Date();
    let getYear = today.getFullYear();
    let getToday = today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    setTime(time);

    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let d = new Date();
    let monthName = months[d.getMonth()]; // "July" (or current month)
    setDate(getToday + "-" + monthName + "-" + getYear);
    

      sp.web.lists
        .getByTitle(`GiftBeneficiaries`)
        .items.filter(`ApprovalStatus eq 'Approved' and Phone eq '${phone}'`)
        .get()
        .then((res) => {
          console.log(res);
          setPhone(res[0].Phone);
          setSurname(res[0].Surname);
          setFirstName(res[0].FirstName);
          setJobTitle(res[0].JobTitle);
          setEmail(res[0].Email);
          setLocation(res[0].EmployeeLocation);
          setPickupLocation(res[0].PickupLocation);
          setPickupPerson(res[0].PickupPerson);
          setDelegateFullname(res[0].DelegateFullname);
          setDelegatePhone(res[0].DelegatePhone);
          setDivision(res[0].Division);
          setVendor(res[0].Vendor);
          setID(res[0].ID);
          setCollectionStatus(res[0].CollectionStatus);
        });
    
  }, [time, phone]);

  const openUpadate = () => {
    setModal(true);
  };
  const homeHandler = () => {
    history.push("/home");
  };

  const updateHandler = () => {
    setLoading(true);
    sp.web.lists
      .getByTitle("GiftBeneficiaries")
      .items.getById(Number(ID))
      .update({
        CollectionStatus: "Collected",
        LocationChampionEmail: employeeEmail,
        CollectedBy: pickupPerson,
        ProxyType: proxyType,
      });

    sp.web.lists
      .getByTitle("Report")
      .items.add({
        Phone: phone,
        Surname: surname,
        FirstName: FirstName,
        JobTitle: jobTitle,
        Email: Email,
        Location: location,
        PickupLocation: pickupLocation,
        PickupPerson: pickupPerson,
        Division: division,
        Vendor: vendor,
        CollectionStatus: "Collected",
        Date: date,
        Time: time,
      })
      .then((res) => {
        setLoading(false);
        setModal(false);
        swal("Success", "Confirmation successfully", "success");
        sp.web.lists
          .getByTitle(`GiftBeneficiaries`)
          .items.filter(`ApprovalStatus eq 'Approved' and Phone eq '${phone}'`)
          .get()
          .then((res) => {
            setCollectionStatus(res[0].CollectionStatus);
          });
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
  };
  const handler = (e) => {
    e.preventDefault();
    setPhone(e.target.value);
  };

  const backHandler = () => {
    history.push("/locationchampion/report");
  };
 

  return (
    <div className="appContainer">
      <Sidebar />
      <div className="contentsRight">
        <Header title={"Employees"} userEmail={employeeEmail} />
        <div className="spaceBetween">
          <div>
            <Search
              value={phone}
              onchange={handler}
              type={"Tel"}
              placeholder={"Input phone number"}
            />
          </div>
          <div style={{display:"flex",flexDirection:"row"}}>
          <button className="mtn__btn mtn__yellow" onClick={homeHandler} style={{marginRight:"10px"}}>
              Logout
            </button>
            <button className="mtn__btn mtn__white" onClick={backHandler}>
              Report
            </button>
          </div>
        </div>
        <div className={styles.header}>
          <h3>Employee Details</h3>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "2rem",
          }}
        >
          <Text title={"Phone Number"} value={phone} size={"medium"} />
          <Text title={"Surname"} value={surname} size={"medium"} />
          <Text title={"First Name"} value={FirstName} size={"medium"} />
          <Text title={"Job Title"} value={jobTitle} size={"medium"} />
          <Text title={"Email"} value={Email} size={"medium"} />
          <Text title={"Location"} value={location} size={"medium"} />
          <Text
            title={"Pickup Location"}
            value={pickupLocation}
            size={"medium"}
          />
          <Text title={"Pickup Person"} value={pickupPerson} size={"medium"} />
          {pickupPerson === "Delegate" ? (
            <div>
              <Text
                title={"Delegate Fullname"}
                value={delegateFullname}
                size={"medium"}
              />
              <Text
                title={"Delegate Phone number"}
                value={delegatePhone}
                size={"medium"}
              />{" "}
            </div>
          ) : null}
          <Text title={"Division"} value={division} size={"medium"} />
          <Text title={"Vendor"} value={vendor} size={"medium"} />
          {collectionStatus === "Collected" ? (
            <h4
              style={{
                marginLeft: "1%",
                color: "rgba(0, 0, 0)",
                marginTop: "10px",
              }}
            >
              {" "}
              Gift Status :{" "}
              <span
                style={{
                  backgroundColor: "green",
                  color: "rgba(255, 255, 255, 1)",
                  marginLeft: "15%",
                  padding: "5px",
                  borderRadius: "10px",
                  fontWeight: "200",
                }}
              >
                {collectionStatus}
              </span>
            </h4>
          ) : (
            <Text
              title={"Gift Status"}
              value={collectionStatus}
              size={"medium"}
            />
          )}

          <div
            style={{
              width: "40%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "2rem",
            }}
          >
            <button
              onClick={openUpadate}
              disabled={
                collectionStatus === "Collected" || Email === " " ? true : false
              }
              className="mtn__btn mtn__yellow"
            >
              {" "}
              Confirm Collector
            </button>
          </div>
        </div>
      </div>
      <Modal
        isVisible={modal}
        title=""
        size="sm"
        content={
          <form onSubmit={updateHandler}>
            {pickupPerson === "Self" ? (
              <div>
                <Input
                  value={pickupPerson}
                  onChange={(e) => setPickupPerson(e.target.value)}
                  required={true}
                  title={"Collected by"}
                  readOnly={true}
                  size={"sm"}
                  type={"text"}
                />
                <button
                  style={{ marginTop: "1rem" }}
                  type="submit"
                  className="mtn__btn mtn__yellow"
                >
                  Submit
                </button>
              </div>
            ) : (
              <div>
                <Input
                  value={pickupPerson}
                  onChange={(e) => setPickupPerson(e.target.value)}
                  required={true}
                  title={"Collected by"}
                  readOnly={true}
                  size={"sm"}
                  type={"text"}
                />
                <div style={{ marginTop: "1rem" }}>
                  <Select
                    value={proxyType}
                    onChange={(e) => setProxyType(e.target.value)}
                    required={true}
                    title={"Proxy pickup authorization method"}
                    options={proxyOption}
                  />
                </div>

                <button
                  style={{ marginTop: "1rem" }}
                  type="submit"
                  className="mtn__btn mtn__yellow"
                >
                  Submit
                </button>
              </div>
            )}
          </form>
        }
        onClose={() => setModal(false)}
        footer=""
      />
    </div>
  );
};

export default Document;
