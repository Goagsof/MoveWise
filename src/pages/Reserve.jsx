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
    roomsCount: {},
    otherRoom: '',
    description: '',
    origin: '',
    destination: '',
    details: ''
  });

  const handleDateChange = date => {
    setSelectedDate(date);
    setFormStep(2); 
  };

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (checked) {
        setFormData(prevData => ({
          ...prevData,
          rooms: [...prevData.rooms, value]
        }));
      } else {
        setFormData(prevData => ({
          ...prevData,
          rooms: prevData.rooms.filter(room => room !== value)
        }));
      }
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleRoomCountChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      roomsCount: { ...prevData.roomsCount, [name]: value }
    }));
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (formStep === 4) {
      generatePDF();
    }
  };

  const handleNextStep = () => {
    setFormStep(prevStep => prevStep + 1);
  };

  const handlePrevStep = () => {
    setFormStep(prevStep => prevStep - 1);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFillColor(32, 178, 170); 
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('Resumen de Cotización', 20, 20);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);

    doc.text('Datos Personales:', 20, 50);
    doc.setFontSize(12);
    doc.text(`Nombre: ${formData.firstName} ${formData.lastName}`, 20, 60);
    doc.text(`Correo: ${formData.email}`, 20, 70);
    doc.text(`Teléfono: ${formData.phone}`, 20, 80);

    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      doc.text(`Fecha Seleccionada: ${formattedDate}`, 20, 90); // Incluir la fecha seleccionada en el PDF
    }

    doc.setFontSize(16);
    doc.text('Datos del Transporte:', 20, 110);
    doc.setFontSize(12);
    doc.text(`Tipo de Servicio: ${formData.service}`, 20, 120);
    if (formData.rooms.length > 0) {
      const roomsText = formData.rooms.map(room => {
        const count = formData.roomsCount[room] || 'N/A';
        return `${room} (${count})`;
      }).join(', ');
      doc.text(`Habitaciones Seleccionadas: ${roomsText}`, 20, 130);
    } else {
      doc.text('Habitaciones Seleccionadas: Ninguna', 20, 130);
    }
    if (formData.otherRoom) {
      doc.text(`Otro: ${formData.otherRoom}`, 20, 140);
    }
    doc.text(`Descripción: ${formData.description}`, 20, 150);

    doc.setFontSize(16);
    doc.text('Datos de Origen y Destino:', 20, 170);
    doc.setFontSize(12);
    doc.text(`Origen: ${formData.origin}`, 20, 180);
    doc.text(`Destino: ${formData.destination}`, 20, 190);
    doc.text(`Detalles: ${formData.details}`, 20, 200);

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
                  <div className="checkbox-group">
                    <div>
                      <input type="checkbox" value="sala" onChange={handleInputChange} /> Sala
                    </div>
                    <div>
                      <input type="checkbox" value="comedor" onChange={handleInputChange} /> Comedor
                    </div>
                    <div>
                      <input type="checkbox" value="cocina" onChange={handleInputChange} /> Cocina
                    </div>
                    <div>
                      <input type="checkbox" value="habitaciones" onChange={handleInputChange} /> Habitaciones
                      <input type="number" name="habitaciones" onChange={handleRoomCountChange} placeholder="Número" />
                    </div>
                    <div>
                      <input type="checkbox" value="oficina" onChange={handleInputChange} /> Oficina
                    </div>
                    <div>
                      <input type="checkbox" value="lavanderia" onChange={handleInputChange} /> Lavandería
                    </div>
                    <div>
                      <input type="checkbox" value="jardin" onChange={handleInputChange} /> Jardín
                    </div>
                    <div>
                      <input type="checkbox" value="otro" onChange={handleInputChange} /> Otro
                      <input type="text" name="otherRoom" onChange={handleInputChange} placeholder="Especificar" />
                    </div>
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
