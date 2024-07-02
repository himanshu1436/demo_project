// pages/survey.jsx
"use client"

import { useEffect, useState } from 'react';
import Head from 'next/head';

const client = () => {
  const [resData, setResData] = useState(null);
  // const [username, setUsername] = useState('himanshu.panwar');
  const username = "himanshu.panwar"

  useEffect(() => {
    fetch(process.env.base_url+`get-interaction?username=${username}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.content_data && data.content_data.length > 0) {
          setResData(data);
        } else {
          document.querySelector('.container').innerHTML = '<p>No survey data found. You can close the window.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching survey data:', error);
        document.querySelector('.container').innerHTML = '<p>There was an error fetching the survey data. Please try again later.</p>';
      });
  }, [username]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newResponses = [];

    resData.content_data.forEach((content, index) => {
      if (content.type !== 'notice') {
        const selectedOption = document.querySelector(`input[name="content${index}"]:checked`);
        if (selectedOption) {
          newResponses.push({
            content_id: content.content_id,
            response: selectedOption.value
          });
        }
      }
    });

    const comment = document.getElementById('comments').value;
    const responseData = {
      interaction_id: resData.interaction_id,
      username: username,
      responses: newResponses,
      comment: comment
    };

    const promises = newResponses.map((response) => {
      const postData = {
        username: username,
        interaction_id: resData.interaction_id,
        content_id: response.content_id,
        response: response.response
      };

      return fetch(process.env.base_url+'store-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
    });

    Promise.all(promises)
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(data => {
        console.log('Success:', data);
        // Clear the form and display the success message
        document.getElementById('survey-form').reset();
        document.getElementById('form-questions').innerHTML = '';
        document.getElementById('comments').value = '';
        document.querySelector('.container').innerHTML = '<p>Form submitted. You can close the window.</p>';
      })
      .catch(error => {
        console.error('Error:', error);
        // Optionally handle error (e.g., show an error message)
      });
  };

  return (
    <>
      <Head>
        <title>Survey Form</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Survey form ui created for the FreeCodeCamp's Responsive Web Design Certification." />
      </Head>
      <div className="container">
        <div className="header">
          <div className="column-header">
            <h1 id="title">Learner Experience Survey</h1>
            <p id="description">We would like to know a little more about your experience with the course. Thank you for taking the time to help us improve the platform.</p>
          </div>
          <div className="column-image">
            <div id="image-div">
              <img src="/images/survey_icon.svg" width="400" height="400" alt="Survey form icon" />
            </div>
          </div>
        </div>

        <form id="survey-form" style={{ display: resData ? 'block' : 'none' }} onSubmit={handleSubmit}>
          <div className="form-group" id="form-questions">
            {resData && resData.content_data.map((content, index) => (
              <div key={index} className="form-group">
                <p>{content.content}</p>
                {content.type !== 'notice' && content.options.map((option, i) => (
                  <label key={i}>
                    <input type="radio" name={`content${index}`} value={option} className="input-radio" />
                    {option}
                  </label>
                ))}
              </div>
            ))}
          </div>
          <div className="form-group">
            <p>Any comments or suggestions?</p>
            <textarea id="comments" className="input-textarea" name="comment" placeholder="Enter your comment here..."></textarea>
          </div>
          <div className="form-group">
            <button type="submit" id="submit" className="submit-button">Submit</button>
          </div>
        </form>
      </div>

      <section className="footer">
        <p>Design & Development - sidhu moosewala</p>
      </section>

      <style jsx>{`
        :root {
          font-size: 10px;
        }
        
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        
        body {
          font-family: "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
          font-size: 1.6rem;
          line-height: 1.4;
          color: black;
          margin: 0;
          background: linear-gradient(0deg, rgba(251,251,251,1) 0%, rgba(246,247,252,1) 100%);
        }
        
        h1 {
          font-size: 3rem;
          line-height: 2;
          margin-bottom: 4rem;
        }
        
        img {
          max-width: 100%;
          height: auto;
          display: block;
        }
        
        label {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        
        input,
        button,
        select,
        textarea {
          margin: 0;
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
        }
        
        button {
          border: none;
        }
        
        .container {
          width: 100%;
          margin: 6rem auto 6rem auto;
          box-shadow: 0 0.2rem 1.3rem 0.2rem rgba(0, 0, 0, 0.1);
          border-radius: 0.5rem;
          background-color: #fff;
        }
        
        @media (min-width: 576px) {
          .container {
            max-width: 540px;
          }
        }
        
        @media (min-width: 976px) {
          .container {
            max-width: 920px;
          }
        }
        
        .header {
          padding: 4.5rem;
          margin-bottom: 2rem;
        }
        
        .column-header {
          float: left;
          width: 54%;
          padding-top: 5rem;
          margin-right: 6%;
        }
        
        .column-image {
          float: left;
          width: 40%;
        }
        
        .header:after {
          content: "";
          display: table;
          clear: both;
        }
        
        @media screen and (max-width: 1000px) {
          .column-header,
          .column-image {
            width: 100%;
            margin: 0;
          }
          #image-div img {
            margin: auto;
          }
        }
        
        form {
          padding: 2.5rem;
          border-radius: 0.5rem;
        }
        
        .form-group {
          margin: 0 auto 2rem auto;
          padding: 0.5rem;
        }
        
        .form-control {
          display: block;
          width: 100%;
          height: 4.5rem;
          padding: 1rem;
          color: #495057;
          background-color: #fff;
          border: 1px solid #ced4da;
          border-radius: 0.25rem;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        
        .form-control:focus {
          border-color: #a6d8e2;
          outline: 0;
          box-shadow: 0 0 1rem 0.2rem rgba(205, 240, 247, 0.25);
        }
        
        .input-radio,
        .input-checkbox {
          display: inline-block;
          margin-right: 1rem;
          min-height: 1.5rem;
          min-width: 1.5rem;
        }
        
        .input-textarea {
          min-height: 120px;
          width: 100%;
          padding: 1rem;
          resize: vertical;
        }
        
        .submit-button {
          display: inline-block;
          width: 10rem;
          padding: 1rem;
          background: #32004a;
          color: #fff;
          border-radius: 0.5rem;
          cursor: pointer;
        }
        
        .submit-button:hover {
          animation-name: background-color;
          animation-duration: 500ms;
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
        }
        
        @keyframes background-color {
          100% {
            background-color: #6f4c81;
          }
        }
        
        .footer {
          color: #28003b;
          padding: 0.1rem;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default client;
