import React from "react";
import styles from './style.module.css'
import PartnersComponent from "../../components/partners";
import Sidebar from "../../layout/Dashboard";


function PartnersPage() {
   return(
      <Sidebar>
         <PartnersComponent />
      </Sidebar>
   )
}

export default PartnersPage