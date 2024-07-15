import React, { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, Circle } from 'lucide-react'

interface FieldProps {
    name: string
    type: string
    placeholder: string
}

interface StepProps {
    label: string
    fields?: FieldProps[]
}

const steps: StepProps[] = [
    { label: 'Get Url' },
    {
        label: 'Paste URL',
        fields: [
            { name: 'name', type: 'text', placeholder: 'Name' },
            { name: 'email', type: 'email', placeholder: 'Email' },
        ],
    },
    {
        label: 'Get the Short Url',
        fields: [
            { name: 'address', type: 'text', placeholder: 'Address' },
            { name: 'city', type: 'text', placeholder: 'City' },
            { name: 'country', type: 'text', placeholder: 'Country' },
        ],
    },
    { label: 'Use the URL' },
]

const StepIndicator: React.FC<{ currentStep: number; steps: StepProps[] }> = ({
    currentStep,
    steps,
}) => (
    <div className="flex justify-between">
        {steps.map((step, index) => (
            <div key={step.label} className="flex flex-col items-center">
                <motion.div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${index <= currentStep ? 'bg-red-500/15 text-red-500' : 'bg-secondary'
                        }`}
                    initial={false}
                    animate={{ scale: index === currentStep ? 1.2 : 1 }}
                >
                    {index <= currentStep ? (
                        <CheckCircle size={20} />
                    ) : (
                        <Circle size={20} />
                    )}
                </motion.div>
                <div className="mt-2 text-sm">{step.label}</div>
            </div>
        ))}
    </div>
)

const ProgressBar: React.FC<{ currentStep: number; totalSteps: number }> = ({
    currentStep,
    totalSteps,
}) => (
    <motion.div
        className="mt-4 h-2 rounded-full bg-red-500"
        initial={{ width: '0%' }}
        animate={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
    />
)



const ButtonClasses =
    'rounded-2xl bg-red-500 px-2 py-1 text-sm font-medium text-white'

const NavigationButtons: React.FC<{
    currentStep: number
    totalSteps: number
    handlePrev: () => void
    handleNext: () => void
}> = ({ currentStep, totalSteps, handlePrev, handleNext }) => (
    <div className="flex justify-end gap-3">
        {currentStep === 0 ? null : (
            <button onClick={handlePrev} className={ButtonClasses}>
                Previous
            </button>
        )}
        {currentStep === totalSteps - 1 ? null : (
            <button onClick={handleNext} className={ButtonClasses}>
                Next
            </button>
        )}
    </div>
)

const Stepper: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0)

    const handleNext = useCallback(() => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }, [])

    const handlePrev = useCallback(() => {
        setCurrentStep((prev) => Math.max(prev - 1, 0))
    }, [])

    return (
        <div className="mx-auto w-full max-w-2xl p-6">
            <StepIndicator currentStep={currentStep} steps={steps} />
            <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
            <div className='p-3' >
                <NavigationButtons
                    currentStep={currentStep}
                    totalSteps={steps.length}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                />
            </div>
           
        </div>
    )
}

export default Stepper