import { Box, Paper, Grid, Button } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
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
import PrintA from "./PrintA";
import DialogModal from "../shared/components/dailog/DialogModal";
import ClientService from "../services/master/ClientService";
import ActivityGroupService from "../services/master/ActivityGroupService";
import PrintB from "./PrintB";


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



const Annexure = (props) => {
    const classes = useStyles();

    const [modalState, setModalState] = useState(false);
    const [popUpMode, setPopUpMode] = useState("");


    const [pageData, setPageData] = useState([]);
    const [wholeData, setWholeData] = useState([]);
    const [poAllotmentData, setPoAllotmentData] = useState([]);
    const [poAllotmentBalAmount, setPoAllotmentBalAmount] = useState([]);

    const [headerData, setHeaderData] = useState({ "finYear": "2019-2020", "actcode": "" });
    const [headerUpdated,setHeaderUpdated] =useState(false);

    const [vendorList, setVendorList] = useState([]);
    const [activityList, setActivityList] = useState([]);
    const [activityGroup, setActivityGroup] = useState({});
    const [clientList, setClientList] = useState({});
    const [paymentTypeList, setPaymentTypeList] = useState([]);
    const [paymentModeList, setPaymentModeList] = useState([]);

    const [dataLoaded, setDataLoaded] = useState(false);

    const [selectedRows,setSelectedRows]=useState([]);
    const [selectedActivity,setSelectedActivity]=useState({});


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
                setWholeData(res.data);
                let fData = _.filter(res.data, { "auth1": "Y", "cancel": "N" });
                setPageData(fData);
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
            
            return [];
            // alert(err);
        })
    }


    const getallGroupsdata = async () => {
        await getActivityList();
        await getVendorList();
        await getPaymentModeList();
        await getPaymentTypeList();
        // await getClientList();
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
            // setErrorFound(true);
            return [];
            // alert(err);
        })
    }

    const getClientList=async(clientgroupid)=>{
        let data={};
        var t0 = performance.now();
        await ClientService.fetchById(clientgroupid).then((res) => {
            if (res.data) {

                setClientList(res.data);
                let msg = "Client Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                props.appConfig.openSnackbar(msg);
                AlertService.Success(msg);
                data=res.data;
                return res.data;
            }
        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            data=[];
            return {};
        })

        return data;
    }

    const getActivityGroup = async (groupid) => {
        let data={};
        var t0 = performance.now();
        await ActivityGroupService.fetchById(groupid).then((res) => {
            if (res.data) {
                setActivityGroup(res.data);
                let msg = "Activity Group fetched Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                props.appConfig.openSnackbar(msg);
                AlertService.Success(msg);
                data=res.data;
                return res.data;

            }
        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            
            data={}
            return {};
        })
        return data;
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
            
            return [];
        })
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
        { title: "Auth Date", field: "authdate1" },
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
            if (name == "actcode" && value) {
                let act=_.filter(activityList,{"docNo":value})
                if(act.length>0){
                    let code=await getClientList(act[0]["clientId"]);
                    let a=act[0];
                    a["ClientCode"]=code["clientCode"]
                    let ag=await getActivityGroup(act[0]["activityGroupId"])
                    a["ActivityGroupName"]=(ag["activityGroupName"]?ag["activityGroupName"]:"'")
                    setSelectedActivity(a);
                    
                    
                }
                
                await loadData(value);
                await loadPoAllotmentData(value);
                await loadPoAllotmentBalAmountData(value);
            }
            setHeaderUpdated(true);
        }
    }

    const handleAnnexureB=()=>{
        // console.log(rowData);
        if(Object.keys(selectedActivity).length>0){
            setPopUpMode("ViewB")
            setModalState(true)
            setSelectedRows(processRowData(pageData));
        }else{
            AlertService.Error("Please Select Activity Code to View Annexure B.")
        }
        
        // try {
        //     w = window.open();
        //     var msfgmain = document.getElementById("msfgmain");
        //     w.document.write(msfgmain.outerHTML);
        //     // w.document.body.innerHTML= msfgmain.outerHTML;
        //     w.print();
        //     w.close();
        // } catch (err) {
        //     // alert(err.message + " Login_validate");
        //     document.getElementById(StrValied).innerHTML = err.message
        //             + " Printvalidate";
        //     // document.writeln(err.message + " Login_validate");
        // }

    }
    const handleAnnexureBGenerate=async ()=>{
        
        if(Object.keys(selectedActivity).length>0){
            if(selectedActivity["activityStatus"]=="Y"){
                AlertService.Success("Activity is Closed!!!");
                return null;
            }
            if(poAllotmentData.length>0){
                let pd=_.filter(wholeData,{"auth1":"N","cancel":"N","poAllotmentKeys.actCode":selectedActivity["docNo"]});
                if(pd.length>0){
                    AlertService.Success("Unauthorised PO Allotment found!!!!" + selectedActivity["docNo"]);
                }
            }else{
                let pd=_.filter(wholeData,{"auth1":"Y","cancel":"N","poAllotmentKeys.actCode":selectedActivity["docNo"]});
                if(pd.lengt==0){
                    AlertService.Success("No PO Allotment Data!!!!" + selectedActivity["docNo"]);
                }
            }
            if(wholeData.length>0){
                let pd=_.filter(wholeData,{"auth1":"N","cancel":"N","paymentId.actCode":selectedActivity["docNo"]});
                if(pd.length>0){
                    AlertService.Success("Unauthorised Payment found!!!!" + selectedActivity["docNo"]);
                }
            }
            await PaymentService.postCompletePayment(headerData["actcode"],props.appConfig.state.user["usercode"]).then((res)=>{
                    console.log(res.data);
                AlertService.Success("Annexure B generated Successfully!!!!")
            }).catch((err)=>{
                console.log(err);
                AlertService.Error(err.message);
            })
        }else{
            
            AlertService.Error("Please Select Activity Code to View Annexure B.")
        }
    }

    const loadFinComponent = () => {
        let dataStruct = {
            finYear: { name: "finYear", dbname: "finYear", componentType: "SELECT", labelDisplayName: "Fin Year", defvalue: "", getOptions: getOptions },
            actcode: { name: "actcode", dbname: "actcode", componentType: "AUTOCOMPLETE", labelDisplayName: "Activity Code", 
            getOptions: getOptions, defvalue: "", optionName: "docNo", optionGroupName: "product",additionalnames:["product","venue"] }
        }
        // headerData
        let content = []
        Object.entries(dataStruct).map(([key, values]) => {
            if (values["componentType"] == "SELECT" && values["getOptions"] == undefined) {
                values["options"] = getOptions(values["dbname"], headerData);
            }
            content.push(ComponentRender.getComponent(values, headerData, false, { "handleChange": handleChangeHeader }));
        })
        let values={ name: "button", dbname: "button", componentType: "BUTTON", labelDisplayName: "Annexure B"}
        if(!utility.checkUserRights("AnnexureB", props.authList)){
            content.push(ComponentRender.getComponent(values, headerData, false, { "onClick": handleAnnexureB }));
        }
        values={ name: "buttonGAB", dbname: "buttonGAB", componentType: "BUTTON", labelDisplayName: "Generate Annexure B"}
        if(!utility.checkUserRights("AnnexureBgenerate", props.authList)){
            if(selectedActivity["activityStatus"] && selectedActivity["activityStatus"]=="N"){
                content.push(ComponentRender.getComponent(values, headerData, false, { "onClick": handleAnnexureBGenerate }));
            }
        }
        
        if (selectedActivity && Object.keys(selectedActivity).length > 0) {
            let astyles = {
                "color": (selectedActivity["activityStatus"] == "Y" ? "#07bc0c" : "#FF7A33"),
                "width": "300px", "float": "left", "fontSize": "12px", "fontWeight": "bold",
                // "border":"1px solid grey", borderRadius:"4px",padding:"4px"
                
            }
            content.push(<div style={astyles}>
                {utility.getActivityInfo(selectedActivity)}
            </div>)
        }
        // content.push(<Button onClick={handleAnnexureB}>Annexure B</Button>)
        return content;
    }

   

    let actions = [rowData => ({
        icon: "visibility",
        iconProps: { fontSize: "small" },
        tooltip: "View Annexure A",
        onClick: (event, rowData) => {
            console.log(rowData);
            setPopUpMode("View")
            setModalState(true)
            setSelectedRows(processRowData(rowData));
            // handleDataView(event, rowData, "po");
        }
    }),]

    const processRowData=(rowData)=>{
        let data=[...rowData];
        data.map((row)=>{
            let v=getFieldData([...vendorList],"vendorId",row["vendorid"]);
            row["VendorCode"]=v["vendorCode"];
            let vg=getFieldData([...v["vendorgroup"]],"vendorGroupId",row["vendorgroupid"]);
            row["VendorGroupName"]=vg["vendorGroupName"]
            let pm=getFieldData([...paymentModeList],"paymentModeId",row["paymentModeId"]);
            row["PaymentMode"]=pm["paymentModeName"]
            // let pt=getFieldData([...paymentTypeList],"paymentTypeId",row["paymentTypeId"]);
            // row["PaymentType"]=pm["paymentTypeName"];
            row["POAMT"]=getPoAmount(row,"po");
            row["BALAMT"]=getBalAmount(row,"");
        })
        return data;
    }

    const getFieldData=(list,lfn,rfn)=>{
        let obj={}
        obj[lfn]=rfn;
        let vc=_.filter([...list],obj)
        if(vc.length>0){
            return vc[0];
        }
    }

    const getDialogDescription = () => {
        return (<h4 style={{ "padding": "0px", "margin": "0px", "display": "inline" }}>
            {"Print Pre-"}
            <span style={{ "color": "#c89666" }}>
                {popUpMode.toString().toUpperCase()}
            </span>
        </h4>)
    }

    const handleClose = () => {
        setModalState(false)
    }

    if (!dataLoaded) {
        return (<></>)
    } else {
        return (<>{
            <Paper elevation={10} style={{ "marginBottom": "10px", "height": "70px" }}>
                {loadFinComponent()}
            </Paper>}
            {< Table
                columnNames={columnNames}
                rowData={pageData}
                title="Payment"
                selection={true}
                actions={actions}
                pageSize={5}
                paginationType={"normal"}
            />}
            <DialogModal
                description={modalState && getDialogDescription()}
                popUpModalState={modalState}
                handlePopUpClose={handleClose}
                name={"ActivityModal"}
            >
                {modalState && popUpMode=="View" && <PrintA paymentDetails={selectedRows} loginName={props.appConfig.state.user["usercode"]} activity={selectedActivity}/>}
                {modalState && popUpMode=="ViewB" && <PrintB paymentDetails={selectedRows} loginName={props.appConfig.state.user["usercode"]} activity={selectedActivity}/>}
            </DialogModal>

        </>);
    }
}

export default Annexure;