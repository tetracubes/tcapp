// import React, { Fragment, useState, useEffect } from "react";
// import ClientGroupService from '../../services/master/ClientGroupService';
// import Table from "../../shared/components/material-table/material-table";
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import * as utility from "../../utility/utility"
// import DialogModal from "../../shared/components/dailog/DialogModal";
// import TextComponent from "../../shared/components/form-component/text-component";
// import * as validatorField from "../../services/utl/validation/validator";
// import * as ClientGroupValidations from "./ClientGroup-validator";
// import { Paper, Box } from "@material-ui/core";


// class ClientGroup extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             pageData: [], modalState: false,
//             popUpMode: "View", popUpData: {}
//         }
//     }

//     componentDidMount() {
//         ClientGroupService.fetchAll().then((res) => {
//             if (res.data) {
//                 this.updateState("pageData",res.data)

//                 // loadGrid(res.data);
//             }

//         }).catch((err) => {
//             // alert(err);
//         })
//     }

//     // updateState = (name, value) => {

//     //     this.setState(prevState => ({
//     //         [name]: [...prevState[name], value]
//     //     }));
//     //     // return { ...item, ...Object.assign(item, payload) };
//     //     // this.setState({ name: [...this.state.name, value] })
//     // }
//     updateState = (name, value) => {

//         this.setState(prevState => ({
//             [name]: [...prevState[name], value]
//         }));
//         // return { ...item, ...Object.assign(item, payload) };
//         // this.setState({ name: [...this.state.name, value] })
//     }


//     dataStruct = {
//         fields: {
//             clientGroupId: {
//                 name: "clientGroupId",
//                 dbname: "clientGroupId",
//                 componentType: "VIEW",
//                 labelDisplayName: "Client Group Id: ",
//                 // required: true
//             },
//             clientGroupName: {
//                 name: "clientGroupName",
//                 dbname: "clientGroupName",
//                 componentType: "INPUT",
//                 labelDisplayName: "Client Group Name: ",
//                 required: true
//             },
//             inActive: {
//                 name: "inActive",
//                 dbname: "inActive",
//                 componentType: "CHECKBOX",
//                 labelDisplayName: "In Active: ",
//                 required: true
//             }
//         }
//     }

//     handleAdd = (e) => {
//         this.updateState("popUpData",{ "errors": {} })
//         this.updateState("popUpMode","Add");
//         this.updateState("popUpMode","Add");
//         setModalState(true)

//     }

//     handleEdit = (e, rowData) => {
//         setPopUpData(rowData)
//         setPopUpMode("Edit")
//         setModalState(true)
//     }

//     handleView = (e, rowData) => {
//         setPopUpData(rowData)
//         setPopUpMode("View")
//         setModalState(true)
//     }

//     validation = () => {
//         let blnError = true;
//         let obj = {};
//         Object.keys(popUpData).map((key) => {
//             let errorObj = {}
//             let rules = ClientGroupValidations.getFieldRules(key, popUpData) || {};
//             if (rules && !objectIsEmpty(rules)) {
//                 errorObj = validatorField.validatefield(key, popUpData[key], typeof popUpData[key], rules) || {};
//             }
//             obj[key] = "";
//             Object.entries(errorObj).map(([key, values]) => {
//                 obj[key] = values["message"];
//                 blnError = false;
//             });

//         })
//         setPopUpData(Object.assign(popUpData, { "errors": obj }));

//         return blnError;
//     }


//     objectIsEmpty = (obj) => {
//         if (typeof obj == "object") {
//             if (Array.isArray(obj)) {
//                 return true
//             } else {
//                 return (Object.keys(obj).length > 0 ? false : true);
//             }
//         }
//         return true
//     }

//     handleSave = () => {
//         if (validation() == false) return null;
//         if (popUpMode == "Add" || popUpMode == "Edit") {
//             let data = popUpData;
//             // data["clientGroupId"]=-1
//             if (popUpMode == "Add") delete data["clientGroupId"]
//             data["addedBy"] = props.appConfig.state.user["usercode"]
//             data["dateAdded"] = Date.now();
//             data["changedBy"] = props.appConfig.state.user["usercode"]
//             data["dateChanged"] = Date.now();
//             // data["inActive"]="N";
//             ClientGroupService.add(popUpData).then((res) => {
//                 // console.log(res);
//                 // alert(res.data);

//             })

//         }
//         setPopUpData({})
//         setPopUpMode(false)
//         setModalState(false)
//     }
//     handleClose = () => {
//         setPopUpData({})
//         setPopUpMode(false)
//         setModalState(false)
//     }

