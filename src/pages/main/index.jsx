import React from "react";
import styles from './style.module.css'
import Sidebar from "../../layout/Dashboard";


function MainPage() {
   return(
      <Sidebar>
         <h1 className={styles.text}>Welcome to Houses for sale Admin panel</h1>
      </Sidebar>
   )
}

export default MainPage