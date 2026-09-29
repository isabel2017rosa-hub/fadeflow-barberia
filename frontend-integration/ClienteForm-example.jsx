import { useState } from 'react';
import { authApi } from './api';

export default function ClienteFormExample() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', telefono: '', direccion: '' });
  const [mensaje, setMensaje] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await authApi.register(form);
      setMensaje(result.message);
      setForm({ nombre: '', email: '', password: '', telefono: '', direccion: '' });
    } catch (error) {
      setMensaje(error.message);
    }
  }

  return <form onSubmit={handleSubmit}>
    <input value={form.nombre} placeholder="Nombre" onChange={e => setForm({ ...form, nombre: e.target.value })} />
    <input value={form.email} placeholder="Correo" onChange={e => setForm({ ...form, email: e.target.value })} />
    <input value={form.password} type="password" placeholder="Contraseña" onChange={e => setForm({ ...form, password: e.target.value })} />
    <input value={form.telefono} placeholder="Teléfono" onChange={e => setForm({ ...form, telefono: e.target.value })} />
    <button type="submit">Registrar</button>
    <p>{mensaje}</p>
  </form>;
}
