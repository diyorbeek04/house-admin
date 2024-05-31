import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Styles from './style.module.css';
import ClearIcon from '@mui/icons-material/Clear';

const ResidencesComponent = () => {
   const [tasks, Residences] = useState([]);
   const [taskToEdit, setTaskToEdit] = useState(null);
   const [open, setOpen] = useState(false);
   const imgRef = useRef();
   const titleRef = useRef();
   const descRef = useRef();
   const priceRef = useRef();
   const salesRef = useRef();
   const badsRef = useRef();
   const bathsRef = useRef();

   useEffect(() => {
      axios.get('http://localhost:8000/Residences')
         .then(res => Residences(res.data))
         .catch(err => console.error('Error fetching data:', err));
   }, []);

   const handlePost = (e) => {
      e.preventDefault();
      const body = {
         residences_img: e.target.image.value,
         residences_title: e.target.title.value,
         residences_SqFt: e.target.desc.value,
         residences_price: e.target.sales.value,
         residences_bads: e.target.bads.value,
         residences_baths: e.target.baths.value
      };
      console.log(body);
      axios.post('http://localhost:8000/Residences', body)
         .then(res => {
            Residences([...tasks, res.data]);
            e.target.reset();
         })
         .catch(err => console.error('Error posting data:', err));
   }

   const handleEdit = (task) => {
      setTaskToEdit(task);
      setOpen(true);
   };

   const handleSubmitEdit = (e) => {
      e.preventDefault();
      if (imgRef.current.value && titleRef.current.value && descRef.current.value && priceRef.current.value && salesRef.current.value && taskToEdit && bathsRef.current.value && badsRef.current.value) {
         const body = {
            residences_img: imgRef.current.value,
            residences_title: titleRef.current.value,
            residences_SqFt: descRef.current.value,
            residences_price: priceRef.current.value,
            residences_bads: badsRef.current.value,
            residences_baths: bathsRef.current.value,
         };
         axios.put(`http://localhost:8000/Residences/${taskToEdit.id}`, body)
            .then(res => {
               const updatedTasks = tasks.map(item => (item.id === taskToEdit.id ? res.data : item));
               Residences(updatedTasks);
               setOpen(false);
            })
            .catch(err => console.error('Error updating data:', err));
      } else {
         alert('Please fill in all fields');
      }
   };

   const handleDelete = (id) => {
      axios.delete(`http://localhost:8000/Residences/${id}`)
         .then(() => {
            const updatedTasks = tasks.filter(item => item.id !== id);
            Residences(updatedTasks);
            setOpen(false);
         })
         .catch(err => console.error('Error deleting data:', err));
   };

   return (
      <>
         <div className={Styles.section}>
            <div className={Styles.container}>
               <div className={Styles.card}>
                  <form className={Styles.form} onSubmit={handlePost}>
                     <div className={Styles.card__modal}>
                        <input className={Styles.input__top} name='image' type='url' placeholder='Rasm' />
                        <input className={Styles.input__top} name='title' type='text' placeholder='Title' />
                     </div>
                     <div className={Styles.card__modal}>
                        <input className={Styles.input__top} name='desc' type='text' placeholder='Description' />
                        <input className={Styles.input__top} name='sales' type='number' placeholder='Sales' />
                     </div>
                     <div className={Styles.card__modal}>
                        <input className={Styles.input__top} name='bads' type='text' placeholder='bads' />
                        <input className={Styles.input__top} name='baths' type='number' placeholder='baths' />
                     </div>
                     <button className={Styles.card__modal__button} type='submit'>Qo'shish</button>
                  </form>
               </div>

               {tasks.map((task, index) => (
                  <div key={index} className={Styles.card}>
                     <img className={Styles.img} src={task.residences_img} alt="" />
                     <div className={Styles.leftt}>
                        <div key={index} className={Styles.card__left}>
                           <div className={Styles.card__left__item}>
                              <h2 className={Styles.card__h2}>{task.residences_title}</h2>
                           </div>
                           <div className={Styles.card__left__item}>
                              <h2 className={Styles.h2}>{task.residences_SqFt}</h2>
                           </div>
                        </div>
                        <div className={Styles.card__item}>
                           <h2 className={Styles.h2}>Price</h2>
                           <div className={Styles.card__left__item}>
                              <p className={Styles.card__p}>{task.residences_price}</p>
                           </div>
                        </div>
                        <div className={Styles.card__item}>
                           <h2 className={Styles.h2}>Bads</h2>
                           <div className={Styles.card__left__item}>
                              <p className={Styles.card__p}>{task.residences_bads}</p>
                           </div>
                        </div>
                        <div className={Styles.card__item}>
                           <h2 className={Styles.h2}>Baths</h2>
                           <div className={Styles.card__left__item}>
                              <p className={Styles.card__p}>{task.residences_baths}</p>
                           </div>
                        </div>
                     </div>
                     <div className={Styles.card__right}>
                        <button className={Styles.card__button} onClick={() => handleEdit(task)}>Edit</button>
                        <button className={Styles.card__button} onClick={() => handleDelete(task.id)}>Delete</button>
                     </div>
                  </div>
               ))}
            </div>
            {open && (
               <>
                  <div className={Styles.modal}>
                     <div className={Styles.modal__item}>
                        <ClearIcon className={Styles.icon} onClick={() => setOpen(false)} />
                     </div>
                     <form onSubmit={handleSubmitEdit}>
                        <input className={Styles.input} ref={imgRef} type='url' required defaultValue={taskToEdit.residences_img} placeholder='Rasm' />
                        <input className={Styles.input} ref={titleRef} type='text' required defaultValue={taskToEdit.residences_title} placeholder='Title' />
                        <input className={Styles.input} ref={descRef} type='text' required defaultValue={taskToEdit.residences_SqFt} placeholder='Description' />
                        <input className={Styles.input} ref={priceRef} type='text' required defaultValue={taskToEdit.residences_price} placeholder='Price' />
                        <input className={Styles.input} ref={badsRef} type='text' required defaultValue={taskToEdit.residences_bads} placeholder='bads' />
                        <input className={Styles.input} ref={bathsRef} type='text' required defaultValue={taskToEdit.residences_baths} placeholder='baths' />
                        <button className={Styles.modal__button} type='submit'>Saqlash</button>
                     </form>
                  </div>
                  <div className={Styles.overlay} onClick={() => setOpen(false)} />
               </>
            )}
         </div>
      </>
   );
};

export default ResidencesComponent;


