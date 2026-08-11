// frontend/lib/api.js
// Centralized API calls — frontend se backend ko call karta hai

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ── Helper
async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

// ── Auth
export const loginAdmin = (email, password) =>
  request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });

export const setupAdmin = () =>
  request('/api/auth/setup', { method: 'POST' });

// ── Contact
export const submitContact = (form) =>
  request('/api/contact', { method: 'POST', body: JSON.stringify(form) });

export const getContacts = (token, params = '') =>
  request(`/api/contact${params}`, { headers: { Authorization: `Bearer ${token}` } });

export const updateContact = (token, id, data) =>
  request(`/api/contact/${id}`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(data) });

export const deleteContact = (token, id) =>
  request(`/api/contact/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });

// ── Projects
export const getProjects = (params = '') =>
  request(`/api/projects${params}`);

export const getProject = (id) =>
  request(`/api/projects/${id}`);

export const createProject = (token, data) =>
  request('/api/projects', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(data) });

export const updateProject = (token, id, data) =>
  request(`/api/projects/${id}`, { method: 'PUT', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(data) });

export const deleteProject = (token, id) =>
  request(`/api/projects/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });

// ── Employees
export const getEmployees = (params = '') =>
  request(`/api/employees${params}`);

export const createEmployee = (token, data) =>
  request('/api/employees', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(data) });

export const updateEmployee = (token, id, data) =>
  request(`/api/employees/${id}`, { method: 'PUT', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(data) });

export const deleteEmployee = (token, id) =>
  request(`/api/employees/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });

// ── Offices
export const getOffices = (params = '') =>
  request(`/api/offices${params}`);

export const createOffice = (token, data) =>
  request('/api/offices', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(data) });

export const deleteOffice = (token, id) =>
  request(`/api/offices/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });

// ── Stats (admin)
export const getStats = (token) =>
  request('/api/stats', { headers: { Authorization: `Bearer ${token}` } });
