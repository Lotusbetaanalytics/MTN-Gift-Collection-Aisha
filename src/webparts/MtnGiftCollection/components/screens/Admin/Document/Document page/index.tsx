import * as React from "react";
import { Header, Navigation, Search, Sidebar } from "../../../../Containers";
import { useHistory } from "react-router-dom";
import { sp } from "@pnp/sp";
import MaterialTable from "material-table";
import Spinner from "../../../../Containers/Spinner";


const Document = () => {
  const history = useHistory();

  type IType =
    | "string"
    | "boolean"
    | "numeric"
    | "date"
    | "datetime"
    | "time"
    | "currency";
  const string: IType = "string";

  const [columns, setColumns] = React.useState([
    { title: "Phone Number", field: "Phone", type: "string" as const },
    {
      title: "Surname",
      field: "Surname",
      type: "string" as const,
    },
    {
      title: "First Name",
      field: "FirstName",
      type: "string" as const,
    },
    {
      title: "Job Title",
      field: "JobTitle",
      type: "string" as const,
    },
    { title: "Email", field: "Email", type: "string" as const },
    { title: "Location", field: "EmployeeLocation", type: "string" as const },
    {
      title: "Pickup Location",
      field: "PickupLocation",
      type: "string" as const,
    },
    { title: "Pickup Person", field: "PickupPerson", type: "string" as const },
    { title: "Division", field: "Division", type: "string" as const },
    { title: "Vendor", field: "Vendor", type: "string" as const },
  ]);

  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [uploadFile, setUploadedFile] = React.useState("");
  const [data, setData] = React.useState([]);
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [id, setID] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    sp.web.lists
      .getByTitle(`GiftBeneficiaries`)
      .items.get()
      .then((res) => {
        console.log(res);
        setData(res);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setEmployeeEmail(response.UserProfileProperties[19].Value);
    });
  }, []);

  return (
    <div className="appContainer">
      <Sidebar />
      <div className="contentsRight">
        <Header title={"Document"} userEmail={employeeEmail} />
        <div className="spaceBetween">
          <div></div>
          <Navigation document="active" />
        </div>
        <div className="center" style={{ marginTop: "50px" }}>
          {loading ? (
            <Spinner />
          ) : (
            <MaterialTable
              title=""
              columns={columns}
              data={data}
              options={{
                exportButton: true,
                actionsCellStyle: {
                  backgroundColor: "none",
                  color: "#FF00dd",
                },

                headerStyle: {
                  backgroundColor: "black",
                  color: "white",
                  paddingLeft: "10px",
                },
                rowStyle: {
                  fontSize: 13,
                },
              }}
              style={{
                boxShadow: "none",
                width: "100%",
                background: "none",
                fontSize: "13px",
              }}
              // icons={{Add: () => 'Add Row'}}
              actions={[
                {
                  icon: "visibility",
                  iconProps: { style: { fontSize: "11px", color: "gold" } },
                  tooltip: "View",

                  onClick: (event, rowData) => {
                    history.push(`/admin/document/${rowData.ID}`);
                  },
                },
              ]}
              components={{
                Action: (props) => (
                  <button
                    onClick={(event) => props.action.onClick(event, props.data)}
                    className="mtn__btn_table mtn__yellow"
                  >
                    {props.action.tooltip}
                  </button>
                ),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Document;
