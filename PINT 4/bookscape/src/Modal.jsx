import React from 'react';
import './Modal.css'; // Vamos criar este CSS no próximo passo

const Modal = ({ show, title, message, onConfirm, onCancel, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>{title}</h3>
        <p>{message}</p>
        {children} {/* Aqui vai o nosso input de data */}
        <div className="modal-actions">
          <button onClick={onConfirm} className="modal-btn confirm-btn">Confirmar</button>
          <button onClick={onCancel} className="modal-btn cancel-btn">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;