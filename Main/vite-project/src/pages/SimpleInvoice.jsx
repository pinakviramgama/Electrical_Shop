import html2canvas from "html2canvas";
import { useRef } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import "./invoice.css";
import logo from "/logo.jpeg";
import qrcode from "/qrcode.jpeg";

export default function StyledInvoice({ bill }) {
  const invoiceRef = useRef();

  if (!bill || !bill.items) return null;

  const downloadImage = async () => {
    const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
    const link = document.createElement("a");
    link.download = `Invoice-${bill.invoiceNo || bill._id}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const totalAmount = bill.items.reduce(
    (sum, item) => sum + Number(item.qty) * Number(item.rate),
    0
  );

  return (
    <div style={{ marginTop: "40px" }}>
      <div
        ref={invoiceRef}
        className="invoice-container"
        style={{
          width: "100%",
          maxWidth: "900px",
          margin: "auto",
          padding: "20px",
          background: "#fff",
          border: "2px solid #000",
          fontFamily: "Arial",
          fontSize: "14px",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            border: "1px solid black",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              flex: "1 1 300px",
              padding: "10px",
              borderRight: "1px solid black",
            }}
          >
            <img src={logo} alt="logo" width="70" />
            <h5
              className="fw-bold text-success"
              style={{ margin: "5px 0", fontSize: "18px" }}
            >
              Shree Bajrang Krupa Electricals & AC Technician
            </h5>
            <p style={{ margin: 0 }}>
              <FaPhoneAlt className="me-2" />
              +91 9974348948
            </p>
            <p style={{ margin: 0 }}>
              <FaMapMarkerAlt className="me-2" />
              Jamnagar Hapa Railway Station Road
            </p>
          </div>

          <div
            style={{
              flex: "1 1 300px",
              padding: "10px",
              textAlign: "left",
            }}
          >
            <p>Invoice No: {bill.invoiceNo || bill._id}</p>
            <p>
              Invoice Date:{" "}
              {bill.createdAt
                ? new Date(bill.createdAt).toLocaleString()
                : new Date().toLocaleString()}
            </p>
            <img src={qrcode} alt="qr" width="70" />
          </div>
        </div>

        {/* BILL TO */}
        <div style={{ border: "1px solid black", padding: "10px" }}>
          <strong className="text-primary">BILL TO</strong>
          <p style={{ margin: 0 }}>{bill.customerName || "-"}</p>
          <p style={{ margin: 0 }}>Mobile: {bill.mobile || "-"}</p>
        </div>

        {/* TABLE WRAPPER (Scrollable on mobile) */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
              minWidth: "600px",
            }}
          >
            <thead>
              <tr>
                <th style={th}>S.NO</th>
                <th style={th}>ITEM NAME</th>
                <th style={th}>QTY</th>
                <th style={th}>RATE</th>
                <th style={th}>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {bill.items.map((item, index) => (
                <tr key={index}>
                  <td style={td}>{index + 1}</td>
                  <td style={td}>{item.name || "-"}</td>
                  <td style={td}>{item.qty}</td>
                  <td style={td}>{item.rate}</td>
                  <td style={td}>
                    ₹ {Number(item.qty) * Number(item.rate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTAL */}
        <div
          style={{
            border: "1px solid black",
            borderTop: "none",
            padding: "10px",
            textAlign: "right",
            fontWeight: "bold",
            color: "green",
          }}
        >
          TOTAL: ₹ {totalAmount}
        </div>

        {/* SIGNATURE */}
        <div
          style={{
            border: "1px solid black",
            borderTop: "none",
            padding: "20px",
            textAlign: "right",
          }}
        >
          Authorised Signatory
        </div>

        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <h2
            className="fw-bold text-success"
            style={{ fontSize: "20px" }}
          >
            Thank You! Visit Again
          </h2>
        </div>
      </div>

      {/* DOWNLOAD BUTTON */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button className="btn btn-success" onClick={downloadImage}>
          Download Invoice Image
        </button>
      </div>
    </div>
  );
}

const th = {
  border: "1px solid black",
  padding: "8px",
  background: "#f3f3f3",
};

const td = {
  border: "1px solid black",
  padding: "8px",
};