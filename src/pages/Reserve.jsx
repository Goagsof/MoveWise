import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/components/Reserve.css';
import jsPDF from 'jspdf';

const Reserve = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    rooms: [],
    description: '',
    origin: '',
    destination: '',
    details: ''
  });
  const [finalFormData, setFinalFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    rooms: [],
    description: '',
    origin: '',
    destination: '',
    details: ''
  });

  const handleDateChange = date => {
    setSelectedDate(date);
    setFormStep(2); // Avanzar al paso 2 cuando se selecciona una fecha
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (formStep === 4) {
      generatePDF();
    }
  };

  const handleNextStep = () => {
    if (formStep === 1) {
      setFinalFormData(formData);
    } else if (formStep === 2) {
      setFinalFormData(prevData => ({ ...prevData, ...formData }));
    } else if (formStep === 3) {
      setFinalFormData(prevData => ({ ...prevData, ...formData }));
    }
    setFormStep(prevStep => prevStep + 1);
  };

  const handlePrevStep = () => {
    setFormStep(prevStep => prevStep - 1);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Añadir encabezado
    doc.setFillColor(32, 178, 170); // Verde agua
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255); // Blanco
    doc.setFontSize(22);
    doc.text('Resumen de Cotización', 20, 20);

    // Restablecer colores y tamaño de fuente
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);

    // Datos Personales
    doc.text('Datos Personales:', 20, 50);
    doc.setFontSize(12);
    doc.text(`Nombre: ${finalFormData.firstName} ${finalFormData.lastName}`, 20, 60);
    doc.text(`Correo: ${finalFormData.email}`, 20, 70);
    doc.text(`Teléfono: ${finalFormData.phone}`, 20, 80);

    // Datos del Transporte
    doc.setFontSize(16);
    doc.text('Datos del Transporte:', 20, 100);
    doc.setFontSize(12);
    doc.text(`Tipo de Servicio: ${finalFormData.service}`, 20, 110);
    doc.text(`Habitaciones Seleccionadas: ${Array.isArray(finalFormData.rooms) ? finalFormData.rooms.join(', ') : ''}`, 20, 120);
    doc.text(`Descripción: ${finalFormData.description}`, 20, 130);

    // Datos de Origen y Destino
    doc.setFontSize(16);
    doc.text('Datos de Origen y Destino:', 20, 150);
    doc.setFontSize(12);
    doc.text(`Origen: ${finalFormData.origin}`, 20, 160);
    doc.text(`Destino: ${finalFormData.destination}`, 20, 170);
    doc.text(`Detalles: ${finalFormData.details}`, 20, 180);

    // Guardar el PDF
    doc.save('cotizacion.pdf');
  };

  return (
    <main className="reserve">
      <Calendar onChange={handleDateChange} />
      {selectedDate && formStep === 2 && (
        <div className="form-modal">
          <form onSubmit={handleFormSubmit}>
            {formStep === 2 && (
              <>
                <label>Nombre:</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                <label>Apellido:</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                <label>Correo:</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                <label>Teléfono:</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                <button type="button" onClick={handlePrevStep}>Cancelar</button>
                <button type="button" onClick={handleNextStep}>Siguiente</button>
              </>
            )}
          </form>
        </div>
      )}
      {formStep === 3 && (
        <div className="form-modal">
          <form onSubmit={handleFormSubmit}>
            {formStep === 3 && (
              <>
                <label>Tipo de servicio:</label>
                <select name="service" value={formData.service} onChange={handleInputChange} required>
                  <option value="mudanza">Mudanza</option>
                  <option value="transporte">Transporte</option>
                </select>
                <div>
                  <label>Selecciona las habitaciones:</label>
                  <div>
                    <input type="checkbox" name="rooms" value="sala" onChange={handleInputChange} /> Sala
                    <input type="checkbox" name="rooms" value="cocina" onChange={handleInputChange} /> Cocina
                    {/* Agrega los demás checkboxes aquí */}
                  </div>
                </div>
                <label>Descripción:</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} />
                <button type="button" onClick={handlePrevStep}>Atrás</button>
                <button type="button" onClick={handleNextStep}>Siguiente</button>
              </>
            )}
          </form>
        </div>
      )}
      {formStep === 4 && (
        <div className="form-modal">
          <form onSubmit={handleFormSubmit}>
            {formStep === 4 && (
              <>
                <label>Dirección origen:</label>
                <input type="text" name="origin" value={formData.origin} onChange={handleInputChange} required />
                <label>Dirección destino:</label>
                <input type="text" name="destination" value={formData.destination} onChange={handleInputChange} required />
                <label>Detalles:</label>
                <textarea name="details" value={formData.details} onChange={handleInputChange} />
                <button type="button" onClick={handlePrevStep}>Atrás</button>
                <button type="submit">Enviar cotización</button>
              </>
            )}
          </form>
        </div>
      )}
    </main>
  );
};

export default Reserve;
