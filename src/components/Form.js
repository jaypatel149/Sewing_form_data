import React from "react";
import "./Form.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();



  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${second}`;
  };


  const onSubmit = async (data) => {
    console.log(data);
    const formDataList = [];
  
    for (let i = 0; i < 9; i++) {
      const formData = new FormData();
      formData.append("Date", getCurrentDate());
      formData.append("Time", getCurrentTime());
      formData.append("GieStyle", data.GieStyle?.trim().toUpperCase());
      formData.append("Buyer", data.Buyer?.trim().toUpperCase());
      formData.append("Color", data.Color?.trim().toUpperCase());
      formData.append("BuyerStyle", data.BuyerStyle?.trim().toUpperCase());
      formData.append("Line", data.Line?.trim().toUpperCase());
      formData.append("Notes", data.Notes?.trim().toUpperCase());
      
      const Size = data[`Size${i}`]?.trim().toUpperCase();
      const Cut = data[`Cut${i}`]?.trim().toUpperCase();
      
      if (Size && Cut) {
        formData.append(`Size`, Size);
        formData.append(`Cut`, Cut);
        formDataList.push(formData);
      }
    }
  
    if (formDataList.length > 0) {
      try {
        const responses = await Promise.all(
          formDataList.map((formData) =>
            axios.post(
              "https://script.google.com/macros/s/AKfycbxvxmhiYFAXpN8mFV7skDGcCJ7yQZHtsRWJ4ZQm_oAJECKNfAdXJA17MD9e-ILtIrpTxg/exec",
              formData
            )
          )
        );
  
        console.log(responses.map((response) => response.data))
        toast.success("Form submission successful!");
      } catch (error) {
        console.error(error);
        toast.error("Form submission failed. Please try again later.");
      }
    }
  
    reset();
  };
  




  return (
    <div className="container my-5">
      <form
        className="d-flex align-items-center justify-content-center vh-100"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="card bg-dark text-white fw-bold">
          <div className="d-flex justify-content-between align-items-center  logo">
            <img src="/assests/logo1.png" alt="logo" />
            <h1>Growel Impex</h1>
          </div>
          <h2 style={{ color: "green", marginBottom: "2rem" }} className="text-center">Sewing Form</h2>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="date" className="mb-2">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="Date"
                  name="Date"
                  value={getCurrentDate()}
                  readOnly
                  {...register("Date")}
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="time" className="mb-2">Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="Time"
                  name="Time"
                  value={getCurrentTime()}
                  readOnly
                  {...register("Time")}
                />
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="GieStyle" className="mb-2">GIE Style</label>
                <input
                  type="text"
                  className="form-control"
                  id="GieStyle"
                  name="GieStyle"
                  {...register("GieStyle", {
                    required: "GIE style is require.",
                  })}
                />
                {errors.GieStyle && (
                  <div className="text-danger">{errors.GieStyle.message}</div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="Buyer" className="mb-2">Buyer</label>
                <input
                  type="text"
                  className="form-control"
                  id="Buyer"
                  name="Buyer"
                  {...register("Buyer", { required: "Buyer is require." })}
                />
                {errors.Buyer && (
                  <div className="text-danger">{errors.Buyer.message}</div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="Color" className="mb-2">Color</label>
                <input
                  type="text"
                  className="form-control"
                  id="Color"
                  name="Color"
                  {...register("Color", { required: "Color is required." })}
                />
                {errors.Color && (
                  <div className="text-danger">{errors.Color.message}</div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="buyerStyle" className="mb-2">Buyer Style</label>
                <input
                  type="text"
                  className="form-control"
                  id="BuyerStyle"
                  name="BuyerStyle"
                  {...register("BuyerStyle", {
                    required: "Buyer Style is required.",
                  })}
                />
                {errors.BuyerStyle && (
                  <div className="text-danger">{errors.BuyerStyle.message}</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="line" className="mb-2">Line</label>
              <input
                type="text"
                className="form-control"
                id="Line"
                name="Line"
                {...register("Line", { required: "line is required." })}
              />
              {errors.Line && (
                <div className="text-danger">{errors.Line.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="size" className="mb-2">Size</label>
              <div className=" d-flex align-items-center">
                {[...Array(9)].map((_, index) => (
                  <div key={index} className="me-2">
                    <input
                      type="text"
                      className="form-control mr-2"
                      id={`Size${index}`}
                      name={`Size${index}`}
                      {...register(`Size${index}`)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="cutQty" className="mb-2">Cut QTY</label>
              <div className=" d-flex align-items-center ">
                {[...Array(9)].map((_, index) => (
                  <div key={index} className="me-2">
                    <input
                      type="text"
                      className="form-control mr-2"
                      id={`Cut${index}`}
                      name={`Cut${index}`}
                      {...register(`Cut${index}`)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="Notes" className="mb-2">Notes </label>
              <textarea
                className="form-control"
                id="Notes"
                rows="3"
                name="Notes"
                {...register("Notes", { required: "Please enter some notes." })}
              />
              {errors.Notes && (
                <div className="text-danger">{errors.Notes.message}</div>
              )}
            </div>
            <div className="col-md-12 col-sm-12">
              <button
                type="submit"
                className="btn btn-secondary w-100 fw-bold fs-5 mb-5"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;


