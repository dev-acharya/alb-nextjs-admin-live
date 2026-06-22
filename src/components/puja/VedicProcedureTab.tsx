'use client';

import React from 'react';

interface Props {
  vedicProcedure: {
    title: string;
    description: string;
  };
  setVedicProcedure: (data: { title: string; description: string }) => void;
  fieldErrors?: Record<string, string>;
}

const VedicProcedureTab: React.FC<Props> = ({
  vedicProcedure,
  setVedicProcedure,
  fieldErrors = {}
}) => {
  const handleChange = (field: 'title' | 'description', value: string) => {
    setVedicProcedure({
      ...vedicProcedure,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Vedic Procedure</h2>
        <p className="text-sm text-gray-600 mt-1">
          Provide details about the Vedic procedure for this puja
        </p>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vedic Procedure Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={vedicProcedure.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all ${
              fieldErrors['vedicProcedure.title'] 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:border-red-500'
            }`}
            placeholder="e.g., Vedic Rituals and Procedures"
            required
          />
          {fieldErrors['vedicProcedure.title'] && (
            <p className="text-red-500 text-xs mt-1.5">{fieldErrors['vedicProcedure.title']}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vedic Procedure Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={vedicProcedure.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none min-h-[200px] transition-all ${
              fieldErrors['vedicProcedure.description'] 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:border-red-500'
            }`}
            placeholder="Describe the Vedic procedure, rituals, and steps involved in this puja..."
            required
          />
          {fieldErrors['vedicProcedure.description'] && (
            <p className="text-red-500 text-xs mt-1.5">{fieldErrors['vedicProcedure.description']}</p>
          )}
        </div>

        {/* Character count */}
        <div className="text-right text-xs text-gray-500">
          {vedicProcedure.description.length} characters
        </div>
      </div>
    </div>
  );
};

export default VedicProcedureTab;