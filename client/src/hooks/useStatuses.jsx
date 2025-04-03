import { useState, useEffect } from 'react';

const useStatuses = (id) => {
    const [statuses, setStatuses] = useState([]);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                let statusEndpoint = `${import.meta.env.VITE_SERVER_URL}/api/statuses`;
                if (id) {
                    statusEndpoint = `${import.meta.env.VITE_SERVER_URL}/api/statuses/${id}`;
                }

                const response = await fetch(statusEndpoint);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (id) {
                    setStatus(data);
                } else {
                    setStatuses(data);
                }
            } catch (error) {
                console.error('Failed to fetch statuses: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatuses();
    }, [id]);

    const updateStatus = async (id, statusData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/statuses/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(statusData),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating status: ', error);
            throw error;
        }
    };

    const addStatus = async (statusData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/statuses`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(statusData),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Parse the error response
                console.error('Backend error:', errorData); // Log the backend error
                throw new Error('Failed to add status');
            }

            return await response.json();
        } catch (error) {
            console.error('Error adding status: ', error);
            throw error;
        }
    }

    return { statuses, status, loading, updateStatus, addStatus };
}

export default useStatuses;