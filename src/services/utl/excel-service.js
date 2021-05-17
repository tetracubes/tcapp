import XLSX from "xlsx";
import * as lodash from "lodash";
import { object } from "prop-types";
//data={sheetname:[],sheetname1:[]}, filename=="export filename"

//eg:- implementing both export and import of excel file
{
  /* <input type="file" name="myFile" onChange={ async (e) => {
          const files = e.target.files;
          if (files && files[0]) {
            spinnerService.show("appSpinner");
            await excelservice.importFile(files[0]).then((data)=>{
              if(data){
                alert("file processed Succesfully!!!");

              }

              // excelservice.exportFile(data,"New Exported File")
              spinnerService.hide("appSpinner");
            })
            
          }
        }} /> */
}

export function exportFile(data, filename) {
  filename = filename || "export " + Date.toString();
  /* convert state to workbook */
  if (!lodash.isArray(data)) {
    if (Object.keys(data).length > 0) {
      const wb = XLSX.utils.book_new();
      Object.keys(data).map(key => {
        if (typeof data[key][0] == "object" && lodash.isArray(data[key][0])) {
          const ws = XLSX.utils.aoa_to_sheet(data[key]);
          XLSX.utils.book_append_sheet(wb, ws, key || "export " + key);
        } else {
          const ws = XLSX.utils.json_to_sheet(data[key]);
          XLSX.utils.book_append_sheet(wb, ws, key || "export " + key);
        }
      });

      /* generate XLSX file and send to client */
      XLSX.writeFile(wb, filename + ".xlsx");
    }
  } else {
    if (data.length > 0) {
      if (typeof data[0] == "object" && !lodash.isArray(data[0])) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Export");
        XLSX.writeFile(wb, filename + ".xlsx");
      } else {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Export");
        XLSX.writeFile(wb, filename + ".xlsx");
      }
    }
  }
}

// file=> files list for reading
// onChange={ async (e) => {
//     const files = e.target.files;
//     if (files && files[0]) {
//       await excelservice.importFile(files[0]).then((data)=>{
//         if(data){
//           alert("file processed Succesfully!!!");
//         }

//       })

//     }
//   }}
export function importFile(file) {
  /* Boilerplate to set up FileReader */
  const reader = new FileReader();
  const rABS = !!reader.readAsBinaryString;

  return new Promise((reslove, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException("Problem parsing input file."));
    };
    reader.onload = e => {
      let result = {};
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      for (let i = 0; i < wb.SheetNames.length; i++) {
        const wsname = wb.SheetNames[i];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, { defval: "" ,raw:false});
        /* Update state */
        if (data.length > 0) {
          result[wsname] = data;
          // this.setState({ data: data, cols: make_cols(ws['!ref']) });
        }
      }
      reslove(result);
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
}
