import React, { useState, useEffect } from "react";
import { Grid, Typography, Drawer } from "@material-ui/core";
import styled from "styled-components";

// Common components
import { useAuth } from "../../common/Providers/Auth";
import { PageWrapper } from "../../common/Wrapper";
import SimplePageGrid from "../../common/SimplePageGrid";
import SimpleItemCard from "../../common/SimpleItemCard";

import { ColorPalette } from "../../common/Theme";
import ApiBilling from "../../api/Billing.js";

import BillingAddForm from "./components/Form";
import PaymentForm from "./components/PaymentForm";

const StyledSectiontitle = styled(Typography)`
  color: ${ColorPalette.text.tertiary};
  padding: 5px 0px;
  text-transform: uppercase;
`;
const SectionTitle = props => (
  <StyledSectiontitle variant="subtitle2" {...props} />
);

const renderBill = (
  { id, title, due_date, amount, is_payed },
  onClick = () => {}
) => (
  <SimpleItemCard
    key={id}
    title={title}
    subtitle={`${is_payed ? "Payed" : "Pending"} | Due Date: ${due_date}`}
    price={amount}
    onClick={onClick}
  />
);

export default function() {
  const [billingList, setBillingList] = useState([]);
  const [isBottomDrawerVisible, setBottomDrawerVisible] = useState(false);
  const [bottomDrawerContentType, setBottomDrawerContentType] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);

  const { isAdmin } = useAuth();

  useEffect(() => {
    ApiBilling.getUserBills().then(res => setBillingList(res.bill));
  }, []);

  useEffect(() => {
    if (selectedBill !== null) {
      setBottomDrawerVisible(true);
      setBottomDrawerContentType("bill");
    }
  }, [selectedBill]);

  useEffect(() => {
    if (bottomDrawerContentType !== null) setBottomDrawerVisible(true);
  }, [bottomDrawerContentType]);

  return (
    <React.Fragment>
      {/* Bill detailed card */}
      <Drawer
        anchor="bottom"
        open={isBottomDrawerVisible}
        onClose={() => {
          setBottomDrawerVisible(false);
          setBottomDrawerContentType(null);
          setSelectedBill(null);
        }}
      >
        {bottomDrawerContentType === "bill" && selectedBill && (
          <PaymentForm
            bill={selectedBill}
            onSuccessfulSubmit={updatedBill => {
              let list = billingList;

              list.find((bill, index) => {
                if (bill.id === updatedBill.id) {
                  list[index] = updatedBill;
                  return true;
                }
              });
              setBillingList(list);
              setTimeout(() => {
                setBottomDrawerVisible(false);
                setBottomDrawerContentType(null);
              }, 500);
            }}
          />
        )}
        {bottomDrawerContentType === "form" && (
          <BillingAddForm
            onSuccessfulSubmit={bill => {
              setBottomDrawerVisible(false);
              setBottomDrawerContentType(null);
            }}
          />
        )}
      </Drawer>
      <PageWrapper>
        <SimplePageGrid showSideNavBtn title="Billing" justify="flex-start">
          <Grid
            item
            container
            style={{
              paddingBottom: "0",
              paddingTop: "0"
            }}
            justify="space-between"
          >
            <Grid item>
              <SectionTitle>Billing</SectionTitle>
            </Grid>

            {isAdmin && (
              <Grid item style={{ cursor: "pointer" }}>
                <Typography
                  variant="h4"
                  color="textSecondary"
                  onClick={() => setBottomDrawerContentType("form")}
                >
                  +
                </Typography>
              </Grid>
            )}
          </Grid>
          {!billingList || !billingList.length ? (
            <Grid item>
              <Typography
                variant="body1"
                align="center"
                style={{ padding: "2rem" }}
              >
                All Billing will appear here.
              </Typography>
            </Grid>
          ) : (
            billingList.map(bill =>
              renderBill(bill, () => {
                setSelectedBill(bill);
              })
            )
          )}
        </SimplePageGrid>
      </PageWrapper>
    </React.Fragment>
  );
}
