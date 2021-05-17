import { Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import * as AlertService from "../../services/alert-service";
import ActivityGroupService from '../../services/master/ActivityGroupService';
import * as validatorField from "../../services/utl/validation/validator";
import DialogModal from "../../shared/components/dailog/DialogModal";
import Table from "../../shared/components/material-table/material-table";
import * as ComponentRender from "../../shared/functions/component-render";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as utility from "../../utility/utility";
import * as ActivityGroupValidations from "./ActivityGroup-validator";




const ActivityGroup = (props) => {
    const [pageData, setPageData] = useState([]);
    const [modalState, setModalState] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    const [popUpMode, setPopUpMode] = useState("");
    const [popUpData, setPopUpData] = useState({});
    const [content, setContent] = useState([]);
    // const [popUpData, setPopUpData] = useState({});
    useEffect(() => {
        async function fetchData() {
            // You can await here
            props.appConfig.SetAppConfig("ready", false);
            await loadData();
            setDataLoaded(true);
            props.appConfig.SetAppConfig("ready", true);
        }
        fetchData();

    }, [])


    const loadData = async () => {
        var t0 = performance.now();
        await ActivityGroupService.fetchAll().then((res) => {
            if (res.data) {
                setPageData(res.data);
                let msg = "Activity Group Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                props.appConfig.openSnackbar(msg);
                AlertService.Success(msg);
                // loadGrid(res.data);
                return res.data;
            }

        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            return [];
            // alert(err);
        })
    }
    useEffect(() => {
        // alert(1);
        if (popUpMode) {
            reloadData();
        }
    }, [popUpMode]);


    const dataStruct = {
        fields: {
            activityGroupId: {
                name: "activityGroupId",
                dbname: "activityGroupId",
                componentType: "View",
                labelDisplayName: "Activity Group Id: ",

                // required: true
            },
            activityGroupName: {
                name: "activityGroupName",
                dbname: "activityGroupName",
                componentType: "INPUT",
                labelDisplayName: "Activity Group Name: ",
                defvalue: "",
                required: true
            },
            inActive: {
                name: "inActive",
                dbname: "inActive",
                componentType: "CHECKBOX",
                labelDisplayName: "In Active: ",
                defvalue: "N",
                required: true
            }
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
        updateData(rowData, false, false)
        setModalState(true)
        setPopUpMode("Edit")

    }

    const handleDataView = (e, rowData) => {
        updateData(rowData, false, false)
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
        let rules = ActivityGroupValidations.getFieldRules(key, popUpData) || {};
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
                // data["activityGroupId"]=-1
                if (popUpMode == "Add") delete data["activityGroupId"]
                data["addedBy"] = props.appConfig.state.user["usercode"]
                data["dateAdded"] = Date.now();
                data["changedBy"] = props.appConfig.state.user["usercode"]
                data["dateChanged"] = Date.now();
                // data["inActive"]="N";
                props.appConfig.SetAppConfig("ready", false);
                ActivityGroupService.add(popUpData).then((res) => {
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
            props.appConfig.openSnackbar("Errors Found!!!", "error");
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
        { title: "Activity Group ID", field: "activityGroupId" },
        { title: "Activity Group Name", field: "activityGroupName" },
        { title: "In Active", field: "inActive" },
        { title: "Date Added", field: "dateAdded", render: rowData => <p>{utility.formatDate(rowData.dateAdded)}</p> },
        { title: "Added By", field: "addedBy" },
        // { title: "Date Changed 1", field: "dateChanged"},
        { title: "Date Changed", field: "dateChanged", render: rowData => <p>{utility.formatDate(rowData.dateChanged)}</p> },
        { title: "Changed By", field: "changedBy" },

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
            {"Activity Group "}
            <span style={{ "color": "#c89666" }}>
                {popUpMode.toString().toUpperCase()}
            </span>
        </h4>)
    }


    const getChildrens = (obj) => {
        let content = [];
        if (popUpMode.toString().toLowerCase() == "View".toLowerCase()) {
            Object.keys(obj).map((key) => {
                if (typeof obj[key] !== "object") {
                    let values = {}
                    if (dataStruct["fields"][key]) {
                        values = dataStruct["fields"][key]
                    } else {
                        values["dbname"] = key
                        values["labelDisplayName"] = key
                    }
                    content.push(ComponentRender.getComponent(values, obj, true));
                }
            })
        } else {
            Object.entries(dataStruct["fields"]).map(([key, values]) => {
                content.push(ComponentRender.getComponent(values, obj,false,componentHandleProps));
            })
        }


        return <Paper elevation={10}><div style={{ display: "inline-block" }}>{content}</div></Paper>;
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
            title="Activity Group"
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
                name={"ActivityGroupModal"}
            >
                {/* {modalState && getChildrens()}
             */}

                {content}
            </DialogModal>


        </>);
    }
}

export default ActivityGroup;