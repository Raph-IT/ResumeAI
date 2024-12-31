import React from 'react';
import { UseFieldArrayReturn } from 'react-hook-form';

interface DynamicFieldArrayProps {
  fields: any[];
  fieldArrayMethods: UseFieldArrayReturn;
  renderField: (field: any, index: number) => React.ReactNode;
  addButtonText: string;
}

export const DynamicFieldArray: React.FC<DynamicFieldArrayProps> = ({
  fields,
  fieldArrayMethods,
  renderField,
  addButtonText
}) => {
  const { append, remove } = fieldArrayMethods;

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="relative p-4 border rounded-lg bg-gray-50">
          {renderField(field, index)}
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            Supprimer
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({})}
        className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:text-primary"
      >
        {addButtonText}
      </button>
    </div>
  );
}; 