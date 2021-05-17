import { Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import EstimateService from '../../services/transaction/EstimateService';
import ClientService from '../../services/master/ClientService';
import UserService from "../../services/UserService";

import * as validatorField from "../../services/utl/validation/validator";
import DialogModal from "../../shared/components/dailog/DialogModal";
import Table from "../../shared/components/material-table/material-table";
import * as ComponentRender from "../../shared/functions/component-render";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as utility from "../../utility/utility";
import * as EstimateValidations from "./Estimate-validator";

import * as AlertService from "../../services/alert-service"

import _ from "lodash";
import ActivityGroupService from "../../services/master/ActivityGroupService";
import ProjectControlService from "../../services/master/ProjectControlService";
import * as TransListService from "../../services/utl/SelectListTransactionServices";


const Estimate = (props) => {
    const [pageData, setPageData] = useState([]);
    const [modalState, setModalState] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [popUpMode, setPopUpMode] = useState("");
    const [popUpData, setPopUpData] = useState({});
    const [content, setContent] = useState([]);

    const [clientList, setClientList] = useState([]);
    const [activityGroup, setActivityGroup] = useState([]);
    const [activityList, setActivityList] = useState([]);

    const [projectControl, setProjectControl] = useState([]);

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
        await EstimateService.fetchAllByFinYear(finyear).then((res) => {
            if (res.data) {
                setPageData(res.data);
                let msg = "Estimate Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                props.appConfig.openSnackbar(msg);
                AlertService.Success(msg);
                return res.data;
            }

        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            
            // alert(err);
        })
    }
    const getallGroupsdata = async () => {
        await getClientList();
        await getActivityGroupList();
        let AData=await TransListService.getActivityList(utility.getCurrentFinYear());
        setActivityList(AData);
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
            
            return [];
        })
    }

    const getActivityGroupList = async () => {
        var t0 = performance.now();
        await ActivityGroupService.fetchAll().then((res) => {
            if (res.data) {
                setActivityGroup(res.data);
                let msg = "Estimate Group Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                props.appConfig.openSnackbar(msg);
                AlertService.Success(msg);
                return res.data;
            }
        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            
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
            case "actcode":
                return (activityList)
                break;
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
            actCode: { name: "actCode", dbname: "actCode", componentType: "SELECT", labelDisplayName: "Activity Code",
             getOptions: getOptions, defvalue: "", optionName: "docNo", optionGroupName: "product",additionalnames:["product","venue"] },
            estAmt: { name: "estAmt", dbname: "estAmt", componentType: "INPUT", type: "number", labelDisplayName: "Estimate Amount", defvalue: 0, pattern: "^[0-9]+(.[0-9]{1,5})?$", },
            taxAmt: { name: "taxAmt", dbname: "taxAmt", componentType: "INPUT", type: "number", labelDisplayName: "Tax Amount", defvalue: 0, pattern: "^[0-9]+(.[0-9]{1,5})?$", },
            otherAmt: { name: "otherAmt", dbname: "otherAmt", componentType: "INPUT", type: "number", labelDisplayName: "Other Amount", defvalue: 0, pattern: "^[0-9]+(.[0-9]{1,5})?$", },
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
        data["docDate"] = utility.todayDate(data["docDate"]);
        updateData(data, false, false)
        setModalState(true)
        setPopUpMode("Edit")

    }

    const handleDataView = (e, rowData) => {

        let data = { ...rowData };
        data = Object.assign(getDefaults(), data);
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
        let rules = EstimateValidations.getFieldRules(key, popUpData) || {};
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
                
                if (popUpMode == "Add") data["addedBy"] = props.appConfig.state.user["usercode"]
                if (popUpMode == "Add") data["dateAdded"] = Date.now();
                
                data["changedBy"] = props.appConfig.state.user["usercode"]
                data["dateChanged"] = Date.now();
                data["cancelledBy"] = ""
                data["cancelled"] = "N"
                data["cancelledDate"] = Date.now();
                data["dateChanged"] = Date.now();
                data["inActive"] = "N";
                
                props.appConfig.SetAppConfig("ready", false);
                EstimateService.add(data).then((res) => {
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
        { title: "Activity Code", field: "actCode" },
        { title: "Estimate Amount", field: "estAmt" },
        { title: "Tax Amount", field: "taxAmt" },
        { title: "Other Amount", field: "otherAmt" },
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
                EstimateService.add(data).then((res) => {
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
            {"Estimate "}
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
                let AData=await TransListService.getActivityList(utility.getCurrentFinYear());
                setActivityList(AData);

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
                title="Estimate"
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
                name={"EstimateModal"}
            >
                {/* {modalState && getChildrens()}
             */}

                {content}
            </DialogModal>


        </>);
    }
}

export default Estimate;