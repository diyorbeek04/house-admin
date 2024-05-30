import React from "react";
import styles from './style.module.css'
import ResidencesComponent from "../../components/residences";
import Sidebar from "../../layout/Dashboard";


function ResidencesPage() {
   return(
      <Sidebar>
         <ResidencesComponent />
      </Sidebar>
   )
}

export default ResidencesPage