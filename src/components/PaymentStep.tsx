import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, CheckCircle2 } from 'lucide-react';
import Invoice from './Invoice';

interface PaymentStepProps {
  referenceNumber: string;
  applicantName: string;
  amount: number;
  onComplete: () => void;
  registrationSummary: React.ReactNode;
}

export default function PaymentStep({ referenceNumber, applicantName, amount, onComplete, registrationSummary }: PaymentStepProps) {
  const [isPaid, setIsPaid] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });

  const handlePayment = () => {
    // Simulate payment
    setTimeout(() => {
      setIsPaid(true);
    }, 1500);
  };

  if (isPaid) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
        <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-2xl border border-green-100 dark:border-green-900/30 flex items-center gap-4">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
          <div>
            <h3 className="font-bold text-green-800 dark:text-green-400">Payment Successful!</h3>
            <p className="text-sm text-green-700 dark:text-green-300">Your payment has been processed successfully.</p>
          </div>
        </div>
        <Invoice referenceNumber={referenceNumber} applicantName={applicantName} amount={amount} date={new Date().toLocaleDateString()} registrationSummary={registrationSummary} />
        <button onClick={onComplete} className="btn-primary w-full py-4">Finish</button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 p-12 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-gray-200 dark:border-gray-700">
      <CreditCard className="w-16 h-16 text-bocra-blue" />
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Processing Payment</h3>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-sm">
        Please enter your card details to pay <strong>BWP {amount.toFixed(2)}</strong> for your license application.
      </p>
      <div className="w-full max-w-md flex flex-col gap-4">
        <input type="text" placeholder="Cardholder Name" className="input-field" value={cardDetails.name} onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})} />
        <input type="text" placeholder="Card Number" className="input-field" value={cardDetails.number} onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})} />
        <div className="flex gap-4">
          <input type="text" placeholder="MM/YY" className="input-field" value={cardDetails.expiry} onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})} />
          <input type="text" placeholder="CVV" className="input-field" value={cardDetails.cvv} onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})} />
        </div>
      </div>
      <button onClick={handlePayment} className="btn-primary w-full max-w-xs py-4 text-lg">
        Pay Now
      </button>
    </div>
  );
}
