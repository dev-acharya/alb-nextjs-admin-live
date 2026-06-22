// components/puja/RitualsTab.tsx
import React from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface RitualsTabProps {
  inputFieldDetail: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  fieldErrors: Record<string, string>;
  // Images
  imagePreview: string;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mobileImagePreview: string;
  handleMobileImageUpload: (file: File, previewUrl: string) => void;
  setMobileImage: React.Dispatch<React.SetStateAction<{ file: string; bytes: File | null; url: string }>>;
  mobileImage: { file: string; bytes: File | null; url: string };
  setMobileImagePreview: React.Dispatch<React.SetStateAction<string>>;
  // Laptop Image
  laptopImagePreview: string;
  handleLaptopImageUpload: (file: File, previewUrl: string) => void;
  setLaptopImage: React.Dispatch<React.SetStateAction<{ file: string; bytes: File | null; url: string }>>;
  laptopImage: { file: string; bytes: File | null; url: string };
  setLaptopImagePreview: React.Dispatch<React.SetStateAction<string>>;
  // ✅ NEW: Benefit Points (Rituals Tab)
  benefitPoints: any[];
  setBenefitPoints: React.Dispatch<React.SetStateAction<any[]>>;
  // Vedic Procedure
  vedicProcedure: any[];
  setVedicProcedure: React.Dispatch<React.SetStateAction<any[]>>;
  // Sacred Rituals
  sacredRituals: any[];
  setSacredRituals: React.Dispatch<React.SetStateAction<any[]>>;
  // Aashirwad Box
  aashirwadBox: string[];
  setAashirwadBox: React.Dispatch<React.SetStateAction<string[]>>;
}

