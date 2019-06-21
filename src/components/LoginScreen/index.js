import React from "react";
import { Grid } from "@material-ui/core";
import { string } from "yup";
import { Cookies } from "react-cookie";

// Common Components
import { PageWrapper } from "../../common/Wrapper";
import SimplePageGrid from "../../common/SimplePageGrid";
import { BannerImage } from "../../common/Images";
import { StyledLink as Link } from "../../common/Link";
import FormikJsonForm from "../../common/FormikJsonForm";

// Images
import bannerImg from "../../images/logo.png";

//Providers
import { AuthConsumer } from "../../common/Providers/Auth";
const cookies = new Cookies();
const formSchema = [
  {
    type: "email",
    name: "email",
    label: "Email",
    value: "htshah60@gmail.com",
    validate: string()
      .email()
      .required()
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    value: "helloworld",
    validate: string()
      .min(6)
      .required()
  },
  {
    label: "Login",
    onSubmitLabel: "Logging in...",
    type: "submit",
    fullWidth: true,
    style: { marginTop: "20px" }
  },
  <Grid container justify="space-between">
    <Grid item>
      <Link to="/register" color="default">
        Register
      </Link>
    </Grid>
    <Grid item>
      <Link to="/" color="default">
        Forgot Password?
      </Link>
    </Grid>
  </Grid>
];

export default ({ history }) => {
  return (
    <AuthConsumer>
      {({ login, setAuth }) => (
        <React.Fragment>
          <PageWrapper>
            <SimplePageGrid title="Login">
              {/* Banner Image */}
              <Grid item>
                <BannerImage width="60%" src={bannerImg} />
              </Grid>

              {/* Login Form */}
              <Grid item>
                <FormikJsonForm
                  onSubmit={({ email, password }, formikBag) => {
                    formikBag.setStatus(undefined);
                    login(email, password).then(res => {
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
                        formikBag.setStatus("Logged in");
                        const expDate = new Date();
                        expDate.setDate(expDate.getDate() + 7);
                        cookies.set("token", res["data"]["token"], {
                          expires: expDate
                        });
                        setTimeout(() => {
                          window.location.reload();
                        }, 1500);
                      }
                    });
                  }}
                  schema={formSchema}
                />
              </Grid>
            </SimplePageGrid>
          </PageWrapper>
        </React.Fragment>
      )}
    </AuthConsumer>
  );
};
