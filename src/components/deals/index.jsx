import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Styles from './style.module.css';
import ClearIcon from '@mui/icons-material/Clear';

const DealsComponent = () => {
      const [tasks, Deals] = useState([]);
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
      axios.get('http://localhost:8000/Deals')
         .then(res => Deals(res.data))
         .catch(err => console.error('Error fetching data:', err));
   }, []);

   const handleEdit = (task) => {
      setTaskToEdit(task);
      setOpen(true);
   };

   const handleSubmitPost = (e) => {
      e.preventDefault();
      const bodyPost = {
         deals_img: imgRef.current.value,
         deals_title: titleRef.current.value,
         deals_SqFt: descRef.current.value,
         deals_price: priceRef.current.value,
         deals_bads: badsRef.current.value,
         deals_baths: bathsRef.current.value,
      }
      axios.post(`http://localhost:8000/Deals`, bodyPost)
      .then(data => setPost(data))
      axios.get(`http://localhost:8000/Deals`)
      .then((data) => setData(data))
      imgRef.current.value = null
      titleRef.current.value = null
      descRef.current.value = null
      priceRef.current.value= null
      badsRef.current.value = null
      bathsRef.current.value = null
  }
   const handleSubmitEdit = () => {
      if (imgRef.current.value && titleRef.current.value && descRef.current.value && priceRef.current.value && salesRef.current.value && taskToEdit && bathsRef.current.value && badsRef.current.value) {
         const body = {
            deals_img: imgRef.current.value,
            deals_title: titleRef.current.value,
            deals_SqFt: descRef.current.value,
            deals_price: priceRef.current.value,
            deals_bads: badsRef.current.value,
            deals_baths: bathsRef.current.value,
         };
         axios.put(`http://localhost:8000/Deals/${taskToEdit.id}`, body)
            .then(res => {
               const updatedTasks = tasks.map(item => (item.id === taskToEdit.id ? res.data : item));
               Deals(updatedTasks);
               setOpen(false);
            })

      } else {
         alert(`Please fill in all fields`);
      }
   };

   const handleDelete = (id) => {
      axios.delete(`http://localhost:8000/Deals/${id}`)
         .then(() => {
            const updatedTasks = tasks.filter(item => item.id !== id);
            Deals(updatedTasks);
            setOpen(false);
         })
   };

   return (
      <>
         <div className={Styles.section}>
            <div className={Styles.container}>
            <div className={Styles.card}>
            <form className={Styles.form}>
              <div className={Styles.card__modal}>
                <input className={Styles.input__top} ref={imgRef} type='url' placeholder='Rasm' />
                <input className={Styles.input__top} ref={titleRef} type='text' placeholder='Title' />
              </div>
              <div className={Styles.card__modal}>
                <input className={Styles.input__top} ref={descRef} type='text' placeholder='Description' />
                <input className={Styles.input__top} ref={salesRef} type='number' placeholder='Sales' />
              </div>
              <div className={Styles.card__modal}>
                <input className={Styles.input__top} ref={badsRef} type='text' placeholder='bads' />
                <input className={Styles.input__top} ref={bathsRef} type='number' placeholder='baths' />
              </div>
              <button className={Styles.card__modal__button}>Qo'shish</button>
            </form>
          </div>

               {tasks.map((task, index) => (
                  <div key={index} className={Styles.card}>
                     <img className={Styles.img} src={task.deals_img} alt="" />
                    <div className={Styles.leftt}>
                    <div key={index} className={Styles.card__left}>
                        <div className={Styles.card__left__item}>
                           <h2 className={Styles.card__h2}>{task.deals_title}</h2>
                        </div>
                        <div className={Styles.card__left__item}>
                           <h2 className={Styles.h2}>{task.deals_SqFt}</h2>
                        </div>
                     </div>
                     <div className={Styles.card__item}>
                      
                           <h2 className={Styles.h2}>Price</h2>
                     
                        <div className={Styles.card__left__item}>
                           <p className={Styles.card__p}>{task.deals_price}</p>
                        </div>
                     </div>
                     <div className={Styles.card__item}>
                       
                           <h2 className={Styles.h2}>Bads</h2>
                      
                        <div className={Styles.card__left__item}>
                           <p className={Styles.card__p}>{task.deals_bads}</p>
                        </div>
                     </div>
                     <div className={Styles.card__item}>
                        
                           <h2 className={Styles.h2}>Baths</h2>
                       
                        <div className={Styles.card__left__item}>
                           <p className={Styles.card__p}>{task.deals_baths}</p>
                        </div>
                     </div>
                    </div>
                     <div className={Styles.card__right}>
                        {/* <button className={Styles.card__button}>Post qo'shish</button> */}
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
                     <form>
                        <input className={Styles.input} ref={imgRef} type='url' required defaultValue={taskToEdit.deals_img} placeholder='Rasm' />
                        <input className={Styles.input} ref={titleRef} type='text' required defaultValue={taskToEdit.deals_title} placeholder='Title' />
                        <input className={Styles.input} ref={descRef} type='text' required defaultValue={taskToEdit.deals_SqFt} placeholder='Description' />
                        <input className={Styles.input} ref={priceRef} type='text' required defaultValue={taskToEdit.deals_price} placeholder='Price' />
                        <input className={Styles.input} ref={badsRef} type='text' required defaultValue={taskToEdit.deals_bads} placeholder='bads' />
                        <input className={Styles.input} ref={bathsRef} type='text' required defaultValue={taskToEdit.deals_baths} placeholder='baths' />
                        <button className={Styles.modal__button} onClick={handleSubmitEdit}>Saqlash</button>
                     </form>
                  </div>
                  <div className={Styles.overlay} onClick={() => setOpen(false)} />
               </>
            )}
         </div>
      </>
   );
};

export default DealsComponent;
