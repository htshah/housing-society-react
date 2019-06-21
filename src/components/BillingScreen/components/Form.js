import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { string, number, date } from "yup";

import FormikJsonForm from "../../../common/FormikJsonForm";
import { PageWrapper } from "../../../common/Wrapper";

import ApiBilling from "../../../api/Billing.js";

const formSchema = [
  <Grid item>
    <Typography variant="h5">New Event</Typography>
  </Grid>,
  {
    type: "text",
    name: "title",
    label: "Bill name",
    value: "",
    validate: string().required()
  },
  {
    type: "number",
    name: "amount",
    label: "Amount",
    value: "",
    validate: number()
      .min(1)
      .required()
  },
  {
    type: "number",
    name: "flat_id",
    label: "Flat no.",
    value: "",
    validate: number()
      .min(1)
      .required()
  },
  {
    type: "date",
    name: "due_date",
    label: "Due Date",
    value: "",
    validate: date()
      .min(new Date())
      .required()
  },
  {
    label: "Add bill",
    onSubmitLabel: "Adding bill...",
    type: "submit",
    fullWidth: true,
    style: { marginTop: "20px" }
  }
];

const formatDate = date => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export default ({ onSuccessfulSubmit }) => {
  const handleSubmit = (fields, formikBag) => {
    let { due_date, ...restFields } = fields;
    restFields = { ...restFields, due_date: formatDate(due_date) };

    ApiBilling.create(restFields).then(res => {
      console.log(res);
      if (res["success"] === false) {
        if (res["message"] !== undefined) {
          formikBag.setStatus(res["message"]);
        }
        if (res["errors"] !== undefined) {
          // There was some error
          let errors = {};

          Object.keys(res.errors).forEach(key => {
            errors = { ...errors, [key]: res.errors[key][0] };
          });
          formikBag.setErrors(errors);
        }
      } else {
        formikBag.setStatus("Bill created successfully");

        if (onSuccessfulSubmit) {
          onSuccessfulSubmit(res["bill"]);
        }
      }
      formikBag.setSubmitting(false);
    });
  };

  return (
    <PageWrapper style={{ minHeight: "0" }}>
      <FormikJsonForm
        onSubmit={handleSubmit}
        schema={formSchema}
        disableFieldsOnSubmit
      />
    </PageWrapper>
  );
};
