import React, { useContext, createContext, useState } from "react";
import csv2json from "csvjson-csv2json";
import { parseAsync } from "json2csv";

const ProcessContext = createContext();

export function useProcessor() {
  return useContext(ProcessContext);
}

export default function ProcessProvider({ children }) {
  const [fileState, setFileState] = useState({
    shopifyFile: null,
    forbesFile: null,
    newStock: null,
    download: null,
    csvFile: null,
  });

  function process(file, fileType) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        var data = reader.result;

        if (fileType === "json") {
          var json = convertToJson(data.toString().split("\n"), true);
          resolve(json);
        } else {
          var json = convertToJson(data.toString().split("\n"), false);
          resolve(json);
        }
      };
      reader.readAsText(file);
    });
  }

  function convertToJson(file, string) {
    console.log(file[0]);

    let csvString = "placeholder," + String(file);

    console.log(csvString);
    let data = csv2json(csvString);
    console.log({ data });

    return data;
  }

  function convertToJsonLegacy(data) {
    console.log("converting to json");
    let result = [];
    let headers = data[0].split(",");

    for (let i = 1; i < data.length - 1; i++) {
      let obj = {};

      let str = data[i];
      let s = "";

      let flag = 0;
      for (let ch of str) {
        if (ch === '"' && flag === 0) {
          flag = 1;
        } else if (ch === '"' && flag == 1) flag = 0;
        if (ch === "," && flag === 0) ch = "|";
        if (ch !== '"') s += ch;
      }

      let properties = s.split("|");
      console.log(s);
      console.log(properties);

      for (let j in headers) {
        if (!properties[j]) {
          obj[headers[j]] = "";
        } else {
          if (properties[j].includes(",")) {
            obj[headers[j]] = properties[j]
              .split(", ")
              .map((item) => item.trim());
          } else obj[headers[j]] = properties[j];
        }
        //console.log(obj);
      }
      result.push(obj);
      //console.log(result);
    }
    let json = JSON.stringify(result);
    return json;
  }

  function updateStock(newStock, products) {
    console.log("updating stock");
    let stockNumbers = {};
    let updatedStock = [];

    for (var item of newStock) {
      stockNumbers[item["Item No."]] =
        Number(item["Qty In Akl"]) + Number(item["Qty In CH"]);
    }

    for (var product of products) {
      if (
        String(product.SKU) in stockNumbers ||
        String(product["Variant SKU"]) in stockNumbers
      ) {
        product["51 Waterloo Road"] = stockNumbers[product.SKU];
        updatedStock.push(product);
      }
    }

    return updatedStock;
  }

  function updatePrice(newPrices, products) {
    let stockNumbers = {};
    let updatedPrices = [];

    for (var item of newPrices) {
      stockNumbers[item["Item No."]] = item["SRP"];
    }

    for (var product of products) {
      if (String(product["Variant SKU"]) in stockNumbers) {
        console.log(product["Variant SKU"]);
        product["Variant Price"] = stockNumbers[product["Variant SKU"]];
        product["Body (HTML)"] = "";

        //console.log(product);
        updatedPrices.push(product);
      }
    }

    return updatedPrices;
  }

  async function convertToCSVLegacy(data) {
    let csv = data.map((row) => {
      if (row["Body (HTML)"]?.includes(",")) {
        row["Body (HTML)"] = row["Body (HTML)"].replace(",", '","');
      }

      console.log(row["Body (HTML)"]);

      return Object.values(row);
    });
    console.log(csv);
    let cleanCsv = csv.map((row) => {
      if (Array.isArray(row[2]) && row[2]?.length > 1) {
        row[2] = row[2].join().replace(/,/g, "");
      }
      return row;
    });

    csv.unshift(Object.keys(data[0]));
    let csvList = csv.map((row) => {
      return row.join(",");
    });
    console.log(csvList);
    return `${csvList.join("\n")}`;
  }

  async function convertToCSV(data) {
    console.log("converting to csv");
    console.log(data);
    let fields = Object.keys(data[0]).filter((key) => key !== "placeholder");

    const opts = { fields, quote: "" };
    console.log(fields);
    let csv = await parseAsync(data, opts);

    console.log(csv.replace('"', ""));
    return csv;
  }

  function createBlob(csv) {
    console.log("create blob");
    var contentType = "text/csv;";
    var csvFile = new Blob([csv], { type: contentType });
    console.log(csvFile);
    var a = document.getElementById("download");
    a.download = "updatedStock.csv";
    a.href = window.URL.createObjectURL(csvFile);
    a.dataset.downloadurl = [contentType, a.download, a.href].join(":");
  }

  const value = {
    fileState,
    process,
    convertToJson,
    updateStock,
    convertToCSV,
    createBlob,
    updatePrice,
  };

  return (
    <ProcessContext.Provider value={value}>{children}</ProcessContext.Provider>
  );
}
