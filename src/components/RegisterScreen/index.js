import React from "react";
import { Grid } from "@material-ui/core";

// Common components
import { PageWrapper } from "../../common/Wrapper";
import SimplePageGrid from "../../common/SimplePageGrid";
import FormikJsonForm from "../../common/FormikJsonForm";
import { AuthConsumer } from "../../common/Providers/Auth";
import { StyledLink as Link } from "../../common/Link";
import { string, number } from "yup";

const formSchema = [
  {
    type: "text",
    name: "first_name",
    label: "First Name",
    value: "",
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
    value: "",
    validate: string()
      .trim()
      .matches(/^[A-Za-z]+$/, "Only letters are allowed.")
      .max(50)
      .required()
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    value: "",
    validate: string()
      .email()
      .required()
  },
  {
    type: "tel",
    name: "phone",
    label: "Phone",
    value: "",
    validate: string()
      .matches(/^[0-9]{10}$/)
      .required()
  },
  {
    type: "number",
    name: "flat_id",
    label: "Flat no",
    value: "",
    validate: number()
      .min(100)
      .required()
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    value: "",
    validate: string()
      .min(6)
      .required()
  },
  {
    type: "submit",
    label: "Register",
    onSubmitLabel: "Registering...",
    fullWidth: true,
    style: { marginTop: "20px" }
  },
  <Grid container justify="center">
    <Grid item>
      <Link to="/" color="default">
        Already have an account? Login.
      </Link>
    </Grid>
  </Grid>
];

export default ({ history }) => {
  const handleSubmit = (values, formikBag, register) => {
    let { first_name, last_name, ...restValues } = values;
    restValues["name"] = first_name + " " + last_name;
    formikBag.setStatus(undefined);
    register(restValues).then(res => {
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
        formikBag.setSubmitting(false);
      } else {
        formikBag.setStatus("Registered successfully");
        setTimeout(() => {
          history.push({
            pathname: "/"
          });
        }, 1500);
      }
    });
  };

  return (
    <AuthConsumer>
      {({ register }) => (
        <PageWrapper>
          <SimplePageGrid title="Register">
            {/* Registration form */}
            <Grid item>
              <FormikJsonForm
                schema={formSchema}
                onSubmit={(values, formikBag) =>
                  handleSubmit(values, formikBag, register)
                }
              />
            </Grid>
          </SimplePageGrid>
        </PageWrapper>
      )}
    </AuthConsumer>
  );
};
