'use client'

import { useState } from 'react'

export default function AdminPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleRefresh = async () => {
    setLoading(true)
    setResult(null)

    try {
      const token = prompt('Enter refresh token:')

      if (!token) {
        setResult({ error: 'No token provided' })
        setLoading(false)
        return
      }

      const response = await fetch('/api/refresh-all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to refresh data' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Admin Panel</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>
        Use this panel to manually trigger data refresh
      </p>

      <button
        onClick={handleRefresh}
        disabled={loading}
        style={{
          padding: '1rem 2rem',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: 'bold',
        }}
      >
        {loading ? 'Refreshing...' : 'Refresh Data'}
      </button>

      {result && (
        <pre
          style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#f5f5f5',
            color: '#333',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.85rem',
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
}
