import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { string } from "yup";

import FormikJsonForm from "../../../common/FormikJsonForm";
import { PageWrapper } from "../../../common/Wrapper";

import ApiNotice from "../../../api/Notice.js";

const formSchema = [
  <Grid item>
    <Typography variant="h5">New Notice</Typography>
  </Grid>,
  {
    type: "text",
    name: "title",
    label: "Notice title",
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
    label: "Add notice",
    onSubmitLabel: "Adding notice...",
    type: "submit",
    fullWidth: true,
    style: { marginTop: "20px" }
  }
];

export default ({ onSuccessfulSubmit }) => {
  const handleSubmit = (fields, formikBag) => {
    ApiNotice.create(fields).then(res => {
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
        formikBag.setStatus("Notice added successfully");

        if (onSuccessfulSubmit) {
          onSuccessfulSubmit(res['notice']);
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
