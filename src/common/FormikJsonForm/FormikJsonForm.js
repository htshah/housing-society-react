import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { object } from "yup";
import { Grid } from "@material-ui/core";

import SimpleField, { isSimpleElement } from "./SimpleField";
import FormError from "./FormError";

// There can be following types of elements:
// 1. SimpleElements
// 2. ComplexElements
// 3. Other Elements

// TODO change default values after first render
// TODO global form styling
// TODO general error message handling
// TODO show errors when submitting form

const renderChild = (element, disableFieldsOnSubmit, formikProps, index) => {
  // Render a normal react element

  if (isSimpleElement(element)) {
    const { GridItemProps, ...filteredElement } = element;

    return (
      <SimpleField
        key={index}
        {...filteredElement}
        disabled={
          element.disabled ||
          (disableFieldsOnSubmit && formikProps.isSubmitting)
        }
        formikProps={formikProps}
      />
    );
  } else if (React.isValidElement(element)) {
    return element;
  }
};

const renderGroupElements = (elements, disableFieldsOnSubmit, formikProps) => {
  return elements.map((ele, i) => {
    return (
      <Grid item key={i} {...ele.GridItemProps}>
        {renderChild(ele, disableFieldsOnSubmit, formikProps)}
      </Grid>
    );
  });
};

const JsonForm = ({
  schema,
  disableFieldsOnSubmit,
  onInitialize,
  formikProps,
}) => {
  useEffect(() => {
    onInitialize && onInitialize();
  }, []);
  return (
    <React.Fragment>
      {typeof formikProps.status !== "undefined" && (
        <FormError message={formikProps.status} />
      )}
      <Grid
        container
        spacing={8}
        direction="column"
        justify="center"
        alignItems="stretch"
      >
        {schema.map((element, index) => {
          // TODO if group element then get Grid item props
          const isGroupElement = element.type === "group";
          if (element.type === "hidden") {
            return renderChild(
              element,
              disableFieldsOnSubmit,
              formikProps,
              index
            );
          }
          return (
            <Grid
              key={index}
              item
              container={isGroupElement}
              {...element.GridItemProps}
            >
              {isGroupElement
                ? renderGroupElements(
                    element.elements,
                    disableFieldsOnSubmit,
                    formikProps
                  )
                : renderChild(element, disableFieldsOnSubmit, formikProps)}
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

const transformFormSchema = schema => {
  let formSchema = [];
  let initialValues = {};
  let validationSchema = {};

  schema.map((element, i) => {
    // Add to initial value and validtionSchema
    // only if the Object is not a React.Element
    if (React.isValidElement(element)) {
      formSchema = [...formSchema, element];
      return;
    }

    const isGroupElement = element.type === "group";

    // Convert all elements to array(making it compatible with group elements)
    const fields = isGroupElement ? element.elements : [element];

    const newFields = fields.map(field => {
      const { value, validate, ...newField } = field;

      // Add default value only if the field takes
      // an input from user.
      if (!["submit", "button"].includes(newField.type)) {
        // Use "" || [] based on input type if no default
        // value provided.
        initialValues = {
          ...initialValues,
          [newField.name]: value || (newField.type === "checkbox" ? [] : ""),
        };
      }

      // Add validation only if provided.
      if (validate) {
        validationSchema = { ...validationSchema, [newField.name]: validate };
      }

      return newField;
    });

    // Add all form elements to formSchema
    formSchema = [
      ...formSchema,
      isGroupElement ? { ...element, elements: newFields } : newFields[0],
    ];
  });
  // Convert validationSchema to Yup.object and return.
  return {
    formSchema,
    initialValues,
    validationSchema: object().shape(validationSchema),
  };
};

export default ({
  schema,
  disableFieldsOnSubmit,
  onInitialize,
  ...formikProps
}) => {
  const { formSchema, initialValues, validationSchema } = transformFormSchema(
    schema
  );

  return (
    <Formik
      {...formikProps}
      initialValues={initialValues}
      validationSchema={validationSchema}
      render={props => {
        return (
          <Form>
            <JsonForm
              formikProps={props}
              disableFieldsOnSubmit={disableFieldsOnSubmit || false}
              schema={formSchema}
              onInitialize={() => {
                onInitialize && onInitialize(props);
              }}
            />
          </Form>
        );
      }}
    />
  );
};
