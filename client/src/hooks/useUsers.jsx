import { useState, useEffect } from 'react';

const useUsers = (id) => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let userEndpoint = `${import.meta.env.VITE_SERVER_URL}/api/users`;
                if (id) {
                    userEndpoint = `${import.meta.env.VITE_SERVER_URL}/api/users/${id}`;
                }

                const response = await fetch(userEndpoint);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (id) {
                    setUser(data);
                } else {
                    setUsers(data);
                }
            } catch (error) {
                console.error('Failed to fetch users: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [id]);

    const updateUser = async (id, userData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating user: ', error);
            throw error;
        }
    };

    return { users, user, loading, updateUser };
}

export default useUsers;