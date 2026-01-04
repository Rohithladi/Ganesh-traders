const InvoiceTemplate = ({ customerName, phoneNumber, items, grandTotal }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="p-10 text-gray-800 text-sm font-sans">
      {/* Header */}
      <div className="text-center border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-orange-700">
          GANESH TRADERS
        </h1>
        <p className="text-gray-600">
          Cement • Steel • Electrical • Sanitary Items
        </p>
      </div>

      {/* Party Info */}
      <div className="flex justify-between mb-6">
        <div>
          <p><strong>Party:</strong> {customerName}</p>
          {phoneNumber && <p><strong>Phone:</strong> {phoneNumber}</p>}
        </div>
        <p><strong>Date:</strong> {currentDate}</p>
      </div>

      {/* Items Table */}
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Item</th>
            <th className="border p-2 text-center">Qty</th>
            <th className="border p-2 text-center">Unit</th>
            <th className="border p-2 text-right">Rate</th>
            <th className="border p-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td className="border p-2">{item.itemName}</td>
              <td className="border p-2 text-center">{item.quantity}</td>
              <td className="border p-2 text-center">{item.unit}</td>
              <td className="border p-2 text-right">₹ {item.price}</td>
              <td className="border p-2 text-right">₹ {item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Grand Total */}
      <div className="flex justify-end mt-6">
        <div className="border p-4 w-64 bg-gray-50">
          <p className="text-lg font-bold">
            Grand Total: ₹ {grandTotal}
          </p>
        </div>
      </div>

      {/* Stamp / Signature Section */}
      <div className="mt-10 flex justify-end items-center gap-4">
        <div className="text-center">
          <p className="text-gray-500 mb-2">STAMP</p>
          <img
            src="/sign1.png"   // <-- your stamp image
            alt="Owner Signature"
            className="h-16"
          />
          <p className="text-gray-700 mt-1">{currentDate}</p>
        </div>
      </div>

      <p className="text-center mt-10 text-gray-500">
        Thank you for your business 🙏
      </p>
    </div>
  );
};

export default InvoiceTemplate;
