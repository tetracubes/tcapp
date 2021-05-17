import React from 'react';
import _ from "lodash";
import AuthService from "../services/AuthService";

export const isObjectAttrEmpty = obj =>
    Object.values(obj).every(x => x === null || x === "");



export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const formatTime = s => {
    // Pad to 2 or 3 digits, default is 2
    var pad = (n, z = 2) => ("00" + n).slice(-z);
    return (
        pad((s / 3.6e6) | 0) +
        ":" +
        pad(((s % 3.6e6) / 6e4) | 0) +
        ":" +
        pad(((s % 6e4) / 1000) | 0) +
        "." +
        pad(s % 1000, 3)
    );
};

export const rowsPerPageOptions = (totalRows, lengths = 3) => {
    let rows = [];
    let minval = totalRows > 9 ? Math.floor(totalRows / lengths) : 1;
    if (totalRows < minval) {
        rows.push(totalRows);
    } else {
        for (let i = 1; i < totalRows / minval - 1; i++) {
            rows.push(minval * i);
        }
        rows.push(totalRows);
    }

    return rows;
};

export const getNextMultiple = (num, multipleOf) => {
    let nextDiff =
        parseFloat(multipleOf) - (parseFloat(num) % parseFloat(multipleOf));
    let total = parseFloat(num) + parseFloat(nextDiff);
    return parseFloat(total);
};

export const getMonthNumber = monthStr =>
    new Date(monthStr + "-1-01").getMonth() + 1;

// function to find the size(length - number of attributes) of an object
export const sizeOfObject = obj => _.size(obj);

// will remove array of object from another array of object added by vinoth
export const differenceBy = (mainArray, toRemoveArray, key) => _.differenceBy(mainArray, toRemoveArray, key);

export const reduce = (list, identity) => _.reduce(
    list,
    function (result, value, key) {
        (result[value[identity]] = result[value[identity]] || []).push(value);
        return result;
    },
    {}
);


export const formatDate=(date,withOptions=0)=>{

    if( date==null || date==undefined || date=="" ) return "";
    // let options=[];
    let options=[{year: 'numeric', month: 'short', day: 'numeric' },
    {year: 'numeric', month: 'numeric', day: 'numeric' },
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }];
    
    // let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let newDate=new Date(date)
    return newDate.toLocaleDateString("en-US", options[withOptions])
    

}
export const todayDate=(pdate)=>{
    // if(date==null || date==undefined || date==""){
    //     // let today = new Date().toISOString().substr(0, 10);
    //     Dae today = new Date();
    //     today=today.getFullYear() + "-" today.getMonth()
    //     return today;
    // }else{
    //     // let today = new Date(date).toISOString().substr(0, 10);
    //     let today = new Date(date).toLocaleDateString().substr(0, 10);

        
    //     return today;
    // }
    var date = new Date();
    if(pdate!==null && pdate!==undefined && pdate!==""){
        date=new Date(pdate);
    }
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;  

    return today;
    
}

export const getYesNoOptions=()=>{
    return [{"id":"N","value":"N"},
    {"id":"Y","value":"Y"}]
}

export const getCurrentFinYear=()=>{
    let currentYear=new Date().getFullYear();
    if(new Date().getMonth()>=3) currentYear++;

    return ((currentYear-1) + "-" + currentYear)
}

export const getFinYear=()=>{
    let year=2012;
    let returnData=[];
    let currentYear=new Date().getFullYear();
    if(new Date().getMonth()>=3) currentYear++;
    // console.log(new Date().getFullYear());
    do {
        
        let obj={};
        obj["id"]=year + "-" + (year+1);
        obj["value"]=obj["id"];
        returnData.push(obj);
        year++;

    } while (year<currentYear);

    return returnData;
    // return [{"id":"2019-20","value":"2019-2020"},
    // {"id":"2018-19","value":"2018-2019"},
    // {"id":"2017-18","value":"2017-17"},]
}




export const camelCaseToWords=(str)=>{
    return str.replace(/([a-z0-9A-Z])([A-Z])/g, '$1 $2');
}

export const objectIsEmpty = (obj) => {
    if (typeof obj == "object") {
      if (Array.isArray(obj)) {
        return true
      } else {
        return (Object.keys(obj).length > 0 ? false : true);
      }
    }
    return true
  }

// export const lod=()=>_;


export const getColumnValueasArray=(arr,colname)=>{
    if(Array.isArray(arr)){
        let columvalues=arr.map(row=>row[colname]) || [];
        return columvalues;     
    }else{
        return [];
    }
}

export const getArrayList=(dataarr=[],colname="",arr=[])=>{
    let data=[];
    if(arr.map((key)=>{
        let obj={};
        obj[colname]=key
        let filtereddata=_.filter(dataarr,obj);
        if(filtereddata){
            data=[...data,...filtereddata]
        }
    }))
    return data;
    // if(Array.isArray(dataarr)){
    //     let columvalues=arr.map(row=>{
    //         if(arr.indexOf(row[colname])){
    //             return row;
    //         }
    //     }) || [];
    //     return columvalues;     
    // }else{
    //     return [];
    // }
}

export const checkUserRights=(rightname,menurights)=>{
    let data=AuthService.getUserInfo();
    if(data){
        if(data["username"].toUpperCase()=="ADMIN") return false;
    }
    if(menurights){
        let fdata=_.filter(menurights,{"rights":rightname});
        if(fdata.length>0){
            return false;
        }else{
            return true;
        }
    }else{
        return false;
    }
    
}

export const getActivityInfo = (data) => {
    let content = [];
    content.push(<span key={"activityinfo-Product"} style={{ "whiteSpace": "nowrap" }}><span style={{ "color": "rgb(200, 150, 102)" }}> Product : </span><span>{data["product"]}</span></span>);
    content.push(<span key={"activityinfo-venu"}  style={{ "whiteSpace": "nowrap" }}><span style={{ "color": "rgb(200, 150, 102)" }}> Venue : </span><span>{data["venue"]}</span></span>);
    content.push(<span  key={"activityinfo-dtfrom"} style={{ "whiteSpace": "nowrap" }}><span style={{ "color": "rgb(200, 150, 102)" }}> From : </span><span>{formatDate(data["fromDate"])}</span></span>);
    content.push(<span  key={"activityinfo-dtto"}  style={{ "whiteSpace": "nowrap" }}><span style={{ "color": "rgb(200, 150, 102)" }}> To : </span><span>{formatDate(data["toDate"])}</span></span>);


    return content;
}