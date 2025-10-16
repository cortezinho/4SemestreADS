// src/components/Modal.jsx
import React from 'react';

const Modal = ({ title, children, onConfirm, onCancel, confirmText = 'Confirmar' }) => {
  return (
    // O click no overlay (fora do modal) também chama o onCancel para fechar
    <div className="modal-overlay" onClick={onCancel}>
      {/* Impede que o clique dentro do modal-content feche o modal */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-actions">
          <button className="btn btn-cancel" onClick={onCancel}>Cancelar</button>
          <button className="btn btn-confirm" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;