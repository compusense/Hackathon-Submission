import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const complaintSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Valid phone number is required'),
  provider: z.string().min(1, 'Please select a service provider'),
  serviceType: z.string().min(1, 'Please select a service type'),
  accountNumber: z.string().min(1, 'Account or phone number is required'),
  referenceNumber: z.string().optional(),
  description: z.string().min(20, 'Please provide a detailed description (min 20 characters)'),
  dateOfIssue: z.string().min(1, 'Date of issue is required'),
});

type ComplaintFormData = z.infer<typeof complaintSchema>;

const steps = [
  { id: 'personal', title: 'Personal Details' },
  { id: 'provider', title: 'Provider Info' },
  { id: 'complaint', title: 'Complaint Details' },
];

export default function ConsumerComplaintForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<ComplaintFormData>({
    resolver: zodResolver(complaintSchema),
    mode: 'onChange',
  });

  const processNext = async () => {
    let fieldsToValidate: (keyof ComplaintFormData)[] = [];
    if (currentStep === 0) fieldsToValidate = ['firstName', 'lastName', 'email', 'phone'];
    if (currentStep === 1) fieldsToValidate = ['provider', 'serviceType', 'accountNumber'];
    
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const processPrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = (data: ComplaintFormData) => {
    console.log('Form submitted:', data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl text-center flex flex-col items-center gap-6"
      >
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-bocra-blue dark:text-blue-400">Complaint Submitted</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Your complaint has been successfully registered. Your reference number is <strong className="text-bocra-dark dark:text-white">BOCRA-{Math.floor(Math.random() * 100000)}</strong>. We will contact you within 48 hours.
        </p>
        <button 
          onClick={() => { setIsSubmitted(false); setCurrentStep(0); }}
          className="btn-primary mt-4"
        >
          Submit Another Complaint
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-bocra-light dark:bg-gray-800/50 p-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full z-0" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-bocra-blue rounded-full z-0 transition-all duration-500" 
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
          {steps.map((step, i) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300",
                i <= currentStep ? "bg-bocra-blue text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500"
              )}>
                {i < currentStep ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
              </div>
              <span className={cn(
                "text-xs font-bold uppercase tracking-wider absolute -bottom-6 whitespace-nowrap transition-all duration-300 hidden md:block",
                i === currentStep ? "opacity-100" : "opacity-50",
                i <= currentStep ? "text-bocra-blue" : "text-gray-400"
              )}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
        
        {/* Mobile Step Title */}
        <div className="md:hidden text-center mt-8">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 bg-bocra-blue/10 dark:bg-blue-900/30 rounded-full border border-bocra-blue/20 dark:border-blue-800/30"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-bocra-blue dark:text-blue-400">
              Step {currentStep + 1}: {steps[currentStep].title}
            </span>
          </motion.div>
        </div>
      </div>

      <div className="p-8 md:p-12 md:pt-16">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">First Name</label>
                  <input {...register('firstName')} className="input-field" placeholder="John" />
                  {errors.firstName && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.firstName.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Last Name</label>
                  <input {...register('lastName')} className="input-field" placeholder="Doe" />
                  {errors.lastName && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.lastName.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Email Address</label>
                  <input {...register('email')} type="email" className="input-field" placeholder="john@example.com" />
                  {errors.email && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.email.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Phone Number</label>
                  <input {...register('phone')} className="input-field" placeholder="+267 71234567" />
                  {errors.phone && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.phone.message}</p>}
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Service Provider</label>
                  <select {...register('provider')} className="input-field">
                    <option value="">Select a provider...</option>
                    <option value="mascom">Mascom Wireless</option>
                    <option value="provider1">Provider 1</option>
                    <option value="btc">BTC (Botswana Telecommunications Corp)</option>
                    <option value="botswana-post">BotswanaPost</option>
                    <option value="other">Other ISP / Broadcaster</option>
                  </select>
                  {errors.provider && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.provider.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Service Type</label>
                  <select {...register('serviceType')} className="input-field">
                    <option value="">Select service type...</option>
                    <option value="mobile">Mobile Voice/Data</option>
                    <option value="fixed">Fixed Line / Fiber</option>
                    <option value="broadcasting">TV / Radio Broadcasting</option>
                    <option value="postal">Postal / Courier</option>
                  </select>
                  {errors.serviceType && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.serviceType.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Account / Phone Number</label>
                  <input {...register('accountNumber')} className="input-field" placeholder="e.g. 71234567 or ACC-123" />
                  {errors.accountNumber && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.accountNumber.message}</p>}
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Date of Issue</label>
                  <input {...register('dateOfIssue')} type="date" className="input-field" />
                  {errors.dateOfIssue && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.dateOfIssue.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Provider Reference Number (Optional)</label>
                  <input {...register('referenceNumber')} className="input-field" placeholder="Ticket or Ref #" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Complaint Description</label>
                  <textarea 
                    {...register('description')} 
                    rows={5} 
                    className="input-field resize-none" 
                    placeholder="Please describe the issue in detail, including any steps you've already taken with the provider..."
                  />
                  {errors.description && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.description.message}</p>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-center pt-6 border-t border-gray-100 dark:border-gray-800 mt-4">
            <button
              type="button"
              onClick={processPrev}
              disabled={currentStep === 0}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-colors",
                currentStep === 0 ? "text-gray-300 dark:text-gray-700 cursor-not-allowed" : "text-bocra-blue dark:text-blue-400 hover:bg-bocra-light dark:hover:bg-gray-800"
              )}
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={processNext}
                className="btn-primary flex items-center gap-2"
              >
                Next Step <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                className="bg-bocra-blue hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
              >
                Submit Complaint <CheckCircle2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
