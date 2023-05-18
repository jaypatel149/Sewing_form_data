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
      formData.append("date", getCurrentDate());
      formData.append("time", getCurrentTime());
      formData.append("giestyle", data.giestyle?.trim().toUpperCase());
      formData.append("buyer", data.buyer?.trim().toUpperCase());
      formData.append("color", data.color?.trim().toUpperCase());
      formData.append("buyerStyle", data.buyerStyle?.trim().toUpperCase());
      formData.append("line", data.line?.trim().toUpperCase());
      formData.append("notes", data.notes?.trim().toUpperCase());
      
      const size = data[`size${i}`]?.trim().toUpperCase();
      const cutQty = data[`cutQty${i}`]?.trim().toUpperCase();
      
      if (size && cutQty) {
        formData.append(`size`, size);
        formData.append(`cutQty`, cutQty);
        formDataList.push(formData);
      }
    }
  
    if (formDataList.length > 0) {
      try {
        const responses = await Promise.all(
          formDataList.map((formData) =>
            axios.post(
              "https://script.google.com/macros/s/AKfycbyBA0aYpDJ4iGssKHXIDTiDvwGdG99kr36R5vvIehEidtSCxx2K5V22cGOCRFZHU07Kow/exec",
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
                  id="date"
                  name="date"
                  value={getCurrentDate()}
                  readOnly
                  {...register("date")}
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="time" className="mb-2">Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="time"
                  name="time"
                  value={getCurrentTime()}
                  readOnly
                  {...register("time")}
                />
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="giestyle" className="mb-2">GIE Style</label>
                <input
                  type="text"
                  className="form-control"
                  id="giestyle"
                  name="giestyle"
                  {...register("giestyle", {
                    required: "GIE style is require.",
                  })}
                />
                {errors.giestyle && (
                  <div className="text-danger">{errors.giestyle.message}</div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="buyer" className="mb-2">Buyer</label>
                <input
                  type="text"
                  className="form-control"
                  id="buyer"
                  name="buyer"
                  {...register("buyer", { required: "Buyer is require." })}
                />
                {errors.buyer && (
                  <div className="text-danger">{errors.buyer.message}</div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="color" className="mb-2">Color</label>
                <input
                  type="text"
                  className="form-control"
                  id="color"
                  name="color"
                  {...register("color", { required: "Color is required." })}
                />
                {errors.color && (
                  <div className="text-danger">{errors.color.message}</div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="buyerStyle" className="mb-2">Buyer Style</label>
                <input
                  type="text"
                  className="form-control"
                  id="buyerStyle"
                  name="buyerStyle"
                  {...register("buyerStyle", {
                    required: "Buyer Style is required.",
                  })}
                />
                {errors.buyerStyle && (
                  <div className="text-danger">{errors.buyerStyle.message}</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="line" className="mb-2">Line</label>
              <input
                type="text"
                className="form-control"
                id="line"
                name="line"
                {...register("line", { required: "line is required." })}
              />
              {errors.line && (
                <div className="text-danger">{errors.line.message}</div>
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
                      id={`size${index}`}
                      name={`size${index}`}
                      {...register(`size${index}`)}
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
                      id={`cutQty${index}`}
                      name={`cutQty${index}`}
                      {...register(`cutQty${index}`)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="notes" className="mb-2">Notes </label>
              <textarea
                className="form-control"
                id="notes"
                rows="3"
                name="notes"
                {...register("notes", { required: "Please enter some notes." })}
              />
              {errors.notes && (
                <div className="text-danger">{errors.notes.message}</div>
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


