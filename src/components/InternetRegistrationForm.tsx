import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, ChevronLeft, AlertCircle, UploadCloud, File, X, Info } from 'lucide-react';
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
  geographicalCoverage: z.string().min(1, 'Please specify geographical coverage'),
  
  // Technical Details
  infrastructureType: z.string().min(1, 'Please specify network infrastructure'),
  
  // Financial
  estimatedInvestment: z.string().min(1, 'Estimated investment is required'),
  localEmployees: z.string().min(1, 'Number of local employees is required'),
  foreignEmployees: z.string().min(1, 'Number of foreign employees is required'),
  
  declaration: z.boolean().refine(val => val === true, 'You must agree to the declaration'),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const steps = [
  { id: 'applicant', title: 'Applicant Details' },
  { id: 'service', title: 'Service & Technical' },
  { id: 'financial', title: 'Financial & Business' },
  { id: 'review', title: 'Review & Submit' },
  { id: 'payment', title: 'Payment' },
];

export default function InternetRegistrationForm() {
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
  });

  const processNext = async () => {
    let fieldsToValidate: (keyof RegistrationFormData)[] = [];
    if (currentStep === 0) fieldsToValidate = ['applicantName', 'registrationNumber', 'incorporationDate', 'registeredAddress', 'postalAddress', 'contactName', 'contactPosition', 'contactPhone', 'contactEmail'];
    if (currentStep === 1) fieldsToValidate = ['serviceType', 'serviceDescription', 'geographicalCoverage', 'infrastructureType'];
    if (currentStep === 2) fieldsToValidate = ['estimatedInvestment', 'localEmployees', 'foreignEmployees'];
    
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const processPrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = (data: RegistrationFormData) => {
    console.log('ISP Registration submitted:', { ...data, files });
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
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-display font-bold text-sector-internet dark:text-yellow-400">Registration Submitted</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg text-lg">
          Your internet service provider registration for <strong>{watch('applicantName')}</strong> has been successfully received by BOCRA and paid.
        </p>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md my-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mb-2">Registration Reference</p>
          <p className="text-3xl font-mono font-bold text-sector-internet">REG-ISP-{new Date().getFullYear()}-{Math.floor(Math.random() * 9000) + 1000}</p>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          A confirmation has been sent to {watch('contactEmail')}. Our technical team will review your submission and contact you for the next steps.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-sector-internet p-8 pb-20 text-bocra-dark">
        <h2 className="text-2xl font-display font-bold mb-12 text-center">Internet Service Provider Registration</h2>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-bocra-dark/20 rounded-full z-0" />
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-bocra-dark rounded-full z-0 transition-all duration-500" 
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((step, i) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-4 border-sector-internet",
                  i <= currentStep ? "bg-white text-sector-internet scale-110" : "bg-bocra-dark/50 text-bocra-dark/50"
                )}>
                  {i < currentStep ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                </div>
                <div className={cn(
                  "absolute -bottom-12 w-32 text-center transition-all duration-300 hidden md:block",
                  i === currentStep ? "opacity-100" : "opacity-50"
                )}>
                  <span className={cn(
                    "text-xs font-bold uppercase tracking-wider block leading-tight",
                    i <= currentStep ? "text-bocra-dark" : "text-bocra-dark/50"
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
                  <input {...register('applicantName')} className="input-field" placeholder="e.g. Gaborone Fiber Networks Ltd" />
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
                  <input {...register('contactPosition')} className="input-field" placeholder="e.g. Technical Director" />
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
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Type of Internet Service</label>
                    <select {...register('serviceType')} className="input-field">
                      <option value="">Select service type...</option>
                      <option value="fiber">Fiber to the Home/Business (FTTH/B)</option>
                      <option value="wireless">Fixed Wireless Access (FWA)</option>
                      <option value="satellite">Satellite Broadband</option>
                      <option value="mobile">Mobile Data Services</option>
                    </select>
                    {errors.serviceType && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.serviceType.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Geographical Coverage</label>
                    <select {...register('geographicalCoverage')} className="input-field">
                      <option value="">Select coverage...</option>
                      <option value="national">National (Whole Botswana)</option>
                      <option value="gaborone">Gaborone & Environs</option>
                      <option value="francistown">Francistown & Environs</option>
                      <option value="local">Specific Local Area</option>
                    </select>
                    {errors.geographicalCoverage && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.geographicalCoverage.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Detailed Service Description</label>
                    <textarea {...register('serviceDescription')} rows={4} className="input-field resize-none" placeholder="Describe the nature of internet services to be provided..." />
                    {errors.serviceDescription && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.serviceDescription.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Network Infrastructure Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {['Fiber Optic', 'Wireless/Radio', 'Satellite/VSAT', 'LTE/5G'].map(type => (
                        <label key={type} className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <input type="radio" value={type} {...register('infrastructureType')} className="accent-sector-internet" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{type}</span>
                        </label>
                      ))}
                    </div>
                    {errors.infrastructureType && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.infrastructureType.message}</p>}
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Estimated Investment (BWP)</label>
                    <input {...register('estimatedInvestment')} type="number" className="input-field" placeholder="0.00" />
                    {errors.estimatedInvestment && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.estimatedInvestment.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Local Employees</label>
                    <input {...register('localEmployees')} type="number" className="input-field" placeholder="0" />
                    {errors.localEmployees && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.localEmployees.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Foreign Employees</label>
                    <input {...register('foreignEmployees')} type="number" className="input-field" placeholder="0" />
                    {errors.foreignEmployees && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.foreignEmployees.message}</p>}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">Business Plan & Support Documents</h3>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-sm text-gray-700 dark:text-gray-300 mb-4">Required Documents Checklist:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Certificate of Incorporation</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> ID copies of shareholders</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> PPRA registration documents</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Tax clearance certificate</li>
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <select className="input-field w-1/3" onChange={(e) => {
                      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
                      fileInput.dataset.docType = e.target.value;
                    }}>
                      <option value="incorporation">Certificate of Incorporation</option>
                      <option value="id_copies">ID copies of shareholders</option>
                      <option value="ppra">PPRA registration documents</option>
                      <option value="tax">Tax clearance certificate</option>
                      <option value="other">Other</option>
                    </select>
                    <input type="text" placeholder="Specify other document type" className="input-field w-2/3" />
                  </div>

                  <div 
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={cn(
                      "border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all",
                      isDragging 
                        ? "border-sector-internet bg-yellow-50 dark:bg-yellow-900/10" 
                        : "border-gray-300 dark:border-gray-700 hover:border-sector-internet dark:hover:border-yellow-500 bg-gray-50 dark:bg-gray-800/50"
                    )}
                  >
                    <UploadCloud className="w-10 h-10 text-sector-internet mb-4" />
                    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-1">Upload Documents</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">PDF format preferred, max 20MB</p>
                    <label className="bg-sector-internet text-bocra-dark px-6 py-3 rounded-xl font-bold cursor-pointer hover:bg-yellow-500 transition-all">
                      Select Files
                      <input id="fileInput" type="file" multiple className="hidden" onChange={handleFileInput} />
                    </label>
                  </div>

                  {files.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {files.map((file, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <File className="w-5 h-5 text-sector-internet shrink-0" />
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
                  <h3 className="text-xl font-bold text-sector-internet dark:text-yellow-400 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">Registration Summary</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Applicant</p>
                      <p className="font-medium">{watch('applicantName')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Service Type</p>
                      <p className="font-medium uppercase">{watch('serviceType')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Coverage</p>
                      <p className="font-medium capitalize">{watch('geographicalCoverage')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Infrastructure</p>
                      <p className="font-medium">{watch('infrastructureType')}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/50 rounded-2xl">
                  <input type="checkbox" {...register('declaration')} id="declaration" className="mt-1 w-5 h-5 accent-sector-internet shrink-0" />
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
                  referenceNumber={`REG-ISP-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`}
                  applicantName={watch('applicantName')}
                  amount={2500}
                  onComplete={() => setIsSubmitted(true)}
                  registrationSummary={
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <p><strong>Applicant:</strong> {watch('applicantName')}</p>
                      <p><strong>Service Type:</strong> {watch('serviceType')}</p>
                      <p><strong>Geographical Coverage:</strong> {watch('geographicalCoverage')}</p>
                      <p><strong>Infrastructure:</strong> {watch('infrastructureType')}</p>
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
                (currentStep === 0 || currentStep === 4) ? "text-gray-300 dark:text-gray-700 cursor-not-allowed" : "text-sector-internet hover:bg-yellow-50 dark:hover:bg-gray-800"
              )}
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={processNext}
                className="bg-sector-internet text-bocra-dark hover:bg-yellow-500 px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
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
