import { Box, Paper, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Table from "../shared/components/material-table/material-table";
import * as utility from "../utility/utility";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CachedIcon from '@material-ui/icons/Cached';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as AlertService from "../services/alert-service"
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';

import Button from '@material-ui/core/Button';
import StatusReportService from "../services/reports/StatusReportService";


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


const StatusReport = (props) => {
    const classes = useStyles();
    const [pageData, setPageData] = useState([]);

    const [dtFrom, setDtFrom] = useState(utility.todayDate())
    const [dtTo, setDtTo] = useState(utility.todayDate())

    const [reportType, setReportType] = useState("A")

    // useEffect(() => {
    //     loadData();
    // }, [])


    const loadData = () => {
        var t0 = performance.now();
        props.appConfig.SetAppConfig("ready", false);
        StatusReportService.getSTATUS(dtFrom,dtTo,reportType).then((res) => {
            if (res.data) {
                setPageData(res.data);
                AlertService.Success("Data Loaded Successfully!!!")
                props.appConfig.openSnackbar("Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`);
                // loadGrid(res.data);
            }
            props.appConfig.SetAppConfig("ready", true);

        }).catch((err) => {
            props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`)
            props.appConfig.SetAppConfig("ready", true);
            // alert(err);
        })
    }

    const columnNames = [
        // ActivityGroupName, Actcode, DocDate, ClientCode, ClientName, VendorCode, VendorName,
        //  VendorGroupName, ActivityStatus, POAMT, PAYAMT, BALAMT
        { title: "Activity Code", field: "Actcode" },
        { title: "Activity Group Name", field: "ActivityGroupName" },
        { title: "Client Code", field: "ClientCode" },
        { title: "Client Name", field: "ClientName" },
        { title: "Vendor Code", field: "VendorCode" },
        { title: "Vendor Name", field: "VendorName" },
        { title: "Client Group Name", field: "VendorGroupName" },
        { title: "PO Amount", field: "POAMT" },
        { title: "Paid Amount", field: "PAYAMT" },
        { title: "Balance Amount", field: "BALAMT" },
        { title: "Activity Status", field: "ActivityStatus" },

        { title: "Doc Date", field: "DocDate", render: rowData => <p>{utility.formatDate(rowData.DocDate)}</p> },
        

    ];

    const handleLoad = e => {
        if (dtFrom == undefined && dtFrom == null && dtFrom == "") {
            AlertService.Error("Please Select Date From:")
            return;
        }

        if (dtTo == undefined && dtTo == null && dtTo == "") {
            AlertService.Error("Please Select Date To:")
            return;
        }

        loadData();
    }

    const handleRadioChange = event => {
        setReportType(event.target.value);
    };


    const handleChange = event => {
        if(event.target.name=="dtFrom"){
            setDtFrom(event.target.value);
        }
        if(event.target.name=="dtTo"){
            setDtTo(event.target.value);
        }
        
    };

    
    return (<>{
        <Paper elevation={13} style={{ "marginBottom": "10px" }}>
            <form className={classes.container} noValidate>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start" 
                style={{"margin":"10px","padding":"4px","border":"solid 1px lightgrey",borderRadius:"4px",width:"auto"}}>
                    <TextField
                        id="dateFrom"
                        label="Date From:"
                        type="date"
                        name="dtFrom"
                        // defaultValue={utility.todayDate()}
                        className={classes.textField}
                        value={dtFrom}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required={true}
                        onChange={handleChange} 
                    />
                    <TextField
                        id="dateTo"
                        label="Date To:"
                        type="date"
                        name="dtTo"
                        required={true}
                        // defaultValue={utility.todayDate()}
                        value={dtTo}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange} 
                    />
                </Grid>
                {/* <div style={{"margin":"10px","padding":"4px","border":"solid 1px lightgrey",borderRadius:"4px"}}> */}
                <Grid container direction="row" justify="flex-start" alignItems="flex-start"
                style={{"margin":"10px","padding":"4px","border":"solid 1px lightgrey",borderRadius:"4px",width:"auto"}}>
                    <RadioGroup aria-label="position" name="position" value={reportType} onChange={handleRadioChange} row>
                        <FormControlLabel
                            value="A"
                            control={<Radio color="primary" />}
                            label="All"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="C"
                            control={<Radio color="primary" />}
                            label="Completed"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="P"
                            control={<Radio color="primary" />}
                            label="Pending"
                            labelPlacement="top"
                        />
                    </RadioGroup>
                </Grid>
                <Grid container direction="row" justify="flex-start" alignItems="center" 
                style={{"margin":"10px","padding":"4px",borderRadius:"4px",width:"auto"}}>
                    <Button
                        variant="contained"
                        color="default"
                        // style={{}}
                        endIcon={<CachedIcon />}
                        onClick={handleLoad}
                    >
                        Load
                    </Button>
                </Grid>
            </form>
        </Paper>}

        {<Table
        style={{"zoom":"90%"}}
            columnNames={columnNames}
            rowData={pageData}
            title="StatusReport"
            // actions={actions}
            // pageSize={
            //   allSolutions.length > 10
            //     ? Math.floor(allSolutions.length / 2)
            //     : allSolutions.length
            // }
            // pageSizeOptions={lodash.rowsPerPageOptions(allSolutions.length)}
            paginationType={"normal"}
        />}

    </>);
}

export default StatusReport;