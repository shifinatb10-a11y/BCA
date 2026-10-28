import { useState } from 'react'
import { Icon } from '../common/Icon'
import { Button } from '../common/Button'

export function StudentManager({
  batches,
  newBatch,
  setNewBatch,
  addBatch,
  removeBatch,
  showToast,
  studentsList = [],
  onOpenAddStudent,
  onEditStudent,
  onDeleteStudent,
}) {
  const [batch, setBatch] = useState(batches[0] || '2025–2029')
  const [sem, setSem] = useState('Sem 1')

  const filteredStudents = studentsList.filter((s) => s.batch === batch && s.semester === sem)

  return (
    <div className="student-manager">
      <div className="student-controls">
        <label>
          Batch year
          <select value={batch} onChange={(event) => setBatch(event.target.value)}>
            {batches.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          Semester
          <select value={sem} onChange={(event) => setSem(event.target.value)}>
            {Array.from({ length: 8 }, (_, i) => <option key={i}>Sem {i + 1}</option>)}
          </select>
        </label>
        <Button onClick={() => showToast(`Showing ${batch} · ${sem}`)} icon="search">Filter students</Button>
      </div>

      <div className="batch-manager">
        <div>
          <span className="eyebrow"><span className="eyebrow-line" />Data collections</span>
          <h3>Batch years</h3>
          <p>Student records are grouped under admission batch years.</p>
        </div>
        <div className="batch-list">
          {batches.map((item) => (
            <div className="batch-row" key={item}>
              <span className="batch-bullet" />
              <strong>{item}</strong>
              <small>{studentsList.filter((s) => s.batch === item).length} registered students</small>
              <button onClick={() => removeBatch(item)} aria-label={`Delete ${item}`}><Icon name="trash" size={15} /></button>
            </div>
          ))}
          <form className="new-batch" onSubmit={addBatch}>
            <input value={newBatch} onChange={(event) => setNewBatch(event.target.value)} placeholder="e.g. 2027–2031" />
            <button type="submit"><Icon name="plus" size={16} /> Add batch</button>
          </form>
        </div>
      </div>

      <div className="student-table-card">
        <div className="admin-card-heading">
          <div>
            <h3>{batch} · {sem} Students</h3>
            <p>{filteredStudents.length} students recorded in this semester.</p>
          </div>
          <Button variant="outline" onClick={onOpenAddStudent} icon="plus">Add student</Button>
        </div>

        <div className="student-table">
          <div className="student-table-head">
            <span>Roll no.</span>
            <span>Student name</span>
            <span>Admission no.</span>
            <span>Register no.</span>
            <span>Actions</span>
          </div>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((stu) => (
              <div className="student-table-row" key={stu.id || stu.rollNo}>
                <span>{stu.rollNo}</span>
                <strong>{stu.name}</strong>
                <span>{stu.admissionNo}</span>
                <span>{stu.registerNo}</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className="btn-admin-edit" onClick={() => onEditStudent(stu)} style={{ padding: '3px 7px', fontSize: '10px' }}>Edit</button>
                  <button className="btn-admin-del" onClick={() => onDeleteStudent(stu.id, stu.name)} style={{ padding: '3px 7px', fontSize: '10px' }}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '16px', color: '#94a3b8', fontSize: '11px', textAlign: 'center' }}>
              No students recorded for {batch} · {sem}. Click "Add student" to create records.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
