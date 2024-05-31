import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Styles from './style.module.css';
import ClearIcon from '@mui/icons-material/Clear';

const ContactComponent = () => {
  const [tasks, contact] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState();
  const [open, setOpen] = useState(false);
  const imgRef = useRef();
  
function MoreNFTComponent() {
   return(
      <>
      Hello
      </>
   )
}

  useEffect(() => {
    axios.get('http://localhost:8000/contact')
      .then(res => contact(res.data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);


  const handleEdit = (task) => {
    setTaskToEdit(task);
    setOpen(true);
  };

  const handleSubmitEdit = () => {
    if (imgRef.current.value ) {
      const body = {
         contact_email: imgRef.current.value
      };
      axios.put(`http://localhost:8000/contact/${taskToEdit.id}`, body)
        .then(res => {
          const updatedTasks = tasks.map(item => (item.id === taskToEdit.id ? res.data : item));
          contact(updatedTasks);
          setOpen(false);
        })

    } else {
      alert(`Please fill in all fields`);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/contact/${id}`)
      .then(() => {
        const updatedTasks = tasks.filter(item => item.id !== id);
        contact(updatedTasks);
        setOpen(false);
      })
  };

  return (
    <>
      <div className={Styles.section}>
        <div className={Styles.container}>
          
          {tasks.map((task, index) => (
            <div key={index} className={Styles.card}>
              <p className={Styles.img} >{task.contact_email}</p>
              <div className={Styles.card__right}>
                        <button className={Styles.card__button} onClick={() => handleDelete(task.id)}>Delete</button>
                     </div>
            </div>
          ))}
        </div>
        {open && (
          <>
           
          </>
        )}
      </div>
    </>
  );
};

export default ContactComponent;


// export default ContactComponent