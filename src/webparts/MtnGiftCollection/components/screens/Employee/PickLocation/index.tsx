import * as React from "react";
import {
  Header,
  Input,
  Navigation,
  Search,
  Sidebar,
} from "../../../Containers";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp } from "@pnp/sp/presets/all";
import { useHistory } from "react-router-dom";
import Select from "../../../Containers/Select";
import { set } from "@microsoft/sp-lodash-subset";
import swal from "sweetalert";
import { sequencesToID } from "office-ui-fabric-react";
import Spinner from "../../../Containers/Spinner";

const Document = () => {
  const history = useHistory();
  const Email = "johndoe@yahoo.com";
  const [updateStatus, setUpdateStatus] = React.useState("");

  const locationOption = [
    { value: "location 1" },
    { value: "location 2" },
    { value: "location 2" },
  ];
  const [approvalStatus, setApprovalStatus] = React.useState("");
  const collectorOption = [{ value: "Self" }, { value: "Delegate" }];
  const [loading, setLoading] = React.useState(false);
  const [Location, setLocation] = React.useState("");
  const [Locations, setLocations] = React.useState([]);
  const [Collector, setCollector] = React.useState("");
  const [delegateFullname, setDelegateFullname] = React.useState("");
  const [delegatePhone, setDelegatePhone] = React.useState("");
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [ID, setID] = React.useState("");
  const [uniqueNumber, setUniqueNumber] = React.useState("");
  const [pickupLocation, setPickupLocation] = React.useState("");
  const editHandler = () => {
    history.push("/employee/location/edit");
  };
  const generateSerial = () => {
    var chars = "1234567890",
      serialLength = 5,
      randomSerial = "",
      i,
      randomNumber;
    for (i = 0; i < serialLength; i = i + 1) {
      randomNumber = Math.floor(Math.random() * chars.length);
      randomSerial += chars.substring(randomNumber, randomNumber + 1);
      setUniqueNumber(randomSerial);
    }
  };

  React.useEffect(() => {
    setLoading(true);
    generateSerial();
    sp.profiles.myProperties.get().then((response) => {
      setEmployeeEmail(response.UserProfileProperties[19].Value);
      const userEmail = response.UserProfileProperties[19].Value;

      sp.web.lists
        .getByTitle(`GiftBeneficiaries`)
        .items.filter(`UpdateStatus eq 'Approved' and Email eq '${userEmail}' `)
        .get()
        .then((res) => {
          if (res.length > 0) {
            setLocation(res[0].PickupLocation);
            setCollector(res[0].CollectedBy);
            setApprovalStatus(res[0].ApprovalStatus);
            setCollector(res[0].PickupPerson);
            setDelegateFullname(res[0].DelegateFullname);
            setDelegatePhone(res[0].DelegatePhone);
            setID(res[0].ID);
          } else {
            swal("Warning!", "You are not eligble for a gift!", "error");
            history.push("/");
          }
        });
      sp.web.lists
        .getByTitle(`Notification`)
        .items.get()
        .then((res) => {
          setPickupLocation(res[2].Switch);
          console.log(res);
        });
      sp.web.lists
        .getByTitle(`Location`)
        .items.get()
        .then((res) => {
          setLocations(res);
          setLoading(false);
        });
    });
  }, []);

  const updateHandler = (e) => {
    setLoading(true);
    if (Collector === "Self") {
      setDelegateFullname("");
      setDelegatePhone("");
    }
    e.preventDefault();
    sp.web.lists
      .getByTitle(`GiftBeneficiaries`)
      .items.getById(Number(ID))
      .update({
        ApprovalStatus: "Pending",
        UniqueCode: uniqueNumber,
        PickupLocation: Location,
        PickupPerson: Collector,
        DelegateFullname: delegateFullname,
        DelegatePhone: delegatePhone,
      })
      .then((res) => {
        setLoading(false);
        swal("Success", "Successfull", "success");
        sp.web.lists
          .getByTitle(`GiftBeneficiaries`)
          .items.filter(`Email eq '${Email}' `)
          .get()
          .then((res) => {
            setApprovalStatus(res[0].ApprovalStatus);
          });
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
  };
  const homeHandler = () => {
    history.push("/home");
  };

  return (
    <div className="appContainer">
      <Sidebar />

      <div className="contentsRight">
        <Header title={"Pick up location"} userEmail={employeeEmail} />
        <div className="spaceBetween">
          <div></div>
          <div>
            <button className="mtn__btn mtn__yellow" onClick={homeHandler}>
              logout
            </button>
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div
            style={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
              marginTop: "2rem",
            }}
          >
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
                onClick={editHandler}
                disabled={
                  approvalStatus === "Pending" || approvalStatus === "Declined"
                    ? false
                    : true
                }
                className="mtn__btn mtn__black"
              >
                {" "}
                Edit
              </button>
            </div>
            <p style={{ marginTop: "1rem" }}>Preffered pickup location</p>

            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <Select
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                title={Location}
                value={Location}
                options={Locations}
                filterOption="Title"
                filter={true}
                size="mtn__adult"
                readOnly={approvalStatus === null ? false : true}
              />
            </div>
            <p>Collector</p>
            <div style={{ marginTop: "1rem", marginBottom: ".5rem" }}>
              <Select
                onChange={(e) => {
                  setCollector(e.target.value);
                }}
                title={Collector}
                value={Collector}
                options={collectorOption}
                size="mtn__adult"
                readOnly={approvalStatus === null ? false : true}
              />
            </div>

            {Collector === "Delegate" ? (
              <div>
                <p
                  style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    textAlign: "center",
                    backgroundColor: "rgba(217, 217, 217, 0.42)",
                  }}
                >
                  Delegate Info
                </p>

                <div style={{ marginTop: "1rem", marginBottom: ".5rem" }}>
                  <Input
                    type={"text"}
                    onChange={(e) => {
                      setDelegateFullname(e.target.value);
                    }}
                    title={"Delegate Fullname"}
                    value={delegateFullname}
                    readOnly={approvalStatus === null ? false : true}
                    size="mtn__adult"
                  />
                </div>
                <div style={{ marginTop: "1rem", marginBottom: ".5rem" }}>
                  <Input
                    type={"tel"}
                    onChange={(e) => {
                      setDelegatePhone(e.target.value);
                    }}
                    title={"Delegate Phone number"}
                    value={delegatePhone}
                    readOnly={approvalStatus === null ? false : true}
                    size="mtn__adult"
                  />
                </div>
              </div>
            ) : null}
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
                disabled={
                  approvalStatus === "Approved" ||
                  approvalStatus === "Pending" ||
                  approvalStatus === "Declined" ||
                  pickupLocation === "Off"
                    ? true
                    : false
                }
                className="mtn__btn mtn__yellow"
                onClick={updateHandler}
              >
                {" "}
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Document;
