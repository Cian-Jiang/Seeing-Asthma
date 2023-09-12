"use client";
import { useState } from 'react';

export default function Upload() {
    const [image, setImage] = useState(null);
    const [type, setType] = useState('Plant');
    const [result, setResult] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('type', type);

        const response = await fetch('https://api.healthcoder.live/image_recognition', {
            method: 'POST',
            headers: {
                'api_key': process.env.API_KEY, // Replace with your actual API key
            },
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            setResult(data);
        } else {
            setResult(`Error: ${response.status}`);
        }
    };

    return (
        <div>
            <h1>Image Recognition</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="type">Type:</label>
                    <select id="type" value={type} onChange={handleTypeChange}>
                        <option value="Plant">Plant</option>
                        <option value="Cat">Cat</option>
                        <option value="Dog">Dog</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            {result && (
                <div>
                    <h2>Result:</h2>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
