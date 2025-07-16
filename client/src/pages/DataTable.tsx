import React, { useState, useEffect } from 'react'
import { apiService, UserResponse } from '../Services/api'

const DataTable: React.FC = () => {
    const [users, setUsers] = useState<UserResponse[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        apiService.getAllUsers()
            .then(data => setUsers(data))
            .catch(err => {
                console.error('Error fetching users:', err)
                setUsers([])
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <div>Loading users…</div>
    }
    if (users.length === 0) {
        return <div>No users to display. Try signing up first.</div>
    }

    return (
        <div style={{ padding: '1rem' }}>
            <h2>User Data</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Email</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>About Me</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Address</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Birthdate</th>
                </tr>
                </thead>
                <tbody>
                {users.map(u => (
                    <tr key={u.id}>
                        <td style={{ border: '1px solid #eee', padding: '0.5rem' }}>{u.email}</td>
                        <td style={{ border: '1px solid #eee', padding: '0.5rem' }}>{u.aboutMe || '-'}</td>
                        <td style={{ border: '1px solid #eee', padding: '0.5rem' }}>{u.address || '-'}</td>
                        <td style={{ border: '1px solid #eee', padding: '0.5rem' }}>{u.birthdate || '-'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable
