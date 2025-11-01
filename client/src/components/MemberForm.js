import { useState } from 'react';
import FormStepper from './FormStepper';
import { useForm } from 'react-hook-form';

const steps = [
  {
    label: 'Personal Details',
    help: 'Basic information needed for membership'
  },
  {
    label: 'Church Details',
    help: 'Information about your church involvement'
  }
];

const MemberForm = ({ initialData, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <FormStepper steps={steps} currentStep={currentStep} />
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {currentStep === 0 && (
          <div className="space-y-4">
            {/* Personal Details Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Add your personal details fields here */}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            {/* Church Details Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Add your church details fields here */}
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Previous
            </button>
          )}
          
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MemberForm;