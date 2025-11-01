import { FaCheck, FaInfo } from 'react-icons/fa';
import Tooltip from './Tooltip';

const FormStepper = ({ steps, currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center w-full">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center
              ${idx < currentStep ? 'bg-green-500' : 
                idx === currentStep ? 'bg-blue-500' : 'bg-gray-300'} text-white`}>
              {idx < currentStep ? <FaCheck /> : idx + 1}
            </div>
            <div className="text-sm mt-2 text-center relative group">
              {step.label}
              {step.help && (
                <Tooltip content={step.help}>
                  <FaInfo className="inline-block ml-1 text-gray-500" />
                </Tooltip>
              )}
            </div>
            {idx < steps.length - 1 && (
              <div className={`h-1 w-full mt-4
                ${idx < currentStep ? 'bg-green-500' : 'bg-gray-300'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormStepper;