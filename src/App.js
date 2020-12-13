import React, { useState } from "react";
import Logo from "./img/TruMotoLogo.png";
import "./scss/index.scss";

const App = () => {
  const [state, setState] = useState({
    shopifyFile: null,
    forbesFile: null,
    newStock: null,
    download: null,
    csvFile: null,
    downloadBtn: true,
    buttonClass: "disabled",
  });

  const onChange = (e) => {
    console.log(e.target.files[0]);
    setState({
      ...state,
      [e.target.name]: e.target.files[0],
    });
    //console.log(state);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    processFiles();
  };

  const processFiles = async () => {
    let forbes = await process(state.forbesFile);
    let shopify = await process(state.shopifyFile);
    let stock = updateStock(JSON.parse(forbes), JSON.parse(shopify));
    console.log(stock);
    let csv = await convertToCSV(stock);
    console.log(csv);
    createBlob(csv);
  };

  const process = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        var data = reader.result;
        var json = convertToJson(data.toString().split("\n"));
        //console.log(json);

        resolve(json);
      };
      reader.readAsText(file);
    });
  };

  const convertToJson = (data) => {
    console.log("converting to json");
    let result = [];
    let headers = data[0].split(",");
    //console.log(headers);

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
      //console.log(properties);

      for (let j in headers) {
        if (properties[j].includes(",")) {
          obj[headers[j]] = properties[j]
            .split(", ")
            .map((item) => item.trim());
        } else obj[headers[j]] = properties[j];
      }
      result.push(obj);
      //console.log(result);
    }
    let json = JSON.stringify(result);
    return json;
  };

  const updateStock = (newStock, products) => {
    console.log(state);
    let stockNumbers = {};
    let updatedStock = [];
    console.log(newStock[0]);

    for (var item of newStock) {
      stockNumbers[item["Item No."]] =
        Number(item["Qty In Akl"]) + Number(item["Qty In CH"]);
    }

    for (var product of products) {
      if (String(product.SKU) in stockNumbers) {
        product["51 Waterloo Road"] = stockNumbers[product.SKU];
        updatedStock.push(product);
      }
    }

    return updatedStock;
  };

  const convertToCSV = async (data) => {
    let csv = data.map((row) => Object.values(row));
    csv.unshift(Object.keys(data[0]));
    return `"${csv.join('"\n"').replace(/,/g, '","')}"`;
  };

  const createBlob = (csv) => {
    console.log("create blob");
    var contentType = "text/csv;charset=utf-8;";
    var csvFile = new Blob([csv], { type: contentType });
    console.log(csvFile);
    var a = document.getElementById("download");
    a.download = "updatedStock.csv";
    a.href = window.URL.createObjectURL(csvFile);
    a.dataset.downloadurl = [contentType, a.download, a.href].join(":");
    setState({
      ...state,
      buttonClass: "",
    });
  };

  return (
    <div className="my-container">
      <img src={Logo} alt="" className="logo" />
      <div className="form-container">
        <form action="" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <div className="form-group files">
              <label>Shopify CSV </label>
              <input
                type="file"
                className="form-control"
                name="shopifyFile"
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group files">
              <label>Forbes & Davies CSV </label>
              <input
                type="file"
                className="form-control"
                name="forbesFile"
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>

          <div className="buttons-container">
            <button type="submit" className="btn btn-primary mb-3">
              Submit
            </button>
            <a id="download" className={`btn btn-primary ${state.buttonClass}`}>
              Download Stock
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