//     columnNames = [
//         { title: "Client Group ID", field: "clientGroupId" },
//         { title: "Client Group Name", field: "clientGroupName" },
//         { title: "In Active", field: "inActive" },
//         { title: "Date Added", field: "dateAdded", render: rowData => <p>{utility.formatDate(rowData.dateAdded)}</p> },
//         { title: "Added By", field: "addedBy" },
//         // { title: "Date Changed 1", field: "dateChanged"},
//         { title: "Date Changed", field: "dateChanged", render: rowData => <p>{utility.formatDate(rowData.dateChanged)}</p> },
//         { title: "Changed By", field: "changedBy" },

//     ];

//     actions = [
//         // rowData =>({icon: ()=><FontAwesomeIcon icon="edit"/>,
//         rowData => ({
//             icon: "editsharp",
//             tooltip: "Edit",
//             onClick: (event, rowData) => {
//                 handleEdit(event, rowData);
//             },
//         }),
//         rowData => ({
//             icon: "visibility",
//             tooltip: "View",
//             onClick: (event, rowData) => {
//                 handleView(event, rowData);
//             },
//             hidden: rowData.state === "DRAFT"
//         }),
//         {
//             icon: "add",
//             tooltip: "Add",
//             isFreeAction: true,
//             onClick: (event) => {
//                 handleAdd(event);
//             },
//         },
//     ];


//     getDialogDescription = () => {
//         return (<h4 style={{ "padding": "0px", "margin": "0px", "display": "inline" }}>
//             {"Client Group "}
//             <span style={{ "color": "#c89666" }}>
//                 {popUpMode.toString().toUpperCase()}
//             </span>
//         </h4>)
//     }


//     getChildrens = () => {
//         let content = [];
//         Object.entries(dataStruct["fields"]).map(([key, values]) => {
//             content.push(getComponent(values));
//         })

//         return <Paper elevation={10}><div style={{ display: "inline-block" }}>{content}</div></Paper>;
//     }




//     validate = param => {
//         let data = popUpData;
//         let obj = {}
//         obj[param.target.name] = param.target.value;

//         setPopUpData(Object.assign(data, obj))
//         alert(JSON.stringify(Object.assign(data, obj)));
//     };

//     handleChange = event => {
//         if (event) {
//             validate(event);
//         }
//     };

//     handleBlur = e => {
//         validate(e);
//     };

//     handleKeyDown = e => {
//         if (e.keyCode === 13) {
//             validate(e);
//         }
//     };

//     componentHandleProps = {
//         // handleFocus: handleFocus,
//         // handleChange: handleChange,
//         // handleKeyDown: handleKeyDown,
//         handleBlur: handleBlur
//     };

//     getComponent = (values) => {
//         const type = values.componentType;

//         const styles = {
//             minWidth: "200px",
//             padding: "4px",
//             float: "left",
//             margin: "4px",
//             // borderRadius: "5px"
//         }
//         switch (type) {
//             case "INPUT":
//                 return (<span style={styles} key={"text-" + values["dbname"]}>
//                     <TextComponent
//                         {...values}
//                         value={popUpData[values["dbname"]]}
//                         {...componentHandleProps}
//                     />
//                     {popUpData["errors"] && popUpData[values.dbname] && (
//                         <div style={{ color: "red", fontSize: "10px" }} key={"Error-" + values["dbname"]}>
//                             {popUpData["errors"][values.name]}
//                         </div>
//                     )}
//                 </span>)
//                 break;

//             default:
//                 return (
//                     <span style={styles} key={"labelView-" + values["dbname"]}>
//                         <Box component="span" display="block" style={{
//                             border: "1px rgba(0, 0, 0, 0.23) solid",
//                             "padding": "16px", "border-radius": "4px"
//                         }}>
//                             <label>{values["labelDisplayName"]}</label>
//                             {popUpData[values["dbname"]]}
//                         </Box>
//                         {popUpData["errors"] && popUpData[values.dbname] && (
//                             <div style={{ color: "red", fontSize: "10px" }} key={"Error-" + values["dbname"]}>
//                                 {popUpData["errors"][values.name]}
//                             </div>
//                         )}
//                         {/* <label {...values}>{}</label> */}
//                     </span>
//                 )
//                 break;
//         }

//     }




//     render() {
//         return (<>{<Table
//             columnNames={columnNames}
//             rowData={pageData}
//             title="Client Group"
//             actions={actions}
//             // pageSize={
//             //   allSolutions.length > 10
//             //     ? Math.floor(allSolutions.length / 2)
//             //     : allSolutions.length
//             // }
//             // pageSizeOptions={lodash.rowsPerPageOptions(allSolutions.length)}
//             paginationType={"normal"}
//         />}
//             <DialogModal
//                 description={modalState && getDialogDescription()}
//                 popUpModalState={modalState}
//                 handlePopUpSave={handleSave}
//                 handlePopUpClose={handleClose}
//                 name={"ClientGroupModal"}
//             >
//                 {modalState && getChildrens()}
//             </DialogModal>
//         </>);
//     }
// }

// export default ClientGroup;
