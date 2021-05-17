
import React from "react";

const CityComponent = React.lazy(() => import('../../master/City/City'));
export const routes={
    "CITY":{ name: "City Master",
    url: "/City",
    component: CityComponent
},
    "STATE":{},
    "USER":{}
}