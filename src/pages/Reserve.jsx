import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/components/Reserve.css';

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
    // Aquí iría el código para generar el PDF y enviar el correo
  };

  const handleNextStep = () => {
    // Validar si el formulario actual es válido antes de avanzar al siguiente paso
    // Aquí podrías agregar lógica de validación si es necesario

    // Avanzar al siguiente paso
    setFormStep(prevStep => prevStep + 1);
  };

  const handlePrevStep = () => {
    // Retroceder al paso anterior
    setFormStep(prevStep => prevStep - 1);
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
