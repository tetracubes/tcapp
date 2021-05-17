import React, { Fragment, useState, useEffect, lazy } from "react";
import DialogModal from "shared/components/dialog-modal/dialog-modal";
import Table from "shared/components/material-table/material-table";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { spinnerService } from "shared/components/spinner/spinnerservice";
import * as excelservice from "shared/services/utils/excel/excel-service";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import * as Utility from "shared/services/utils/Utility/Utility";
import * as AlertService from "shared/services/utils/alert/alert-service";

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh"
  }
});

const ImportModal = ({
  classes,
  buttonText = "Import",
  name = "Import",
  onConfirmReturnData
}) => {
  const theme = useTheme();
  const [modalState, setModalState] = useState(false);
  const [importedData, setImportedData] = useState({});
  const [fileList, setFileList] = useState([]);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const showOrHideModal = () => {
    setModalState(true);
    setFileList([]);
  };
  //prettier-ignore
  async function handleFile(e) {
    let form = document.getElementById('fileform');
    setFileList([]);
    let files = e.target.files;
    if (e.dataTransfer !== undefined && e.dataTransfer.files.length > 0) {
      files = e.dataTransfer.files;
    }
    if (files && files[0]) {
      var tStart = performance.now();
      populateFileList(files);
      spinnerService.show("appSpinner");
      setImportedData({});
      await excelservice.importFile(files[0]).then((data) => {
        setImportedData(data);
        spinnerService.hide("appSpinner");
        AlertService.Success("Successfully Imported!!! (" + Utility.formatTime(performance.now() - tStart) + ")");
        // alert("Successfully processed ( started :" + tStart + "=" + Utility.formatTime(performance.now() - tStart) + ")");
      }, (reject) => {
        setImportedData({});
        AlertService.Error("Import :- " + reject);

      })
    }

    form.reset();
  }
  //prettier-ignore
  const populateFileList = (files) => {
    let tempFileList = [];
    for (var i = 0; i < files.length; i++) {
      if (files[i].name) {
        let obj = {};
        obj["name"] = files[i].name
        obj["size"] = Utility.formatBytes(files[i].size);
        obj["time"] = Date();
        tempFileList.push(obj)
      }
    }
    setFileList(tempFileList);
  }
  const handleClose = () => {
    setModalState(false);
    onConfirmReturnData({});
    setImportedData({});
    setFileList([]);
  };
  //prettier-ignore
  const handleSave = () => {
    if (typeof onConfirmReturnData !== "undefined" && typeof onConfirmReturnData == "function") {
      onConfirmReturnData(importedData);
      if (Object.keys(importedData).length !== 0) {
        AlertService.Success("Import Processed Successfully!!!");
      }
    }
    setModalState(false);
    setImportedData({});
    setFileList([]);
  }
  //prettier-ignore
  const getColumNames = (data) => {
    let columns = [];
    if (data.length > 0) {
      Object.keys(data[0]).map((key) => {
        let obj = { title: key, field: key }
        columns.push(obj);
      })
    }
    return columns;
  }
  //prettier-ignore
  const suppress = (evt) => { evt.stopPropagation(); evt.preventDefault(); };
  //prettier-ignore
  const onDrop = (evt) => {
    evt.stopPropagation(); evt.preventDefault();
    const files = evt.dataTransfer.files;
    if (files && files[0]) handleFile(evt);
  };
  //prettier-ignore
  return (
    <div>
      <Button name={"dynamicImportButton"} onClick={showOrHideModal}
        className={classes.button}
        variant="contained"
        color="primary"
      >
        {buttonText}
      </Button>
      {modalState &&
        <DialogModal
          fullScreen={fullScreen}
          description={"Import Modal"}
          popUpModalState={modalState}
          handlePopUpSave={e => handleSave(e)}
          handlePopUpClose={handleClose}
          name={name}
        >
          <form id="fileform">
            <div style={{ "border": "2px cadetblue solid", "padding": "5px" }} onDrop={(e) => onDrop(e)} onDragEnter={(e) => suppress(e)} onDragOver={(e) => suppress(e)}>
              <input type="file" name="myFile" onChange={(e) => handleFile(e)} />
            </div>
          </form>
          {fileList && fileList.length > 0 &&
            fileList.map((file, index) => {
              return (
                <Paper elevation={2} style={{ marginBottom: "5px" }} key={index + "-" + " fileName"}>
                  <div style={{ "padding": "4px" }} >
                    {file.name} ( {file.size} ) Imported on {file.time}
                  </div>
                </Paper>
              )
            })
          }
          {/* <input type="file" name="myFile" onChange={async (e) => {
            const files = e.target.files;
            if (files && files[0]) {
              spinnerService.show("appSpinner");
              await excelservice.importFile(files[0]).then((data) => {
                setImportedData(data);
                spinnerService.hide("appSpinner");
              }, (reject) => {
                setImportedData({});

              })

            }
          }} /> */}

          {importedData && Object.keys(importedData).length > 0 &&
            Object.keys(importedData).map((key) => {
              return (
                <div key={key}>
                  {importedData[key].length > 0 &&
                    <Paper elevation={20} style={{ marginBottom: "5px" }}>
                      <Table
                        columnNames={getColumNames(importedData[key])}
                        rowData={importedData[key]}
                        title={"Excel Imported Data ( " + key + " )"}
                        // actions={[]}
                        filter={true}
                        grouping={true}
                        // editable={{
                        //   onRowAdd: newData =>
                        //     new Promise((resolve, reject) => {
                        //       setTimeout(() => {
                        //         {
                        //           const data = importedData;
                        //           data[key].push(newData);
                        //           setImportedData({ data }, () => resolve());
                        //         }
                        //         resolve()
                        //       }, 1000)
                        //     }),
                        //   onRowUpdate: (newData, oldData) =>
                        //     new Promise((resolve, reject) => {
                        //       setTimeout(() => {
                        //         {
                        //           const data = importedData;
                        //           const index = data[key].indexOf(oldData);
                        //           data[key][index] = newData;
                        //           setImportedData({ data }, () => resolve());
                        //         }
                        //         resolve()
                        //       }, 1000)
                        //     }),
                        //   onRowDelete: oldData =>
                        //     new Promise((resolve, reject) => {
                        //       setTimeout(() => {
                        //         {
                        //           let data = importedData;
                        //           const index = data[key].indexOf(oldData);
                        //           data[key].splice(index, 1);
                        //           setImportedData({ data }, () => resolve());
                        //         }
                        //         resolve()
                        //       }, 1000)
                        //     }),
                        // }}
                      // rowStyle={{}}
                      />
                    </Paper>
                  }
                </div>

              )
            }
            )}

        </DialogModal>}
    </div>

  );
};

export default withStyles(styles)(ImportModal);
