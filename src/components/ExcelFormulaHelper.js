import React, { useState } from 'react';
import axios from 'axios';
import './ExcelFormulaHelper.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import headlineImage from '../images/headline1.png'; // Adjust the path as needed
import sqlLogo from '../images/sql-logo.png'; // Import the SQL logo
import excelLogo from '../images/excel-logo.png'; // Import the Excel logo
import { isValidExcelDescription } from '../utils/validateExcel';
import { isValidSQLDescription } from '../utils/validateSQL';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCopy, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import icons
import '../ToastifyCustom.css'; // Import custom Toastify CSS

const FormulaHelper = () => {
  const [description, setDescription] = useState('');
  const [formula, setFormula] = useState('');
  const [explanation, setExplanation] = useState('');
  const [mode, setMode] = useState('excel');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    const isValidDescription = mode === 'excel' ? isValidExcelDescription : isValidSQLDescription;

    if (!isValidDescription(description).valid) {
      toast.error(isValidDescription(description).error, { className: 'toastify-custom' });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/chat', {
        message: description,
        type: mode,
      });
      const data = response.data.message.split('\n');
      setFormula(data[0]);
      setExplanation(data.slice(1).join('\n'));
      toast.success('Formula/Query generated successfully!', { className: 'toastify-custom' });
    } catch (error) {
      console.error('Error processing request:', error.response ? error.response.data : error.message);
      toast.error('There was an error processing your request. Please try again.', { className: 'toastify-custom' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    handleGenerate();
  };

  const handleCopy = () => {
    const textToCopy = `Formula: ${formula}\nExplanation: ${explanation}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.success('Copied to clipboard!', { className: 'toastify-custom' });
    }).catch(() => {
      toast.error('Failed to copy!', { className: 'toastify-custom' });
    });
  };

  const handleClear = () => {
    setFormula('');
    setExplanation('');
    toast.info('Cleared the output!', { className: 'toastify-custom' });
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setDescription('');
    setFormula('');
    setExplanation('');
  };

  return (
    <div className="formula-helper">
      <ToastContainer />
      <img src={headlineImage} alt="Headline" className="headline-image" />
      <div className="button-group">
        <button 
          className={`mode-button ${mode === 'excel' ? 'active' : ''}`} 
          onClick={() => handleModeChange('excel')}
        >
          <img src={excelLogo} alt="Excel Logo" className="button-logo" />
          Excel
        </button>
        <button 
          className={`mode-button ${mode === 'sql' ? 'active' : ''}`} 
          onClick={() => handleModeChange('sql')}
        >
          <img src={sqlLogo} alt="SQL Logo" className="button-logo" />
          SQL
        </button>
      </div>
      <div className="helper-content">
        <div className="input-container">
          <textarea
            className="input-box"
            placeholder={`Describe the ${mode.toUpperCase()} formula/query you need or input the formula/query...`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="submit-button" onClick={handleSubmit}>
            <FontAwesomeIcon icon={faPaperPlane} />
            Submit
          </button>
        </div>
        <div className="output-container">
          {loading ? (
            <div className="spinner-container">
              <ClipLoader size={50} color={"#123abc"} loading={loading} />
            </div>
          ) : (
            <>
              <textarea
                className="formula"
                value={formula}
                readOnly
                rows={2}
              />
              <textarea
                className="explanation"
                value={explanation}
                readOnly
              />
              <div className="action-buttons">
                <button className="action-button" onClick={handleCopy}>
                  <FontAwesomeIcon icon={faCopy} />
                  Copy
                </button>
                <button className="action-button" onClick={handleClear}>
                  <FontAwesomeIcon icon={faTrash} />
                  Clear
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormulaHelper;