const RitualsTab = ({
  inputFieldDetail,
  handleInputChange,
  fieldErrors,
  imagePreview,
  handleImageUpload,
  mobileImagePreview,
  handleMobileImageUpload,
  setMobileImage,
  mobileImage,
  setMobileImagePreview,
  laptopImagePreview,
  handleLaptopImageUpload,
  setLaptopImage,
  laptopImage,
  setLaptopImagePreview,
  // ✅ Benefit Points
  benefitPoints,
  setBenefitPoints,
  // Vedic
  vedicProcedure,
  setVedicProcedure,
  // Sacred
  sacredRituals,
  setSacredRituals,
  // Aashirwad
  aashirwadBox,
  setAashirwadBox
}: RitualsTabProps) => {
  return (
    <div className="space-y-8">
      {/* Pooja Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pooja Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="pujaName"
          value={inputFieldDetail.pujaName}
          onChange={handleInputChange}
          placeholder="Enter Pooja Name"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
            fieldErrors.pujaName ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {fieldErrors.pujaName && (
          <p className="mt-1 text-sm text-red-500">{fieldErrors.pujaName}</p>
        )}
      </div>

      {/* Overview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Overview <span className="text-red-500">*</span>
        </label>
        <textarea
          name="overview"
          value={inputFieldDetail.overview}
          onChange={handleInputChange}
          rows={4}
          placeholder="Enter Pooja Description/Overview"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
            fieldErrors.overview ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {fieldErrors.overview && (
          <p className="mt-1 text-sm text-red-500">{fieldErrors.overview}</p>
        )}
      </div>

      {/* Desktop Image */}
      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Desktop Image <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          {imagePreview && (
            <div className="relative w-20 h-20 flex-shrink-0">
              <img
                src={imagePreview}
                alt="Desktop Preview"
                className="w-full h-full object-cover rounded-lg border border-gray-200"
              />
            </div>
          )}
        </div>
        {fieldErrors.mainImage && (
          <p className="mt-1 text-sm text-red-500">{fieldErrors.mainImage}</p>
        )}
      </div> */}

      {/* Mobile Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mobile Image <span className="text-gray-400">(Optional)</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const previewUrl = URL.createObjectURL(file);
                handleMobileImageUpload(file, previewUrl);
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          {mobileImagePreview && (
            <div className="relative w-20 h-20 flex-shrink-0">
              <img
                src={mobileImagePreview}
                alt="Mobile Preview"
                className="w-full h-full object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={() => {
                  setMobileImage({ file: '', bytes: null, url: '' });
                  setMobileImagePreview('');
                }}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Laptop Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Laptop Image <span className="text-gray-400">(Optional)</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const previewUrl = URL.createObjectURL(file);
                handleLaptopImageUpload(file, previewUrl);
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          {laptopImagePreview && (
            <div className="relative w-20 h-20 flex-shrink-0">
              <img
                src={laptopImagePreview}
                alt="Laptop Preview"
                className="w-full h-full object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={() => {
                  setLaptopImage({ file: '', bytes: null, url: '' });
                  setLaptopImagePreview('');
                }}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="price"
          value={inputFieldDetail.price}
          onChange={handleInputChange}
          placeholder="Enter Price (e.g. 499)"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
            fieldErrors.price ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {fieldErrors.price && (
          <p className="mt-1 text-sm text-red-500">{fieldErrors.price}</p>
        )}
      </div>

      {/* Tag */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tag <span className="text-gray-400">(Optional)</span>
        </label>
        <input
          type="text"
          name="tag"
          value={inputFieldDetail.tag || ''}
          onChange={handleInputChange}
          placeholder="e.g. Most Popular, Best Value"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      {/* SubTitle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SubTitle <span className="text-gray-400">(Optional)</span>
        </label>
        <input
          type="text"
          name="subTitle"
          value={inputFieldDetail.subTitle}
          onChange={handleInputChange}
          placeholder="e.g. Book this puja for peace"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Duration <span className="text-gray-400">(Optional)</span>
        </label>
        <input
          type="text"
          name="duration"
          value={inputFieldDetail.duration}
          onChange={handleInputChange}
          placeholder="e.g. 2-3 hours"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      {/* Venue */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Venue <span className="text-gray-400">(Optional)</span>
        </label>
        <input
          type="text"
          name="pujaVenue"
          value={inputFieldDetail.pujaVenue}
          onChange={handleInputChange}
          placeholder="e.g. Temple Name or Location"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      {/* ✅ Benefit Points */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Benefit Points <span className="text-gray-400">(Optional)</span>
          </label>
          <button
            type="button"
            onClick={() => {
              const newId = benefitPoints.length > 0 ? Math.max(...benefitPoints.map(item => item.id || 0)) + 1 : 1;
              setBenefitPoints([...benefitPoints, { id: newId, title: '', description: '', icon: 'Star' }]);
            }}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
          >
            <Plus className="w-3 h-3" /> Add Benefit
          </button>
        </div>
        {benefitPoints.map((item, index) => (
          <div key={item.id || index} className="flex gap-3 mb-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
            <div className="w-20">
              <input
                type="text"
                value={item.icon}
                onChange={(e) => {
                  const newPoints = [...benefitPoints];
                  newPoints[index].icon = e.target.value;
                  setBenefitPoints(newPoints);
                }}
                placeholder="Icon"
                className="w-full px-2 py-1 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={item.title}
                onChange={(e) => {
                  const newPoints = [...benefitPoints];
                  newPoints[index].title = e.target.value;
                  setBenefitPoints(newPoints);
                }}
                placeholder="Benefit Title"
                className="w-full px-2 py-1 border border-gray-300 rounded-lg text-sm mb-2"
              />
              <textarea
                value={item.description}
                onChange={(e) => {
                  const newPoints = [...benefitPoints];
                  newPoints[index].description = e.target.value;
                  setBenefitPoints(newPoints);
                }}
                placeholder="Benefit Description"
                rows={2}
                className="w-full px-2 py-1 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                if (benefitPoints.length > 1) {
                  setBenefitPoints(benefitPoints.filter((_, i) => i !== index));
                }
              }}
              className="p-1 text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Vedic Procedure */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Vedic Procedure <span className="text-gray-400">(Optional)</span>
          </label>
          <button
            type="button"
            onClick={() => {
              const newId = vedicProcedure.length > 0 ? Math.max(...vedicProcedure.map(item => item.id || 0)) + 1 : 1;
              setVedicProcedure([...vedicProcedure, { id: newId, pointNumber: vedicProcedure.length + 1, title: '', description: '' }]);
            }}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
          >
            <Plus className="w-3 h-3" /> Add Step
          </button>
        </div>
        {vedicProcedure.map((item, index) => (
          <div key={item.id || index} className="flex gap-3 mb-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
            <div className="w-16">
              <input
                type="number"
                value={item.pointNumber}
                onChange={(e) => {
                  const newVedic = [...vedicProcedure];
                  newVedic[index].pointNumber = Number(e.target.value);
                  setVedicProcedure(newVedic);
                }}
                placeholder="#"
                className="w-full px-2 py-1 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={item.title}
                onChange={(e) => {
                  const newVedic = [...vedicProcedure];
                  newVedic[index].title = e.target.value;
                  setVedicProcedure(newVedic);
                }}
                placeholder="Step Title"
                className="w-full px-2 py-1 border border-gray-300 rounded-lg text-sm mb-2"
              />
              <textarea
                value={item.description}
                onChange={(e) => {
                  const newVedic = [...vedicProcedure];
                  newVedic[index].description = e.target.value;
                  setVedicProcedure(newVedic);
                }}
                placeholder="Step Description"
                rows={2}
                className="w-full px-2 py-1 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                if (vedicProcedure.length > 1) {
                  setVedicProcedure(vedicProcedure.filter((_, i) => i !== index));
                }
              }}
              className="p-1 text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Sacred Rituals */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Sacred Rituals <span className="text-gray-400">(Optional)</span>
          </label>
          <button
            type="button"
            onClick={() => {
              const newId = sacredRituals.length > 0 ? Math.max(...sacredRituals.map(item => item.id || 0)) + 1 : 1;
              setSacredRituals([...sacredRituals, { id: newId, icon: '', title: '', description: '' }]);
            }}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
          >
            <Plus className="w-3 h-3" /> Add Ritual
          </button>
        </div>
        {sacredRituals.map((item, index) => (
          <div key={item.id || index} className="flex gap-3 mb-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
            <div className="w-20">
              <input
                type="text"
                value={item.icon}
                onChange={(e) => {
                  const newRituals = [...sacredRituals];
                  newRituals[index].icon = e.target.value;
                  setSacredRituals(newRituals);
                }}
                placeholder="Icon"
                className="w-full px-2 py-1 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={item.title}
                onChange={(e) => {
                  const newRituals = [...sacredRituals];
                  newRituals[index].title = e.target.value;
                  setSacredRituals(newRituals);
                }}
                placeholder="Ritual Title"
                className="w-full px-2 py-1 border border-gray-300 rounded-lg text-sm mb-2"
              />
              <textarea
                value={item.description}
                onChange={(e) => {
                  const newRituals = [...sacredRituals];
                  newRituals[index].description = e.target.value;
                  setSacredRituals(newRituals);
                }}
                placeholder="Ritual Description"
                rows={2}
                className="w-full px-2 py-1 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                if (sacredRituals.length > 1) {
                  setSacredRituals(sacredRituals.filter((_, i) => i !== index));
                }
              }}
              className="p-1 text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Aashirwad Box */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Aashirwad Box <span className="text-gray-400">(Optional)</span>
          </label>
          <button
            type="button"
            onClick={() => setAashirwadBox([...aashirwadBox, ''])}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
          >
            <Plus className="w-3 h-3" /> Add Message
          </button>
        </div>
        {aashirwadBox.map((msg, index) => (
          <div key={index} className="flex gap-3 mb-3">
            <input
              type="text"
              value={msg}
              onChange={(e) => {
                const newBox = [...aashirwadBox];
                newBox[index] = e.target.value;
                setAashirwadBox(newBox);
              }}
              placeholder="Enter Aashirwad message"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <button
              type="button"
              onClick={() => {
                if (aashirwadBox.length > 1) {
                  setAashirwadBox(aashirwadBox.filter((_, i) => i !== index));
                }
              }}
              className="p-2 text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RitualsTab;