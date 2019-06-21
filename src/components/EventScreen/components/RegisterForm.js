import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { number } from "yup";

import FormikJsonForm from "../../../common/FormikJsonForm";
import { PageWrapper } from "../../../common/Wrapper";

import ApiEvent from "../../../api/Event.js";

const formSchema = [
  {
    type: "number",
    name: "no_of_people",
    label: "No of people",
    value: "1",
    validate: number()
      .min(1)
      .required()
  },
  {
    label: "Register for event",
    onSubmitLabel: "Registering for event...",
    type: "submit",
    fullWidth: true,
    style: { marginTop: "20px" }
  }
];

export default ({ event, onSuccessfulSubmit }) => {
  const handleSubmit = (fields, formikBag) => {
    ApiEvent.register(event.id, fields).then(res => {
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
        formikBag.setStatus("Event regsitered successfully");

        if (onSuccessfulSubmit) {
          onSuccessfulSubmit(res["event"]);
        }
      }
      formikBag.setSubmitting(false);
    });
  };

  return (
    <PageWrapper style={{ minHeight: "0" }}>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h4" style={{ marginBottom: "20px" }}>
            {event.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" color="textSecondary">
            {event.description}
          </Typography>
        </Grid>
        <Grid item style={{ paddingTop: "20px" }}>
          <FormikJsonForm
            onSubmit={handleSubmit}
            schema={formSchema}
            disableFieldsOnSubmit
          />
        </Grid>
      </Grid>
    </PageWrapper>
  );
};
