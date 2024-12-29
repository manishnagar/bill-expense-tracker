import React, { useState } from "react";

function BillGenerateTracker() {
  const [formData, setFormData] = useState({
    item: "",
    price: "",
    quantity: "",
    tip: "",
    split: "",
  });

  const [billDetails, setBillDetails] = useState({
    items: [],
    totalBeforeTip: 0,
    tipAmount: 0,
    totalBill: 0,
    amountPerPerson: 0,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Ensure quantity and split do not exceed 100
    if ((id === "quantity" || id === "split") && value > 1000) {
      alert(`${id.charAt(0).toUpperCase() + id.slice(1)} cannot exceed 1000.`);
      return;
    }
    if (id === "tip" && (value < 0 || value > 200)) {
      alert("Tip value must be between 0 and 200.");
      return;
    }
    setFormData({ ...formData, [id]: value });
  };

  // Generate the bill
  const handleGenerateBill = (e) => {
    e.preventDefault();

    const { item, price, quantity, tip, split } = formData;
    if (!item || !price || !quantity) {
      alert("Please fill in all required fields.");
      return;
    }

    const totalBeforeTip = parseFloat(price) * parseInt(quantity, 10);
    const tipAmount = parseFloat(tip || 0);
    const totalBill = totalBeforeTip + tipAmount;
    const amountPerPerson = split ? totalBill / parseInt(split, 10) : totalBill;

    setBillDetails((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { name: item, quantity: parseInt(quantity, 10), amount: totalBeforeTip },
      ],
      totalBeforeTip: prev.totalBeforeTip + totalBeforeTip,
      tipAmount: tipAmount,
      totalBill: prev.totalBeforeTip + totalBeforeTip + tipAmount,
      amountPerPerson: split ? totalBill / parseInt(split, 10) : totalBill,
    }));

    // Reset item-specific fields
    setFormData({
      ...formData,
      item: "",
      price: "",
      quantity: "",
    });
  };

  // Clear all fields
  const handleClearBill = (e) => {
    e.preventDefault();
    setFormData({
      item: "",
      price: "",
      quantity: "",
      tip: "",
      split: "",
    });
    setBillDetails({
      items: [],
      totalBeforeTip: 0,
      tipAmount: 0,
      totalBill: 0,
      amountPerPerson: 0,
    });
  };

  // Remove a specific item
  const handleRemoveItem = (index) => {
    setBillDetails((prev) => {
      const updatedItems = prev.items.filter((_, i) => i !== index);
      const totalBeforeTip = updatedItems.reduce((acc, item) => acc + item.amount, 0);
      const totalBill = totalBeforeTip + prev.tipAmount;
      const amountPerPerson = prev.split
        ? totalBill / parseInt(prev.split, 10)
        : totalBill;

      return {
        ...prev,
        items: updatedItems,
        totalBeforeTip,
        totalBill,
        amountPerPerson,
      };
    });
  };

  return (
    <div>
      <form>
        <div className="row">
          <div className="col-sm-12">
            <label htmlFor="item">Item Name:</label>
            <input
              type="text"
              className="form-control"
              id="item"
              value={formData.item}
              onChange={handleInputChange}
              placeholder="Enter name of item"
              required
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <label htmlFor="price">Item Price ₹ :</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter item price"
              required
              min="1"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <label htmlFor="quantity">Item Quantity:</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Enter quantity"
              required
              min="1"
              max="100"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <label htmlFor="tip">Tip:</label>
            <input
              type="number"
              className="form-control"
              id="tip"
              value={formData.tip}
              onChange={handleInputChange}
              placeholder="Enter tip"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <label htmlFor="split">Split Into:</label>
            <input
              type="number"
              className="form-control"
              id="split"
              value={formData.split}
              onChange={handleInputChange}
              placeholder="Enter Split into"
              required
              min="1"
              max="100"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <button
              type="submit"
              className="btn btn-success btn-pad"
              onClick={handleGenerateBill}
            >
              Generate Bill
            </button>
          </div>
          <div className="col-sm-12 col-lg-6">
            <button
              type="submit"
              className="btn btn-danger btn-pad"
              onClick={handleClearBill}
            >
              Clear Bill
            </button>
          </div>

          {/* Display Items */}
          {billDetails.items.length > 0 && (
            <div className="col-sm-12">
              {billDetails.items.map((item, index) => (
                <div className="item-border" key={index}>
                  <div>
                    {item.name}{" "}
                    <span style={{ fontSize: "12px" }}>&#x2715;</span>{" "}
                    <span>{item.quantity}</span>{" "}
                    <span className="pl10">₹ {item.amount.toFixed(2)}</span>
                  </div>
                  <div
                    className="close-btn"
                    onClick={() => handleRemoveItem(index)}
                    style={{ cursor: "pointer", color: "red" }}
                  >
                    &#x2715;
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Display Bill Details */}
          {billDetails.items.length > 0 && (
            <div className="col-sm-12">
              <div className="expense-card">
                <div className="expense-name">
                  Total Before Tip:{" "}
                  <span className="bold">₹ {billDetails.totalBeforeTip.toFixed(2)}</span>
                </div>
                <div className="expense-name">
                  Tip Amount:{" "}
                  <span className="bold">₹ {billDetails.tipAmount.toFixed(2)}</span>
                </div>
                <div className="expense-name">
                  Total Bill:{" "}
                  <span className="bold">₹ {billDetails.totalBill.toFixed(2)}</span>
                </div>
                <div className="expense-name">
                  Amount Per Person:{" "}
                  <span className="bold">
                    ₹ {billDetails.amountPerPerson.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default BillGenerateTracker;
