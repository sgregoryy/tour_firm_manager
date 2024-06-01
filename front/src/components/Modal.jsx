import React, { useState } from "react";
import './styles/UserAdd.css'

const Modal = ({ isOpen, onClose, onSubmit, type }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>Закрыть</button>
        <form onSubmit={handleSubmit}>
          {type === 'client' && (
            <>
              <label>
                Имя:
                <input type="text" name="name" onChange={handleChange} />
              </label>
              <label>
                Email:
                <input type="email" name="email" onChange={handleChange} />
              </label>
              <label>
                Телефон:
                <input type="tel" name="phone" onChange={handleChange} />
              </label>
            </>
          )}
          {type === 'tour' && (
            <>
              <label>
                Название:
                <input type="text" name="name" onChange={handleChange} />
              </label>
              <label>
                Описание:
                <textarea name="description" onChange={handleChange} />
              </label>
              <label>
                Стоимость:
                <input type="number" name="price" onChange={handleChange} />
              </label>
            </>
          )}
          {type === 'booking' && (
            <>
              <label>
                ID клиента:
                <input type="text" name="clientId" onChange={handleChange} />
              </label>
              <label>
                ID тура:
                <input type="text" name="tourId" onChange={handleChange} />
              </label>
              <label>
                Детали бронирования:
                <textarea name="details" onChange={handleChange} />
              </label>
              <label>
                Дата:
                <input type="date" name="date" onChange={handleChange}></input>
              </label>
            </>
          )}
          <button className="sub-btn" type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
