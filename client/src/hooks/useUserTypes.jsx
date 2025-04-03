import { useState, useEffect } from 'react';

const useUserTypes = (id) => {
    const [userTypes, setUserTypes] = useState([]);
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserTypes = async () => {
            try {
                let userTypeEndpoint = `${import.meta.env.VITE_SERVER_URL}/api/user-types`;
                if (id) {
                    userTypeEndpoint = `${import.meta.env.VITE_SERVER_URL}/api/user-types/${id}`;
                }

                const response = await fetch(userTypeEndpoint);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (id) {
                    setUserType(data);
                } else {
                    setUserTypes(data);
                }
            } catch (error) {
                console.error('Failed to fetch user types: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserTypes();
    }, [id]);

    const updateUserType = async (id, userTypeData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user-types/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userTypeData),
            });

            if (!response.ok) {
                throw new Error('Failed to update user type');
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating user type: ', error);
            throw error;
        }
    };

    const addUserType = async (userTypeData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user-types`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userTypeData),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Parse the error response
                console.error('Error response: ', errorData); // Log the error data for debugging
                throw new Error('Failed to add user type');
            }

            return await response.json();
        } catch (error) {
            console.error('Error adding user type: ', error);
            throw error;
        }
    }

    return { userTypes, userType, loading, updateUserType, addUserType };
}

export default useUserTypes;