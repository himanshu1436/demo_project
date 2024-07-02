"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import MainLayout from "@/components/MainLayout";


const InteractionsTable = () => {
  const [interactionData, setInteractionData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedInteractions, setSelectedInteractions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(process.env.base_url+'get-all-interactions');
      setInteractionData(response.data);
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (interactionId) => {
    const index = selectedInteractions.indexOf(interactionId);
    if (index === -1) {
      setSelectedInteractions([...selectedInteractions, interactionId]);
    } else {
      const updatedSelectedInteractions = [...selectedInteractions];
      updatedSelectedInteractions.splice(index, 1);
      setSelectedInteractions(updatedSelectedInteractions);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedInteractions([]);
    } else {
      const allInteractionIds = interactionData.map(interaction => interaction.interaction_id);
      setSelectedInteractions(allInteractionIds);
    }
    setSelectAll(!selectAll);
  };

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    buttonsContainer: {
      marginBottom: '10px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '10px'
    },
    th: {
      border: '1px solid #dddddd',
      textAlign: 'left',
      padding: '8px',
      backgroundColor: '#f2f2f2'
    },
    td: {
      border: '1px solid #dddddd',
      textAlign: 'left',
      padding: '8px'
    },
    tr: {
      '&:nth-child(even)': { backgroundColor: '#f2f2f2' }
    },
    h1: {
      textAlign: 'center'
    }
  };

  return (
    <MainLayout>
    <div style={styles.container}>
      <h1 style={styles.h1}>Interaction Details</h1>
      <div style={styles.buttonsContainer}>
        <button onClick={handleSelectAll}>{selectAll ? 'Deselect All' : 'Select All'}</button>
      </div>
      {interactionData.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Anonymous</th>
              <th style={styles.th}>Priority</th>
              <th style={styles.th}>Schedule From</th>
              <th style={styles.th}>Dismissible</th>
              <th style={styles.th}>Cohort</th>
              <th style={styles.th}>Required</th>
              <th style={styles.th}>Interaction ID</th>
              <th style={styles.th}>Contents</th>
              <th style={styles.th}>Schedule To</th>
              <th style={styles.th}>Select to Present</th>
            </tr>
          </thead>
          <tbody>
            {interactionData.map((interaction) => (
              <tr key={interaction.interaction_id} style={styles.tr}>
                <td style={styles.td}>{interaction.anonymoud}</td>
                <td style={styles.td}>{interaction.priority}</td>
                <td style={styles.td}>{moment(interaction['priority#schedule_from']).format('YYYY-MM-DD')}</td>
                <td style={styles.td}>{interaction.dismssible}</td>
                <td style={styles.td}>{interaction.cohort.join(', ')}</td>
                <td style={styles.td}>{interaction.required}</td>
                <td style={styles.td}>{interaction.interaction_id}</td>
                <td style={styles.td}>{interaction.contents.join(', ')}</td>
                <td style={styles.td}>{moment(interaction.schedule_to).format('YYYY-MM-DD')}</td>
                <td style={styles.td}>
                  <input
                    type="checkbox"
                    checked={selectedInteractions.includes(interaction.interaction_id)}
                    onChange={() => handleCheckboxChange(interaction.interaction_id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No interactions available.</p>
      )}
    </div>
    </MainLayout>
  );
};

export default InteractionsTable;
