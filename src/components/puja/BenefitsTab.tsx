// 'use client';

// import React from 'react';
// import { Plus, Trash2 } from 'lucide-react';

// interface Props {
//   benefits: string[];
//   setBenefits: (data: string[]) => void;
//   fieldErrors?: Record<string, string>;
// }

// const BenefitsTab: React.FC<Props> = ({
//   benefits,
//   setBenefits,
//   fieldErrors = {}
// }) => {
//   const handleAdd = () => {
//     if (benefits.length < 10) {
//       setBenefits([...benefits, '']);
//     }
//   };

//   const handleUpdate = (index: number, value: string) => {
//     const updated = [...benefits];
//     updated[index] = value;
//     setBenefits(updated);
//   };

//   const handleRemove = (index: number) => {
//     if (benefits.length > 1) {
//       const filtered = benefits.filter((_, i) => i !== index);
//       setBenefits(filtered);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="text-xl font-semibold text-gray-800">Benefits of This Puja</h2>
//           <p className="text-sm text-gray-600 mt-1">
//             List the key benefits devotees will get from performing this puja (Max 10)
//           </p>
//         </div>
//         <button
//           type="button"
//           onClick={handleAdd}
//           disabled={benefits.length >= 10}
//           className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <Plus className="w-4 h-4" />
//           Add Benefit ({benefits.length}/10)
//         </button>
//       </div>

//       {/* General error for benefits array */}
//       {fieldErrors['benefits'] && (
//         <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
//           <p className="text-red-600 text-sm">{fieldErrors['benefits']}</p>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {benefits.map((benefit, index) => {
//           const errorKey = `benefits.${index}`;
//           const hasError = fieldErrors[errorKey];
          
//           return (
//             <div key={index} className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
//               <div className="flex items-start gap-3">
//                 <div className="flex-1">
//                   <div className="flex justify-between items-center mb-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Benefit {index + 1} <span className="text-red-500">*</span>
//                     </label>
//                     <span className="text-xs text-gray-500">{index + 1}/{benefits.length}</span>
//                   </div>
//                   <textarea
//                     value={benefit}
//                     onChange={(e) => handleUpdate(index, e.target.value)}
//                     className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none min-h-[100px] transition-all ${
//                       hasError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-red-500'
//                     }`}
//                     placeholder="Example: Brings peace of mind, Improves health, Brings prosperity, etc."
//                     required
//                   />
//                   {hasError && (
//                     <p className="text-red-500 text-xs mt-1.5">{hasError}</p>
//                   )}
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => handleRemove(index)}
//                   disabled={benefits.length <= 1}
//                   className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed mt-7"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default BenefitsTab;



'use client';

import React from 'react';
import { Plus, Trash2, Target, Heart, Brain, Zap, Sun, Moon, Eye, Star, CheckCircle, TrendingUp } from 'lucide-react';

// Same icon options as WhyPerformTab
const iconOptions = [
  { value: 'Target', label: 'Target', icon: '🎯' },
  { value: 'Heart', label: 'Heart', icon: '❤️' },
  { value: 'Brain', label: 'Brain', icon: '🧠' },
  { value: 'Zap', label: 'Zap', icon: '⚡' },
  { value: 'Sun', label: 'Sun', icon: '☀️' },
  { value: 'Moon', label: 'Moon', icon: '🌙' },
  { value: 'Eye', label: 'Eye', icon: '👁️' },
  { value: 'Star', label: 'Star', icon: '⭐' },
  { value: 'CheckCircle', label: 'Check', icon: '✓' },
  { value: 'TrendingUp', label: 'Trending Up', icon: '📈' },
];

interface Props {
  benefits: any[];
  setBenefits: (data: any[]) => void;
  addItem: any;
  updateItem: any;
  removeItem: any;
  fieldErrors?: Record<string, string>;
}

const BenefitsTab: React.FC<Props> = ({
  benefits,
  setBenefits,
  addItem,
  updateItem,
  removeItem,
  fieldErrors = {}
}) => {
  const getIconDisplay = (iconValue: string) => {
    const icon = iconOptions.find(i => i.value === iconValue);
    return icon ? icon.icon : '🎯';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Benefits of This Puja</h2>
          <p className="text-sm text-gray-600 mt-1">
            List the key benefits devotees will get from performing this puja
          </p>
        </div>
        <button
          type="button"
          onClick={() => addItem(benefits, setBenefits, { 
            title: '', 
            description: '', 
            icon: 'Star' 
          })}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Plus className="w-4 h-4" />
          Add Benefit
        </button>
      </div>

      {/* General error for benefits array */}
      {fieldErrors['benefits'] && (
        <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
          <p className="text-red-600 text-sm">{fieldErrors['benefits']}</p>
        </div>
      )}

      <div className="space-y-6">
        {benefits.map((benefit, index) => {
          const titleError = fieldErrors[`benefits.${index}.title`];
          const descriptionError = fieldErrors[`benefits.${index}.description`];
          const iconError = fieldErrors[`benefits.${index}.icon`];

          return (
            <div key={benefit._id} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center">
                    <span className="text-lg">{getIconDisplay(benefit.icon)}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Benefit {index + 1}</h3>
                    <p className="text-xs text-gray-500">Key benefit of performing this puja</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(benefits, setBenefits, benefit._id)}
                  disabled={benefits.length <= 1}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={benefit.title}
                    onChange={(e) => updateItem(benefits, setBenefits, benefit._id, 'title', e.target.value)}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all ${
                      titleError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-red-500'
                    }`}
                    placeholder="e.g., Spiritual Growth"
                    required
                  />
                  {titleError && (
                    <p className="text-red-500 text-xs mt-1.5">{titleError}</p>
                  )}
                </div>

                {/* Icon */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Icon
                  </label>
                  <select
                    value={benefit.icon}
                    onChange={(e) => updateItem(benefits, setBenefits, benefit._id, 'icon', e.target.value)}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all ${
                      iconError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-red-500'
                    }`}
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon.value} value={icon.value}>
                        {icon.icon} {icon.label}
                      </option>
                    ))}
                  </select>
                  {iconError && (
                    <p className="text-red-500 text-xs mt-1.5">{iconError}</p>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Explanation <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={benefit.description}
                    onChange={(e) => updateItem(benefits, setBenefits, benefit._id, 'description', e.target.value)}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none min-h-[100px] transition-all ${
                      descriptionError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-red-500'
                    }`}
                    placeholder="Explain in detail why this benefit is important..."
                    required
                  />
                  {descriptionError && (
                    <p className="text-red-500 text-xs mt-1.5">{descriptionError}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BenefitsTab;