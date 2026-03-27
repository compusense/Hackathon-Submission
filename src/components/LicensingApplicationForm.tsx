import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, ChevronLeft, AlertCircle, UploadCloud, File, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import PaymentStep from './PaymentStep';

const licenseSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  registrationNumber: z.string().min(2, 'Registration number is required'),
  directorName: z.string().min(2, 'Director name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Valid phone number is required'),
  address: z.string().min(10, 'Full physical address is required'),
  licenseCategory: z.string().min(1, 'Please select a license category'),
  licenseType: z.string().min(1, 'Please select a specific license type'),
  declaration: z.boolean().refine(val => val === true, 'You must agree to the declaration'),
});

type LicenseFormData = z.infer<typeof licenseSchema>;

const steps = [
  { id: 'company', title: 'Company Info' },
  { id: 'license', title: 'License Details' },
  { id: 'documents', title: 'Documents' },
  { id: 'review', title: 'Review & Submit' },
  { id: 'payment', title: 'Payment' },
];

export default function LicensingApplicationForm() {
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
  } = useForm<LicenseFormData>({
    resolver: zodResolver(licenseSchema),
    mode: 'onChange',
  });

  const selectedCategory = watch('licenseCategory');

  const processNext = async () => {
    let fieldsToValidate: (keyof LicenseFormData)[] = [];
    if (currentStep === 0) fieldsToValidate = ['companyName', 'registrationNumber', 'directorName', 'email', 'phone', 'address'];
    if (currentStep === 1) fieldsToValidate = ['licenseCategory', 'licenseType'];
    if (currentStep === 2) {
      if (files.length === 0) {
        alert("Please upload at least one required document (e.g., Certificate of Incorporation).");
        return;
      }
      fieldsToValidate = []; // File validation is manual here
    }
    
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const processPrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = (data: LicenseFormData) => {
    console.log('License Application submitted:', { ...data, files });
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
        <h2 className="text-4xl font-display font-bold text-bocra-blue dark:text-blue-400">Application Received</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg text-lg">
          Your license application for <strong>{watch('companyName')}</strong> has been successfully submitted and paid. 
        </p>
        <div className="bg-bocra-light dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md my-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mb-2">Application Reference</p>
          <p className="text-3xl font-mono font-bold text-bocra-blue">LIC-{new Date().getFullYear()}-{Math.floor(Math.random() * 9000) + 1000}</p>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          We have sent a confirmation email to {watch('email')}. Our licensing department will review your documents and contact you within 14 working days.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-bocra-blue dark:bg-blue-900 p-8 pb-20 text-white">
        <h2 className="text-2xl font-display font-bold mb-12 text-center">New License Application</h2>
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
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-4 border-bocra-blue dark:border-blue-900",
                  i <= currentStep ? "bg-white text-bocra-blue scale-110" : "bg-blue-800 text-blue-400"
                )}>
                  {i < currentStep ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                </div>
                <div className={cn(
                  "absolute -bottom-12 w-32 text-center transition-all duration-300 hidden md:block",
                  i === currentStep ? "opacity-100" : "opacity-50"
                )}>
                  <span className={cn(
                    "text-xs font-bold uppercase tracking-wider block leading-tight",
                    i <= currentStep ? "text-white" : "text-blue-300/50"
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
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Registered Company Name</label>
                  <input {...register('companyName')} className="input-field" placeholder="e.g. Botswana Tech Solutions (Pty) Ltd" />
                  {errors.companyName && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.companyName.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Company Registration Number</label>
                  <input {...register('registrationNumber')} className="input-field" placeholder="UIN / CO Number" />
                  {errors.registrationNumber && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.registrationNumber.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Director / Contact Person Name</label>
                  <input {...register('directorName')} className="input-field" placeholder="Full Name" />
                  {errors.directorName && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.directorName.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Official Email Address</label>
                  <input {...register('email')} type="email" className="input-field" placeholder="admin@company.co.bw" />
                  {errors.email && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.email.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Business Phone Number</label>
                  <input {...register('phone')} className="input-field" placeholder="+267 3900000" />
                  {errors.phone && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.phone.message}</p>}
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Physical Address</label>
                  <textarea {...register('address')} rows={3} className="input-field resize-none" placeholder="Plot Number, Street, Ward, City/Town" />
                  {errors.address && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.address.message}</p>}
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 gap-8"
              >
                <div className="flex flex-col gap-4">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Select License Category</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'telecom', label: 'Telecommunications', color: 'border-sector-telecom text-sector-telecom' },
                      { id: 'broadcasting', label: 'Broadcasting', color: 'border-sector-broadcast text-sector-broadcast' },
                      { id: 'postal', label: 'Postal & Courier', color: 'border-sector-postal text-sector-postal' },
                      { id: 'spectrum', label: 'Spectrum & Radio', color: 'border-[#b39500] text-[#b39500] dark:border-sector-internet dark:text-sector-internet' },
                    ].map((cat) => (
                      <label 
                        key={cat.id}
                        className={cn(
                          "cursor-pointer p-6 rounded-2xl border-2 transition-all flex items-center gap-4",
                          selectedCategory === cat.id 
                            ? cn(cat.color, "bg-gray-50 dark:bg-gray-800/50 shadow-md") 
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400"
                        )}
                      >
                        <input type="radio" value={cat.id} {...register('licenseCategory')} className="w-5 h-5 accent-bocra-blue" />
                        <span className="font-bold text-lg">{cat.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.licenseCategory && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.licenseCategory.message}</p>}
                </div>

                {selectedCategory && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex flex-col gap-2"
                  >
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Specific License Type</label>
                    <select {...register('licenseType')} className="input-field py-4 text-lg">
                      <option value="">Select specific license...</option>
                      {selectedCategory === 'telecom' && (
                        <>
                          <option value="nfp">Network Facilities Provider (NFP)</option>
                          <option value="sap">Services and Applications Provider (SAP)</option>
                          <option value="pto">Public Telecommunications Operator (PTO)</option>
                          <option value="vans">Value Added Network Services (VANS)</option>
                          <option value="mvno">Mobile Virtual Network Operators (MVNO)</option>
                          <option value="csp">Content Services Provider (CSP)</option>
                        </>
                      )}
                      {selectedCategory === 'broadcasting' && (
                        <>
                          <option value="commercial_tv">Commercial Television Broadcasting</option>
                          <option value="commercial_radio">Commercial Radio Broadcasting</option>
                          <option value="community_radio">Community Radio Broadcasting</option>
                        </>
                      )}
                      {selectedCategory === 'postal' && (
                        <>
                          <option value="public_postal">Public Postal Operator</option>
                          <option value="commercial_courier">Commercial Courier</option>
                        </>
                      )}
                      {selectedCategory === 'spectrum' && (
                        <>
                          <option value="radio_freq">Radio Frequency License</option>
                          <option value="vsat">VSAT Network</option>
                          <option value="amateur">Amateur Radio</option>
                        </>
                      )}
                    </select>
                    {errors.licenseType && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.licenseType.message}</p>}
                  </motion.div>
                )}
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 mb-4">
                  <h3 className="font-bold text-bocra-blue dark:text-blue-400 mb-2">Required Documents</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Certificate of Incorporation</li>
                    <li>Company Profile & Business Plan</li>
                    <li>Directors' IDs / Passports</li>
                    <li>Proof of Financial Capability</li>
                  </ul>
                </div>

                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={cn(
                    "border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center transition-all",
                    isDragging 
                      ? "border-bocra-blue bg-blue-50 dark:bg-blue-900/10" 
                      : "border-gray-300 dark:border-gray-700 hover:border-bocra-blue dark:hover:border-blue-500 bg-gray-50 dark:bg-gray-800/50"
                  )}
                >
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-sm flex items-center justify-center mb-4 text-bocra-blue dark:text-blue-400">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-2">Drag & Drop files here</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">PDF, DOCX, JPG up to 10MB each</p>
                  
                  <label className="btn-primary cursor-pointer">
                    Browse Files
                    <input type="file" multiple className="hidden" onChange={handleFileInput} />
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="flex flex-col gap-3 mt-4">
                    <h4 className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest">Uploaded Files</h4>
                    {files.map((file, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm">
                        <div className="flex items-center gap-3">
                          <File className="w-5 h-5 text-bocra-blue" />
                          <div>
                            <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{file.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => removeFile(i)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
                <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-bocra-blue dark:text-blue-400 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">Application Summary</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mb-1">Company Name</p>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{watch('companyName')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mb-1">Registration No.</p>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{watch('registrationNumber')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mb-1">License Category</p>
                      <p className="font-medium text-gray-800 dark:text-gray-200 capitalize">{watch('licenseCategory')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mb-1">License Type</p>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{watch('licenseType')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mb-1">Documents Attached</p>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{files.length} files</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/50 rounded-2xl">
                  <input type="checkbox" {...register('declaration')} id="declaration" className="mt-1 w-5 h-5 accent-bocra-blue shrink-0" />
                  <div className="flex flex-col gap-2">
                    <label htmlFor="declaration" className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed cursor-pointer">
                      I, <strong>{watch('directorName') || 'the applicant'}</strong>, hereby declare that the information provided in this application and attached documents is true and correct to the best of my knowledge. I understand that providing false information may result in the rejection of this application or revocation of the license.
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
                  referenceNumber={`LIC-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`}
                  applicantName={watch('companyName')}
                  amount={5000}
                  onComplete={() => setIsSubmitted(true)}
                  registrationSummary={
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <p><strong>Company:</strong> {watch('companyName')}</p>
                      <p><strong>License Type:</strong> {watch('licenseType')}</p>
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
                (currentStep === 0 || currentStep === 4) ? "text-gray-300 dark:text-gray-700 cursor-not-allowed" : "text-bocra-blue dark:text-blue-400 hover:bg-bocra-light dark:hover:bg-gray-800"
              )}
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={processNext}
                className="btn-primary flex items-center gap-2 px-8"
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
