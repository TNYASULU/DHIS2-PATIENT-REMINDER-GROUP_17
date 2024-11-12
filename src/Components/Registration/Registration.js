
import React, { useEffect, useState } from 'react';

const Registration = () => {
    const [orgUnits, setOrgUnits] = useState([]);
    const [form, setForm] = useState({ username: '', email: '', orgUnit: '' });

    useEffect(() => {
        async function fetchOrgUnits() {
            const API_URL = 'https://your-dhis2-instance-url/api/organisationUnits.json?paging=false';
            const USERNAME = 'your-username';
            const PASSWORD = 'your-password';

            try {
                const response = await fetch(API_URL, {
                    headers: {
                        Authorization: 'Basic ' + btoa(`${USERNAME}:${PASSWORD}`)
                    }
                });
                const data = await response.json();
                setOrgUnits(data.organisationUnits || []);
            } catch (error) {
                console.error('Error fetching organization units:', error);
            }
        }

        fetchOrgUnits();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted form:', form);
        // Add form submission logic here
    };

    return (
        <div>
            <h1>User Registration</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={form.username} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Organization Unit:
                    <select name="orgUnit" value={form.orgUnit} onChange={handleChange} required>
                        <option value="">Select Organization Unit</option>
                        {orgUnits.map(orgUnit => (
                            <option key={orgUnit.id} value={orgUnit.id}>
                                {orgUnit.displayName}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Registration;



