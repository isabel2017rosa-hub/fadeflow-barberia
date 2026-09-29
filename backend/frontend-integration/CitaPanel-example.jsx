import { useEffect, useState } from 'react';
import { api, citasApi, barberosApi, serviciosApi } from './api';

export default function CitaPanelExample({ clienteId }) {
  const [barberos, setBarberos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [citas, setCitas] = useState([]);
  const [form, setForm] = useState({ barberoId: '', servicioIds: [], fecha: '', hora: '', observaciones: '' });

  async function cargar() {
    const [b, s, c] = await Promise.all([barberosApi.list(), serviciosApi.list(), api(`/citas/cliente/${clienteId}`)]);
    setBarberos(b); setServicios(s); setCitas(c);
  }
  useEffect(() => { cargar().catch(console.error); }, [clienteId]);

  async function handleSubmit(e) {
    e.preventDefault();
    await citasApi.create({ clienteId, ...form });
    setForm({ barberoId: '', servicioIds: [], fecha: '', hora: '', observaciones: '' });
    await cargar();
  }

  return <div>{/* Conectar estos controles a tu diseño actual. */}
    <form onSubmit={handleSubmit}>
      <select value={form.barberoId} onChange={e => setForm({ ...form, barberoId: e.target.value })} required>
        <option value="">Seleccionar barbero</option>
        {barberos.map(b => <option key={b.id} value={b.id}>{b.usuario.nombre}</option>)}
      </select>
      <select multiple value={form.servicioIds} onChange={e => setForm({ ...form, servicioIds: [...e.target.selectedOptions].map(o => o.value) })} required>
        {servicios.map(s => <option key={s.id} value={s.id}>{s.nombre} - ${s.precio}</option>)}
      </select>
      <input type="date" value={form.fecha} onChange={e => setForm({ ...form, fecha: e.target.value })} required />
      <input type="time" value={form.hora} onChange={e => setForm({ ...form, hora: e.target.value })} required />
      <button>Agendar cita</button>
    </form>
    <ul>{citas.map(c => <li key={c.id}>{c.fecha} {c.hora} - {c.estado}</li>)}</ul>
  </div>;
}
