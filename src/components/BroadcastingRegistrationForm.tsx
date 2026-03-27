import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, ChevronLeft, AlertCircle, UploadCloud, File, X, Info, Radio } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import PaymentStep from './PaymentStep';

const registrationSchema = z.object({
  // Applicant Details
  applicantName: z.string().min(2, 'Full name of applicant/company is required'),
  registrationNumber: z.string().min(2, 'Registration number (UIN) is required'),
  incorporationDate: z.string().min(1, 'Date of incorporation is required'),
  registeredAddress: z.string().min(10, 'Registered office address is required'),
  postalAddress: z.string().min(5, 'Postal address is required'),
  
  // Contact Person
  contactName: z.string().min(2, 'Contact person name is required'),
  contactPosition: z.string().min(2, 'Position is required'),
  contactPhone: z.string().min(8, 'Valid phone number is required'),
  contactEmail: z.string().email('Invalid email address'),
  
  // Service Details
  serviceType: z.string().min(1, 'Please select a service type'),
  serviceDescription: z.string().min(20, 'Please provide a detailed description of the service'),
  targetAudience: z.string().min(1, 'Please specify target audience'),
  geographicalCoverage: z.string().min(1, 'Please specify geographical coverage'),
  
  // Technical Details
  transmissionType: z.string().min(1, 'Please specify transmission type'),
  frequencyRequired: z.boolean(),
  frequencyDetails: z.string().optional(),
  
  // Content Details
  localContentPercentage: z.string().min(1, 'Local content percentage is required'),
  primaryLanguage: z.string().min(1, 'Primary language is required'),
  
  // Financial
  estimatedInvestment: z.string().min(1, 'Estimated investment is required'),
  
  declaration: z.boolean().refine(val => val === true, 'You must agree to the declaration'),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const steps = [
  { id: 'applicant', title: 'Applicant Details' },
  { id: 'service', title: 'Service & Content' },
  { id: 'technical', title: 'Technical & Financial' },
  { id: 'review', title: 'Review & Submit' },
  { id: 'payment', title: 'Payment' },
];

export default function BroadcastingRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [files, setFiles] = useState<{name: string, size: number}[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      frequencyRequired: false,
    }
  });

  const frequencyRequired = watch('frequencyRequired');

  const processNext = async () => {
    let fieldsToValidate: (keyof RegistrationFormData)[] = [];
    if (currentStep === 0) fieldsToValidate = ['applicantName', 'registrationNumber', 'incorporationDate', 'registeredAddress', 'postalAddress', 'contactName', 'contactPosition', 'contactPhone', 'contactEmail'];
    if (currentStep === 1) fieldsToValidate = ['serviceType', 'serviceDescription', 'targetAudience', 'geographicalCoverage', 'localContentPercentage', 'primaryLanguage'];
    if (currentStep === 2) fieldsToValidate = ['transmissionType', 'estimatedInvestment'];
    
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const processPrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = (data: RegistrationFormData) => {
    console.log('Broadcasting Registration submitted:', { ...data, files });
    setCurrentStep(4); // Move to payment step
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files as FileList).map((f: File) => ({ name: f.name, size: f.size }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files as FileList).map((f: File) => ({ name: f.name, size: f.size }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-900 p-8 md:p-16 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl text-center flex flex-col items-center gap-6"
      >
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-sector-broadcast dark:text-green-400 rounded-full flex items-center justify-center">
          <Radio className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-display font-bold text-sector-broadcast dark:text-green-400">Registration Submitted</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg text-lg">
          Your broadcasting registration for <strong>{watch('applicantName')}</strong> has been successfully received by BOCRA and paid.
        </p>
        <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md my-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mb-2">Registration Reference</p>
          <p className="text-3xl font-mono font-bold text-sector-broadcast">REG-BRD-{new Date().getFullYear()}-{Math.floor(Math.random() * 9000) + 1000}</p>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          A confirmation has been sent to {watch('contactEmail')}. Our broadcasting department will review your submission.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-sector-broadcast dark:bg-green-900 p-8 pb-20 text-white">
        <h2 className="text-2xl font-display font-bold mb-12 text-center">Broadcasting Registration</h2>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/20 rounded-full z-0" />
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-white rounded-full z-0 transition-all duration-500" 
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((step, i) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-4 border-sector-broadcast dark:border-green-900",
                  i <= currentStep ? "bg-white text-sector-broadcast scale-110" : "bg-green-800 text-green-400"
                )}>
                  {i < currentStep ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                </div>
                <div className={cn(
                  "absolute -bottom-12 w-32 text-center transition-all duration-300 hidden md:block",
                  i === currentStep ? "opacity-100" : "opacity-50"
                )}>
                  <span className={cn(
                    "text-xs font-bold uppercase tracking-wider block leading-tight",
                    i <= currentStep ? "text-white" : "text-green-300/50"
                  )}>
                    {step.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Step Title */}
          <div className="md:hidden text-center mt-10">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1 bg-white/10 rounded-full border border-white/20"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-white">
                Step {currentStep + 1}: {steps[currentStep].title}
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-12 md:pt-16">
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
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Full Name of Applicant / Company</label>
                  <input {...register('applicantName')} className="input-field" placeholder="e.g. Botswana Media Group" />
                  {errors.applicantName && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.applicantName.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Registration Number (UIN)</label>
                  <input {...register('registrationNumber')} className="input-field" placeholder="BW0000XXXX" />
                  {errors.registrationNumber && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.registrationNumber.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Date of Incorporation</label>
                  <input {...register('incorporationDate')} type="date" className="input-field" />
                  {errors.incorporationDate && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.incorporationDate.message}</p>}
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Registered Office Address</label>
                  <textarea {...register('registeredAddress')} rows={2} className="input-field resize-none" placeholder="Physical location of headquarters" />
                  {errors.registeredAddress && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.registeredAddress.message}</p>}
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Postal Address</label>
                  <input {...register('postalAddress')} className="input-field" placeholder="P.O. Box XXX, Gaborone" />
                  {errors.postalAddress && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.postalAddress.message}</p>}
                </div>
                
                <div className="md:col-span-2 border-t border-gray-100 dark:border-gray-800 pt-6 mt-2">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Contact Person Details</h3>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Name</label>
                  <input {...register('contactName')} className="input-field" placeholder="Full Name" />
                  {errors.contactName && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.contactName.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Position / Title</label>
                  <input {...register('contactPosition')} className="input-field" placeholder="e.g. Managing Director" />
                  {errors.contactPosition && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.contactPosition.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Phone Number</label>
                  <input {...register('contactPhone')} className="input-field" placeholder="+267 39XXXXX" />
                  {errors.contactPhone && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.contactPhone.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Email Address</label>
                  <input {...register('contactEmail')} type="email" className="input-field" placeholder="contact@company.bw" />
                  {errors.contactEmail && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.contactEmail.message}</p>}
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Type of Broadcasting Service</label>
                    <select {...register('serviceType')} className="input-field">
                      <option value="">Select service type...</option>
                      <option value="commercial_radio">Commercial Radio</option>
                      <option value="commercial_tv">Commercial Television</option>
                      <option value="community_radio">Community Radio</option>
                      <option value="subscription_tv">Subscription Television</option>
                      <option value="content_provider">Content Provider</option>
                    </select>
                    {errors.serviceType && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.serviceType.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Geographical Coverage</label>
                    <select {...register('geographicalCoverage')} className="input-field">
                      <option value="">Select coverage...</option>
                      <option value="national">National</option>
                      <option value="regional">Regional</option>
                      <option value="local">Local / Community</option>
                    </select>
                    {errors.geographicalCoverage && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.geographicalCoverage.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Target Audience</label>
                    <input {...register('targetAudience')} className="input-field" placeholder="e.g. Youth, General Public, Business" />
                    {errors.targetAudience && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.targetAudience.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Primary Language of Broadcast</label>
                    <input {...register('primaryLanguage')} className="input-field" placeholder="e.g. Setswana, English" />
                    {errors.primaryLanguage && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.primaryLanguage.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Proposed Local Content %</label>
                    <input {...register('localContentPercentage')} type="number" className="input-field" placeholder="e.g. 40" />
                    {errors.localContentPercentage && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.localContentPercentage.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Detailed Service Description</label>
                    <textarea {...register('serviceDescription')} rows={4} className="input-field resize-none" placeholder="Describe the programming format and content strategy..." />
                    {errors.serviceDescription && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.serviceDescription.message}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Transmission Mode</label>
                    <select {...register('transmissionType')} className="input-field">
                      <option value="">Select mode...</option>
                      <option value="terrestrial">Terrestrial (FM/DTT)</option>
                      <option value="satellite">Satellite</option>
                      <option value="cable">Cable / IPTV</option>
                      <option value="online">Online / Streaming Only</option>
                    </select>
                    {errors.transmissionType && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.transmissionType.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Estimated Investment (BWP)</label>
                    <input {...register('estimatedInvestment')} type="number" className="input-field" placeholder="0.00" />
                    {errors.estimatedInvestment && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.estimatedInvestment.message}</p>}
                  </div>
                  
                  <div className="md:col-span-2 p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-2xl flex items-start gap-3">
                    <Info className="w-5 h-5 text-sector-broadcast shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-3 w-full">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-green-800 dark:text-green-400">Is Frequency Allocation Required?</label>
                        <input type="checkbox" {...register('frequencyRequired')} className="w-5 h-5 accent-sector-broadcast" />
                      </div>
                      {frequencyRequired && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                          <textarea {...register('frequencyDetails')} rows={2} className="w-full p-3 rounded-xl border border-green-200 dark:border-green-800 bg-white dark:bg-gray-900 text-sm" placeholder="Specify preferred frequency bands or transmission sites..." />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">Supporting Documents</h3>
                  <div 
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={cn(
                      "border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all",
                      isDragging 
                        ? "border-sector-broadcast bg-green-50 dark:bg-green-900/10" 
                        : "border-gray-300 dark:border-gray-700 hover:border-sector-broadcast dark:hover:border-green-500 bg-gray-50 dark:bg-gray-800/50"
                    )}
                  >
                    <UploadCloud className="w-10 h-10 text-sector-broadcast mb-4" />
                    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-1">Upload Program Schedule & Business Plan</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">PDF format preferred, max 20MB</p>
                    <label className="btn-primary bg-sector-broadcast hover:bg-opacity-90 cursor-pointer">
                      Select Files
                      <input type="file" multiple className="hidden" onChange={handleFileInput} />
                    </label>
                  </div>

                  {files.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {files.map((file, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <File className="w-5 h-5 text-sector-broadcast shrink-0" />
                            <span className="text-sm font-medium truncate">{file.name}</span>
                          </div>
                          <button type="button" onClick={() => removeFile(i)} className="text-gray-400 hover:text-red-500">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-8"
              >
                <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-3xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-sector-broadcast dark:text-green-400 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">Registration Summary</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Applicant</p>
                      <p className="font-medium">{watch('applicantName')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Service Type</p>
                      <p className="font-medium uppercase">{watch('serviceType')?.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Coverage</p>
                      <p className="font-medium capitalize">{watch('geographicalCoverage')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Local Content</p>
                      <p className="font-medium">{watch('localContentPercentage')}%</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/50 rounded-2xl">
                  <input type="checkbox" {...register('declaration')} id="declaration" className="mt-1 w-5 h-5 accent-sector-broadcast shrink-0" />
                  <div className="flex flex-col gap-2">
                    <label htmlFor="declaration" className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed cursor-pointer">
                      I, <strong>{watch('contactName') || 'the applicant'}</strong>, acting on behalf of <strong>{watch('applicantName') || 'the company'}</strong>, hereby declare that the information provided is accurate and complete. I acknowledge that BOCRA reserves the right to request additional information or reject the registration if requirements are not met.
                    </label>
                    {errors.declaration && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.declaration.message}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <PaymentStep 
                  referenceNumber={`REG-BRD-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`}
                  applicantName={watch('applicantName')}
                  amount={3500}
                  onComplete={() => setIsSubmitted(true)}
                  registrationSummary={
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <p><strong>Applicant:</strong> {watch('applicantName')}</p>
                      <p><strong>Service Type:</strong> {watch('serviceType')}</p>
                      <p><strong>Geographical Coverage:</strong> {watch('geographicalCoverage')}</p>
                      <p><strong>Local Content:</strong> {watch('localContentPercentage')}%</p>
                    </div>
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-center pt-8 border-t border-gray-100 dark:border-gray-800 mt-4">
            <button
              type="button"
              onClick={processPrev}
              disabled={currentStep === 0 || currentStep === 4}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-colors",
                (currentStep === 0 || currentStep === 4) ? "text-gray-300 dark:text-gray-700 cursor-not-allowed" : "text-sector-broadcast dark:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800"
              )}
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={processNext}
                className="btn-primary bg-sector-broadcast hover:bg-green-700 flex items-center gap-2 px-8 border-none"
              >
                Next Step <ChevronRight className="w-5 h-5" />
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
