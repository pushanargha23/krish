import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'email' | 'date' | 'time' | 'image';
  options?: { label: string; value: string }[];
  required?: boolean;
}

interface GenericFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: FormField[];
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
}

export const GenericFormModal: React.FC<GenericFormModalProps> = ({
  isOpen,
  onClose,
  title,
  fields,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Re-initialize formData when modal opens or initialData changes
  React.useEffect(() => {
    if (isOpen) {
      setFormData(initialData || {});
      setError('');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({});
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-background rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-heading font-bold text-lg text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <form id="generic-form" onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                
                {field.type === 'image' ? (
                  <div className="flex items-center gap-4">
                    <input
                      type="url"
                      placeholder="Paste image URL here..."
                      required={field.required}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-colors"
                    />
                    {formData[field.name] && (
                      <img src={formData[field.name]} alt="Preview" className="w-12 h-12 rounded-lg object-cover shadow-sm border border-gray-100" />
                    )}
                  </div>
                ) : field.type === 'textarea' ? (
                  <textarea
                    required={field.required}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-colors min-h-[100px]"
                  />
                ) : field.type === 'select' ? (
                  <select
                    required={field.required}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-colors"
                  >
                    <option value="">Select an option</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    required={field.required}
                    value={formData[field.name] || ''}
                    onChange={(e) =>
                      handleChange(
                        field.name,
                        field.type === 'number' ? Number(e.target.value) : e.target.value
                      )
                    }
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-colors"
                  />
                )}
              </div>
            ))}
          </form>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 mt-auto">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-textMuted hover:text-primary transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="generic-form"
            disabled={isSubmitting}
            className="px-5 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};
