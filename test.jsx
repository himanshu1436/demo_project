"use client";

import React, { useState } from 'react';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    survey_id: '',
    title: '',
    description: '',
    is_response: '',
    priority: '',
    questions: [''],
    q_type: '',
    options: [['']],
    is_mandatory: '',
    is_dismissable: '',
    is_immediate: '',
    is_anonymous: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = value;
    setFormData({
      ...formData,
      questions: updatedQuestions
    });
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[qIndex][optIndex] = value;
    setFormData({
      ...formData,
      options: updatedOptions
    });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, ''],
      options: [...formData.options, ['']]
    });
  };

  const addOption = (qIndex) => {
    const updatedOptions = [...formData.options];
    updatedOptions[qIndex] = [...updatedOptions[qIndex], ''];
    setFormData({
      ...formData,
      options: updatedOptions
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      survey_id: formData.survey_id,
      title: formData.title,
      description: formData.description,
      is_response: formData.is_response,
      priority: formData.priority,
      questions: formData.questions,
      q_type: formData.q_type,
      options: formData.options,
      is_mandatory: formData.is_mandatory,
      is_dismissable: formData.is_dismissable,
      is_immediate: formData.is_immediate,
      is_anonymous: formData.is_anonymous
    };

    try {
      const response = await fetch('http://localhost:3000/send-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">Responsive Form</h2>
          <p className="text-gray-500 mb-6">Form is mobile responsive. Give it a try.</p>

          <form onSubmit={handleSubmit} className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Survey Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="survey_id">Survey ID</label>
                    <input type="text" name="survey_id" id="survey_id" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={formData.survey_id} onChange={handleChange} />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={formData.title} onChange={handleChange} />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={formData.description} onChange={handleChange} />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="is_response">Is Response</label>
                    <input type="text" name="is_response" id="is_response" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={formData.is_response} onChange={handleChange} />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="priority">Priority</label>
                    <input type="text" name="priority" id="priority" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={formData.priority} onChange={handleChange} />
                  </div>

                  {formData.questions.map((question, qIndex) => (
                    <React.Fragment key={qIndex}>
                      <div className="md:col-span-5">
                        <label htmlFor={`question_${qIndex}`}>Question {qIndex + 1}</label>
                        <input
                          type="text"
                          name={`question_${qIndex}`}
                          id={`question_${qIndex}`}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={question}
                          onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                        />
                      </div>
                      {formData.options[qIndex].map((option, optIndex) => (
                        <div key={optIndex} className="md:col-span-5">
                          <label htmlFor={`option_${qIndex}_${optIndex}`}>Option {optIndex + 1} for Question {qIndex + 1}</label>
                          <input
                            type="text"
                            name={`option_${qIndex}_${optIndex}`}
                            id={`option_${qIndex}_${optIndex}`}
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={option}
                            onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                          />
                        </div>
                      ))}
                      <div className="md:col-span-5">
                        <button type="button" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => addOption(qIndex)}>
                          Add Option to Question {qIndex + 1}
                        </button>
                      </div>
                    </React.Fragment>
                  ))}

                  <div className="md:col-span-5">
                    <button type="button" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={addQuestion}>
                      Add Question
                    </button>
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="q_type">Question Type</label>
                    <input type="text" name="q_type" id="q_type" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={formData.q_type} onChange={handleChange} />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="is_mandatory">Is Mandatory</label>
                    <div>
                      <label className="inline-flex items-center mt-2">
                        <input type="radio" name="is_mandatory" value="1" className="form-radio" checked={formData.is_mandatory === '1'} onChange={handleChange} />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center mt-2 ml-6">
                        <input type="radio" name="is_mandatory" value="0" className="form-radio" checked={formData.is_mandatory === '0'} onChange={handleChange} />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="is_dismissable">Is Dismissable</label>
                    <div>
                      <label className="inline-flex items-center mt-2">
                        <input type="radio" name="is_dismissable" value="1" className="form-radio" checked={formData.is_dismissable === '1'} onChange={handleChange} />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center mt-2 ml-6">
                        <input type="radio" name="is_dismissable" value="0" className="form-radio" checked={formData.is_dismissable === '0'} onChange={handleChange} />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="is_immediate">Is Immediate</label>
                    <div>
                      <label className="inline-flex items-center mt-2">
                        <input type="radio" name="is_immediate" value="1" className="form-radio" checked={formData.is_immediate === '1'} onChange={handleChange} />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center mt-2 ml-6">
                        <input type="radio" name="is_immediate" value="0" className="form-radio" checked={formData.is_immediate === '0'} onChange={handleChange} />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="is_anonymous">Is Anonymous</label>
                    <div>
                      <label className="inline-flex items-center mt-2">
                        <input type="radio" name="is_anonymous" value="1" className="form-radio" checked={formData.is_anonymous === '1'} onChange={handleChange} />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center mt-2 ml-6">
                        <input type="radio" name="is_anonymous" value="0" className="form-radio" checked={formData.is_anonymous === '0'} onChange={handleChange} />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
