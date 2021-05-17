import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@material-ui/core";
import BuildIcon from '@material-ui/icons/Build';


import AppBar from '@material-ui/core/AppBar';
import ReportService from "../../services/utl/ReportService";
import * as utility from "../../utility/utility";
import * as AlertService from "../../services/alert-service"

class Dashboard extends PureComponent {
    constructor(props) {
      super(props);
      this.state = { data:[] }
    }
  componentDidMount() {
    // this.loadData();
    // this.loadData2();
  }
loadData=async ()=>{
        var t0 = performance.now();
        let Report={reportFields:[],reportQry:""};

        Report["reportFields"]=[];
        Report["reportQry"]="Select * from mstcity";
        await ReportService.getdata(Report).then((res) => {
            if (res.data) {
                this.setState({data:res.data});
                let msg = "Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
                // props.appConfig.openSnackbar(msg);
                console.log(res);
                AlertService.Success(msg);
                return res.data;
            }

        },(err)=>{
          AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
        }).catch((err) => {
            // props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
            AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
            return [];
        })
    }
    loadData2=async ()=>{
      var t0 = performance.now();
      let Report={reportFields:[],reportQry:""};

      Report["reportFields"]=[];
      let strquery="";
      strquery=" Select ag.ActivityGroupName, v.Actcode, a.DocDate, c.ClientCode, c.ClientName, vd.VendorCode, vd.VendorName, vdg.VendorGroupName, a.ActivityStatus, Sum(v.POAMT) as POAMT, Sum(v.PAYAMT) as PAYAMT, Sum(v.POAMT-v.PAYAMT) as BALAMT";
      strquery+=" from ( select Actcode,vendorid,vendorgroupid,sum(payamt) PAYAMT,0 as PoAmt from trnpayment Where 1=1 and Actcode in (";
      strquery+=" Select DocNo from trnhdractivity Where 1=1) and Auth1='Y' and Cancel='N' group by actcode,vendorid,vendorgroupid";
      strquery+=" union all";
      strquery+=" Select Actcode,vendorid,vendorgroupid,0 PAYAMT,sum(poamt) PoAmt from trnpoallotment Where 1=1 and ";
      strquery+=" Actcode in (Select DocNo from trnhdractivity Where 1=1) and Cancel='N' group by Actcode,Vendorid,Vendorgroupid) as v, ";
      strquery+=" trnhdractivity a, mstclient c, mstactivitygroup ag, mstvendor vd, mstvendorgroup vdg ";
      strquery+=" Where 1=1 and a.DocNo = v.ActCode and a.ClientId = c.ClientId and a.ActivityGroupId= ag.ActivityGroupId ";
      strquery+=" and v.VendorId = vd.VendorId and v.VendorGroupId = vdg.VendorGroupId";
      strquery+=" group by ag.ActivityGroupName, v.actcode, a.DocDate, c.ClientCode, c.ClientName, vd.VendorCode, vd.VendorName, ";
      strquery+=" vdg.VendorGroupName, a.ActivityStatus;";
       Report["reportQry"]=strquery;
      
      
      await ReportService.getdata2(Report).then((res) => {
          if (res.data) {
              // this.setState({data:res.data});
              let msg = "Data Loaded Successfully!!!" + `( ${utility.formatTime((performance.now() - t0).toFixed(2))} ms)`;
              // props.appConfig.openSnackbar(msg);
              console.log(res);
              AlertService.Success(msg);
              return res.data;
          }

      },(err)=>{
        AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
      }).catch((err) => {
          // props.appConfig.openSnackbar(err + `( ${(performance.now() - t0).toFixed(2)} ms)`, "error");
          AlertService.Error(err + `( ${(performance.now() - t0).toFixed(2)} ms)`);
          return [];
      })
  }
  render() {
   const{user,OpenStackBar}=this.props;
    return (
      <Fragment>
          <Box style={{"alignContent":"center"}}>
            <BuildIcon/> Under Construction...
          </Box>
        
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
};

export default Dashboard;
