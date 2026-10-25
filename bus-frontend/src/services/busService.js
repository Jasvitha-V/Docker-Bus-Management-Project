const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081'

async function request(path, options = {}) {
  let response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers
      }
    })
  } catch {
    throw new Error(`Cannot connect to the backend at ${API_BASE_URL}. Make sure Spring Boot is running and CORS allows http://localhost:5173.`)
  }

  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json')
    ? await response.json().catch(() => null)
    : await response.text().catch(() => '')

  if (!response.ok) {
    const message =
      (data && typeof data === 'object' && (data.message || data.error || data.detail)) ||
      (typeof data === 'string' && data) ||
      `Request failed with status ${response.status}`
    throw new Error(message)
  }

  return data
}

export const busService = {
  getAll: () => request('/DisplayAll'),
  getById: (id) => request(`/Display/${id}`),
  add: (bus) => request('/Add', { method: 'POST', body: JSON.stringify(bus) }),
  update: (id, bus) => request(`/Update/${id}`, { method: 'PUT', body: JSON.stringify(bus) }),
  remove: (id) => request(`/Delete/${id}`, { method: 'DELETE' })
}