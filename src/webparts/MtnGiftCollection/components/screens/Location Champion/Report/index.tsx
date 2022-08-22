import * as React from "react";
import {  Header, Navigation, Search, Sidebar } from "../../../Containers";
import { useHistory } from "react-router-dom";
import { sp } from "@pnp/sp";
import MaterialTable from "material-table";
import swal from "sweetalert";
import Select from "../../../Containers/Select";
// import Spinner from "../../../../Containers/Spinner";


const Pickup = () => {
   
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
    { title: "Department", field: "Department", type: "string" as const },
    { title: "Location", field: "Location", type: "string" as const },
   
    
   
  ]);


  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [uploadFile,setUploadedFile] = React.useState("")
  const [data, setData] = React.useState([]);
  const [name, setName] = React.useState("");
  const [query,setQuery] = React.useState("")
  const [role, setRole] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [id, setID] = React.useState(null);

  const selectOption = [
    {value:"pending"},
    {value:"approved"},
    {value:"declined"}
  ]

  React.useEffect(() => {
    setLoading(true);
    sp.web.lists
      .getByTitle(`Confirmation`)
      .items.filter(`ConfirmationStatus eq 'Pending'`)
      .get()
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      console.log(response);
      setEmployeeEmail(response.Email);
    });
  }, []);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      sp.web.lists
        .getByTitle("Confirmation")
        .items.getById(id)
        .delete()
        .then((res) => {
          swal("Success", "Confirmation has been deleted", "success");
          sp.web.lists
            .getByTitle(`Confirmation`)
            .items.get()
            .then((res) => {
              setData(res);
            });
        });
    }
  };
  return (
    <div className="appContainer">
      <Sidebar />
      <div className="contentsRight">
        <Header title={"Reports"} userEmail={employeeEmail} />
        <div className="spaceBetween">
          <div><Select onChange={(e)=>{setQuery(e.target.value)}} title={query} value={query} options={selectOption} size="mtn__adult"/></div>
          <div> <button className="mtn__btn mtn__yellow">Report</button></div>
        </div>
        <div className="center" style={{marginTop:"50px"}}>
        {/* {loading ? (
          <Spinner />
        ) : ( */}
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
              actionsColumnIndex: -1,

              headerStyle: {
                backgroundColor: "black",
                color: "white",
                paddingLeft: "10px"
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
                  history.push(`/admin/pending/${rowData.ID}`);
                },
              },
              {
                icon: "visibility",
                iconProps: { style: { fontSize: "11px", color: "gold" } },
                tooltip: "Delete",

                onClick: (event, rowData) => {
                  deleteHandler(rowData.ID);
                },
              },
              
              
            ]}
            components={{
              Action: (props) => (
                <button
                  onClick={(event) => props.action.onClick(event, props.data)}
                  className="mtn__btn_table mtn__black"
                >
                  {props.action.tooltip}
                </button>
              ),
            }}
          />
        {/* )} */}
          
        </div>
      </div>
    </div>
  );
};

export default Pickup;
