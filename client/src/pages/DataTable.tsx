// src/pages/DataTable.tsx


import React, { useState, useEffect } from 'react';
import { Database, Search, Filter } from 'lucide-react';
import { apiService, UserResponse } from '../Services/api';
import Card from '../components/ui/Card';


const DataTable: React.FC = () => {
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<keyof UserResponse>('birthdate');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await apiService.getAllUsers();
                setUsers(data);
                setFilteredUsers(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);


    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = users
            .filter(user => {
                const e = (user.email   ?? '').toLowerCase();
                const a = (user.aboutMe ?? '').toLowerCase();
                const d = (user.address ?? '').toLowerCase();
                return e.includes(term) || a.includes(term) || d.includes(term);
            })
            .sort((a, b) => {
                const av = (a[sortField] ?? '').toString();
                const bv = (b[sortField] ?? '').toString();
                return sortOrder === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
            });


        setFilteredUsers(filtered);
    }, [users, searchTerm, sortField, sortOrder]);


    const handleSort = (field: keyof UserResponse) => {
        if (sortField === field) {
            setSortOrder(o => (o === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };


    const formatDate = (s: string) => new Date(s).toLocaleDateString();


    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center py-20">
                    <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full mx-auto" />
                    <p className="mt-4 text-gray-600">Loading users…</p>
                </div>
            </div>
        );
    }


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                    <Database className="h-8 w-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900">User Data</h1>
                </div>
                <p className="text-gray-600">View and manage all registered users</p>
            </div>


            <Card className="mb-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="w-full sm:max-w-md relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users…"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
              {filteredUsers.length} of {users.length} users
            </span>
                    </div>
                </div>
            </Card>


            <Card>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th
                                onClick={() => handleSort('email')}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                            >
                                Email {sortField === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th
                                onClick={() => handleSort('aboutMe')}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                            >
                                About Me {sortField === 'aboutMe' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th
                                onClick={() => handleSort('address')}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                            >
                                Address {sortField === 'address' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th
                                onClick={() => handleSort('birthdate')}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                            >
                                Birthdate {sortField === 'birthdate' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                        </tr>
                        </thead>


                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                                    {user.aboutMe ?? '-'}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                                    {user.address ?? '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {user.birthdate ? formatDate(user.birthdate) : '-'}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>


                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12">
                            <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">
                                {searchTerm ? 'No users found matching your search.' : 'No users found.'}
                            </p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};


export default DataTable;





