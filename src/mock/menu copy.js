import React, { Component} from "react";

// masters
const ClientGroupComponent = React.lazy(() => import('../master/ClientGroup/ClientGroup_state'));
const ClientLogComponent = React.lazy(() => import('../master/City/City'));
const ClientComponent = React.lazy(() => import('../master/City/City'));
const VendorGroupComponent = React.lazy(() => import('../master/City/City'));
const VendorLogComponent = React.lazy(() => import('../master/City/City'));
const VendorComponent = React.lazy(() => import('../master/City/City'));
const ActivityGroupComponent = React.lazy(() => import('../master/City/City'));
const CityComponent = React.lazy(() => import('../master/City/City'));
const StateComponent = React.lazy(() => import('../master/City/City'));
const CountryComponent = React.lazy(() => import('../master/City/City'));
const UserComponent = React.lazy(() => import('../master/City/City'));
const PaymentModeComponent = React.lazy(() => import('../master/City/City'));
const PaymentTypeComponent = React.lazy(() => import('../master/City/City'));
const ActivityLogComponent = React.lazy(() => import('../master/City/City'));
const ActivityComponent = React.lazy(() => import('../master/City/City'));
const PaymentComponent = React.lazy(() => import('../master/City/City'));
const POAllotmentComponent = React.lazy(() => import('../master/City/City'));
const StatusReportComponent = React.lazy(() => import('../master/City/City'));
const LedgerComponent = React.lazy(() => import('../master/City/City'));
const AnnexureComponent = React.lazy(() => import('../master/City/City'));


// transcations

export const menuJson = [
  {
    "group": "Master"
    , "subgroup": "Client"
    , "menu": "Client Group"
    , "url": "/clientgroup"
    , "getComponent": (appConfig) => { return <ClientGroupComponent appConfig={appConfig} /> }
  },
  {
    "group": "Master"
    , "subgroup": "Client"
    , "menu": "Client Log"
    , "url": "/clientlog"
    , "getComponent": (appConfig) => { return <ClientLogComponent appConfig={appConfig} /> }
  },
  {
    "group": "Master"
    , "subgroup": "Client"
    , "menu": "Client Master"
    , "url": "/client"
    , "getComponent": (appConfig) => { return <ClientComponent appConfig={appConfig} /> }
  },
  {
    "group": "Master"
    , "subgroup": "Vendor"
    , "menu": "Vendor Group"
    , "url": "/vendorgroup"
    , "getComponent": (appConfig) => { return <VendorGroupComponent appConfig={appConfig} /> }
  },
  {
    "group": "Master"
    , "subgroup": "Vendor"
    , "menu": "Vendor Log"
    , "url": "/vendorlog"
    , "getComponent": (appConfig) => { return <VendorLogComponent appConfig={appConfig} /> }
  },
  {
    "group": "Master"
    , "subgroup": "Vendor"
    , "menu": "Vendor Master"
    , "url": "/vendor"
    , "getComponent": (appConfig) => { return <VendorComponent appConfig={appConfig} /> }
  },
  {
    "group": "Master"
    , "subgroup": "Master"
    , "menu": "Activity Group"
    , "url": "/activitygroup"
    , "getComponent": (appConfig) => { return <ActivityGroupComponent appConfig={appConfig} /> }
  },
  {
    "group": "Master"
    , "subgroup": "Master"
    , "menu": "City Master"
    , "url": "/city"
    , "getComponent": (appConfig) => { return <CityComponent appConfig={appConfig} /> }
  },
  {
    "group": "Master"
    , "subgroup": "Master"
    , "menu": "State Master"
    , "url": "/state"
    , "getComponent": (appConfig) => { return <StateComponent appConfig={appConfig} /> }
  },
  {
    "group": "Master"
    , "subgroup": "Master"
    , "menu": "Country Master"
    , "url": "/country"
    , "getComponent": (appConfig) => { return <CountryComponent appConfig={appConfig} /> }
  },
  {
    "group": "Master"
    , "subgroup": "Master"
    , "menu": "User Master"
    , "url": "/user"
    , "getComponent": (appConfig) => { return <UserComponent appConfig={appConfig} /> }
  },
  {
    "group": "Master"
    , "subgroup": "Master"
    , "menu": "Payment Mode"
    , "url": "/paymentmode"
    , "getComponent": (appConfig) => { return <PaymentModeComponent appConfig={appConfig} /> }
  },
  {
    "group": "Master"
    , "subgroup": "Master"
    , "menu": "Payment Type"
    , "url": "/paymenttype"
    , "getComponent": (appConfig) => { return <PaymentTypeComponent appConfig={appConfig} /> }
  },
  {
    "group": "Transcation"
    , "subgroup": "Transcation"
    , "menu": "Activity Log"
    , "url": "/activitylog"
    , "getComponent": (appConfig) => { return <ActivityLogComponent appConfig={appConfig} /> }
  },
  {
    "group": "Transcation"
    , "subgroup": "Transcation"
    , "menu": "Activity Master"
    , "url": "/activity"
    , "getComponent": (appConfig) => { return <ActivityComponent appConfig={appConfig} /> }
  },
  {
    "group": "Transcation"
    , "subgroup": "Transcation"
    , "menu": "Payment"
    , "url": "/payment"
    , "getComponent": (appConfig) => { return <PaymentComponent appConfig={appConfig} /> }
  },
  {
    "group": "Transcation"
    , "subgroup": "Transcation"
    , "menu": "PO Allotment"
    , "url": "/poallotment"
    , "getComponent": (appConfig) => { return <POAllotmentComponent appConfig={appConfig} /> }
  },
  {
    "group": "Reports"
    , "subgroup": "Reports"
    , "menu": "Status Report"
    , "url": "/statusreport"
    , "getComponent": (appConfig) => { return <StatusReportComponent appConfig={appConfig} /> }
  },
  {
    "group": "Reports"
    , "subgroup": "Reports"
    , "menu": "Ledger"
    , "url": "/ledger"
    , "getComponent": (appConfig) => { return <LedgerComponent appConfig={appConfig} /> }
  },
  {
    "group": "Print"
    , "subgroup": "Print"
    , "menu": "Annexure"
    , "url": "/annexure"
    , "getComponent": (appConfig) => { return <AnnexureComponent appConfig={appConfig} /> }
  }]