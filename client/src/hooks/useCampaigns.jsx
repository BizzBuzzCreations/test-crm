import { useState, useEffect } from 'react';

const useCampaigns = (id) => {
    const [campaigns, setCampaigns] = useState([]);
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                let campaignEndpoint = `${import.meta.env.VITE_SERVER_URL}/api/campaigns`;
                if (id) {
                    campaignEndpoint = `${import.meta.env.VITE_SERVER_URL}/api/campaigns/${id}`;
                }

                const response = await fetch(campaignEndpoint);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (id) {
                    setCampaign(data);
                } else {
                    setCampaigns(data);
                }
            } catch (error) {
                console.error('Failed to fetch campaigns: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, [id]);

    const updateCampaign = async (id, campaignData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/campaigns/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(campaignData),
            });

            if (!response.ok) {
                throw new Error('Failed to update campaign');
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating campaign: ', error);
            throw error;
        }
    };

    return { campaigns, campaign, loading, updateCampaign };
}

export default useCampaigns;