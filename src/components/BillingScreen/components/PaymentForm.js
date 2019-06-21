import React from "react";
import { Grid, Typography } from "@material-ui/core";

import FormikJsonForm from "../../../common/FormikJsonForm";
import { PageWrapper } from "../../../common/Wrapper";

import ApiBilling from "../../../api/Billing.js";

const formSchema = [
  {
    label: "Pay bill",
    onSubmitLabel: "Payment processing...",
    type: "submit",
    fullWidth: true,
    style: { marginTop: "20px" }
  }
];

export default ({ bill, onSuccessfulSubmit }) => {
  const handleSubmit = (fields, formikBag) => {
    ApiBilling.pay(bill.id, fields).then(res => {
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
        formikBag.setStatus("Payment done successfully");

        if (onSuccessfulSubmit) {
          onSuccessfulSubmit(res["bill"]);
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
            {bill.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" color="textSecondary">
            {`${bill.is_payed ? "Payed" : "Pending"} | Due Date: ${
              bill.due_date
            }`}
          </Typography>
        </Grid>
        {!bill.is_payed && (
          <Grid item style={{ paddingTop: "20px" }}>
            <FormikJsonForm
              onSubmit={handleSubmit}
              schema={formSchema}
              disableFieldsOnSubmit
            />
          </Grid>
        )}
      </Grid>
    </PageWrapper>
  );
};
