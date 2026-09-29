const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function api(path, options = {}) {
  const token = localStorage.getItem('barberia_token');
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Error en la solicitud');
  return data;
}

export const authApi = {
  register: (body) => api('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: async (body) => {
    const result = await api('/auth/login', { method: 'POST', body: JSON.stringify(body) });
    localStorage.setItem('barberia_token', result.access_token);
    localStorage.setItem('barberia_user', JSON.stringify(result.user));
    return result;
  },
  me: () => api('/auth/me'),
};

export const citasApi = {
  list: () => api('/citas'),
  get: (id) => api(`/citas/${id}`),
  create: (body) => api('/citas', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => api(`/citas/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  reprogramar: (id, body) => api(`/citas/${id}/reprogramar`, { method: 'PATCH', body: JSON.stringify(body) }),
  estado: (id, estado) => api(`/citas/${id}/estado`, { method: 'PATCH', body: JSON.stringify({ estado }) }),
  cancelar: (id) => api(`/citas/${id}`, { method: 'DELETE' }),
};

export const serviciosApi = {
  list: () => api('/servicios'),
  create: (body) => api('/servicios', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => api(`/servicios/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (id) => api(`/servicios/${id}`, { method: 'DELETE' }),
};

export const barberosApi = { list: () => api('/barberos') };
