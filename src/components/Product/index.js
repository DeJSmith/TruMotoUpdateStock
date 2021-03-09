import React, { useState } from "react";
import { useProcessor } from "../../context/ProcessContext";

export default function Product() {
  const [state, setState] = useState({
    shopifyFile: null,
    forbesFile: null,
    newStock: null,
    download: null,
    csvFile: null,
    downloadBtn: true,
    buttonClass: "disabled",
  });

  const {
    cleanInputCsv,
    process,
    updatePrice,
    convertToCSV,
    createBlob,
  } = useProcessor();
  const onChange = (e) => {
    console.log(e.target.files[0]);
    setState({
      ...state,
      [e.target.name]: e.target.files[0],
    });
    //console.log(state);
  };

  const processFiles = async () => {
    let forbes = await process(state.forbesFile, "json");
    let shopify = await process(state.shopifyFile);
    let stock = updatePrice(forbes, shopify);
    let csv = await convertToCSV(stock);

    createBlob(csv);
    setState({ ...state, buttonClass: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    processFiles();
  };
  return (
    <div className="my-container">
      <div className="form-container">
        <form action="" onSubmit={(e) => onSubmit(e)}>
          <h2>Update Products</h2>
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
              Download File
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
