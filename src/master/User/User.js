import { Box, Paper, Grid, Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import UserService from '../../services/master/UserService';
import * as validatorField from "../../services/utl/validation/validator";
import DialogModal from "../../shared/components/dailog/DialogModal";
import Table from "../../shared/components/material-table/material-table";

import * as ComponentRender from "../../shared/functions/component-render";
import * as AlertService from "../../services/alert-service"

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _ from "lodash";
import * as utility from "../../utility/utility";
import * as UserValidations from "./User-validator";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import ListSubheader from '@material-ui/core/ListSubheader';


const User = (props) => {
    const [pageData, setPageData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    const [modalState, setModalState] = useState(false);
    const [popUpMode, setPopUpMode] = useState("");
    const [popUpData, setPopUpData] = useState({});
    const [content, setContent] = useState([]);
    // const [rightsContent, setRightsContent] = useState([]);
    const [menuRightsList, setMenuRightsList] = useState([]);
    const [checkedMenuList, setCheckedMenuList] = useState([]);
    // const [popUpData, setPopUpData] = useState({});

    // useEffect(() => {
    //     props.appConfig.SetAppConfig("ready", false);
    //     loadData();
    //     loadMenuRightsData();
    //     props.appConfig.SetAppConfig("ready", false);
    // }, [])

    useEffect(() => {
        async function fetchData() {
            // You can await here
            props.appConfig.SetAppConfig("ready", false);
            await loadData();
            await loadMenuRightsData();
            // const response = await getallGroupsdata();
            setDataLoaded(true);
            // setHeaderUpdated(true);
            props.appConfig.SetAppConfig("ready", true);
        }
        fetchData();

    }, [])

    const loadData = async () => {
        var t0 = performance.now();
        await UserService.fetchAll().then((res) => {
            if (res.data) {
                setPageData(res.data);
                let msg = "User Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                props.appConfig.openSnackbar(msg);
                AlertService.Success(msg);
                return res.data;
            }

        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            // setErrorFound(true);
            return [];
            // alert(err);
        })
    }

    const loadMenuRightsData = async () => {
        var t0 = performance.now();
        await UserService.fetchMenuRightsAll().then((res) => {
            if (res.data) {
                setMenuRightsList(res.data);
                props.appConfig.openSnackbar("Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`);
                // loadGrid(res.data);
            }

        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            // alert(err);
        })
    }

    useEffect(() => {
        // alert(1);
        if (popUpMode) {
            reloadData();
        }
    }, [popUpMode, checkedMenuList]);

    // reloadData();

    const getOptions = (name = "", obj) => {

        switch (name.toLowerCase()) {
            case "finyear":
                return utility.getFinYear();
                break;
            default:
                break;
        }
    }
    const dataStruct = {
        fields: {
            userid: {
                name: "userid",
                dbname: "userid",
                componentType: "View",
                labelDisplayName: "User Id: ",

                // required: true
            },
            usercode: {
                name: "usercode",
                dbname: "usercode",
                componentType: "INPUT",
                labelDisplayName: "User Code: ",
                defvalue: "",
                required: true
            },
            emailid: {
                name: "emailid",
                dbname: "emailid",
                componentType: "INPUT",
                labelDisplayName: "Email: ",
                defvalue: "",
                required: true
            },
            contactNo: {
                name: "contactNo",
                dbname: "contactNo",
                componentType: "INPUT",
                labelDisplayName: "Contact No: ",
                defvalue: "",
                required: true
            },
            remarks: {
                name: "remarks",
                dbname: "remarks",
                componentType: "INPUT",
                labelDisplayName: "Remarks: ",
                defvalue: "",
                required: true
            },
            inactive: {
                name: "inactive",
                dbname: "inactive",
                componentType: "CHECKBOX",
                labelDisplayName: "In Active: ",
                defvalue: "N"
            },
        }
    }

    const getDefaults = () => {
        let obj = {}
        Object.entries(dataStruct.fields).map(([key, values]) => {
            if (values["defvalue"]) {
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
        if (rowData["menurights"]) setCheckedMenuList(rowData["menurights"]);
        updateData(rowData, false, false)
        setModalState(true)
        setPopUpMode("Edit")

    }

    const handleDataView = (e, rowData) => {
        if (rowData["menurights"]) setCheckedMenuList(rowData["menurights"]);
        let data = { ...rowData };
        delete data["menurights"]
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
        if (checkedMenuList.length == 0) {
            AlertService.Error("Menu Rights are not selected")
            blnError = false;
        }
        return blnError;
    }

    const getFiledValidated = (key, value) => {
        let errorObj = {};
        let obj = {};
        // let currentData={};
        // currentData[key]=value;
        // let tempdata=Object.assign(popUpData,currentData)
        let rules = UserValidations.getFieldRules(key, popUpData) || {};
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
                let data = popUpData;
                // data["userId"]=-1
                if (popUpMode == "Add") delete data["userid"]
                // data["pwd"]="si123";
                data["addedby"] = props.appConfig.state.user["usercode"]
                data["dateAdded"] = Date.now();
                data["changedby"] = props.appConfig.state.user["usercode"]
                data["dateChanged"] = Date.now();
                data["datePwd"] = Date.now();
                data["menurights"] = checkedMenuList
                // data["inActive"]="N";
                props.appConfig.SetAppConfig("ready", false);
                UserService.add(popUpData).then((res) => {
                    // console.log(res);
                    AlertService.Success("Data saved Successfully!!! (" + res.data + ")");

                    updateData({}, true, false)
                    setPopUpMode("")
                    setCheckedMenuList([])
                    setContent([])
                    setModalState(false)
                    handleRefresh()
                    // console.log("handle save ended");
                    props.appConfig.SetAppConfig("ready", true);

                }).catch((err) => {
                    props.appConfig.openSnackbar(err.response.data.message, "error");
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
        setCheckedMenuList([])
        setPopUpMode("")
        setModalState(false)
    }

    const columnNames = [
        { title: "User ID", field: "userid" },
        { title: "User Code", field: "usercode" },
        { title: "Email Id", field: "emailid" },
        { title: "Contact No", field: "contactNo" },
        { title: "Remarks", field: "remarks" },
        { title: "In Active", field: "inactive" },
        { title: "Date Added", field: "dateAdded", render: rowData => <p>{utility.formatDate(rowData.dateAdded)}</p> },
        { title: "Added By", field: "addedby" },
        // { title: "Date Changed 1", field: "dateChanged"},
        { title: "Date Changed", field: "dateChanged", render: rowData => <p>{utility.formatDate(rowData.dateChanged)}</p> },
        { title: "Changed By", field: "changedby" },

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
            disabled:(rowData["usercode"].toUpperCase()=="ADMIN"),
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
            tooltip: "Add",
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
            {"User "}
            <span style={{ "color": "#c89666" }}>
                {popUpMode.toString().toUpperCase()}
            </span>
        </h4>)
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

        let newContent = [];
        newContent.push(<Paper key={"formdispaly"} elevation={10}><div style={{ display: "inline-block" }}>{content}</div></Paper>)


        // <Paper elevation={10}><div style={{ display: "inline-block" }}>{content}</div></Paper>

        newContent.push(populateMenusList());

        return newContent;
    }

    const handleToggle = (menu) => {
        if (popUpMode == "View" || popUpMode == "") return
        // console.log(menu);
        let data = [...checkedMenuList];
        let fdata = _.filter(data, { "menuRightsId": menu["menuRightsId"] });
        if (fdata.length > 0) {

            data = data.filter((row) => row.menuRightsId != menu["menuRightsId"])
            setCheckedMenuList(data);
        } else {
            data.push(menu);
            setCheckedMenuList(data);
        }


    }
    const handleSubHeader = (menuname) => {
        if (popUpMode == "View" || popUpMode == "") return
        let check = true;
        let data = [...checkedMenuList];
        let fdata = _.filter(data, { "menu": menuname });
        if (fdata.length > 0) {
            data = data.filter((row) => row.menu != menuname)
            check = false;
        }

        if (check) {
            let mdata = _.filter([...menuRightsList], { "menu": menuname });
            if (mdata) {
                data = [...data, ...mdata];
            }
        }

        setCheckedMenuList(data);

    }

    const handleGroupRights = (group) => {
        if (popUpMode == "View" || popUpMode == "") return
        let check = true;
        let data = [...checkedMenuList];
        let fdata = _.filter(data, { "menuGroup": group });
        if (fdata.length > 0) {
            data = data.filter((row) => row.menuGroup != group)
            check = false;
        }

        if (check) {
            let mdata = _.filter([...menuRightsList], { "menuGroup": group });
            if (mdata) {
                data = [...data, ...mdata];
            }
        }

        setCheckedMenuList(data);
    }


    const populateMenusList = () => {
        let content = [];
        let gData = _.groupBy(menuRightsList, "menuGroup")
        for (let key in gData) {
            let menuGroup = _.groupBy(gData[key], "menu")
            content.push(
                <Grid container direction="row" justify="flex-start" alignItems="flex-start" key={"grid-" + key}
                    style={{ "margin": "5px", "padding": "4px", "border": "solid 1px lightgrey", borderRadius: "4px", width: "auto" }}>
                    <Paper key={"paperrights" + key} elevation={10} style={{ "marginBottom": "10px", "padding": "10px", "width": "100%", "textTransform": "capitalize" }}
                        onClick={() => handleGroupRights(key)} >
                        {key + ' Rights'}  {<span style={{ "fontSize": "10px", "color": "darkgreen" }}>{"( On header click all Rights will be checked or unchecked )"}</span>}</Paper>
                    {Object.keys(menuGroup).map((mkey) => {
                        // menuGroup[key].map(())
                        return (
                            // <Container key={"container" + mkey} style={{width:"auto"}}>
                            <List style={{ background: "white", "border": "solid 1px lightgrey", margin: "4px" }} dense key={"list-" + key + " -" + mkey}
                                subheader={<ListSubheader style={{ "background": "rgb(203, 190, 181)", "color": "white" }} onClick={() => handleSubHeader(mkey)} >{mkey}</ListSubheader>}>
                                {/* <h4>{mkey}</h4> */}
                                {menuGroup[mkey].map((menu) => {
                                    // let dataStruct = {
                                    //     "name": menu["menu"] + "-" + menu["rights"],
                                    //     "dbname": menu["menu"] + "-" + menu["rights"], labelDisplayName: menu["rights"]
                                    // };

                                    // {(obj[values["dbname"]] == "Y" ? true : false)}
                                    return (<>
                                        {popUpMode == "View" && getCheckedValue(menu) &&
                                            <ListItem key={key + menu["menu"] + "-" + menu["rights"]} button>
                                                <ListItemText id={"itemtext" + menu["menu"] + "-" + menu["rights"]} primary={menu["rights"]} />
                                            </ListItem>

                                        }
                                        {popUpMode !== "View" &&
                                            <ListItem key={key + menu["menu"] + "-" + menu["rights"]} button>
                                                <ListItemText id={"itemtext" + menu["menu"] + "-" + menu["rights"]} primary={menu["rights"]} />
                                                <ListItemSecondaryAction>
                                                    <Checkbox
                                                        key={"checkbox-" + mkey + key + menu["menu"] + "-" + menu["rights"]}
                                                        edge="end"
                                                        onChange={() => handleToggle(menu)}
                                                        checked={getCheckedValue(menu) ? true : false}
                                                        inputProps={{ 'aria-labelledby': menu["menu"] + "-" + menu["rights"] }}
                                                    />
                                                </ListItemSecondaryAction>

                                            </ListItem>
                                        }
                                    </>
                                    )
                                })}
                            </List>
                        )
                    })}

                </Grid>
            )
        }

        return content;

    }

    const getCheckedValue = (menu) => {

        if (checkedMenuList) {
            let fdata = _.filter(checkedMenuList, { "menuRightsId": menu["menuRightsId"] });
            if (fdata.length > 0) return true;
        }

        return false;
    }


    const validate = param => {
        // let data = popUpData;
        let type = param.target.type
        let obj = {}
        let value = (type == "checkbox" ? param.target.checked : param.target.value);
        if (param.target.name.toLowerCase() == "inactive") value = (value ? "Y" : "N");
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


    const reloadData = () => {
        let content = getChildrens(popUpData);
        setContent(content);
    };
    if (!dataLoaded) {
        return (<></>)
    } else {
        return (<>{<Table
            columnNames={columnNames}
            rowData={pageData}
            title="User"
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
                name={"UserModal"}
            >
                {/* {modalState && getChildrens()}
             */}

                {content}

            </DialogModal>


        </>);
    }
}

export default User;