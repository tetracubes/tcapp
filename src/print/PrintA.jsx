import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import { Button, Paper } from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


class PrintA extends Component {

    render() {
        return (
            <>
                <AppBar position="sticky" color={"inherit"}>
                    <Toolbar>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>

                        </Typography>
                        <ReactToPrint
                            trigger={() => <Button variant="contained" color="primary"
                                size="large" startIcon={<PrintIcon />}>Print !</Button>}
                            content={() => this.componentRef}
                        />
                    </Toolbar>
                </AppBar>
                {/* <Paper elevation={10} style={{ "marginBottom": "5px" }}>

                </Paper> */}

                {/* <div style={{ display: "none" }}> */}
                <Print props={this.props} ref={el => (this.componentRef = el)} />
                {/* </div> */}

            </>
        )
    }
}
export default PrintA




export class Print extends Component {
    constructor(props) {
        super(props);
        this.state = { loginName: "Srikanth", dblPaidAmount: 0, activity: {}, paymentDetails: [] }

        console.log(props);
    }
    componentDidMount() {

        let data={};
        data["loginName"]=this.props.props.loginName;
        data["activity"]=this.props.props.activity;
        data["paymentDetails"]=this.props.props.paymentDetails;
        let dblPaidAmount=0;
        data["paymentDetails"].map((row)=>{
            dblPaidAmount=dblPaidAmount+ Number(row["payAmt"]);
        })
        data["dblPaidAmount"]=dblPaidAmount;
        this.setState(data);
        
        // this.props[]
        //         let this.state.loginName="";
        // let this.state.dblPaidAmount=0;
        // let this.state.activity={};
        // let this.state.paymentDetails=[];
    }

    render() {
        return (
            <table
                style={{ width: "11.69in", height: "8in", "verticalAlign": "top", "backgroundColor": "white", "padding": "30px" }}>
                <tbody>
                    <tr>
                        <td>
                            <table
                                style={{ "width": "10.69in", "height": "7in", "fontSize": "x-small", "border": "thin solid" }}>
                                <tbody>
                                    <tr>
                                        <th colSpan="3" align="right" width="100%; "
                                            style={{ "fontSize": "xx-small" }}>Printed By: {this.state.loginName} {new Date().toString()}</th>
                                    </tr>
                                    <tr>
                                        <th colSpan="3" align="center" width="100%"
                                            style={{ "fontSize": "medium", "fontWeight": "bold" }}>
                                            <u>Annexure A </u></th>
                                    </tr>
                                    <tr id="header" valign="top" style={{ "verticalAlign": "top", "height": "10%" }}>
                                        <td width="40%">
                                            <table width="100%" style={{ "fontSize": "x-small", "textAlign": "left" }}>
                                                <tbody>
                                                    <tr>
                                                        <td width="25%" align="left">Activity Code:</td>
                                                        <td width="100%" align="left"><font
                                                            style={{ "fontWeight": "bold" }}>{this.state.activity["docNo"]}</font></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left">Client Code:</td>
                                                        <td align="left"><font style={{ "fontWeight": "bold" }}>{this.state.activity["ClientCode"]}</font></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left">Activity:</td>
                                                        <td align="left"><font style={{ "fontWeight": "bold" }}>{this.state.activity["ActivityGroupName"]}</font></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left">Product:</td>
                                                        <td align="left"><font style={{ "fontWeight": "bold" }}>{this.state.activity["product"]}</font></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left">Period:</td>
                                                        <td align="left"><font style={{ "fontWeight": "bold" }}><label>From
                                                    : {this.state.activity["fromDate"]} To: {this.state.activity["toDate"]}
                                                        </label></font></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left">Place:</td>
                                                        <td align="left"><font style={{ "fontWeight": "bold" }}>{this.state.activity["venue"]}</font></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left">Remarks:</td>
                                                        <td align="left"><font style={{ "fontWeight": "bold" }}>{this.state.activity["remarks"]}</font></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="40%"></td>
                                        <td width="20%" align="center"><img src={process.env.PUBLIC_URL + "/img/shrushti_logo.jpg"} height="80px" width="140px" /></td>
                                    </tr>
                                    <tr id="details" style={{ "padding": "2px", "verticalAlign": "top", "height": "80%" }}>
                                        <td colSpan="3" width="100%" valign="middle"
                                            style={{ "verticalAlign": "middle", "padding": "4px", "height": "100%" }}>
                                            <table width="100%" height="100%"
                                                style={{ "border": "thin solid", "padding": "2px", "fontSize": "xx-small", "margin": "0px" }}>
                                                <tbody>
                                                    <tr
                                                        style={{ "border": "thin solid", "fontSize": "x-small", "fontWeight": "bold", "align": "center" }}>
                                                        <td>Sl No</td>
                                                        <td>Vendor Code</td>
                                                        <td>Vendor Name</td>
                                                        <td>Category</td>
                                                        <td>PO Amount</td>
                                                        <td>Pay Amount</td>
                                                        <td>Pay Type(Cash/Chq)</td>
                                                        <td>In Favour of</td>
                                                    </tr>
                                                    <tr >
                                                        <td colSpan="8" ><hr /></td>
                                                    </tr>
                                                    {this.state.paymentDetails.map((row, index) => {
                                                        return (
                                                            <tr bordercolor="black" key={"detialindex" + index} style={{ "textAlign": "center", "backgroundColor": `${(index % 2)? "#E2E2FF":"inherit"}`}}>
                                                                <td>{index + 1}</td>
                                                                <td>{row["VendorCode"]}</td>
                                                                <td>{row["VendorName"]}</td>
                                                                <td>{row["VendorGroupName"]}</td>
                                                                <td>{row["POAMT"]}</td>
                                                                <td>{row["payAmt"]}</td>
                                                                <td>{row["PaymentMode"]}</td>
                                                                <td>{row["infavourof"]}</td>
                                                            </tr>
                                                            )
                                                            
                                                    })}
                                                    <tr height="100%">
                                                        <td colSpan="8" ></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="8" ><hr /></td>
                                                    </tr>
                                                    <tr bordercolor="black" style={{ "textAlign": "center", "fontSize": "small", "fontWeight": "bolder" }}>
                                                        <td></td>
                                                        <td>Total</td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>{this.state.dblPaidAmount}</td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="8" ></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr id="bottom" valign="bottom" style={{ "verticalAlign": "bottom", "height": "10%" }}>
                                        <td colSpan="3" valign="middle">
                                            <table width="100%" style={{ "fontSize": "xx-small" }}>
                                                <tbody>
                                                    <tr align="center" height="10px">
                                                        <td width="30%"><font style={{ "fontWeight": "bold" }}>Project
                                                Co-ordinator</font> <br /> Prepared By</td>
                                                        <td width="40%"><font style={{ "fontWeight": "bold" }}>Head
                                                of Operations</font> <br /> Checked By</td>
                                                        <td width="30%"><font style={{ "fontWeight": "bold" }}>Finance</font>
                                                            <br /> Approved By</td>
                                                    </tr>
                                                    <tr height="20px">
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr align="center" height="10px">
                                                        <td>------------------------ <br /> Signature <br />
                                                            (Name &amp; Date)
                                        </td>
                                                        <td>------------------------ <br /> Signature <br />
                                                            (Name &amp; Date)
                                        </td>
                                                        <td>------------------------ <br /> Signature <br />
                                                            (Name &amp; Date)
                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        );


    }
}


