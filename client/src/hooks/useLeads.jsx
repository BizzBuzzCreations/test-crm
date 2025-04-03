import { useState, useEffect } from 'react';

const useLeads = (id) => {
    const [leads, setLeads] = useState([]);
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                let leadEndpoint = `${import.meta.env.VITE_SERVER_URL}/api/leads`;
                if (id) {
                    leadEndpoint = `${import.meta.env.VITE_SERVER_URL}/api/leads/${id}`;
                }

                const response = await fetch(leadEndpoint);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (id) {
                    setLead({ ...data, notes: data.notes || [] });
                } else {
                    setLeads(data);
                }
            } catch (error) {
                console.error('Failed to fetch leads: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, [id]);

    const updateLead = async (id, leadData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/leads/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(leadData),
            });

            if (!response.ok) {
                throw new Error('Failed to update lead');
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating lead: ', error);
            throw error;
        }
    };

    return { leads, lead, loading, updateLead };
}

export default useLeads;
