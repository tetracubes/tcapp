import { Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CityService from "../../services/master/CityService";
import ClientGroupService from "../../services/master/ClientGroupService";
import ClientService from '../../services/master/ClientService';
import StateService from "../../services/master/StateService";
import UserService from "../../services/UserService";

import * as validatorField from "../../services/utl/validation/validator";
import DialogModal from "../../shared/components/dailog/DialogModal";
import Table from "../../shared/components/material-table/material-table";
import * as ComponentRender from "../../shared/functions/component-render";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as utility from "../../utility/utility";
import * as ClientValidations from "./Client-validator";

import * as AlertService from "../../services/alert-service"

import _ from "lodash";



const Client = (props) => {
    const [pageData, setPageData] = useState([]);
    const [modalState, setModalState] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    const [popUpMode, setPopUpMode] = useState("");
    const [popUpData, setPopUpData] = useState({});
    const [content, setContent] = useState([]);

    const [clientGroup, setClientGroup] = useState([]);
    const [city, setCity] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [userList, setUserList] = useState([]);

    const [errorFound, setErrorFound] = useState(false);

    // const [popUpData, setPopUpData] = useState({});

    useEffect(() => {
        async function fetchData() {
            // You can await here
            props.appConfig.SetAppConfig("ready", false);
            await getallGroupsdata();
            await loadData();
            setDataLoaded(true);
            props.appConfig.SetAppConfig("ready", true);
        }
        fetchData();

    }, [])

    const loadData = async () => {
        var t0 = performance.now();
        await ClientService.fetchAll().then((res) => {
            if (res.data) {
                setPageData(res.data);
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
            // alert(err);
        })
    }
    const getallGroupsdata = async () => {
        await getClientGroupList();
        await getCityList();
        await getStateList();
        await getUserList();
    }

    const getUserList = async () => {
        var t0 = performance.now();
        await UserService.fetchAll().then((res) => {
            if (res.data) {
                setUserList(res.data);
                let msg = "User Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
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

    const getClientGroupList = async () => {
        var t0 = performance.now();
        await ClientGroupService.fetchAll().then((res) => {
            if (res.data) {
                setClientGroup(res.data);
                let msg = "Client Group Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
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

    const getCityList = async () => {
        var t0 = performance.now();
        await CityService.fetchAll().then((res) => {
            if (res.data) {
                setCity(res.data);
                let msg = "City Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
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

    const getStateList = async () => {
        var t0 = performance.now();
        await StateService.fetchAll().then((res) => {
            if (res.data) {
                setStateList(res.data);
                let msg = "State Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
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
            case "clientgroup":
                return (clientGroup)
                break;
            case "stateid":
                return (stateList)
                break;
            case "cityid":
                return (city)
                break;
            default:
                break;
        }
    }


    const dataStruct = {
        fields: {
            clientId: { name: "clientId", dbname: "clientId", componentType: "VIEW", labelDisplayName: "Client ID", defvalue: "" },
            clientCode: { name: "clientCode", dbname: "clientCode", componentType: "VIEW", labelDisplayName: "Client Code", defvalue: "" },
            clientName: { name: "clientName", dbname: "clientName", componentType: "INPUT", labelDisplayName: "Client Name", defvalue: "", autoFocus: true },
            clientgroup: {
                name: "clientgroup",
                dbname: "clientgroup",
                componentType: "SELECT",
                labelDisplayName: "Client Group",
                optionName: "clientGroupName",
                getOptions: getOptions,
                defvalue: [],
                required: true,
                multiple: true
            },
            add1: { name: "add1", dbname: "add1", componentType: "INPUT", labelDisplayName: "Add 1", required: true, defvalue: "" },
            add2: { name: "add2", dbname: "add2", componentType: "INPUT", labelDisplayName: "Add 2", defvalue: "" },
            add3: { name: "add3", dbname: "add3", componentType: "INPUT", labelDisplayName: "Add 3", defvalue: "" },
            add4: { name: "add4", dbname: "add4", componentType: "INPUT", labelDisplayName: "Add 4", defvalue: "" },
            cityId: {
                name: "cityId",
                dbname: "cityId",
                componentType: "SELECT",
                labelDisplayName: "City Name",
                getOptions: getOptions,
                required: true,
                optionName: "cityName",
                defvalue: "BANGALORE"

            },
            stateId: {
                name: "stateId",
                dbname: "stateId",
                componentType: "SELECT",
                labelDisplayName: "State Name",
                getOptions: getOptions,
                optionName: "stateName",
                required: true,
                defvalue: "KARNATAKA"
            },
            contactPerson: { name: "contactPerson", dbname: "contactPerson", componentType: "INPUT", labelDisplayName: "Contact Person", defvalue: "" },
            contactNo: { name: "contactNo", dbname: "contactNo", componentType: "INPUT", labelDisplayName: "Contact NO", defvalue: "" },
            mobileNo: { name: "mobileNo", dbname: "mobileNo", componentType: "INPUT", labelDisplayName: "Mobile No", required: true, defvalue: "" },
            officeNo: { name: "officeNo", dbname: "officeNo", componentType: "INPUT", labelDisplayName: "Office No", defvalue: "" },
            faxNo: { name: "faxNo", dbname: "faxNo", componentType: "INPUT", labelDisplayName: "FAX NO", defvalue: "" },
            emailId: { name: "emailId", dbname: "emailId", componentType: "INPUT", labelDisplayName: "Email ID", defvalue: "" },
            accNo: { name: "accNo", dbname: "accNo", componentType: "INPUT", labelDisplayName: "Account No", defvalue: "" },
            bankName: { name: "bankName", dbname: "bankName", componentType: "INPUT", labelDisplayName: "BANK NAME", defvalue: "" },
            bankBranch: { name: "bankBranch", dbname: "bankBranch", componentType: "INPUT", labelDisplayName: "BANK BRANCH", defvalue: "" },
            ifsccode: { name: "ifsccode", dbname: "ifsccode", componentType: "INPUT", labelDisplayName: "IFSC CODE", defvalue: "" },
            cstno: { name: "cstno", dbname: "cstno", componentType: "INPUT", labelDisplayName: "CST No", defvalue: "" },
            eccno: { name: "eccno", dbname: "eccno", componentType: "INPUT", labelDisplayName: "ECC No", defvalue: "" },
            panNo: { name: "panNo", dbname: "panNo", componentType: "INPUT", labelDisplayName: "PAN No", defvalue: "" },
            serviceTaxNo: { name: "serviceTaxNo", dbname: "serviceTaxNo", componentType: "INPUT", labelDisplayName: "Service Tax No", defvalue: "" },
            tinNo: { name: "tinNo", dbname: "tinNo", componentType: "INPUT", labelDisplayName: "Tin No", defvalue: "" },
            webSite: { name: "webSite", dbname: "webSite", componentType: "INPUT", labelDisplayName: "Web Site", defvalue: "" }
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
        data["clientgroup"] = utility.getColumnValueasArray(data["clientgroup"], "clientGroupName")
        if (typeof data["stateId"] == "number") {
            let satedata = { ...stateList };
            let stateid = _.filter(satedata, { "stateId": data["stateId"] });
            if (stateid) data["stateId"] = stateid[0]["stateName"]
        }
        if (typeof data["cityId"] == "number") {
            let citydata = { ...city };
            let cityid = _.filter(citydata, { "cityId": data["cityId"] });
            if (cityid) data["cityId"] = cityid[0]["cityName"]
        }

        updateData(data, false, false)
        setModalState(true)
        setPopUpMode("Edit")

    }

    const handleDataView = (e, rowData) => {

        let data = { ...rowData };
        data = Object.assign(getDefaults(), data);
        data["clientgroup"] = utility.getColumnValueasArray(data["clientgroup"], "clientGroupName")
        if (typeof data["stateId"] == "number") {
            let satedata = { ...stateList };
            let stateid = _.filter(satedata, { "stateId": data["stateId"] });
            if (stateid) data["stateId"] = stateid[0]["stateName"]
        }
        if (typeof data["cityId"] == "number") {
            let citydata = { ...city };
            let cityid = _.filter(citydata, { "cityId": data["cityId"] });
            if (cityid) data["cityId"] = cityid[0]["cityName"]
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
        let rules = ClientValidations.getFieldRules(key, popUpData) || {};
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
                if (popUpMode == "Add") delete data["clientId"]


                data["clientgroup"] = utility.getArrayList({ ...clientGroup }, "clientGroupName", data["clientgroup"])
                // console.log(data);
                if (typeof data["stateId"] == "string") {
                    let satedata = { ...stateList };
                    let stateid = _.filter(satedata, { "stateName": data["stateId"] });
                    if (stateid) data["stateId"] = stateid[0]["stateId"]
                }
                if (typeof data["cityId"] == "string") {
                    let citydata = { ...city };
                    let cityid = _.filter(citydata, { "cityName": data["cityId"] });
                    if (cityid) data["cityId"] = cityid[0]["cityId"]
                }

                if (popUpMode == "Add") data["addedById"] = props.appConfig.state.user["userid"]
                if (popUpMode == "Add") data["dateAdded"] = Date.now();
                if (popUpMode == "Add") data["authById"] = props.appConfig.state.user["userid"]
                if (popUpMode == "Add") data["empAdded"] = Date.now();
                if (popUpMode == "Add") data["logid"] = 9999;

                data["changedById"] = props.appConfig.state.user["userid"]
                data["dateChanged"] = Date.now();
                data["inActive"] = "N";

                props.appConfig.SetAppConfig("ready", false);
                ClientService.add(popUpData).then((res) => {
                    // console.log(res);
                    props.appConfig.openSnackbar("Data saved Successfully!!! (" + res.data + ")", "success");
                    AlertService.Success("Data saved Successfully!!! (" + res.data + ")");

                    updateData({}, true, false)
                    setPopUpMode("")
                    setContent([])
                    setModalState(false)
                    handleRefresh()
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
        { title: "Client ID", field: "clientId" },
        { title: "Client Code", field: "clientCode" },
        { title: "Client Name", field: "clientName", cellStyle: { "whiteSpace": "nowrap" } },
        {
            title: "Client Group", field: "clientgroup", render: rowData => {
                return (JSON.stringify(utility.getColumnValueasArray(rowData["clientgroup"], "clientGroupName")))


            }
        },
        { title: "Account No", field: "accNo" },
        { title: "Add 1", field: "add1", cellStyle: { "whiteSpace": "nowrap" } },
        { title: "Add 2", field: "add2" },
        { title: "Add 3", field: "add3" },
        { title: "Add 4", field: "add4" },
        {
            title: "City Name", field: "cityId", render: rowData => {
                if (typeof rowData["cityId"] == "number") {
                    let citydata = { ...city };
                    let cityid = _.filter(citydata, { "cityId": rowData["cityId"] });
                    return cityid[0]["cityName"] || "";
                }
            }
        },
        {
            title: "State Name", field: "stateId", render: rowData => {
                if (typeof rowData["stateId"] == "number") {
                    let satedata = { ...stateList };
                    let stateid = _.filter(satedata, { "stateId": rowData["stateId"] });
                    return stateid[0]["stateName"] || "";
                }
            }
        },

        { title: "Contact Person", field: "contactPerson" },
        { title: "Contact NO", field: "contactNo" },
        { title: "Mobile No", field: "mobileNo" },
        { title: "Office No", field: "officeNo" },
        { title: "FAX NO", field: "faxNo" },
        { title: "Email ID", field: "emailId" },
        { title: "BANK BRANCH", field: "bankBranch" },
        { title: "BANK NAME", field: "bankName" },
        { title: "IFSC CODE", field: "ifsccode" },
        { title: "CST No", field: "cstno" },
        { title: "ECC No", field: "eccno" },
        { title: "PAN No", field: "panNo" },
        { title: "Service Tax No", field: "serviceTaxNo" },
        { title: "Tin No", field: "tinNo" },
        { title: "Web Site", field: "webSite" },

        { title: "In Active", field: "inActive" },
        { title: "Date Added", field: "dateAdded", render: rowData => <p>{utility.formatDate(rowData.dateAdded)}</p> },
        {
            title: "Added By", field: "addedById", render: rowData => {
                if (typeof rowData["addedById"] == "number") {
                    let userdata = { ...userList };
                    let userid = _.filter(userdata, { "userid": rowData["addedById"] });
                    if (userid[0] == undefined) {
                        return rowData["addedById"];
                    }
                    return userid[0]["usercode"] || "";
                }
            }
        },
        // { title: "Date Changed 1", field: "dateChanged"},
        { title: "Date Changed", field: "dateChanged", render: rowData => <p>{utility.formatDate(rowData.dateChanged)}</p> },
        {
            title: "Changed By", field: "changedById", render: rowData => {
                if (typeof rowData["changedById"] == "number") {
                    let userdata = { ...userList };
                    let userid = _.filter(userdata, { "userid": rowData["changedById"] });
                    if (userid[0] == undefined) {
                        return rowData["changedById"];
                    }
                    return userid[0]["usercode"] || "";
                }
            }
        },
        {
            title: "Auth By 1", field: "authById", render: rowData => {
                if (typeof rowData["authById"] == "number") {
                    let userdata = { ...userList };
                    let userid = _.filter(userdata, { "userid": rowData["authById"] });
                    if (userid[0] == undefined) {
                        return rowData["authById"];
                    }
                    return userid[0]["usercode"] || "";
                }
            }
        }

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
            hidden: utility.checkUserRights("Edit", props.authList)
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
            {"Client "}
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

    const handleBlur = e => {
        validate(e);
    };

    const handleKeyDown = e => {
        if (e.keyCode === 13) {
            validate(e);
        }
    };

    const handleRefresh = e => {

        loadData();
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


    if (!dataLoaded) {
        return (<></>)
    } else {
        return (<> {< Table
            columnNames={columnNames}
            rowData={pageData}
            title="Client"
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
                name={"ClientModal"}
            >
                {/* {modalState && getChildrens()}
             */}

                {content}
            </DialogModal>


        </>);
    }
}

export default Client;