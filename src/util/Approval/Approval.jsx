import { Icon, Paper } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import ThumbUpAltSharpIcon from '@material-ui/icons/ThumbUpAltSharp';
import _ from "lodash";
import React, { useEffect, useState } from "react";
import * as AlertService from "../../services/alert-service";
import ActivityGroupService from '../../services/master/ActivityGroupService';
import CityService from "../../services/master/CityService";
import ClientLogService from "../../services/master/ClientLogService";
import ClientService from '../../services/master/ClientService';
import PaymentModeService from '../../services/master/PaymentModeService';
import PaymentTypeService from '../../services/master/PaymentTypeService';
import StateService from "../../services/master/StateService";
import VendorLogService from '../../services/master/VendorLogService';
import VendorService from '../../services/master/VendorService';
import ActivityLogService from '../../services/transaction/ActivityLogService';
import ActivityService from '../../services/transaction/ActivityService';
import PaymentService from '../../services/transaction/PaymentService';
import POAllotmentService from '../../services/transaction/POAllotmentService';
import UserService from "../../services/UserService";
import Table from "../../shared/components/material-table/material-table";
import * as ComponentRender from "../../shared/functions/component-render";
import * as utility from "../../utility/utility";






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


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && <Box style={{ "padding": "15px 0px" }} p={3}>{children}</Box>}
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}


