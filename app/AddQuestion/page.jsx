"use client"

import MainLayout from "@/components/MainLayout";
import React, { useState } from 'react';
import axios from 'axios';

const AddQuestion = () => {
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [required, setRequired] = useState('');
  const [options, setOptions] = useState(['']);

  const handleTypeChange = (e) => {
    setType(e.target.value);
    if (e.target.value !== 'optional') {
      setOptions(['']);
    }
  };

  const handleOptionsChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      type,
      content,
      required,
    };
    if (type === 'optional') {
      data.options = options.filter(option => option.trim() !== '');
    }

    try {
      await axios.post(process.env.base_url+'store-content', data);
      alert('Content stored successfully');
      setType('');
      setContent('');
      setRequired('');
      setOptions(['']);
    } catch (error) {
      console.error('Error storing content', error);
      alert('Failed to store content');
    }
  };

  return (
    <MainLayout>
    <form onSubmit={handleSubmit} className='all'>
      <div className="form-content"> {/* Added a wrapper for centering */}
      <div>
        <label htmlFor="type">Type:</label>
        <select id="type" value={type} onChange={handleTypeChange} required>
          <option value="">Select type</option>
          <option value="notice">Notice</option>
          <option value="optional">Optional</option>
          <option value="descriptive">Descriptive</option>
        </select>
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="required">Required:</label>
        <input
          type="text"
          id="required"
          value={required}
          onChange={(e) => setRequired(e.target.value)}
          required
        />
      </div>
      {type === 'optional' && (
        <div>
          <label>Options:</label>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionsChange(index, e.target.value)}
                required
              />
              {index > 0 && (
                <button type="button" onClick={() => removeOption(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addOption} className="add-option-button">
            +
          </button>
        </div>
      )}
      </div> {/* End of form-content wrapper */}
      <button type="submit">Submit</button>

      <style jsx>{`
        .form-container {
          width: 400px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        label {
          display: block;
          margin-bottom: 5px;
        }

        input[type="text"],
        textarea,
        select {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;  /* Ensure padding and border don't affect width */
          margin-bottom: 10px;  /* Add some space between inputs */
        }

        textarea {
          min-height: 100px; /* Make the textarea a bit taller */
        }

        button {
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-left: 710px;
          margin-top: 10px;
        }

        .add-option-button {
          background-color: #007bff; /* Blue */
          padding: 2px 8px;
        }

        .option-row {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
        }

        .option-row button {
          margin-left: 10px;
          padding: 5px 10px;
        }

        .form-content  {
          margin-left: 600px; /* Adjust margin as needed */
          margin-right: 600px;
          border: 0.5px solid black;
          padding: 10px;
          border-radius: 5px;
        }
          
      `}</style>
    </form>
    </MainLayout>
  );
};

export default AddQuestion;
