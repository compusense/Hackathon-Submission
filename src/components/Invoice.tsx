import React, { useRef } from 'react';
import { Printer, Download, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface InvoiceProps {
  referenceNumber: string;
  applicantName: string;
  amount: number;
  date: string;
  registrationSummary: React.ReactNode;
}

export default function Invoice({ referenceNumber, applicantName, amount, date, registrationSummary }: InvoiceProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;

    try {
      const element = invoiceRef.current;
      // Hide buttons temporarily for the screenshot
      const buttons = element.querySelector('.no-print');
      if (buttons) (buttons as HTMLElement).style.display = 'none';

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      if (buttons) (buttons as HTMLElement).style.display = 'flex';

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_${referenceNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div ref={invoiceRef} className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm print:shadow-none print:border-none print-section print:bg-white print:text-black">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-bocra-blue rounded-lg flex items-center justify-center print:bg-bocra-blue">
              <FileText className="text-white w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 print:text-black">INVOICE</h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-mono print:text-gray-600">REF: {referenceNumber}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 print:text-gray-600">Date: {date}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400 print:text-gray-600">Applicant:</p>
          <p className="font-bold text-gray-800 dark:text-gray-100 print:text-black">{applicantName}</p>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2 print:text-black print:border-gray-200">Registration Summary</h4>
        <div className="text-gray-700 dark:text-gray-300 print:text-black">
          {registrationSummary}
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 print:border-gray-200">
        <div className="flex justify-between items-center font-bold text-xl text-gray-800 dark:text-gray-100 print:text-black">
          <span>Total Paid</span>
          <span className="text-bocra-blue dark:text-blue-400 print:text-bocra-blue">BWP {amount.toFixed(2)}</span>
        </div>
      </div>

      <div className="no-print flex flex-wrap gap-4 mt-8">
        <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg font-bold text-gray-700 dark:text-gray-200 transition-colors">
          <Printer className="w-4 h-4" /> Print Invoice
        </button>
        <button onClick={handleDownloadPDF} className="flex items-center gap-2 px-4 py-2 bg-bocra-blue text-white hover:bg-bocra-blue/90 rounded-lg font-bold transition-colors">
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>
    </div>
  );
}
