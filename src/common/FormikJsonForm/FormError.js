import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";

export default props => {
  const [isOpen, setOpen] = useState(true);

  return (
    <Snackbar
      anchor={{ horizontal: "center", vertical: "bottom" }}
      autoHideDuration={4000}
      open={isOpen}
      onClose={() => {
        setOpen(false);
      }}
      {...props}
    />
  );
};
