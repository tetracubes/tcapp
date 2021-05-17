import { Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ActivityService from '../../services/transaction/ActivityService';
import ClientService from '../../services/master/ClientService';
import UserService from "../../services/UserService";

import * as validatorField from "../../services/utl/validation/validator";
import DialogModal from "../../shared/components/dailog/DialogModal";
import Table from "../../shared/components/material-table/material-table";
import * as ComponentRender from "../../shared/functions/component-render";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as utility from "../../utility/utility";
import * as ActivityValidations from "./Activity-validator";

import * as AlertService from "../../services/alert-service"

import _ from "lodash";
import ActivityGroupService from "../../services/master/ActivityGroupService";
import ProjectControlService from "../../services/master/ProjectControlService";


const Activity = (props) => {
    const [pageData, setPageData] = useState([]);
    const [modalState, setModalState] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [popUpMode, setPopUpMode] = useState("");
    const [popUpData, setPopUpData] = useState({});
    const [content, setContent] = useState([]);

    const [clientList, setClientList] = useState([]);
    const [activityGroup, setActivityGroup] = useState([]);

    const [projectControl, setProjectControl] = useState([]);

    const [errorFound, setErrorFound] = useState(false);
    const [headerData, setHeaderData] = useState({"finYear":utility.getCurrentFinYear()});
    const [headerUpdated, setHeaderUpdated] = useState(false);

    // const [popUpData, setPopUpData] = useState({});

    useEffect(() => {
        async function fetchData() {
            // You can await here
            props.appConfig.SetAppConfig("ready", false);
            const response = await getallGroupsdata();
            loadData(utility.getCurrentFinYear());
            setDataLoaded(true);
            
            setHeaderUpdated(true);
            props.appConfig.SetAppConfig("ready", true);
        }
        fetchData();

    }, [])


    const loadData = async (finyear) => {
        var t0 = performance.now();
        await ActivityService.fetchAllByFinYear(finyear,null,null).then((res) => {
            if (res.data) {
                setPageData(res.data);
                let msg = "Activity Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                props.appConfig.openSnackbar(msg);
                AlertService.Success(msg);
                return res.data;
            }

        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            setErrorFound(true);
            // alert(err);
        })
    }
    const getallGroupsdata = async () => {
        await getClientList();
        await getActivityGroupList();
        // await getUserList();
        await getProjectControl();
    }

    const getProjectControl = async () => {
        var t0 = performance.now();
        await ProjectControlService.fetchAll().then((res) => {
            if (res.data) {
                setProjectControl(res.data);
                let msg = "Project Controll Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                props.appConfig.openSnackbar(msg);
                AlertService.Success(msg);
                return res.data;
            }
        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            setErrorFound(true);
            return [];
        })
    }

    const getClientList = async () => {
        var t0 = performance.now();
        await ClientService.fetchAll().then((res) => {
            if (res.data) {
                setClientList(res.data);
                let msg = "Client Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                props.appConfig.openSnackbar(msg);
                AlertService.Success(msg);
                return res.data;
            }
        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            setErrorFound(true);
            return [];
        })
    }

    const getActivityGroupList = async () => {
        var t0 = performance.now();
        await ActivityGroupService.fetchAll().then((res) => {
            if (res.data) {
                setActivityGroup(res.data);
                let msg = "Activity Group Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                props.appConfig.openSnackbar(msg);
                AlertService.Success(msg);
                return res.data;
            }
        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            setErrorFound(true);
            return [];
        })
    }



    useEffect(() => {
        // alert(1);
        if (popUpMode) {
            reloadData();
        }
    }, [popUpMode]);



    const getOptions = (name = "", obj) => {
        switch (name.toLowerCase()) {
            case "activitygroupid":
                return (activityGroup)
                break;
            case "clientid":
                return (clientList)
                break;
            case "projectcontrolid":
                return (projectControl)
                break;
            case "activitystatus":
                return utility.getYesNoOptions()
            case "finyear":
                return utility.getFinYear();
            default:
                break;
        }
    }

    const dataStruct = {
        fields: {
            docNo: { name: "docNo", dbname: "docNo", componentType: "VIEW", labelDisplayName: "Doc No", defvalue: "" },
            docDate: { name: "docDate", dbname: "docDate", componentType: "INPUT", type: "date", labelDisplayName: "Doc Date", defvalue: utility.todayDate() },
            // compId: { name: "compId", dbname: "compId", componentType: "INPUT", labelDisplayName: "Company", defvalue: "" },
            clientId: {
                name: "clientId", dbname: "clientId", componentType: "SELECT", labelDisplayName: "Client Code",
                getOptions: getOptions, defvalue: "", optionName: "clientCode", optionGroupName: "clientName"
            },
            activityGroupId: {
                name: "activityGroupId", dbname: "activityGroupId", componentType: "SELECT",
                getOptions: getOptions, labelDisplayName: "Activity", defvalue: "", optionName: "activityGroupName"
            },
            projectControlId: {
                name: "projectControlId", dbname: "projectControlId", componentType: "SELECT",
                getOptions: getOptions, labelDisplayName: "Project Controller", defvalue: "ADMIN", optionName: "projectControlName"
            },
            product: { name: "product", dbname: "product", componentType: "INPUT", labelDisplayName: "Activity Name", defvalue: "", style: { "width": "300px" } },
            venue: { name: "venue", dbname: "venue", componentType: "INPUT", labelDisplayName: "Venue", defvalue: "" },
            fromDate: { name: "fromDate", dbname: "fromDate", componentType: "INPUT", type: "date", labelDisplayName: "formDate", defvalue: utility.todayDate() },
            toDate: { name: "toDate", dbname: "toDate", componentType: "INPUT", type: "date", labelDisplayName: "toDate", defvalue: utility.todayDate() },
            activityStatus: { name: "activityStatus", dbname: "activityStatus", componentType: "VIEW", labelDisplayName: "Activity Status", defvalue: "N" },
            remarks: { name: "remarks", dbname: "remarks", componentType: "INPUT", labelDisplayName: "Remarks", defvalue: "" },
            //  lOGID:{name:"lOGID",dbname:"lOGID",componentType:"INPUT",labelDisplayName:"Log Id",defvalue:""},
            //  cancelled:{name:"cancelled",dbname:"cancelled",componentType:"INPUT",labelDisplayName:"Cancelled",defvalue:"N"},
            //  cancelledBy:{name:"cancelledBy",dbname:"cancelledBy",componentType:"INPUT",labelDisplayName:"Cancelled By",defvalue:""},
            //  cancelledDate:{name:"cancelledDate",dbname:"cancelledDate",componentType:"INPUT",labelDisplayName:"Cancelled Date",defvalue:""},

        }
    }

    const getDefaults = () => {
        let obj = {}
        Object.entries(dataStruct.fields).map(([key, values]) => {
            if (values["defvalue"] !== undefined) {
                obj[key] = values["defvalue"];
            } else {
                obj[key] = ""
            }
        })
        obj["errors"] = {}
        return obj;
    }

    const handleAdd = (e) => {

        updateData(getDefaults(), false, false);
        // popUpData["errors"]
        setPopUpMode("Add")
        setModalState(true)

    }

    const handleEdit = (e, rowData) => {

        let data = { ...rowData };
        if (typeof data["clientId"] == "number") {
            let ldata = { ...clientList };
            let fdata = _.filter(ldata, { "clientId": data["clientId"] });
            if (fdata) data["clientId"] = fdata[0]["clientName"]
        }
        if (typeof data["activityGroupId"] == "number") {
            let ldata = { ...activityGroup };
            let fdata = _.filter(ldata, { "activityGroupId": data["activityGroupId"] });
            if (fdata) data["activityGroupId"] = fdata[0]["activityGroupName"]
        }
        if (typeof data["projectControlId"] == "number") {
            let ldata = { ...projectControl };
            let fdata = _.filter(ldata, { "projectControlId": data["projectControlId"] });
            if (fdata) data["projectControlId"] = fdata[0]["projectControlName"]
        }

        data["docDate"] = utility.todayDate(data["docDate"]);
        data["fromDate"] = utility.todayDate(data["fromDate"]);
        data["toDate"] = utility.todayDate(data["toDate"]);

        updateData(data, false, false)
        setModalState(true)
        setPopUpMode("Edit")

    }

    const handleDataView = (e, rowData) => {

        let data = { ...rowData };
        data = Object.assign(getDefaults(), data);
        if (typeof data["clientId"] == "number") {
            let ldata = { ...clientList };
            let fdata = _.filter(ldata, { "clientId": data["clientId"] });
            if (fdata) data["clientId"] = fdata[0]["clientName"]
        }
        if (typeof data["activityGroupId"] == "number") {
            let ldata = { ...activityGroup };
            let fdata = _.filter(ldata, { "activityGroupId": data["activityGroupId"] });
            if (fdata) data["activityGroupId"] = fdata[0]["activityGroupName"]
        }

        if (typeof data["projectControlId"] == "number") {
            let ldata = { ...projectControl };
            let fdata = _.filter(ldata, { "projectControlId": data["projectControlId"] });
            if (fdata) data["projectControlId"] = fdata[0]["projectControlName"]
        }

        updateData(data, false, false)
        setModalState(true)
        setPopUpMode("View")

    }

    const validation = () => {
        let blnError = true;
        let obj = {};
        Object.keys(popUpData).map((key) => {
            if (key !== "errors") {
                obj = Object.assign(obj, getFiledValidated(key, popUpData[key]))
            }

        })
        Object.entries(obj).map(([key, values]) => {
            // obj[key] = values["message"];
            if (values) blnError = false;
        });

        updateData(Object.assign(popUpData, { "errors": obj }));

        return blnError;
    }

    const getFiledValidated = (key, value) => {
        let errorObj = {};
        let obj = {};
        // let currentData={};
        // currentData[key]=value;
        // let tempdata=Object.assign(popUpData,currentData)
        let rules = ActivityValidations.getFieldRules(key, popUpData) || {};
        if (rules && !objectIsEmpty(rules)) {
            errorObj = validatorField.validatefield(key, value, typeof value, rules) || {};
        }
        obj[key] = "";
        Object.entries(errorObj).map(([key, values]) => {
            obj[key] = values["message"];
            // blnError = false;
        });

        return obj;
    }

    const objectIsEmpty = (obj) => {
        if (typeof obj == "object") {
            if (Array.isArray(obj)) {
                return true
            } else {
                return (Object.keys(obj).length > 0 ? false : true);
            }
        }
        return true
    }

    const handleSave = () => {
        if (validation()) {
            if (popUpMode == "Add" || popUpMode == "Edit") {
                console.log(popUpData);
                let data = popUpData;
                delete data["tableData"];
                if (popUpMode == "Add") delete data["docNo"]
                if (typeof data["clientId"] == "string") {
                    let ldata = { ...clientList };
                    let fdata = _.filter(ldata, { "clientCode": data["clientId"] });
                    if (fdata) data["clientId"] = fdata[0]["clientId"]
                }
                if (typeof data["activityGroupId"] == "string") {
                    let ldata = { ...activityGroup };
                    let fdata = _.filter(ldata, { "activityGroupName": data["activityGroupId"] });
                    if (fdata) data["activityGroupId"] = fdata[0]["activityGroupId"]
                }

                if (typeof data["projectControlId"] == "string") {
                    let ldata = { ...projectControl };
                    let fdata = _.filter(ldata, { "projectControlName": data["projectControlId"] });
                    if (fdata) data["projectControlId"] = fdata[0]["projectControlId"]
                }

                if (popUpMode == "Add") data["addedBy"] = props.appConfig.state.user["usercode"]
                if (popUpMode == "Add") data["dateAdded"] = Date.now();
                if (popUpMode == "Add") data["logid"] = 9999;

                data["changedBy"] = props.appConfig.state.user["usercode"]
                data["dateChanged"] = Date.now();
                data["cancelledBy"] = ""
                data["cancelled"] = "N"
                data["cancelledDate"] = Date.now();
                data["dateChanged"] = Date.now();
                data["inActive"] = "N";
                data["compId"] = 1;


                props.appConfig.SetAppConfig("ready", false);
                ActivityService.add(data).then((res) => {
                    // console.log(res);
                    props.appConfig.openSnackbar("Data saved Successfully!!! (" + res.data + ")", "success");
                    AlertService.Success("Data saved Successfully!!! (" + res.data + ")");

                    updateData({}, true, false)
                    setPopUpMode("")
                    setContent([])
                    setModalState(false)

                    handleRefresh();
                    props.appConfig.SetAppConfig("ready", true);
                }).catch((err) => {
                    props.appConfig.openSnackbar(err.response.data.message, "error");
                    AlertService.Error(err.response.data.message);
                    props.appConfig.SetAppConfig("ready", true);
                })

            }

        } else {
            props.appConfig.openSnackbar("Errors Found!!!");
        }
    }

    const updateData = (data = {}, empty = false, reload = true) => {
        let obj = Object.assign(popUpData, data)
        setPopUpData((empty ? {} : obj))
        if (reload) reloadData();
    }

    const handleClose = () => {
        setPopUpData({})
        setContent([])
        setPopUpMode("")
        setModalState(false)
    }

    const columnNames = [

        { title: "Doc No", field: "docNo" },
        { title: "Doc Date", field: "docDate", render: rowData => <p>{utility.formatDate(rowData.docDate)}</p> },
        // { title: "Company", field: "compId" },
        {
            title: "Client Code", field: "clientId", render: rowData => {
                if (typeof rowData["clientId"] == "number") {
                    let data = { ...clientList };
                    let fdata = _.filter(data, { "clientId": rowData["clientId"] });
                    if (fdata.length == 0) {
                        return rowData["clientId"];
                    }
                    return ((fdata[0]["clientCode"] + "," + fdata[0]["clientName"]) || "");
                }
            }
        },
        {
            title: "Activity", field: "activityGroupId", render: rowData => {
                if (typeof rowData["activityGroupId"] == "number") {
                    let data = { ...activityGroup };
                    let fdata = _.filter(data, { "activityGroupId": rowData["activityGroupId"] });
                    if (fdata.length == 0) {
                        return rowData["activityGroupId"];
                    }
                    return (fdata[0]["activityGroupName"] || "");
                }
            }
        },
        {
            title: "Project Controller", field: "projectControlId", render: rowData => {
                if (typeof rowData["projectControlId"] == "number") {
                    let data = { ...projectControl };
                    let fdata = _.filter(data, { "projectControlId": rowData["projectControlId"] });
                    if (fdata.length == 0) {
                        return rowData["projectControlId"];
                    }
                    return (fdata[0]["projectControlName"] || "");
                }
            }
        },
        { title: "Activity Name", field: "product" },
        { title: "Venue", field: "venue" },
        { title: "formDate", field: "fromDate", render: rowData => <p>{utility.formatDate(rowData.fromDate)}</p> },
        { title: "toDate", field: "toDate", render: rowData => <p>{utility.formatDate(rowData.toDate)}</p> },
        { title: "Activity Status", field: "activityStatus" },
        { title: "Remarks", field: "remarks" },
        // {title:"Log Id",field:"lOGID"},
        { title: "Cancelled", field: "cancelled" },
        { title: "Cancelled By", field: "cancelledBy" },
        { title: "Cancelled Date", field: "cancelledDate", render: rowData => <p>{utility.formatDate(rowData.cancelledDate)}</p> },
        { title: "Date Added", field: "dateAdded", render: rowData => <p>{utility.formatDate(rowData.dateAdded)}</p> },
        { title: "Added By", field: "addedBy" },
        // { title: "Date Changed 1", field: "dateChanged"},
        { title: "Date Changed", field: "dateChanged", render: rowData => <p>{utility.formatDate(rowData.dateChanged)}</p> },
        { title: "Changed By", field: "changedBy" }
    ];

    const actions = [
        // rowData =>({icon: ()=><FontAwesomeIcon icon="edit"/>,
        rowData => ({
            icon: "visibility",
            iconProps: { fontSize: "small" },
            tooltip: "View",
            onClick: (event, rowData) => {
                handleDataView(event, rowData);
            },
            hidden: utility.checkUserRights("View", props.authList)
        }),
        rowData => ({
            icon: "editsharp",
            iconProps: { fontSize: "small" },
            tooltip: "Edit",
            onClick: (event, rowData) => {
                handleEdit(event, rowData);
            },
            disabled:(rowData["cancelled"]=="Y" ),
            hidden: utility.checkUserRights("Edit", props.authList)
        }),
        rowData => ({
            icon: "cancelsharp",
            iconProps: { fontSize: "small" },
            tooltip: "cancel",
            onClick: (event, rowData) => {
                let data={...rowData}
                // data["changedBy"] = props.appConfig.state.user["usercode"]
                // data["dateChanged"] = Date.now();
                data["cancelledBy"] = props.appConfig.state.user["usercode"]
                data["cancelled"] = "Y"
                data["cancelledDate"] = Date.now();
                props.appConfig.SetAppConfig("ready", false);
                ActivityService.add(data).then((res) => {
                    // console.log(res);
                    props.appConfig.openSnackbar("Data Cancelled Successfully!!! (" + res.data + ")", "success");
                    AlertService.Success("Data Cancelled Successfully!!! (" + res.data + ")");
                    handleRefresh(event);
                    props.appConfig.SetAppConfig("ready", true);
                }).catch((err) => {
                    props.appConfig.openSnackbar(err.response.data.message, "error");
                    AlertService.Error(err.response.data.message);
                    props.appConfig.SetAppConfig("ready", true);
                })
            },
            disabled:(rowData["cancelled"]=="Y" ),
            hidden: utility.checkUserRights("Cancel", props.authList)
        }),
        {
            icon: "refresh",
            iconProps: { style: { Color: "green" } },
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: (event) => {
                handleRefresh(event);
            }
        },
        {
            icon: "add_circle",
            iconProps: { color: "primary", fontSize: "large" },
            isFreeAction: true,
            onClick: (event) => {
                handleAdd(event);
            },
            hidden: utility.checkUserRights("Add", props.authList)
        }
    ];


    const getDialogDescription = () => {
        return (<h4 style={{ "padding": "0px", "margin": "0px", "display": "inline" }}>
            {"Activity "}
            <span style={{ "color": "#c89666" }}>
                {popUpMode.toString().toUpperCase()}
            </span>
        </h4>)
    }






    const validate = param => {
        // let data = popUpData;
        let type = param.target.type
        let obj = {}
        let value = (type == "checkbox" ? param.target.checked : param.target.value);
        if (param.target.name == "inActive") value = (value ? "Y" : "N");
        obj[param.target.name] = value
        let error = getFiledValidated(param.target.name, value)
        error = Object.assign(popUpData["errors"] || {}, error);
        obj["errors"] = error;
        updateData(obj)

        // reloadData();
        // alert(JSON.stringify(Object.assign(data, obj)));
    };

    const handleChange = event => {
        if (event) {
            validate(event);
        }
    };


    const handleChangeHeader = async event => {
        if (event) {

            let hdata = { ...headerData };
            let obj = {}
            obj[event.target.name] = event.target.value;
            if (obj[event.target.name] == hdata[event.target.name]) {
                // dataUpdated(false);
                setHeaderUpdated(true);
                return null;
            }

            hdata = Object.assign(hdata, obj);

            setHeaderData(hdata);

            if (event.target.name == "finYear") {
                await loadData(event.target.value);

            }

            setHeaderUpdated(true);
        }
    }


    const handleBlur = e => {
        validate(e);
    };

    const handleKeyDown = e => {
        if (e.keyCode === 13) {
            validate(e);
        }
    };

    const handleRefresh = e => {

        loadData(headerData["finYear"]);
    }

    const componentHandleProps = {
        // handleFocus: handleFocus,
        handleChange: handleChange,
        handleKeyDown: handleKeyDown,
        // handleBlur: handleBlur
    };




    const getChildrens = (obj) => {
        let content = [];
        if (popUpMode.toString().toLowerCase() == "View".toLowerCase()) {
            Object.keys(obj).map((key) => {
                if (key.toLowerCase() !== "tabledata") {
                    let values = {}
                    if (dataStruct["fields"][key]) {
                        values = dataStruct["fields"][key]
                    } else {
                        values["dbname"] = key
                        values["name"] = key
                        values["labelDisplayName"] = key
                    }

                    content.push(ComponentRender.getComponent(values, obj, true));
                }
            })
        } else {
            Object.entries(dataStruct["fields"]).map(([key, values]) => {
                if (values["componentType"] == "SELECT" && values["getOptions"] == undefined) {
                    values["options"] = getOptions(values["dbname"], obj);
                }
                content.push(ComponentRender.getComponent(values, obj, false, componentHandleProps));
            })
        }


        return <Paper elevation={10}><div style={{ display: "inline-block" }}>{content}</div></Paper>;
    }


    const reloadData = () => {
        let content = getChildrens(popUpData);
        setContent(content);
    };


    const loadFinComponent = () => {
        let dataStruct = {
            finYear: { name: "finYear", dbname: "finYear", componentType: "SELECT", labelDisplayName: "Fin Year", defvalue: "", getOptions: getOptions },
        }
        // headerData
        let content = []
        Object.entries(dataStruct).map(([key, values]) => {
            if (values["componentType"] == "SELECT" && values["getOptions"] == undefined) {
                values["options"] = getOptions(values["dbname"], headerData);
            }
            content.push(ComponentRender.getComponent(values, headerData, false, { "handleChange": handleChangeHeader }));
        })

        return content;
    }

    if (!dataLoaded) {
        return (<></>)
    } else {
        return (<>
            <Paper elevation={10} style={{ "marginBottom": "10px", "height": "70px" }}>
                {headerUpdated && popUpMode == "" && loadFinComponent()}
            </Paper>

            {< Table
                columnNames={columnNames}
                rowData={pageData}
                title="Activity"
                actions={actions}
                // pageSize={
                //   allSolutions.length > 10
                //     ? Math.floor(allSolutions.length / 2)
                //     : allSolutions.length
                // }
                // pageSizeOptions={lodash.rowsPerPageOptions(allSolutions.length)}
                paginationType={"normal"}
            />}
            <DialogModal
                description={modalState && getDialogDescription()}
                popUpModalState={modalState}
                handlePopUpSave={handleSave}
                handlePopUpClose={handleClose}
                name={"ActivityModal"}
            >
                {/* {modalState && getChildrens()}
             */}

                {content}
            </DialogModal>


        </>);
    }
}

export default Activity;