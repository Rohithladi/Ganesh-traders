import html2pdf from "html2pdf.js";

export const downloadInvoicePDF = (elementId, customerName) => {
  const element = document.getElementById(elementId);

  const options = {
    margin: 10,
    filename: `${customerName || "Invoice"}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(options).from(element).save();
};
