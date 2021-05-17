import { Box, Paper, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Table from "../shared/components/material-table/material-table";
import * as utility from "../utility/utility";

import { makeStyles } from '@material-ui/core/styles';
import * as AlertService from "../services/alert-service"
import _ from "lodash";
import PaymentService from "../services/transaction/PaymentService";
import POAllotmentService from "../services/transaction/POAllotmentService";
import UserService from "../services/UserService";
import VendorService from "../services/master/VendorService";
import PaymentModeService from "../services/master/PaymentModeService";
import PaymentTypeService from "../services/master/PaymentTypeService";
import ActivityService from "../services/transaction/ActivityService";

import * as ComponentRender from "../shared/functions/component-render";
import ActivityGroupService from "../services/master/ActivityGroupService";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));



const LedgerReport = (props) => {
    const classes = useStyles();
    const [pageData, setPageData] = useState([]);
    const [poAllotmentData, setPoAllotmentData] = useState([]);
    const [poAllotmentBalAmount, setPoAllotmentBalAmount] = useState([]);

    const [headerData, setHeaderData] = useState({ "finYear": "2019-2020", "actcode": "" });

    const [errorFound, setErrorFound] = useState(false);

    const [vendorList, setVendorList] = useState([]);
    const [activityList, setActivityList] = useState([]);
    const [activityGroup, setActivityGroup] = useState({});
    const [paymentTypeList, setPaymentTypeList] = useState([]);
    const [paymentModeList, setPaymentModeList] = useState([]);

    const [dataLoaded, setDataLoaded] = useState(false);

    const [headerUpdated, setHeaderUpdated] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState({});


    // useEffect(() => {
    //     loadData();
    // }, [])
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
                // data = _.filter(res.data, { "cancel": "N", "auth1": "Y" });
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
        await ActivityService.fetchAllByFinYear(finyear, null, null).then((res) => {
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

    const getActivityGroup = async (groupid) => {
        let data = {};
        var t0 = performance.now();
        await ActivityGroupService.fetchById(groupid).then((res) => {
            if (res.data) {
                setActivityGroup(res.data);
                let msg = "Activity Group fetched Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                props.appConfig.openSnackbar(msg);
                AlertService.Success(msg);
                data = res.data;
                return res.data;

            }
        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            setErrorFound(true);
            data = {}
            return {};
        })
        return data;
    }

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
                return (getBalAmount(rowData, "po"));
            }
        },
        { title: "Remarks", field: "remarks" },

        { title: "Date Added", field: "dateAdded", render: rowData => <p>{utility.formatDate(rowData.dateAdded)}</p> },
        // { title: "Added By", field: "addedBy" },
        // { title: "Date Changed", field: "dateChanged", render: rowData => <p>{utility.formatDate(rowData.dateChanged)}</p> },
        // { title: "Changed By", field: "changedBy" },


        { title: "cancel", field: "cancel" },
        // { title: "Cancelled By", field: "cancelby" },
        { title: "Cancelled Date", field: "canceldate", render: rowData => <p>{utility.formatDate(rowData.canceldate)}</p> },

        { title: "Auth 1", field: "auth1" },
        // { title: "Auth By 1", field: "authby1" },
        { title: "Auth Date 1", field: "authdate1", render: rowData => <p>{utility.formatDate(rowData.authdate1)}</p> },
        { title: "Auth Remarks 1", field: "authrem1" },

        { title: "Auth 2", field: "auth2" },
        // { title: "Auth By 2", field: "authby2" },
        { title: "Auth Date 2", field: "authdate2", render: rowData => <p>{utility.formatDate(rowData.authdate2)}</p> },
        { title: "Auth Remarks 2", field: "authrem2" }


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
        {
            title: "Payment Type", field: "paymentTypeId", render: rowData => {
                if (typeof rowData["paymentTypeId"] == "number") {
                    let data = { ...paymentTypeList };
                    let fdata = _.filter(data, { "paymentTypeId": Number(rowData["paymentTypeId"]) });
                    if (fdata.length == 0) {
                        return rowData["paymentTypeId"];
                    }
                    return (fdata[0]["paymentTypeName"]);
                }
            }
        },
        { title: "Remarks", field: "remarks" },

        { title: "In Favour Of", field: "infavourof" },
        { title: "CHQ No", field: "chqno" },
        { title: "CHQ Date", field: "chqdate" },
        { title: "Bank", field: "bank" },
        { title: "Narration", field: "narration" },


        { title: "Date Added", field: "dateAdded", render: rowData => <p>{utility.formatDate(rowData.dateAdded)}</p> },
        // { title: "Added By", field: "addedBy" },
        // { title: "Date Changed", field: "dateChanged", render: rowData => <p>{utility.formatDate(rowData.dateChanged)}</p> },
        // { title: "Changed By", field: "changedBy" },


        { title: "cancel", field: "cancel" },
        // { title: "Cancelled By", field: "cancelby" },
        { title: "Cancelled Date", field: "canceldate", render: rowData => <p>{utility.formatDate(rowData.canceldate)}</p> },

        { title: "Auth 1", field: "auth1" },
        // { title: "Auth By 1", field: "authby1" },
        { title: "Auth Date 1", field: "authdate1", render: rowData => <p>{utility.formatDate(rowData.authdate1)}</p> },
        { title: "Auth Remarks 1", field: "authrem1" },

        { title: "Auth 2", field: "auth2" },
        // { title: "Auth By 2", field: "authby2" },
        { title: "Auth Date 2", field: "authdate2", render: rowData => <p>{utility.formatDate(rowData.authdate2)}</p> },
        { title: "Auth Remarks 2", field: "authrem2" }


    ];

    const getBalAmount = (rowData, type) => {
        let po = { ...poAllotmentBalAmount };
        let actCode = ""
        if (type == "po") actCode = rowData["poAllotmentKeys"]["actCode"];
        if (type !== "po") actCode = rowData["paymentId"]["actCode"];
        let fdata = _.filter(po, { "ACTCODE": actCode, "VENDORID": rowData["vendorid"], "VendorGroupId": rowData["vendorgroupid"] })
        if (fdata.length > 0) {
            // rowData["BalAmt"]=fdata[0]["BalAmt"];
            return fdata[0]["BalAmt"];
        } else {
            // rowData["BalAmt"]=0.0;
            return 0.0;
        }
    }

    const getPoAmount = (rowData, type) => {
        let fdata = { ...poAllotmentData };
        fdata = _.filter(fdata, { "vendorid": rowData["vendorid"], "vendorgroupid": rowData["vendorgroupid"] })
        // let poamt=0.0;
        if (fdata.length > 0) {
            return _.sumBy(fdata, 'poamt');
        }
        return 0.0;
    }

    const handleChangeHeader = async event => {
        if (event) {

            let hdata = { ...headerData };
            let obj = {}
            let name = event.target.name
            let value = event.target.value

            if (event["autotarget"]) {
                name = event["autotarget"]["name"]
                value = event["autotarget"]["value"];
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


    const loadFinComponent = () => {
        let dataStruct = {
            finYear: { name: "finYear", dbname: "finYear", componentType: "SELECT", labelDisplayName: "Fin Year", defvalue: "", getOptions: getOptions },
            actcode: {
                name: "actcode", dbname: "actcode", componentType: "AUTOCOMPLETE", labelDisplayName: "Activity Code",
                getOptions: getOptions, defvalue: "", optionName: "docNo", optionGroupName: "product", additionalnames: ["product", "venue"]
            }
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

    

    let intCounter = 0;
    if (!dataLoaded) {
        return (<></>)
    } else {
        return (<>{
            <Paper elevation={10} style={{ "marginBottom": "10px", "height": "70px", "width": "90vw" }}>
                {loadFinComponent()}
            </Paper>}

            {< Table
                columnNames={columnNamesPO}
                rowData={poAllotmentData}
                title="PO Allotment"
                // actions={actionsPO}
                paginationType={"normal"}
                pageSize={5}
                style={{ "marginBottom": "10px", "width": "90vw" }}

            />}
            {< Table
                columnNames={columnNames}
                rowData={pageData}
                title="Payment"
                // actions={actions}
                pageSize={5}
                paginationType={"normal"}
            />}

        </>);
    }
}

export default LedgerReport;