import React, { useState } from 'react';
import { parseAndSaveCSV } from '../utils/csvParser';
import { Helmet } from 'react-helmet-async';
import { FiDownload, FiUpload, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const CSV_TEMPLATE = `Property Name,Type,Location,Price,Owner,Contact,Amenities,Status,Configurations,Possession status,Unit Area,Available Facilities,Specifications,About this property,Drive Link / Photos,Featured Level
Example Villa,villa,"Bandra, Mumbai",15000000,John Doe,9876543210,"Pool, Gym, Parking",available,4 BHK,Ready to Move,3500,Featured,"Marble Floors, Smart Home",A beautiful luxury villa.,"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800, https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800, https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",1
Example Apartment,apartment,"Andheri, Mumbai",8500000,Jane Smith,1234567890,"Gym, Security",available,2 BHK,Dec 2025,1200,,,"Modern apartment in prime location.","https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",2`;

const DataUploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleDownloadTemplate = () => {
    const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('url' in window ? 'a' : 'a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'property_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setStatus('idle');
      setMessage('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus('error');
      setMessage('Please select a CSV file first.');
      return;
    }

    setStatus('loading');
    
    try {
      const text = await file.text();
      const properties = await parseAndSaveCSV(text);
      setStatus('success');
      setMessage(`Successfully uploaded and parsed ${properties.length} properties!`);
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'Failed to parse CSV file. Please check the format.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Upload Property Data | Krishhiv Realtors</title>
      </Helmet>
      
      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-secondary/20">
            <h1 className="font-heading text-3xl font-bold text-primary mb-2">
              Property Data Management
            </h1>
            <p className="text-textMuted mb-8">
              Download the CSV template, fill in your properties locally, and upload the file to instantly update your website.
            </p>

            {/* Template Download Section */}
            <div className="bg-secondary/5 rounded-xl p-6 mb-8 border border-secondary/10">
              <h2 className="text-xl font-bold text-primary mb-4">1. Download Template</h2>
              <p className="text-textMuted mb-4">
                Use our predefined template to ensure all property details are formatted correctly.
              </p>
              <button
                onClick={handleDownloadTemplate}
                className="flex items-center gap-2 bg-white text-primary border-2 border-primary px-6 py-2.5 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
              >
                <FiDownload /> Download CSV Template
              </button>
            </div>

            {/* Upload Section */}
            <div className="bg-secondary/5 rounded-xl p-6 border border-secondary/10">
              <h2 className="text-xl font-bold text-primary mb-4">2. Upload CSV Data</h2>
              <p className="text-textMuted mb-4">
                Upload your completed CSV file. The data will be saved locally in your browser and instantly reflected on the website.
              </p>
              
              <div className="flex flex-col gap-4">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-textMuted
                    file:mr-4 file:py-2.5 file:px-6
                    file:rounded-lg file:border-0
                    file:text-sm file:font-medium
                    file:bg-primary file:text-white
                    hover:file:bg-primary/90 file:cursor-pointer
                    border border-secondary/20 rounded-lg p-2 bg-white"
                />
                
                <button
                  onClick={handleUpload}
                  disabled={!file || status === 'loading'}
                  className="flex items-center justify-center gap-2 bg-gradient-gold text-primary px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiUpload /> {status === 'loading' ? 'Processing...' : 'Upload & Update Website'}
                </button>
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center gap-3">
                  <FiCheckCircle className="text-xl flex-shrink-0" />
                  <p>{message}</p>
                </div>
              )}
              
              {status === 'error' && (
                <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center gap-3">
                  <FiAlertCircle className="text-xl flex-shrink-0" />
                  <p>{message}</p>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default DataUploadPage;
