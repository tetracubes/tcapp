import { Paper, Button, Icon } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PaymentService from '../../services/transaction/PaymentService';


import * as validatorField from "../../services/utl/validation/validator";
import DialogModal from "../../shared/components/dailog/DialogModal";
import Table from "../../shared/components/material-table/material-table";
import * as ComponentRender from "../../shared/functions/component-render";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as utility from "../../utility/utility";
import * as PaymentValidations from "./Payment-validator";

import * as AlertService from "../../services/alert-service"

import _ from "lodash";

import ActivityService from "../../services/transaction/ActivityService";
import UserService from "../../services/UserService";
import VendorService from "../../services/master/VendorService";
import POAllotmentService from "../../services/transaction/POAllotmentService";
import PaymentModeService from "../../services/master/PaymentModeService";
import PaymentTypeService from "../../services/master/PaymentTypeService";


const Payment = (props) => {
    const [pageData, setPageData] = useState([]);

    const [poAllotmentData, setPoAllotmentData] = useState([]);
    const [poAllotmentBalAmount, setPoAllotmentBalAmount] = useState([]);
    const [modalState, setModalState] = useState(false);
    const [popUpMode, setPopUpMode] = useState("");
    const [popUpData, setPopUpData] = useState({});
    const [content, setContent] = useState([]);

    const [vendorList, setVendorList] = useState([]);
    const [activityList, setActivityList] = useState([]);
    const [paymentTypeList, setPaymentTypeList] = useState([]);
    const [paymentModeList, setPaymentModeList] = useState([]);

    // const [userList, setUserList] = useState([]);

    const [errorFound, setErrorFound] = useState(false);


    const [headerData, setHeaderData] = useState({ "finYear": "2019-2020", "actcode": "" });

    const [dataLoaded, setDataLoaded] = useState(false);

    const [headerUpdated, setHeaderUpdated] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState({});

    // const [popUpData, setPopUpData] = useState({});

    useEffect(() => {
        async function fetchData() {
            // You can await here
            props.appConfig.SetAppConfig("ready", false);
            const response = await getallGroupsdata();
            setDataLoaded(true);
            setHeaderUpdated(true);
            props.appConfig.SetAppConfig("ready", true);
        }
        fetchData();

    }, [])


    const loadData = async (actcode) => {
        var t0 = performance.now();
        await PaymentService.getPAYMENT(actcode).then((res) => {
            if (res.data) {
                setPageData(res.data);
                let msg = "Payment Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                props.appConfig.openSnackbar(msg);
                AlertService.Success(msg);
                return res.data;
                // loadGrid(res.data);
            }

        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            setErrorFound(true);
            return [];
            // alert(err);
        })
    }

    const loadPoAllotmentData = async (actcode) => {
        var t0 = performance.now();
        await POAllotmentService.getPO(actcode).then((res) => {
            if (res.data) {
                let data = res.data;
                data = _.filter(res.data, { "cancel": "N", "auth1": "Y" });
                setPoAllotmentData(data);
                let msg = "PO Allotment Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                props.appConfig.openSnackbar(msg);
                AlertService.Success(msg);
                return data;
                // loadGrid(res.data);
            }

        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            setErrorFound(true);
            return [];
            // alert(err);
        })
    }

    const loadPoAllotmentBalAmountData = async (actcode) => {
        var t0 = performance.now();
        await POAllotmentService.getPOBAL(actcode).then((res) => {
            if (res.data) {
                setPoAllotmentBalAmount(res.data);
                let msg = "PO Allotment Bal Amount Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                props.appConfig.openSnackbar(msg);
                AlertService.Success(msg);
                return res.data;
                // loadGrid(res.data);
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
        await getActivityList();
        await getVendorList();
        await getPaymentModeList();
        await getPaymentTypeList();
        // let userdata= await getUserList();
        // setActivityList(activitydata);
        // setVendorList(vvendorydata);
        // setUserList(userdata);

    }

    const getUserList = async () => {

        var t0 = performance.now();
        await UserService.fetchAll().then((res) => {
            if (res.data) {

                let msg = "Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                // props.appConfig.openSnackbar(msg);
                // AlertService.Success(msg);

                return res.data;
            }
        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            setErrorFound(true);
            return [];
        })
    }

    const getVendorList = async () => {

        var t0 = performance.now();
        await VendorService.fetchAll().then((res) => {
            if (res.data) {
                setVendorList(res.data);
                let msg = "Vendor Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
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


    const getPaymentModeList = async () => {

        var t0 = performance.now();
        await PaymentModeService.fetchAll().then((res) => {
            if (res.data) {

                setPaymentModeList(res.data);
                let msg = "Payment Mode Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
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


    const getPaymentTypeList = async () => {

        var t0 = performance.now();
        await PaymentTypeService.fetchAll().then((res) => {
            if (res.data) {
                setPaymentTypeList(res.data);
                let msg = "Payment Type Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
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

    const getActivityList = async (finyear) => {

        var t0 = performance.now();
        if (finyear == undefined) finyear = utility.getCurrentFinYear();
        await ActivityService.fetchAllByFinYear(finyear).then((res) => {
            if (res.data) {
                setActivityList(res.data);
                let msg = "Activity Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
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
        if (popUpMode) {
            reloadData();
        }
    }, [popUpMode]);

    const getOptions = (name = "", obj) => {

        switch (name.toLowerCase()) {
            case "actcode":
                return (activityList)
                
            case "finyear":
                return utility.getFinYear();
                
            case "paymentmodeid":
                return (paymentModeList)
                
            case "paymenttypeid":
                return (paymentTypeList)
                
            default:
                break;
        }
    }

    const dataStruct = {
        fields: {
            actCode: { name: "actCode", dbname: "actCode", componentType: "VIEW", labelDisplayName: "Act Code", defvalue: "" },
            slNo: { name: "slNo", dbname: "slNo", componentType: "VIEW", labelDisplayName: "Sl No.", defvalue: "" },
            vendorid: { name: "vendorid", dbname: "vendorid", componentType: "VIEW", labelDisplayName: "Vendor Code", defvalue: "", getOptions: getOptions, optionName: "vendorCode", additionalnames: ["vendorName"] },
            vendorgroupid: { name: "vendorgroupid", dbname: "vendorgroupid", componentType: "VIEW", labelDisplayName: "Vendor Group", defvalue: "", getOptions: getOptions, optionName: "vendorGroupName" },
            poamt: { name: "poamt", dbname: "poamt", componentType: "VIEW", type: "number", labelDisplayName: "PO Amount", defvalue: 0, pattern: "^[0-9]+(.[0-9]{1,5})?$", },
            BalAmt: { name: "BalAmt", dbname: "BalAmt", componentType: "VIEW", type: "number", labelDisplayName: "Balance Amount", defvalue: 0, pattern: "^[0-9]+(.[0-9]{1,5})?$", },
            paymentTypeId: { name: "paymentTypeId", dbname: "paymentTypeId", componentType: "SELECT", labelDisplayName: "Payment Type", defvalue: "Advance Payment", getOptions: getOptions, optionName: "paymentTypeName" },
            payAmt: { name: "payAmt", dbname: "payAmt", componentType: "INPUT", type: "number", labelDisplayName: "Payment Amount", defvalue: 0, pattern: "^[0-9]+(.[0-9]{1,5})?$", },
            taxAmt: { name: "taxAmt", dbname: "taxAmt", componentType: "INPUT", type: "number", labelDisplayName: "Tax Amount", defvalue: 0, pattern: "^[0-9]+(.[0-9]{1,5})?$", },
            otherAmt: { name: "otherAmt", dbname: "otherAmt", componentType: "INPUT", type: "number", labelDisplayName: "Other Amount", defvalue: 0, pattern: "^[0-9]+(.[0-9]{1,5})?$", },
            remarks: { name: "remarks", dbname: "remarks", componentType: "INPUT", labelDisplayName: "Remarks", defvalue: "" },
            paymentModeId: { name: "paymentModeId", dbname: "paymentModeId", componentType: "SELECT", labelDisplayName: "Payment Mode", defvalue: "Cash",required:true, getOptions: getOptions, optionName: "paymentModeName" },
            infavourof: { name: "infavourof", dbname: "infavourof", componentType: "INPUT", labelDisplayName: "In Favour Of", defvalue: "" },
            chqno: { name: "chqno", dbname: "chqno", componentType: "INPUT", labelDisplayName: "Cheque No", defvalue: "" },
            chqdate: { name: "chqdate", dbname: "chqdate", componentType: "INPUT", labelDisplayName: "Cheque Date",type:"date",defvalue: utility.todayDate() },
            bank: { name: "bank", dbname: "bank", componentType: "INPUT", labelDisplayName: "Bank Name", defvalue: "" },
            narration: { name: "narration", dbname: "narration", componentType: "INPUT", labelDisplayName: "Narration", defvalue: "" },

            // ??cancelled:{name:"cancelled",dbname:"cancelled",componentType:"INPUT",labelDisplayName:"Cancelled",defvalue:"N"},
            // ??cancelledBy:{name:"cancelledBy",dbname:"cancelledBy",componentType:"INPUT",labelDisplayName:"Cancelled By",defvalue:""},
            // ??cancelledDate:{name:"cancelledDate",dbname:"cancelledDate",componentType:"INPUT",labelDisplayName:"Cancelled Date",defvalue:""},

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

    const handleAdd = (e,rowData) => {
        if (headerData["actcode"]) {
            let defaults = getDefaults();
            defaults["actCode"] = headerData["actcode"];
            if (typeof rowData["vendorid"] == "number") {
                let ldata = { ...vendorList };
                let fdata = _.filter(ldata, { "vendorId": rowData["vendorid"] });
                if (fdata.length > 0) {
    
                    defaults["vendorid"] = fdata[0]["vendorCode"]
                    fdata = _.filter(fdata[0]["vendorgroup"], { "vendorGroupId": rowData["vendorgroupid"] })
                    if (fdata.length > 0) {
                        defaults["vendorgroupid"] = fdata[0]["vendorGroupName"]
                    }
                }
            }
            
           
            defaults["poamt"]=getPoAmount(rowData);
            defaults["BalAmt"]=getBalAmount(rowData,"po");
            defaults["payAmt"]=0.0

            updateData(defaults, false, false);
            // popUpData["errors"]
            setPopUpMode("Add")
            setModalState(true)
        } else {

            AlertService.Error("Please Select Activity to Add!!!");
        }

    }

    const handleEdit = (e, rowData,type) => {
        let data = { ...rowData };
        if(type=="po"){
            data["actCode"] = data["poAllotmentKeys"]["actCode"];
            data["slNo"] = data["poAllotmentKeys"]["slNo"];
            delete data["poAllotmentKeys"]
        }else{
            data["actCode"] = data["paymentId"]["actCode"];
            data["slNo"] = data["paymentId"]["slNo"];
            delete data["paymentId"]
        }
        
        if (typeof data["vendorid"] == "number") {
            let ldata = { ...vendorList };
            let fdata = _.filter(ldata, { "vendorId": data["vendorid"] });
            if (fdata.length > 0) {

                data["vendorid"] = fdata[0]["vendorCode"]
                fdata = _.filter(fdata[0]["vendorgroup"], { "vendorGroupId": data["vendorgroupid"] })
                if (fdata.length > 0) {
                    data["vendorgroupid"] = fdata[0]["vendorGroupName"]
                }
            }
        }

        if (typeof data["paymentModeId"] == "number") {
            let ldata = { ...paymentModeList };
            let fdata = _.filter(ldata, { "paymentModeId": data["paymentModeId"] });
            if (fdata.length > 0) {
                data["paymentModeId"] = fdata[0]["paymentModeName"]
            }
        }

        if (typeof data["paymentTypeId"] == "number") {
            let ldata = { ...paymentTypeList };
            let fdata = _.filter(ldata, { "paymentTypeId": data["paymentTypeId"] });
            if (fdata.length > 0) {
                data["paymentTypeId"] = fdata[0]["paymentTypeName"]
            }
        }

        data["chqdate"]=utility.todayDate(data["chqdate"]);
        data["poamt"]=getPoAmount(rowData);
        data["BalAmt"]=(getBalAmount(rowData) + data["payAmt"]);

        updateData(data, false, false)
        setModalState(true)
        setPopUpMode("Edit")

    }

    const handleDataView = (e, rowData,type) => {
        let data = { ...rowData };
        if(type=="po"){
            data["actCode"] = data["poAllotmentKeys"]["actCode"];
            data["slNo"] = data["poAllotmentKeys"]["slNo"];
            delete data["poAllotmentKeys"]
        }else{
            data["actCode"] = data["paymentId"]["actCode"];
            data["slNo"] = data["paymentId"]["slNo"];
            delete data["paymentId"]
        }
        
        data = Object.assign(getDefaults(), data);
        if (typeof data["vendorid"] == "number") {
            let ldata = { ...vendorList };
            let fdata = _.filter(ldata, { "vendorId": data["vendorid"] });
            if (fdata.length > 0) {

                data["vendorid"] = fdata[0]["vendorCode"]
                fdata = _.filter(fdata[0]["vendorgroup"], { "vendorGroupId": data["vendorgroupid"] })
                if (fdata.length > 0) {
                    data["vendorgroupid"] = fdata[0]["vendorGroupName"]
                }
            }
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
        let rules = PaymentValidations.getFieldRules(key, popUpData) || {};
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


                data["paymentId"] = {};
                data["paymentId"]["actCode"] = data["actCode"];
                data["paymentId"]["slNo"] = data["slNo"];
                delete data["actCode"]
                delete data["slNo"]

                if (popUpMode == "Add") {
                    delete data["paymentId"]["slNo"]
                }
                // }

                if (typeof data["vendorid"] == "string") {
                    let ldata = { ...vendorList };
                    let fdata = _.filter(ldata, { "vendorCode": data["vendorid"] });
                    if (fdata.length > 0) {

                        data["vendorid"] = fdata[0]["vendorId"]
                        fdata = _.filter(fdata[0]["vendorgroup"], { "vendorGroupName": data["vendorgroupid"] })
                        if (fdata.length > 0) {
                            data["vendorgroupid"] = fdata[0]["vendorGroupId"]
                        }

                    }
                }
                if (typeof data["paymentTypeId"] == "string") {
                    let ldata = { ...paymentTypeList };
                    let fdata = _.filter(ldata, { "paymentTypeName": data["paymentTypeId"] });
                    if (fdata.length > 0) {
                        data["paymentTypeId"] = fdata[0]["paymentTypeId"];
                    }
                }

                if (typeof data["paymentModeId"] == "string") {
                    let ldata = { ...paymentModeList };
                    let fdata = _.filter(ldata, { "paymentModeName": data["paymentModeId"] });
                    if (fdata.length > 0) {
                        data["paymentModeId"] = fdata[0]["paymentModeId"];
                    }
                }


                if (popUpMode == "Add") data["addedBy"] = props.appConfig.state.user["usercode"]
                if (popUpMode == "Add") data["dateAdded"] = Date.now();
                if (popUpMode == "Add") data["logid"] = 9999;



                data["changedBy"] = props.appConfig.state.user["usercode"]
                data["dateChanged"] = Date.now();
                if (popUpMode == "Add") {
                    data["cancelrem"] = ""
                    data["cancelby"] = ""
                    data["cancel"] = "N"
                    data["canceldate"] = Date.now();



                    data["authrem1"] = ""
                    data["authby1"] = ""
                    data["auth1"] = "N"
                    data["authdate1"] = Date.now();

                    data["authrem2"] = ""
                    data["authby2"] = ""
                    data["auth2"] = "N"
                    data["authdate2"] = Date.now();
                }
                data["dateChanged"] = Date.now();
                data["inActive"] = "N";


                console.log(data);
                props.appConfig.SetAppConfig("ready", false);
                PaymentService.add(popUpData).then((res) => {
                    // console.log(res);
                    props.appConfig.openSnackbar("Data saved Successfully!!! (" + res.data + ")", "success");
                    AlertService.Success("Data saved Successfully!!! (" + res.data + ")");

                    updateData({}, true, false)
                    setPopUpMode("")
                    setContent([])
                    setModalState(false)
                    console.log("handle save ended");
                    props.appConfig.SetAppConfig("ready", true);
                    handleRefresh();
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
        if (reload) reloadData(obj);
    }

    const handleClose = () => {
        setPopUpData({})
        setContent([])
        setPopUpMode("")
        setModalState(false)
    }

    const columnNamesPO = [

        { title: "Activity Code", field: "poAllotmentKeys.actCode" },
        { title: "Sl No.", field: "poAllotmentKeys.slNo" },
        {
            title: "Vendor Code", field: "vendorid", render: rowData => {
                if (typeof rowData["vendorid"] == "number") {
                    let data = { ...vendorList };
                    let fdata = _.filter(data, { "vendorId": rowData["vendorid"] });
                    if (fdata.length == 0) {
                        return rowData["vendorid"];
                    }
                    return ((fdata[0]["vendorCode"] + "," + fdata[0]["vendorName"]) || "");
                }
            }
        },
        {
            title: "Vendor Group Name", field: "vendorgroupid", render: rowData => {
                if (typeof rowData["vendorid"] == "number") {
                    let data = { ...vendorList };
                    let fdata = _.filter(data, { "vendorId": rowData["vendorid"] });
                    if (fdata.length == 0) {
                        return rowData["vendorgroupid"];
                    } else {
                        fdata = _.filter(fdata[0]["vendorgroup"], { "vendorGroupId": rowData["vendorgroupid"] });
                        if (fdata.length == 0) {
                            return rowData["vendorgroupid"];
                        }
                        return fdata[0]["vendorGroupName"];
                    }
                }
            }
        },
        { title: "PO Amount", field: "poamt" },
        {
            title: "Bal Amount", field: "balamt", render: rowData => {
                return(getBalAmount(rowData,"po"));
            }
        },
        { title: "Remarks", field: "remarks" },

    ];


    const columnNames = [

        { title: "Activity Code", field: "paymentId.actCode" },
        { title: "Sl No.", field: "paymentId.slNo" },
        {
            title: "Vendor Code", field: "vendorid", render: rowData => {
                if (typeof rowData["vendorid"] == "number") {
                    let data = { ...vendorList };
                    let fdata = _.filter(data, { "vendorId": rowData["vendorid"] });
                    if (fdata.length == 0) {
                        return rowData["vendorid"];
                    }
                    return ((fdata[0]["vendorCode"] + "," + fdata[0]["vendorName"]) || "");
                }
            }
        },
        {
            title: "Vendor Group Name", field: "vendorgroupid", render: rowData => {
                if (typeof rowData["vendorid"] == "number") {
                    let data = { ...vendorList };
                    let fdata = _.filter(data, { "vendorId": rowData["vendorid"] });
                    if (fdata.length == 0) {
                        return rowData["vendorgroupid"];
                    } else {
                        fdata = _.filter(fdata[0]["vendorgroup"], { "vendorGroupId": rowData["vendorgroupid"] });
                        if (fdata.length == 0) {
                            return rowData["vendorgroupid"];
                        }
                        return fdata[0]["vendorGroupName"];
                    }
                }
            }
        },
        { title: "Pay Amount", field: "payAmt" },
        {
            title: "Payment Mode", field: "paymentModeId", render: rowData => {
                if (typeof rowData["paymentModeId"] == "number") {
                    let data = { ...paymentModeList };
                    let fdata = _.filter(data, { "paymentModeId": rowData["paymentModeId"] });
                    if (fdata.length == 0) {
                        return rowData["paymentModeId"];
                    }
                    return (fdata[0]["paymentModeName"]);
                }
            }
        },
        { title: "Payment Type", field: "paymentTypeId" , render: rowData => {
            if (typeof rowData["paymentTypeId"] == "number") {
                let data = { ...paymentTypeList };
                let fdata = _.filter(data, { "paymentTypeId": Number(rowData["paymentTypeId"]) });
                if (fdata.length == 0) {
                    return rowData["paymentTypeId"];
                }
                return (fdata[0]["paymentTypeName"]);
            }
        }},
        { title: "Remarks", field: "remarks" },

        { title: "In Favour Of", field: "infavourof" },
        { title: "CHQ No", field: "chqno" },
        { title: "CHQ Date", field: "chqdate" },
        { title: "Bank", field: "bank" },
        { title: "Narration", field: "narration" },


        { title: "Date Added", field: "dateAdded", render: rowData => <p>{utility.formatDate(rowData.dateAdded)}</p> },
        { title: "Added By", field: "addedBy" },
        { title: "Date Changed", field: "dateChanged", render: rowData => <p>{utility.formatDate(rowData.dateChanged)}</p> },
        { title: "Changed By", field: "changedBy" },


        { title: "cancel", field: "cancel" },
        { title: "Cancelled By", field: "cancelby" },
        { title: "Cancelled Date", field: "canceldate", render: rowData => <p>{utility.formatDate(rowData.canceldate)}</p> },

        { title: "Auth 1", field: "auth1" },
        { title: "Auth By 1", field: "authby1" },
        { title: "Auth Date 1", field: "authdate1", render: rowData => <p>{utility.formatDate(rowData.authdate1)}</p> },
        { title: "Auth Remarks 1", field: "authrem1" },

        { title: "Auth 2", field: "auth2" },
        { title: "Auth By 2", field: "authby2" },
        { title: "Auth Date 2", field: "authdate2", render: rowData => <p>{utility.formatDate(rowData.authdate2)}</p> },
        { title: "Auth Remarks 2", field: "authrem2" }


    ];

    const getBalAmount=(rowData,type)=>{
        let po = { ...poAllotmentBalAmount };
        let actCode= ""
        if(type=="po")actCode=rowData["poAllotmentKeys"]["actCode"];
        if(type!=="po")actCode=rowData["paymentId"]["actCode"];
        let fdata = _.filter(po, { "ACTCODE":actCode, "VENDORID": rowData["vendorid"], "VendorGroupId": rowData["vendorgroupid"] })
        if (fdata.length > 0) {
            // rowData["BalAmt"]=fdata[0]["BalAmt"];
            return fdata[0]["BalAmt"];
        } else {
            // rowData["BalAmt"]=0.0;
            return 0.0;
        }
    }
const getPoAmount=(rowData,type)=>{
    let fdata={...poAllotmentData};
    fdata=_.filter(fdata,{"vendorid":rowData["vendorid"],"vendorgroupid":rowData["vendorgroupid"]})
    // let poamt=0.0;
    if(fdata.length>0){
        return _.sumBy(fdata, 'poamt');
    }
    return 0.0;
}


    const actionsPO = [
        // rowData =>({icon: ()=><FontAwesomeIcon icon="edit"/>,
        rowData => ({
            icon: "visibility",
            iconProps: { fontSize: "small" },
            tooltip: "View",
            onClick: (event, rowData) => {
                handleDataView(event, rowData, "po");
            },
            hidden: utility.checkUserRights("View", props.authList)
        }),
        rowData => ({
            icon: "paymentsharp",
            iconProps: { fontSize: "small" },
            tooltip: "Payment",
            onClick: (event, rowData) => {
                handleAdd(event, rowData, "po");
            },
            disabled:(getBalAmount(rowData,"po")<=0)
            ,hidden: utility.checkUserRights("Add", props.authList)
        }),
        {
            icon: "refresh",
            iconProps: { style: { Color: "green" } },
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: (event) => {
                handleRefresh(event, "po");
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
            disabled:(rowData["cancel"]=="Y" || rowData["auth1"]=="Y" ),
            hidden: utility.checkUserRights("Edit", props.authList)
        }), 
        rowData => ({
            icon: "cancelsharp",
            iconProps: { fontSize: "small" },
            tooltip: "cancel",
            onClick: (event, rowData) => {
                let data={...rowData}
                data["cancelrem"] = ""
                data["cancelby"] = props.appConfig.state.user["usercode"]
                data["cancel"] = "Y"
                data["canceldate"] = Date.now();

                props.appConfig.SetAppConfig("ready", false);
                PaymentService.add(data).then((res) => {
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
            disabled:(rowData["cancel"]=="Y" ),
            hidden: utility.checkUserRights("Cancel", props.authList)
        }),
        // {
        //     icon: "refresh",
        //     iconProps: { style: { Color: "green" } },
        //     tooltip: "Refresh Data",
        //     isFreeAction: true,
        //     onClick: (event) => {
        //         handleRefresh(event);
        //     }
        // }
    ];


    const getDialogDescription = () => {
        return (<h4 style={{ "padding": "0px", "margin": "0px", "display": "inline" }}>
            {"Payment "}
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
        updateData(obj, false, true);

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
            let name=event.target.name
            let value=event.target.value

            if(event["autotarget"]){
                name=event["autotarget"]["name"]
                value=event["autotarget"]["value"];
            }
            obj[name] = value;
            if (obj[name] == hdata[name]) {
                // dataUpdated(false);
                setHeaderUpdated(true);
                return null;
            }

            hdata = Object.assign(hdata, obj);
            if (name == "finYear") {
                obj["actcode"] = "";
            }
            setHeaderData(hdata);

            if (name == "finYear") {
                await getActivityList(obj["finYear"]);

            }
            if (name == "actcode") {
                setSelectedActivity(event["autotarget"]["option"])
                await loadData(value);
                await loadPoAllotmentData(value);
                await loadPoAllotmentBalAmountData(value);
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

    const handleRefresh = async (e) => {
        await loadData(headerData["actcode"]);
        await loadPoAllotmentData(headerData["actcode"]);
        await loadPoAllotmentBalAmountData(headerData["actcode"]);
    }

    const componentHandleProps = {
        // handleFocus: handleFocus,
        handleChange: handleChange,
        handleKeyDown: handleKeyDown,
        // handleBlur: handleBlur
    };






    const getVendorGroupList = (obj) => {
        // let data = vendorList
        if (typeof obj["vendorid"] == "string") {
            let ldata = { ...vendorList };
            let fdata = _.filter(ldata, { "vendorCode": obj["vendorid"] });
            if (fdata.length > 0) {
                // fdata = _.filter(fdata[0]["vendorgroup"], { "vendorGroupName": obj["vendorgroupid"] })
                return fdata[0]["vendorgroup"];
            }
        }
        return []
    }

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
                if (popUpMode.toString().toLowerCase() == "Edit".toLowerCase()) {
                    if (key == "vendorid" || key == "vendorgroupid") {
                        values["componentType"] = "";
                    }
                }
                if (values["componentType"] == "SELECT" && values["getOptions"] == undefined) {
                    values["options"] = getOptions(values["dbname"], obj);
                }
                content.push(ComponentRender.getComponent(values, obj, false, componentHandleProps));
            })
        }


        return <Paper elevation={10}><div style={{ display: "inline-block" }}>{content}</div></Paper>;
    }


    const reloadData = (obj) => {
        if (obj == undefined) { obj = popUpData }
        let content = getChildrens(obj);
        setContent(content);
    };

    const loadFinComponent = () => {
        let dataStruct = {
            finYear: { name: "finYear", dbname: "finYear", componentType: "SELECT", labelDisplayName: "Fin Year", defvalue: "", getOptions: getOptions },
            actcode: { name: "actcode", dbname: "actcode", componentType: "AUTOCOMPLETE", labelDisplayName: "Activity Code", 
            getOptions: getOptions, defvalue: "", optionName: "docNo", optionGroupName: "product",additionalnames:["product","venue"]}
        }
        // headerData
        let content = []
        Object.entries(dataStruct).map(([key, values]) => {
            if (values["componentType"] == "SELECT" && values["getOptions"] == undefined) {
                values["options"] = getOptions(values["dbname"], headerData);
            }
            content.push(ComponentRender.getComponent(values, headerData, false, { "handleChange": handleChangeHeader }));
        })
        if (selectedActivity && Object.keys(selectedActivity).length > 0) {
            let astyles = {
                "color": (selectedActivity["activityStatus"] == "Y" ? "#07bc0c" : "#FF7A33"),
                "width": "300px", "float": "left", "fontSize": "12px", "fontWeight": "bold",
                // "border":"1px solid grey", borderRadius:"4px",padding:"4px"
                
            }
            content.push(<div style={astyles} key={"activityinfo"}>
                {utility.getActivityInfo(selectedActivity)}
            </div>)
        }

        return content;
    }

    
    const handleLoad = () => {
        loadData();
    }
    if (!dataLoaded) {
        return (<></>)
    } else {
        return (<>

            <Paper elevation={10} style={{ "marginBottom": "10px", "height": "70px" }}>
                {headerUpdated && popUpMode == "" && loadFinComponent()}
                
            </Paper>

            {< Table
                columnNames={columnNamesPO}
                rowData={poAllotmentData}
                title="PO Allotment"
                actions={actionsPO}
                paginationType={"normal"}
                pageSize={5}
                style={{ "marginBottom": "10px" }}
            />}
            {< Table
                columnNames={columnNames}
                rowData={pageData}
                title="Payment"
                actions={actions}
                pageSize={5}
                paginationType={"normal"}
            />}
            {modalState &&
                <DialogModal
                    description={modalState && getDialogDescription()}
                    popUpModalState={modalState}
                    handlePopUpSave={handleSave}
                    handlePopUpClose={handleClose}
                    name={"PaymentModal"}
                >
                    {modalState && content}
                </DialogModal>
            }


        </>);
    }
}

export default Payment;