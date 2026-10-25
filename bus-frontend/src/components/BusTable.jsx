export default function BusTable({ buses, loading, error, search, onSearchChange, onRefresh, onEdit, onDelete }) {
  return (
    <section className="panel records-panel" id="records">
      <div className="records-heading">
        <div>
          <div className="eyebrow">FLEET DIRECTORY</div>
          <h2 className="h4 mb-1">Bus records</h2>
          <p className="text-secondary small mb-0">View and manage buses registered in your fleet.</p>
        </div>
        <button className="btn btn-outline-primary btn-sm" onClick={onRefresh} disabled={loading}>
          <i className={`bi ${loading ? 'bi-arrow-repeat' : 'bi-arrow-clockwise'} me-1`} /> Refresh
        </button>
      </div>

      <div className="table-tools">
        <div className="search-box">
          <i className="bi bi-search" />
          <input value={search} onChange={e => onSearchChange(e.target.value)} placeholder="Search bus number or operator..." aria-label="Search buses" />
        </div>
        <span className="record-count">{buses.length} {buses.length === 1 ? 'record' : 'records'}</span>
      </div>

      {error && <div className="alert alert-danger mx-3" role="alert"><i className="bi bi-exclamation-triangle me-2" />{error}</div>}

      {loading ? (
        <div className="state-panel">
          <div className="spinner-border text-primary mb-3" role="status"><span className="visually-hidden">Loading</span></div>
          <p className="text-secondary mb-0">Loading bus records...</p>
        </div>
      ) : buses.length === 0 ? (
        <div className="state-panel">
          <div className="empty-icon"><i className="bi bi-bus-front" /></div>
          <h3 className="h6 mt-3">No buses found</h3>
          <p className="text-secondary small mb-0">{search ? 'Try a different search term.' : 'Add your first bus using the form.'}</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle mb-0 bus-table">
            <thead>
              <tr>
                <th scope="col">BUS</th>
                <th scope="col">OPERATOR</th>
                <th scope="col">SEATS</th>
                <th scope="col">TYPE</th>
                <th scope="col" className="text-end">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {buses.map(bus => (
                <tr key={bus.id}>
                  <td>
                    <div className="bus-id">#{bus.id}</div>
                    <div className="fw-semibold">{bus.busNumber}</div>
                  </td>
                  <td>{bus.operatorName}</td>
                  <td><span className="seat-pill"><i className="bi bi-people me-1" />{bus.seatingCapacity}</span></td>
                  <td><span className={`type-pill ${bus.acAvailable ? 'type-ac' : 'type-nonac'}`}>{bus.acAvailable ? 'AC' : 'Non-AC'}</span></td>
                  <td>
                    <div className="d-flex justify-content-end gap-2">
                      <button className="btn btn-sm action-btn edit-btn" onClick={() => onEdit(bus)} aria-label={`Edit bus ${bus.busNumber}`} title="Edit"><i className="bi bi-pencil" /></button>
                      <button className="btn btn-sm action-btn delete-btn" onClick={() => onDelete(bus)} aria-label={`Delete bus ${bus.busNumber}`} title="Delete"><i className="bi bi-trash3" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="table-footer"><i className="bi bi-info-circle me-2" />Bus IDs are assigned automatically by the backend.</div>
    </section>
  )
}