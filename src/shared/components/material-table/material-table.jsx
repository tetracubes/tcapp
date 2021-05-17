import MaterialTable from "material-table";
import React from "react";

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import * as utility from "../../../utility/utility"

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


// import * as lodash from "shared/services/utils/lodash/lodash";


const Table = ({
  columnNames,
  rowData = [],
  title,
  actions = [],
  filter = true,
  grouping = true,
  rowStyle = {},
  pageSize,
  pageSizeOptions,
  paginationType = "normal",
  selection=false,
  ...rest
}) => {
  // if (pageSize == undefined){
  //   pageSize = rowData.length>9 ? Math.floor(rowData.length / 3) : rowData.length;
  // }
  // if (pageSizeOptions == undefined){
  //   pageSizeOptions = utility.rowsPerPageOptions(rowData.length) || [10,20,50,100];
  //   alert(pageSizeOptions[0]);
  // }
  let intCounter = -1;

  let options = {
    filtering: filter,
    grouping: grouping,
    rowStyle: rowStyle,
    padding: "dense",
    columnsButton: true,
    paging: true,
    exportAllData: true,
    exportButton: true,
    selection:selection,
    // maxBodyHeight:"400px",
    // exportFileName:
    // initialPage:1,
    pageSize: pageSize || 10,
    // pageSizeOptions: pageSizeOptions,
    toolbarButtonAlignment: "left",
    paginationType: paginationType,
    headerStyle: {
      backgroundColor: "#01579b",
      color: "#FFF"
    },
    actionsCellStyle: {
      // backgroundColor: "#4ca3dd",
      backgroundColor: "#cbbeb5",
      color: "#FFF",
      paddingLeft: "10px"
    },
    rowStyle: (e) => {
      intCounter++;
      let style = {};
      if (intCounter % 2) {
        style = {}
      } else {
        style = {
          backgroundColor: "#f5f5dc",
          // color: "#FFF",
          paddingLeft: "10px"
        }
      }

      if(e["AUTH1"]=="N" || e["Auth1"]=="N" || e["auth1"]=="N"){
        style["color"]="#AC3B61";
      }

      if(e["cancel"]=="Y" || e["cancelled"]=="Y"){
        style["color"]="red";
      }

      
      return style;
    }
  }
  return (
    <MaterialTable
      // icons={tableIcons}
      style={{ width: "90vw" }}
      columns={columnNames}
      data={rowData}
      title={title}
      actions={actions}
      options={options}
      localization={{
        // pagination: {
        //   labelRowsPerPage: "100"
        // },
        body: {
          addTooltip: "Add Row",
          deleteTooltip: "Delete Row",
          editTooltip: "Edit Row"
        }
      }}
      {...rest}
    />
  );
};

export default Table;
