import { useState } from "react";
import { downloadInvoicePDF } from "./InvoicePDF";
import InvoiceTemplate from "./InvoiceTemplate";

function InvoiceForm() {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // ✅ Added state
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("Bags");
  const [customUnit, setCustomUnit] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);

  const finalUnit = unit === "Others" ? customUnit : unit;

  const addItem = () => {
    if (!itemName || !quantity || !price) return;
    if (unit === "Others" && !customUnit) return;

    const total = Number(quantity) * Number(price);

    setItems([
      ...items,
      { itemName, quantity, unit: finalUnit, price, total },
    ]);

    setItemName("");
    setQuantity("");
    setPrice("");
    setUnit("Bags");
    setCustomUnit("");
  };

  const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-8 border-orange-600">
        <h1 className="text-4xl font-bold text-slate-800">
          GANESH TRADERS
        </h1>
        <p className="text-slate-500">
          Cement • Steel • Electrical • Sanitary Items
        </p>
      </div>

      {/* PARTY */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="font-semibold mb-3">Party Information</h2>

        <input
          className="w-full border rounded-lg px-4 py-2 mb-3"
          placeholder="Party / Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        {/* ✅ Phone Number Field */}
     <input
  className="w-full border rounded-lg px-4 py-2"
  placeholder="Phone Number"
  value={phoneNumber}
  onChange={(e) => {
    // Remove any non-numeric characters
    let value = e.target.value.replace(/\D/g, "");

    // Limit to 10 digits
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    setPhoneNumber(value);
  }}
  type="tel"
  maxLength={10} // optional extra restriction
  pattern="[0-9]{10}" // for HTML5 validation
  required
/>

      </div>

      {/* ADD ITEM */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="font-semibold mb-4">Add Item</h2>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          <input
            className="border rounded-lg px-3 py-2"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />

          <select
            className="border rounded-lg px-3 py-2"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option>Bags</option>
            <option>Kg</option>
            <option>Nos</option>
            <option>Meter</option>
            <option>Box</option>
            <option>Set</option>
            <option>Others</option>
          </select>

          {unit === "Others" && (
            <input
              className="border rounded-lg px-3 py-2"
              placeholder="Custom Unit"
              value={customUnit}
              onChange={(e) => setCustomUnit(e.target.value)}
            />
          )}

          <input
            className="border rounded-lg px-3 py-2"
            type="number"
            placeholder="Qty"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <input
            className="border rounded-lg px-3 py-2"
            type="number"
            placeholder="Rate"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button
            onClick={addItem}
            className="md:col-span-2 bg-orange-600 text-white rounded-lg"
          >
            + Add Item
          </button>
        </div>
      </div>

      {/* PDF PREVIEW (IMPORTANT) */}
      {items.length > 0 && (
        <>
          <div
            id="invoice-pdf"
            className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6"
          >
            <InvoiceTemplate
              customerName={customerName}
              phoneNumber={phoneNumber} // ✅ Pass phone number to PDF template
              items={items}
              grandTotal={grandTotal}
            />
          </div>

          <div className="max-w-6xl mx-auto flex justify-end mt-6">
            <button
              onClick={() =>
                downloadInvoicePDF("invoice-pdf", customerName)
              }
              className="bg-blue-600 text-white px-8 py-3 rounded-lg"
            >
              Download Invoice PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default InvoiceForm;
