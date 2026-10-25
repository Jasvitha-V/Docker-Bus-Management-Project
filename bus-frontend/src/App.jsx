import { useCallback, useEffect, useMemo, useState } from 'react'
import BusForm from './components/BusForm.jsx'
import BusTable from './components/BusTable.jsx'
import { busService } from './services/busService.js'

export default function App() {
  const [buses, setBuses] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [pageError, setPageError] = useState('')
  const [notice, setNotice] = useState(null)
  const [editingBus, setEditingBus] = useState(null)
  const [search, setSearch] = useState('')

  const loadBuses = useCallback(async () => {
    setLoading(true)
    setPageError('')
    try {
      const data = await busService.getAll()
      setBuses(Array.isArray(data) ? data : [])
    } catch (error) {
      setPageError(error.message || 'Could not load bus records.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadBuses() }, [loadBuses])

  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(null), 4500)
    return () => clearTimeout(timer)
  }, [notice])

  const filteredBuses = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return buses
    return buses.filter(bus =>
      String(bus.busNumber ?? '').toLowerCase().includes(term) ||
      String(bus.operatorName ?? '').toLowerCase().includes(term) ||
      String(bus.id ?? '').includes(term)
    )
  }, [buses, search])

  async function saveBus(payload) {
    setSaving(true)
    setNotice(null)
    try {
      if (editingBus) {
        await busService.update(editingBus.id, payload)
        setNotice({ type: 'success', message: `Bus ${payload.busNumber} updated successfully.` })
        setEditingBus(null)
      } else {
        await busService.add(payload)
        setNotice({ type: 'success', message: `Bus ${payload.busNumber} added successfully.` })
      }
      await loadBuses()
    } catch (error) {
      setNotice({ type: 'danger', message: error.message || 'Unable to save the bus. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  async function deleteBus(bus) {
    const confirmed = window.confirm(`Delete bus ${bus.busNumber} (ID: ${bus.id})? This action cannot be undone.`)
    if (!confirmed) return
    setNotice(null)
    try {
      await busService.remove(bus.id)
      setNotice({ type: 'success', message: `Bus ${bus.busNumber} deleted successfully.` })
      if (editingBus?.id === bus.id) setEditingBus(null)
      await loadBuses()
    } catch (error) {
      setNotice({ type: 'danger', message: error.message || 'Unable to delete the bus. Please try again.' })
    }
  }

  function startEdit(bus) {
    setEditingBus(bus)
    document.getElementById('manage-bus')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark app-navbar">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center gap-2" href="#">
            <span className="brand-mark"><i className="bi bi-bus-front-fill" /></span>
            <span>Fleet<span className="brand-light">Flow</span></span>
          </a>
          <div className="navbar-nav ms-auto flex-row align-items-center gap-3">
            <a className="nav-link active" href="#dashboard">Dashboard</a>
            <a className="nav-link" href="#manage-bus">Manage buses</a>
            <span className="api-status"><span className={`status-dot ${pageError ? 'status-offline' : ''}`} />API {pageError ? 'disconnected' : 'connection checked'}</span>
          </div>
        </div>
      </nav>

      <main className="container py-4 py-lg-5" id="dashboard">
        <div className="page-heading">
          <div>
            <div className="eyebrow">FLEET MANAGEMENT / OVERVIEW</div>
            <h1>Bus management</h1>
            <p className="text-secondary mb-0">A simple place to manage your bus fleet and records.</p>
          </div>
          <button className="btn btn-primary add-top-btn" onClick={() => { setEditingBus(null); document.getElementById('manage-bus')?.scrollIntoView({ behavior: 'smooth' }) }}>
            <i className="bi bi-plus-lg me-2" />Add new bus
          </button>
        </div>

        {notice && (
          <div className={`alert alert-${notice.type} alert-dismissible fade show notice-alert`} role="alert">
            <i className={`bi ${notice.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`} />
            {notice.message}
            <button type="button" className="btn-close" onClick={() => setNotice(null)} aria-label="Close" />
          </div>
        )}

        <section className="summary-grid mb-4">
          <div className="summary-card">
            <div className="summary-icon summary-blue"><i className="bi bi-bus-front" /></div>
            <div><div className="summary-label">Total buses</div><div className="summary-value">{loading ? '—' : buses.length}</div></div>
          </div>
          <div className="summary-card">
            <div className="summary-icon summary-green"><i className="bi bi-snow" /></div>
            <div><div className="summary-label">AC buses</div><div className="summary-value">{loading ? '—' : buses.filter(bus => bus.acAvailable === true).length}</div></div>
          </div>
          <div className="summary-card">
            <div className="summary-icon summary-orange"><i className="bi bi-people" /></div>
            <div><div className="summary-label">Total seats</div><div className="summary-value">{loading ? '—' : buses.reduce((total, bus) => total + (Number(bus.seatingCapacity) || 0), 0).toLocaleString()}</div></div>
          </div>
        </section>

        <div className="content-grid">
          <section className="panel form-panel" id="manage-bus">
            <BusForm
              editingBus={editingBus}
              onSave={saveBus}
              onCancel={() => setEditingBus(null)}
              saving={saving}
            />
          </section>
          <div className="records-column">
            <BusTable
              buses={filteredBuses}
              loading={loading}
              error={pageError}
              search={search}
              onSearchChange={setSearch}
              onRefresh={loadBuses}
              onEdit={startEdit}
              onDelete={deleteBus}
            />
            <div className="api-note"><i className="bi bi-link-45deg me-2" /><span>Connected API base: <code>{import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081'}</code></span></div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="container d-flex flex-wrap justify-content-between gap-2">
          <span>FleetFlow <span className="footer-dot">·</span> Bus CRUD Management</span>
          <span>Built with React, Bootstrap and Spring Boot</span>
        </div>
      </footer>
    </div>
  )
}