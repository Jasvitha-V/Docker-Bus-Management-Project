import { useEffect, useState } from 'react'

const blankForm = {
  busNumber: '',
  operatorName: '',
  seatingCapacity: '',
  acAvailable: 'true'
}

export default function BusForm({ editingBus, onSave, onCancel, saving }) {
  const [form, setForm] = useState(blankForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingBus) {
      setForm({
        busNumber: editingBus.busNumber ?? '',
        operatorName: editingBus.operatorName ?? '',
        seatingCapacity: String(editingBus.seatingCapacity ?? ''),
        acAvailable: String(editingBus.acAvailable)
      })
    } else {
      setForm(blankForm)
    }
    setErrors({})
  }, [editingBus])

  function change(event) {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
    setErrors(current => ({ ...current, [name]: '' }))
  }

  function validate() {
    const next = {}
    if (!form.busNumber.trim()) next.busNumber = 'Bus number is required.'
    else if (form.busNumber.trim().length > 20) next.busNumber = 'Bus number cannot exceed 20 characters.'
    if (!form.operatorName.trim()) next.operatorName = 'Operator name is required.'
    else if (form.operatorName.trim().length > 100) next.operatorName = 'Operator name cannot exceed 100 characters.'
    if (form.seatingCapacity === '') next.seatingCapacity = 'Seating capacity is required.'
    else if (!Number.isInteger(Number(form.seatingCapacity)) || Number(form.seatingCapacity) < 1) {
      next.seatingCapacity = 'Enter a whole number greater than zero.'
    }
    if (!['true', 'false'].includes(form.acAvailable)) next.acAvailable = 'Choose whether AC is available.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function submit(event) {
    event.preventDefault()
    if (!validate()) return
    onSave({
      busNumber: form.busNumber.trim(),
      operatorName: form.operatorName.trim(),
      seatingCapacity: Number(form.seatingCapacity),
      acAvailable: form.acAvailable === 'true'
    })
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="form-section-heading">
        <div className="section-icon"><i className={`bi ${editingBus ? 'bi-pencil-square' : 'bi-plus-lg'}`} /></div>
        <div>
          <h2 className="h5 mb-1">{editingBus ? 'Update bus details' : 'Add a new bus'}</h2>
          <p className="text-secondary small mb-0">
            {editingBus ? `Editing bus ID ${editingBus.id}` : 'Enter the details below to add a bus to your fleet.'}
          </p>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="busNumber" className="form-label">Bus number <span className="text-danger">*</span></label>
        <input
          id="busNumber" name="busNumber" value={form.busNumber} onChange={change}
          className={`form-control ${errors.busNumber ? 'is-invalid' : ''}`}
          placeholder="e.g. AP16AB1234" maxLength={20} required
          aria-invalid={Boolean(errors.busNumber)}
        />
        {errors.busNumber && <div className="invalid-feedback">{errors.busNumber}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="operatorName" className="form-label">Operator name <span className="text-danger">*</span></label>
        <input
          id="operatorName" name="operatorName" value={form.operatorName} onChange={change}
          className={`form-control ${errors.operatorName ? 'is-invalid' : ''}`}
          placeholder="e.g. APSRTC" maxLength={100} required
          aria-invalid={Boolean(errors.operatorName)}
        />
        {errors.operatorName && <div className="invalid-feedback">{errors.operatorName}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="seatingCapacity" className="form-label">Seating capacity <span className="text-danger">*</span></label>
        <input
          id="seatingCapacity" name="seatingCapacity" type="number" min="1" step="1"
          value={form.seatingCapacity} onChange={change}
          className={`form-control ${errors.seatingCapacity ? 'is-invalid' : ''}`}
          placeholder="e.g. 50" required
          aria-invalid={Boolean(errors.seatingCapacity)}
        />
        {errors.seatingCapacity && <div className="invalid-feedback">{errors.seatingCapacity}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="acAvailable" className="form-label">Air conditioning <span className="text-danger">*</span></label>
        <select
          id="acAvailable" name="acAvailable" value={form.acAvailable} onChange={change}
          className={`form-select ${errors.acAvailable ? 'is-invalid' : ''}`} required
        >
          <option value="true">AC available</option>
          <option value="false">Non-AC bus</option>
        </select>
        {errors.acAvailable && <div className="invalid-feedback">{errors.acAvailable}</div>}
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-primary flex-grow-1" type="submit" disabled={saving}>
          {saving ? <><span className="spinner-border spinner-border-sm me-2" />Saving...</> : <><i className={`bi ${editingBus ? 'bi-check2-circle' : 'bi-plus-circle'} me-2`} />{editingBus ? 'Save changes' : 'Add bus'}</>}
        </button>
        {editingBus && <button className="btn btn-outline-secondary" type="button" onClick={onCancel} disabled={saving}>Cancel</button>}
      </div>
      <p className="form-text mt-3 mb-0"><i className="bi bi-shield-check me-1" />Bus ID is generated automatically by the database.</p>
    </form>
  )
}