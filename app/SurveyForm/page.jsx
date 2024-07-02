"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Select from 'react-select';
import MainLayout from "@/components/MainLayout";


// Modal.setAppElement('#root');

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    anonymous: false, // Boolean for checkbox
    dismissible: false, // Boolean for checkbox
    required: false, // Boolean for checkbox
    cohort: [
      'himanshu.panwar', 'trilok.panchal', 'aditya.jangid',
      'akshat.choudhary', 'amardeep.sinha'
    ],
    contents: [],
    schedule_from: '',
    priority: '0', // Default to priority 0
    schedule_to: ''
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availableContents, setAvailableContents] = useState([]);
  const [selectedContents, setSelectedContents] = useState([]);

  useEffect(() => {
    if (modalIsOpen) {
      axios.get(process.env.base_url+'get-all-content')
        .then(response => {
          setAvailableContents(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the contents!', error);
        });
    }
  }, [modalIsOpen]);

  const handleInputChange = (event) => {
    const { name, type, checked, value } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleContentSelect = (selectedOptions) => {
    setSelectedContents(selectedOptions);
    setFormData({
      ...formData,
      contents: selectedOptions.map(option => option.value)
    });
  };

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(process.env.base_url+'store-interaction', formData)
      .then(response => {
        console.log('Data submitted successfully:', response.data);
        // Reset form fields and selected contents
        setFormData({
          anonymous: false,
          dismissible: false,
          required: false,
          cohort: [
            'himanshu.panwar', 'trilok.panchal', 'aditya.jangid',
            'akshat.choudhary', 'amardeep.sinha'
          ],
          contents: [],
          schedule_from: '',
          priority: '0',
          schedule_to: ''
        });
        setSelectedContents([]);
        setShowSuccessMessage(true); // Show success message
        setTimeout(() => setShowSuccessMessage(false), 3000); // Hide message after 3 seconds
      })
      .catch(error => {
        console.error('There was an error submitting the data!', error);
      });
  };

  const contentOptions = availableContents.map(content => ({
    value: content.content_id,
    label: content.content
  }));

  return (
    <MainLayout>
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="checkbox"
            name="anonymous"
            checked={formData.anonymous}
            onChange={handleInputChange}
          />
          Anonymous
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="dismissible"
            checked={formData.dismissible}
            onChange={handleInputChange}
          />
          Dismissible
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="required"
            checked={formData.required}
            onChange={handleInputChange}
          />
          Required
        </label>
        <br />
        <label>
          Schedule From:
          <input
            type="date"
            name="schedule_from"
            value={formData.schedule_from}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Schedule To:
          <input
            type="date"
            name="schedule_to"
            value={formData.schedule_to}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Priority:
          <select
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
          >
            <option value="0">0 - Highest</option>
            <option value="1">1</option>
            <option value="2">2 - Lowest</option>
          </select>
        </label>
        <br />
        <button type="button" onClick={handleOpenModal}>
          Select Contents
        </button>
        <br />
        <button type="submit">Submit</button>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Select Contents"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Select Contents</h2>
        <Select
          isMulti
          options={contentOptions}
          value={selectedContents}
          onChange={handleContentSelect}
        />
        <button onClick={handleCloseModal}>Close</button>
      </Modal>

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
          margin-bottom: 10px;
        }

        input[type="checkbox"] {
          margin-right: 5px;
        }

        input[type="date"], select {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          background-color: #4CAF50; /* Green */
          border: none;
          color: white;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
          border-radius: 4px;
        }

        .modal {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
    </MainLayout>
  );
};

export default SurveyForm;
