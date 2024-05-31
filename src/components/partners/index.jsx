import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Styles from './style.module.css';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { ImageUpload } from '../../redux/image-upload';

const PartnersComponent = () => {
   const [tasks, Partners] = useState([]);
   const [taskToEdit, setTaskToEdit] = useState(null);
   const [open, setOpen] = useState(false);
   const imgRef = useRef();
   const titleRef = useRef();
   const descRef = useRef();
   const priceRef = useRef();
   const salesRef = useRef();
   const dispatch = useDispatch();
   const imageUrl = useSelector(state => state.upload.imageUpload.data);
   useEffect(() => {
      axios.get('http://localhost:8000/Partners')
         .then(res => Partners(res.data))
         .catch(err => console.error('Error fetching data:', err));
   }, []);
   const handleChange = (e) => {
      dispatch(ImageUpload(e));
      console.log(imageUrl)
    };
   const handleEdit = (task) => {
      setTaskToEdit(task);
      setOpen(true);
   };

   const handleSubmitEdit = () => {
      if (imgRef.current.value && titleRef.current.value && descRef.current.value && priceRef.current.value && salesRef.current.value && taskToEdit) {
         const body = {
            Partners_logo: imgRef.current.value,
         
         };
         axios.put(`http://localhost:8000/Partners/${taskToEdit.id}`, body)
            .then(res => {
               const updatedTasks = tasks.map(item => (item.id === taskToEdit.id ? res.data : item));
               Partners(updatedTasks);
               setOpen(false);
            })

      } else {
         alert(`Please fill in all fields`);
      }
   };

   const handleDelete = (id) => {
      axios.delete(`http://localhost:8000/Partners/${id}`)
         .then(() => {
            const updatedTasks = tasks.filter(item => item.id !== id);
            Partners(updatedTasks);
            setOpen(false);
         })
   };

   return (
      <>
         <div className={Styles.section}>
            <div className={Styles.container}>
            <div className={Styles.card}>
            <form className={Styles.form}>
            <input onChange={handleChange} type="file" />
            </form>
          </div>

               {tasks.map((task, index) => (
                  <div key={index} className={Styles.card}>
                     <img className={Styles.img} src={task.Partners_logo} alt="" />
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
                        <input className={Styles.input} ref={imgRef} type='url' required defaultValue={taskToEdit.Partners_logo} placeholder='Rasm' />
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

export default PartnersComponent;
