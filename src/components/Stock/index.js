import React, { useState } from "react";
import { useProcessor } from "../../context/ProcessContext";

export default function Stock() {
  const [state, setState] = useState({
    shopifyFile: null,
    forbesFile: null,
    newStock: null,
    download: null,
    csvFile: null,
    downloadBtn: true,
    buttonClass: "disabled",
  });

  const { process, updateStock, convertToCSV, createBlob } = useProcessor();

  const processFiles = async () => {
    let forbes = await process(state.forbesFile);
    let shopify = await process(state.shopifyFile);
    let stock = updateStock(forbes, shopify);
    console.log(stock);
    let csv = await convertToCSV(stock);
    console.log(csv);
    createBlob(csv);
  };

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
    setState({ ...state, buttonClass: "" });
  };

  return (
    <div className="my-container">
      <div className="form-container">
        <form action="" onSubmit={(e) => onSubmit(e)}>
          <h2>Update Stock</h2>
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
}
