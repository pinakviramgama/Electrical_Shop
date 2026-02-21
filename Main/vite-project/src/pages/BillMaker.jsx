import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import StyledInvoice from "./SimpleInvoice";
export default function BillMaker() {
  const [loading, setLoading] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

    const navigate = useNavigate();
  const initialForm = {
    _id: null,
    customerName: "",
    mobile: "",
    items: [{ name: "", qty: 1, rate: 0 }],
  };

  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const items = [...formData.items];
    items[index][field] = value;
    setFormData({ ...formData, items });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", qty: 1, rate: 0 }],
    });
  };

  const removeItem = (index) => {
    const items = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items });
  };

  const validateForm = () => {
    if (!formData.customerName.trim() || !formData.mobile.trim()) return false;
    for (let item of formData.items) {
      if (!item.name.trim() || item.qty <= 0 || item.rate <= 0) return false;
    }
    return true;
  };

  const handleGenerateBill = async () => {
    if (!validateForm()) {
      alert("Please fill all fields correctly!");
      return;
    }

    try {
      setLoading(true);
      let response;

      if (formData._id) {
        response = await API.put(`/invoices/update/${formData._id}`, formData);
      } else {
        response = await API.post("/invoices/create", formData);
      }

      setFormData(response.data);
      setShowInvoice(true);
      alert("Bill saved successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Error saving bill");
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    setFormData(initialForm);
    setShowInvoice(false);
  };

  const handleEditBill = () => setShowInvoice(false);

  return (
  <div className="container py-4">
    <div className="card shadow-lg border-0">
      <div className="card-body p-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold text-success mb-0">
            Generate Invoice
          </h4>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline-secondary btn-sm"
          >
            ← Back
          </button>
        </div>

        {/* Customer Section */}
        <div className="card mb-4 border-0 bg-light">
          <div className="card-body">
            <h6 className="fw-bold mb-3 text-primary">Customer Details</h6>

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">
                  Customer Name
                </label>
                <input
                  className="form-control"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Enter customer name"
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold">
                  Mobile Number
                </label>
                <input
                  className="form-control"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="card border-0 bg-light mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold text-primary mb-0">Items</h6>
              <button
                className="btn btn-sm btn-outline-success"
                onClick={addItem}
              >
                + Add Item
              </button>
            </div>

            {formData.items.map((item, i) => (
              <div
                key={i}
                className="border rounded p-3 mb-3 bg-white shadow-sm"
              >
                <div className="row g-3">

                  <div className="col-12 col-md-4">
                    <label className="form-label small">Item Name</label>
                    <input
                      className="form-control"
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(i, "name", e.target.value)
                      }
                      placeholder="Item name"
                    />
                  </div>

                  <div className="col-6 col-md-2">
                    <label className="form-label small">Qty</label>
                    <input
                      type="number"
                      className="form-control"
                      value={item.qty}
                      onChange={(e) =>
                        handleItemChange(i, "qty", Number(e.target.value))
                      }
                    />
                  </div>

                  <div className="col-6 col-md-2">
                    <label className="form-label small">Rate</label>
                    <input
                      type="number"
                      className="form-control"
                      value={item.rate}
                      onChange={(e) =>
                        handleItemChange(i, "rate", Number(e.target.value))
                      }
                    />
                  </div>

                  <div className="col-6 col-md-2">
                    <label className="form-label small">Amount</label>
                    <input
                      className="form-control bg-light"
                      value={item.qty * item.rate}
                      readOnly
                    />
                  </div>

                  <div className="col-6 col-md-2 d-flex align-items-end">
                    <button
                      className="btn btn-outline-danger w-100"
                      onClick={() => removeItem(i)}
                    >
                      Remove
                    </button>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex flex-wrap gap-2">
          <button
            className="btn btn-success"
            onClick={handleGenerateBill}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : formData._id
              ? "Update Bill"
              : "Generate Bill"}
          </button>

          <button
            className="btn btn-warning"
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>

        {/* Invoice Preview */}
        {showInvoice && (
          <div className="mt-5">
            <hr />
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold">Invoice Preview</h5>
              <button
                className="btn btn-sm btn-primary"
                onClick={handleEditBill}
              >
                Edit
              </button>
            </div>

            <StyledInvoice bill={formData} />
          </div>
        )}
      </div>
    </div>
  </div>
);
}