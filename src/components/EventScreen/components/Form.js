import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { string, number, date } from "yup";

import FormikJsonForm from "../../../common/FormikJsonForm";
import { PageWrapper } from "../../../common/Wrapper";

import ApiEvent from "../../../api/Event.js";

const formSchema = [
  <Grid item>
    <Typography variant="h5">New Event</Typography>
  </Grid>,
  {
    type: "text",
    name: "title",
    label: "Event title",
    value: "",
    validate: string().required()
  },
  {
    type: "text",
    name: "description",
    label: "Description",
    value: "",
    multiline: true,
    validate: string().required()
  },
  {
    type: "number",
    name: "amount",
    label: "Participation Fee",
    value: "",
    validate: number()
      .min(100)
      .required()
  },
  {
    type: "date",
    name: "end_time",
    label: "End Date",
    value: "",
    validate: date()
      .min(new Date())
      .required()
  },
  {
    label: "Add event",
    onSubmitLabel: "Adding event...",
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
    let { end_time, ...restFields } = fields;
    restFields = { ...restFields, end_time: formatDate(end_time) };

    ApiEvent.create(restFields).then(res => {
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
        formikBag.setStatus("Event added successfully");

        if (onSuccessfulSubmit) {
          onSuccessfulSubmit(res["event"]);
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