const Approval = (props) => {
    const classes = useStyles();

    const [headerData, setHeaderData] = useState({"finYear":utility.getCurrentFinYear()});
    const [headerUpdated, setHeaderUpdated] = useState(false);

    const [tabValue, setTabValue] = React.useState(0);

    const [clientLogData, setClientLogData] = useState([]);
    const [vendorLogData, setVendorLogData] = useState([]);
    const [activityLogData, setActivityLogData] = useState([]);

    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [userList, setUserList] = useState([]);

    const [clientList, setClientList] = useState([]);
    const [activityGroup, setActivityGroup] = useState([]);

    const [paymentTypeList, setPaymentTypeList] = useState([]);
    const [paymentModeList, setPaymentModeList] = useState([]);


    const [vendorList, setVendorList] = useState([]);
    const [POAllotmentData, setPOAllotmentData] = useState([]);
    const [PaymentData,setPaymentData]=useState([]);


    // const [stateList,setStateList]=useState([]);
    // const [stateList,setStateList]=useState([]);


    useEffect(() => {
        async function fetchData() {
            props.appConfig.SetAppConfig("ready", false);
            await getallGroupsdata();
            setHeaderUpdated(true);
            props.appConfig.SetAppConfig("ready", true);
        }
        fetchData();

    }, [])

    const getallGroupsdata = async () => {
        await loadClientLogData();
        await loadVendorLogData();
        await loadActivtyLogData();
        await getCityList();
        await getStateList();
        await getUserList();
        await getClientList();
        await getVendorList();
        await getActivityGroupList();

    }
    const getOptions = (name = "", obj) => {
        switch (name.toLowerCase()) {
            case "finyear":
                return utility.getFinYear();
            default:
                break;
        }
    }
    const loadClientLogData = async () => {
        var t0 = performance.now();
        await ClientLogService.fetchAll().then((res) => {
            if (res.data) {
                setClientLogData(res.data);
                let msg = "Client Log Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                props.appConfig.openSnackbar(msg);
                AlertService.Success(msg);
                return res.data;
            }

        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            return []
            // alert(err);
        })
    }

    const loadVendorLogData = async () => {
        var t0 = performance.now();
        await VendorLogService.fetchAll().then((res) => {
            if (res.data) {
                setVendorLogData(res.data);
                let msg = "Vendor Log Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                props.appConfig.openSnackbar(msg);
                AlertService.Success(msg);
                return res.data;
            }

        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            return []
            // alert(err);
        })
    }
   
    const loadActivtyLogData = async () => {
        var t0 = performance.now();
        ActivityLogService.fetchAll().then((res) => {
            if (res.data) {
                setActivityLogData(res.data);
                let msg = "Activity Log Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                props.appConfig.openSnackbar(msg);
                AlertService.Success(msg);
                return res.data;
            }

        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            return [];
            // alert(err);
        })
    }
    const loadPOAllotmentData = async (finyear) => {
        var t0 = performance.now();
        await POAllotmentService.fetchAllByFinYear(finyear).then((res) => {
            if (res.data) {
                let fdata=_.filter(res.data,{"auth1":"N","cancel":"N"})
                setPOAllotmentData(fdata);
                let msg = "PO Allotment Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                props.appConfig.openSnackbar(msg);
                AlertService.Success(msg);
                return res.data;
                // loadGrid(res.data);
            }

        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            return [];
            // alert(err);
        })
    }

    const loadPaymentData = async (finyear) => {
        var t0 = performance.now();
        await PaymentService.fetchAllByFinYear(finyear).then((res) => {
            if (res.data) {
                let fdata=_.filter(res.data,{"auth1":"N","cancel":"N"})
                setPaymentData(fdata);
                let msg = "Payment Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                props.appConfig.openSnackbar(msg);
                AlertService.Success(msg);
                return res.data;
                // loadGrid(res.data);
            }

        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            return [];
            // alert(err);
        })
    }

    const getCityList = async () => {
        var t0 = performance.now();
        await CityService.fetchAll().then((res) => {
            if (res.data) {
                setCityList(res.data);
                let msg = "City Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
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

            return [];
        })
    }

    const getUserList = async () => {
        var t0 = performance.now();
        UserService.fetchAll().then((res) => {
            if (res.data) {
                setUserList(res.data);
            }
        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);

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
            
            return [];
        })
    }


    
    let actionsActivity = [
        rowData => ({
            icon: () => <Icon><ThumbUpAltSharpIcon /></Icon>,
            iconProps: { fontSize: "small" },
            tooltip: "Approve / Authorise",
            onClick: (event, rowData) => {
                // handleAdd(event, rowData, "po");
                let data = { ...rowData };
                
                data["cancelledBy"] = ""
                data["cancelled"] = "N"
                data["cancelledDate"] = Date.now();
                data["docDate"] = Date.now();
                data["inActive"] = "N";
                data["compId"] = 1;
                data["logid"]=data["logId"];
                delete data["logId"];

                props.appConfig.SetAppConfig("ready", false);
                ActivityService.auth(data).then((res) => {
                    // console.log(res);
                    props.appConfig.openSnackbar("Data saved Successfully!!! (" + res.data + ")", "success");
                    AlertService.Success("Data saved Successfully!!! (" + res.data + ")");
                    loadActivtyLogData();
                    props.appConfig.SetAppConfig("ready", true);
                }).catch((err) => {
                    props.appConfig.openSnackbar(err.response.data.message, "error");
                    AlertService.Error(err.response.data.message);
                    props.appConfig.SetAppConfig("ready", true);
                })
            }
        }),
        {
            icon: "refresh",
            iconProps: { style: { Color: "green" } },
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: async (event) => {
                await loadActivtyLogData()
            }
        },
    ]

    const columnNamesActivity = [

        { title: "Log Id", field: "logId" },
        // { title: "Doc No", field: "docNo" },
        // { title: "Doc Date", field: "docDate" , render: rowData => <p>{utility.formatDate(rowData.fromDate)}</p> },
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
            title: "ActivityLog", field: "activityGroupId", render: rowData => {
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
        { title: "Activity Name", field: "product" },
        { title: "Venue", field: "venue" },
        { title: "formDate", field: "fromDate", render: rowData => <p>{utility.formatDate(rowData.fromDate)}</p> },
        { title: "toDate", field: "toDate", render: rowData => <p>{utility.formatDate(rowData.toDate)}</p> },
        // { title: "Activity Status", field: "activityStatus" },
        { title: "Remarks", field: "remarks" },
        // {title:"Log Id",field:"lOGID"},
        // { title: "Cancelled", field: "cancelled" },
        // { title: "Cancelled By", field: "cancelledBy" },
        // { title: "Cancelled Date", field: "cancelledDate", render: rowData => <p>{utility.formatDate(rowData.cancelledDate)}</p> },
        { title: "Date Added", field: "dateAdded", render: rowData => <p>{utility.formatDate(rowData.dateAdded)}</p> },
        { title: "Added By", field: "addedBy" },
        // { title: "Date Changed 1", field: "dateChanged"},
        { title: "Date Changed", field: "dateChanged", render: rowData => <p>{utility.formatDate(rowData.dateChanged)}</p> },
        { title: "Changed By", field: "changedBy" }
    ];
    

    let actionsVendorLog = [
        rowData => ({
            icon: () => <Icon><ThumbUpAltSharpIcon /></Icon>,
            iconProps: { fontSize: "small" },
            tooltip: "Approve / Authorise",
            onClick: (event, rowData) => {
                // handleAdd(event, rowData, "po");
                let data = { ...rowData };
                data["vendorgroup"] = data["vendorLoggroup"];
                delete data["vendorLoggroup"];
                data["authById"] = props.appConfig.state.user["userid"]
                data["logid"] = data["vendorLogId"]
                delete data["vendorLogId"];
                data["empAdded"] = Date.now();
                data["inActive"] = "N";
                props.appConfig.SetAppConfig("ready", false);
                VendorService.auth(data).then((res) => {
                    // console.log(res);
                    props.appConfig.openSnackbar("Data saved Successfully!!! (" + res.data + ")", "success");
                    AlertService.Success("Data saved Successfully!!! (" + res.data + ")");
                    loadVendorLogData();
                    props.appConfig.SetAppConfig("ready", true);
                }).catch((err) => {
                    props.appConfig.openSnackbar(err.response.data.message, "error");
                    AlertService.Error(err.response.data.message);
                    props.appConfig.SetAppConfig("ready", true);
                })
            }
        }),
        {
            icon: "refresh",
            iconProps: { style: { Color: "green" } },
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: async (event) => {
                await loadVendorLogData()
            }
        },
    ]

    const columnNamesVendorLog = [
        { title: "VendorLog ID", field: "vendorLogId" },
        // { title: "Vendor Code", field: "vendorLogCode" },
        { title: "Vendor Name", field: "vendorName", cellStyle: { "whiteSpace": "nowrap" } },
        {
            title: "Vendor Group", field: "vendorLoggroup", render: rowData => {
                return (JSON.stringify(utility.getColumnValueasArray(rowData["vendorLoggroup"], "vendorGroupName")))


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
                    let citydata = { ...cityList };
                    let cityid = _.filter(citydata, { "cityId": rowData["cityId"] });
                    if (cityid[0] == undefined) {
                        return rowData["cityId"];
                    }
                    return cityid[0]["cityName"] || "";
                }
            }
        },
        {
            title: "State Name", field: "stateId", render: rowData => {
                if (typeof rowData["stateId"] == "number") {
                    let satedata = { ...stateList };
                    let stateid = _.filter(satedata, { "stateId": rowData["stateId"] });
                    if (stateid[0] == undefined) {
                        return rowData["stateId"];
                    }
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
        { title: "In Favour Of", field: "inFavourOf" },
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
        }


    ];

    let actionsClientLog = [
        rowData => ({
            icon: () => <Icon><ThumbUpAltSharpIcon /></Icon>,
            iconProps: { fontSize: "small" },
            tooltip: "Approve / Authorise",
            onClick: (event, rowData) => {
                // handleAdd(event, rowData, "po");
                let data = { ...rowData };
                data["clientgroup"] = data["clientLoggroup"];
                delete data["clientLoggroup"];
                data["authById"] = props.appConfig.state.user["userid"]
                data["logid"] = data["clientLogId"]
                delete data["clientLogId"];
                data["empAdded"] = Date.now();
                data["inActive"] = "N";
                props.appConfig.SetAppConfig("ready", false);
                ClientService.auth(data).then((res) => {
                    // console.log(res);
                    props.appConfig.openSnackbar("Data saved Successfully!!! (" + res.data + ")", "success");
                    AlertService.Success("Data saved Successfully!!! (" + res.data + ")");
                    loadClientLogData();
                    props.appConfig.SetAppConfig("ready", true);
                }).catch((err) => {
                    props.appConfig.openSnackbar(err.response.data.message, "error");
                    AlertService.Error(err.response.data.message);
                    props.appConfig.SetAppConfig("ready", true);
                })
            }
        }),
        {
            icon: "refresh",
            iconProps: { style: { Color: "green" } },
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: async (event) => {
                await loadClientLogData()
            }
        },
    ]
    const columnNamesClientLog = [
        { title: "ClientLog ID", field: "clientLogId" },
        // { title: "Client Code", field: "clientLogCode" },
        { title: "Client Name", field: "clientName", cellStyle: { "whiteSpace": "nowrap" } },
        {
            title: "Client Group", field: "clientLoggroup", render: rowData => {
                return (JSON.stringify(utility.getColumnValueasArray(rowData["clientLoggroup"], "clientGroupName")))
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
                    let citydata = { ...cityList };
                    let cityid = _.filter(citydata, { "cityId": rowData["cityId"] });
                    if (cityid[0] == undefined) {
                        return rowData["cityId"];
                    }
                    return cityid[0]["cityName"] || "";
                }
            }
        },
        {
            title: "State Name", field: "stateId", render: rowData => {
                if (typeof rowData["stateId"] == "number") {
                    let satedata = { ...stateList };
                    let stateid = _.filter(satedata, { "stateId": rowData["stateId"] });
                    if (stateid[0] == undefined) {
                        return rowData["stateId"];
                    }
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
        }


    ];


    let actionsPOA = [
        rowData => ({
            icon: () => <Icon><ThumbUpAltSharpIcon /></Icon>,
            iconProps: { fontSize: "small" },
            tooltip: "Approve / Authorise",
            onClick: (event, rowData) => {
                // handleAdd(event, rowData, "po");
                let data = { ...rowData };
                data["authrem1"] = ""
                data["authby1"] = props.appConfig.state.user["usercode"]
                data["auth1"] = "Y"
                data["authdate1"] = Date.now();

                props.appConfig.SetAppConfig("ready", false);
                POAllotmentService.auth(data).then((res) => {
                    // console.log(res);
                    props.appConfig.openSnackbar("Data saved Successfully!!! (" + res.data + ")", "success");
                    AlertService.Success("Data saved Successfully!!! (" + res.data + ")");
                    loadPOAllotmentData(headerData["finYear"]);
                    props.appConfig.SetAppConfig("ready", true);
                }).catch((err) => {
                    props.appConfig.openSnackbar(err.response.data.message, "error");
                    AlertService.Error(err.response.data.message);
                    props.appConfig.SetAppConfig("ready", true);
                })
            }
        }),
        {
            icon: "refresh",
            iconProps: { style: { Color: "green" } },
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: async (event) => {
                await loadPOAllotmentData(headerData["finYear"]);
            }
        },
    ]
    const columnNamesPOA = [
        { title: "Activity Code", field: "poAllotmentKeys.actCode" },
        { title: "Sl No.", field: "poAllotmentKeys.slNo" },
        // { title: "Doc Date", field: "docDate", render: rowData => <p>{utility.formatDate(rowData.fromDate)}</p> },
        { title: "PO Amount", field: "poamt" },
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
        { title: "Remarks", field: "remarks" },

        { title: "Date Added", field: "dateAdded", render: rowData => <p>{utility.formatDate(rowData.dateAdded)}</p> },
        { title: "Added By", field: "addedBy" },
        // { title: "Date Changed 1", field: "dateChanged"},
        { title: "Date Changed", field: "dateChanged", render: rowData => <p>{utility.formatDate(rowData.dateChanged)}</p> },
        { title: "Changed By", field: "changedBy" },


        // {title:"Log Id",field:"lOGID"},
        { title: "cancel", field: "cancel" },
        { title: "Cancelled By", field: "cancelby" },
        { title: "Cancelled Date", field: "canceldate", render: rowData => <p>{utility.formatDate(rowData.cancelledDate)}</p> },

        { title: "Auth 1", field: "auth1" },
        { title: "Auth By 1", field: "authby1" },
        { title: "Auth Date 1", field: "authdate1", render: rowData => <p>{utility.formatDate(rowData.authdate1)}</p> },
        { title: "Auth Remarks 1", field: "authrem1" },

        { title: "Auth 2", field: "auth2" },
        { title: "Auth By 2", field: "authby2" },
        { title: "Auth Date 2", field: "authdate2", render: rowData => <p>{utility.formatDate(rowData.authdate2)}</p> },
        { title: "Auth Remarks 2", field: "authrem2" }


    ];


    let actionsPayment = [
        rowData => ({
            icon: () => <Icon><ThumbUpAltSharpIcon /></Icon>,
            iconProps: { fontSize: "small" },
            tooltip: "Approve / Authorise",
            onClick: (event, rowData) => {
                // handleAdd(event, rowData, "po");
                let data = { ...rowData };
                data["authrem1"] = ""
                data["authby1"] = props.appConfig.state.user["usercode"]
                data["auth1"] = "Y"
                data["authdate1"] = Date.now();

                props.appConfig.SetAppConfig("ready", false);
                PaymentService.auth(data).then((res) => {
                    // console.log(res);
                    props.appConfig.openSnackbar("Data saved Successfully!!! (" + res.data + ")", "success");
                    AlertService.Success("Data saved Successfully!!! (" + res.data + ")");
                    loadPaymentData(headerData["finYear"]);
                    props.appConfig.SetAppConfig("ready", true);
                }).catch((err) => {
                    props.appConfig.openSnackbar(err.response.data.message, "error");
                    AlertService.Error(err.response.data.message);
                    props.appConfig.SetAppConfig("ready", true);
                })
            }
        }),
        {
            icon: "refresh",
            iconProps: { style: { Color: "green" } },
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: async (event) => {
                await loadPaymentData(headerData["finYear"]);
            }
        },
    ]
    const columnNamesPayment = [

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

    const handleChangeHeader = async event => {
        if (event) {
            let hdata = { ...headerData };
            let obj = {}
            obj[event.target.name] = event.target.value;
            if (obj[event.target.name] == hdata[event.target.name]) {
                setHeaderUpdated(true);
                return null;
            }
            hdata = Object.assign(hdata, obj);
            setHeaderData(hdata);
            if (event.target.name == "finYear") {
                await loadPaymentData(event.target.value);
                await loadPOAllotmentData(event.target.value);
            }
            setHeaderUpdated(true);
        }
    }


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


    const handleTabChange = async (event, newValue) => {
        setTabValue(newValue);
        if(newValue==1){
            props.appConfig.SetAppConfig("ready", false);
            await loadPaymentData(headerData["finYear"]);
            await loadPOAllotmentData(headerData["finYear"]);
            await getPaymentModeList();
            await getPaymentTypeList();
            props.appConfig.SetAppConfig("ready", true);
        }
    };

    return (<>

        <AppBar position="static" style={{ "width": "90vw" }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="Approval tabs">
                <Tab label="Mater Approval" {...a11yProps(0)} />
                <Tab label="Transaction Approval" {...a11yProps(1)} />
            </Tabs>
        </AppBar>
        <TabPanel value={tabValue} index={0}>
            {!utility.checkUserRights("ClientLog", props.authList) &&
                <Paper elevation={13} style={{ "marginBottom": "10px", "width": "90vw" }}>
                    <Table
                        columnNames={columnNamesClientLog}
                        rowData={clientLogData}
                        title="Client Log"
                        actions={actionsClientLog}
                        pageSize={5}
                        paginationType={"normal"}
                    />
                </Paper>
            }

            {!utility.checkUserRights("VendorLog", props.authList) &&
                <Paper elevation={13} style={{ "marginBottom": "10px", "width": "90vw" }}>
                    <Table

                        columnNames={columnNamesVendorLog}
                        rowData={vendorLogData}
                        title="Vendor Log"
                        actions={actionsVendorLog}
                        pageSize={5}
                        paginationType={"normal"}
                    /></Paper>
            }
             {!utility.checkUserRights("Activity", props.authList) &&
                <Paper elevation={13} style={{ "marginBottom": "10px", "width": "90vw" }}>
                    <Table
                        columnNames={columnNamesActivity}
                        rowData={activityLogData}
                        title="Activity Log"
                        actions={actionsActivity}
                        pageSize={5}
                        paginationType={"normal"}
                    /></Paper>
            }
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
            <Paper elevation={10} style={{ "marginBottom": "10px", "height": "70px" }}>
                {headerUpdated && loadFinComponent()}
            </Paper>
            {!utility.checkUserRights("POAllotment", props.authList) &&
                <Paper elevation={13} style={{ "marginBottom": "10px", "width": "90vw" }}>
                    <Table
                        columnNames={columnNamesPOA}
                        rowData={POAllotmentData}
                        title="PO Allotment"
                        actions={actionsPOA}
                        pageSize={5}
                        paginationType={"normal"}
                    /></Paper>
            }
            {!utility.checkUserRights("Payment", props.authList) &&
                <Paper elevation={13} style={{ "marginBottom": "10px", "width": "90vw" }}>
                    <Table
                        columnNames={columnNamesPayment}
                        rowData={PaymentData}
                        title="Payment"
                        actions={actionsPayment}
                        pageSize={5}
                        paginationType={"normal"}
                    /></Paper>
            }
        </TabPanel>


        {/* {<h4>Master Approval :</h4>} */}




    </>);

}

export default Approval;