import React from "react";
import styles from './style.module.css'
import DealsComponent from "../../components/deals";
import Sidebar from "../../layout/Dashboard";


function DealsPage() {
   return(
      <Sidebar>
         <DealsComponent />
      </Sidebar>
   )
}

export default DealsPage