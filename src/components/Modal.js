import React from "react";
import { useDispatch, useSelector } from "react-redux";
import addNewCard from "../redux/actions";
import { Formik } from "formik";
import validationsSchema from "./validation";

const GOLAST = 10;
export default function Modal({ onHideModal, onAddingCard }) {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state);

  const doSubmit = (values) => {
    if (cards.find((card) => card.number === values.number)) {
      alert("This card number already exists");
      return;
    }
    const checkNumber = values.number[0];
    switch (checkNumber) {
      case "4":
        values.issuer = "Visa";
        break;
      case "5":
        values.issuer = "MasterCard";
        break;
      default:
        values.issuer = "XYZ";
    }
    dispatch(addNewCard(values));
    onAddingCard(GOLAST);
    onHideModal();
  };

  return (
    <div className="Overlay">
      <div className="Modal" id="modal">
        <Formik
          initialValues={{
            number: "",
            holder: "",
            cvv: "",
            expM: "",
            expY: "",
            issuer: "",
          }}
          onSubmit={(values) => {
            doSubmit(values);
          }}
          validationSchema={validationsSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            dirty,
          }) => (
            <>
              <label>
                Card number:{" "}
                <input
                  type="text"
                  name="number"
                  value={values.number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="1234 5678 9876 5432"
                ></input>
              </label>
              {touched.number && errors.number && <span>{errors.number}</span>}
              <br />
              <label>
                Cardholder name:{" "}
                <input
                  type="text"
                  name="holder"
                  value={values.holder}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="John Gold"
                ></input>
              </label>
              {touched.holder && errors.holder && <span>{errors.holder}</span>}
              <br />
              <label>
                CVV:{" "}
                <input
                  type="text"
                  name="cvv"
                  value={values.cvv}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="007"
                ></input>
              </label>
              {touched.cvv && errors.cvv && <span>{errors.cvv}</span>}
              <br />
              <label>
                Expiration date:{" "}
                <input
                  type="text"
                  name="expM"
                  value={values.expM}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="month (1-12)"
                />
                {touched.expM && errors.expM && <span>{errors.expM}</span>}
                <br />
                <input
                  type="text"
                  name="expY"
                  value={values.expY}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="year (2021 +)"
                  className="yearInp"
                />
                {touched.expY && errors.expY && <span>{errors.expY}</span>}
              </label>
              <br />
              <button
                disabled={!isValid || !dirty}
                type="submit"
                onClick={handleSubmit}
              >
                Add card
              </button>
              <button onClick={onHideModal} name="cancel">
                Cancel
              </button>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}
