import React from "react";
import styles from './style.module.css'
import ContactComponent from "../../components/contact";
import Sidebar from "../../layout/Dashboard";


function ContactPage() {
   return(
      <Sidebar>
         <ContactComponent />
      </Sidebar>
   )
}

export default ContactPage