import { useState } from "react";

function App() {
  const [customerName, setCustomerName] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (!itemName || !quantity || !price) return;

    const total = quantity * price;
    setItems([
      ...items,
      { itemName, quantity, price, total }
    ]);

    setItemName("");
    setQuantity("");
    setPrice("");
  };

  const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 mb-6 text-center">
        <h1 className="text-3xl font-bold text-orange-600">
          GANESH TRADERS
        </h1>
        <p className="text-gray-600">
          Cement & Building Materials
        </p>
      </div>

      {/* CUSTOMER DETAILS */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Customer Details
        </h2>
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full border rounded-lg p-2"
        />
      </div>

      {/* ITEM ENTRY */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Add Item
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="border rounded-lg p-2"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border rounded-lg p-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-lg p-2"
          />
          <button
            onClick={addItem}
            className="bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            Add Item
          </button>
        </div>
      </div>

      {/* BILL SECTION */}
      {items.length > 0 && (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Bill Details
          </h2>

          <div className="flex justify-between mb-4">
            <p>
              <strong>Customer:</strong> {customerName}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date().toLocaleDateString()}
            </p>
          </div>

          <table className="w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Item</th>
                <th className="border p-2">Qty</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{item.itemName}</td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">₹ {item.price}</td>
                  <td className="border p-2">₹ {item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right mt-4">
            <h3 className="text-2xl font-bold">
              Grand Total: ₹ {grandTotal}
            </h3>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={() => window.print()}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Print Bill
            </button>
          </div>

          <p className="text-center text-gray-500 mt-4">
            Thank you! Visit Again 🙏
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
