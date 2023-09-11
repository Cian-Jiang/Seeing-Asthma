import { useState } from 'react';
import axios from 'axios';

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
        const api_key = process.env.API_KEY;
        const formData = new FormData();
        formData.append('image', image);
        formData.append('type', type);
        formData.append('key', api_key);

        console.log(formData);

        try {
            const response = await axios.post('https://api.healthcoder.live/image_recognition', formData, {
                headers: {
                    'api_key': api_key, // 使用你的实际 API 密钥
                },
            });

            if (response.status === 200) {
                setResult(response.data);
            } else {
                setResult(`Error: ${response.status}`);
            }
        } catch (error) {
            console.error('There was an error uploading the data', error);
            setResult(`Error: ${error}`);
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
