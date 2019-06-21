import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { string } from "yup";

import { PageWrapper } from "../../common/Wrapper";
import SimplePageGrid from "../../common/SimplePageGrid";
import FormikJsonForm from "../../common/FormikJsonForm";

import ApiProfile from "../../api/Profile";

export default () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    ApiProfile.getCurrentUser().then(res => {
      setProfile(res.user);
    });
  }, []);

  const formSchema = [
    {
      type: "text",
      name: "first_name",
      label: "First Name",
      value: (profile.name && profile.name.split(" ")[0]) || "",
      validate: string()
        .trim()
        .matches(/^[A-Za-z]+$/, "Only letters are allowed.")
        .max(50)
        .required()
    },
    {
      type: "text",
      name: "last_name",
      label: "Last Name",
      value: (profile.name && profile.name.split(" ")[1]) || "",
      validate: string()
        .trim()
        .matches(/^[A-Za-z]+$/, "Only letters are allowed.")
        .max(50)
        .required()
    },
    {
      type: "email",
      name: "email",
      label: `Email`,
      value: profile.email || "",
      validate: string()
        .email()
        .required()
    },
    {
      type: "tel",
      name: "phone",
      label: `Phone`,
      value: profile.phone || "",
      validate: string()
        .matches(/^[0-9]{10}$/)
        .required()
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      value: "",
      validate: string().min(6)
    },
    {
      type: "submit",
      label: "Save",
      onSubmitLabel: "Saving...",
      fullWidth: true,
      style: { marginTop: "20px" }
    }
  ];

  const handleSubmit = (
    { first_name, last_name, password, ...restValues },
    formikBag
  ) => {
    let values = { ...restValues, name: first_name + " " + last_name };
    if (password.length > 0) {
      values = { password, ...values };
    }
    formikBag.setStatus(undefined);
    ApiProfile.update(values).then(res => {
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
        formikBag.setStatus("Profile updated successfully");
      }
      formikBag.setSubmitting(false);
    });
  };

  return (
    <PageWrapper minHeight={false}>
      <SimplePageGrid showSideNavBtn title="Profile" justify="flex-start">
        <Grid item>
          <FormikJsonForm
            schema={formSchema}
            enableReinitialize
            onSubmit={(values, formikBag) => handleSubmit(values, formikBag)}
          />
        </Grid>
      </SimplePageGrid>
    </PageWrapper>
  );
};
