import React, { Component } from "react";

// masters
const ClientGroupComponent = React.lazy(() => import('../master/ClientGroup/ClientGroup'));
const ClientLogComponent = React.lazy(() => import('../master/ClientLog/ClientLog'));
const ClientComponent = React.lazy(() => import('../master/Client/Client'));

const VendorGroupComponent = React.lazy(() => import('../master/VendorGroup/VendorGroup'));
const VendorLogComponent = React.lazy(() => import('../master/VendorLog/VendorLog'));
const VendorComponent = React.lazy(() => import('../master/Vendor/Vendor'));

const ActivityGroupComponent = React.lazy(() => import('../master/ActivityGroup/ActivityGroup'));
const CityComponent = React.lazy(() => import('../master/City/City'));
const StateComponent = React.lazy(() => import('../master/State/State'));
const CountryComponent = React.lazy(() => import('../master/Country/Country'));
const UserComponent = React.lazy(() => import('../master/User/User'));

const PaymentModeComponent = React.lazy(() => import('../master/PaymentMode/PaymentMode'));
const PaymentTypeComponent = React.lazy(() => import('../master/PaymentType/PaymentType'));

const ProjectControllerComponent= React.lazy(() => import('../master/ProjectControl/ProjectControl'));
const ActivityLogComponent = React.lazy(() => import('../transaction/ActivityLog/ActivityLog'));
const ActivityComponent = React.lazy(() => import('../transaction/Activity/Activity'));
const PaymentComponent = React.lazy(() => import('../transaction/Payment/Payment'));
const FinalPaymentComponent = React.lazy(() => import('../transaction/FinalPayment/FinalPayment'));
const POAllotmentComponent = React.lazy(() => import('../transaction/POAllotment/POAllotment'));
const EstimateComponent = React.lazy(() => import('../transaction/Estimate/Estimate'));

const StatusReportComponent = React.lazy(() => import('../reports/StatusReport'));
const LedgerComponent = React.lazy(() => import('../reports/LedgerReport'));

const AnnexureComponent = React.lazy(() => import('../print/Annexure'));

const ApprovalComponent = React.lazy(() => import('../util/Approval/Approval'));


// transcations

// Sepia, teal, beige and sage, bluse shade
export const colorcodes = ["#da68a0", "#16acea", "#e0cdbe", "#a9c0a6", "#b4a284", "#1978a5"];

export const menuJson = [
  {
    "group": "Master"
    , "subgroup": "Client"
    , "menu": "Client Group"
    , "url": "/clientgroup"
    , "getComponent": ClientGroupComponent
  },
  {
    "group": "Master"
    , "subgroup": "Client"
    , "menu": "Client Log"
    , "url": "/clientlog"
    , "getComponent": ClientLogComponent
  },
  {
    "group": "Master"
    , "subgroup": "Client"
    , "menu": "Client Master"
    , "url": "/client"
    , "getComponent": ClientComponent
  },
  {
    "group": "Master"
    , "subgroup": "Vendor"
    , "menu": "Vendor Group"
    , "url": "/vendorgroup"
    , "getComponent": VendorGroupComponent
  },
  {
    "group": "Master"
    , "subgroup": "Vendor"
    , "menu": "Vendor Log"
    , "url": "/vendorlog"
    , "getComponent": VendorLogComponent
  },
  {
    "group": "Master"
    , "subgroup": "Vendor"
    , "menu": "Vendor Master"
    , "url": "/vendor"
    , "getComponent": VendorComponent
  },
  {
    "group": "Master"
    , "subgroup": "Master"
    , "menu": "Activity Group"
    , "url": "/activitygroup"
    , "getComponent": ActivityGroupComponent
  },
  {
    "group": "Master"
    , "subgroup": "Master"
    , "menu": "City Master"
    , "url": "/city"
    , "getComponent": CityComponent
  },
  {
    "group": "Master"
    , "subgroup": "Master"
    , "menu": "State Master"
    , "url": "/state"
    , "getComponent": StateComponent
  },
  {
    "group": "Master"
    , "subgroup": "Master"
    , "menu": "Country Master"
    , "url": "/country"
    , "getComponent": CountryComponent
  },
  {
    "group": "Master"
    , "subgroup": "Master"
    , "menu": "User Master"
    , "url": "/user"
    , "getComponent": UserComponent
  },
  {
    "group": "Master"
    , "subgroup": "Master"
    , "menu": "Payment Mode"
    , "url": "/paymentmode"
    , "getComponent": PaymentModeComponent
  },
  {
    "group": "Master"
    , "subgroup": "Master"
    , "menu": "Payment Type"
    , "url": "/paymenttype"
    , "getComponent": PaymentTypeComponent
  },
  {
    "group": "Master"
    , "subgroup": "Master"
    , "menu": "Project Controller"
    , "url": "/projectcontroller"
    , "getComponent": ProjectControllerComponent
  },
  {
    "group": "Transcation"
    , "subgroup": "Transcation"
    , "menu": "Activity Log"
    , "url": "/activitylog"
    , "getComponent": ActivityLogComponent
  },
  {
    "group": "Transcation"
    , "subgroup": "Transcation"
    , "menu": "Activity Master"
    , "url": "/activity"
    , "getComponent": ActivityComponent
  }, 
  {
    "group": "Transcation"
    , "subgroup": "Transcation"
    , "menu": "Estimate"
    , "url": "/estimate"
    , "getComponent": EstimateComponent
  }, 
  {
    "group": "Transcation"
    , "subgroup": "Transcation"
    , "menu": "PO Allotment"
    , "url": "/poallotment"
    , "getComponent": POAllotmentComponent
  },
  {
    "group": "Transcation"
    , "subgroup": "Transcation"
    , "menu": "Payment"
    , "url": "/payment"
    , "getComponent": PaymentComponent
  },
  {
    "group": "Transcation"
    , "subgroup": "Transcation"
    , "menu": "Final Payment"
    , "url": "/finalypayment"
    , "getComponent": FinalPaymentComponent
  },
  {
    "group": "Reports"
    , "subgroup": "Reports"
    , "menu": "Status Report"
    , "url": "/statusreport"
    , "getComponent": StatusReportComponent
  },
  {
    "group": "Reports"
    , "subgroup": "Reports"
    , "menu": "Ledger"
    , "url": "/ledger"
    , "getComponent": LedgerComponent
  },
  {
    "group": "Print"
    , "subgroup": "Print"
    , "menu": "Annexure"
    , "url": "/annexure"
    , "getComponent": AnnexureComponent
  }, {
    "group": "Utility"
    , "subgroup": "Utility"
    , "menu": "Approval"
    , "url": "/Approval"
    , "getComponent": ApprovalComponent
  }]

