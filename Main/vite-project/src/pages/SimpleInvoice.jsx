import html2canvas from "html2canvas";
import { useRef } from "react";
import logo from "/logo.jpeg"; // put logo inside public folder
import qrcode from "/qrcode.jpeg";

export default function StyledInvoice({ data }) {
  const invoiceRef = useRef();

  const downloadImage = async () => {
    const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
    const link = document.createElement("a");
    link.download = `Invoice-${data.invoiceNo}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const totalAmount = data.items.reduce(
    (sum, item) => sum + item.qty * item.rate,
    0
  );

  return (
    <div>
      <div
        ref={invoiceRef}
        style={{
          width: "900px",
          margin: "auto",
          padding: "20px",
          background: "#fff",
          border: "2px solid #000",
          fontFamily: "Arial",
        }}
          >

        {/* COMPANY + INVOICE INFO */}
        <div
          style={{
            display: "flex",
            border: "1px solid black",
            marginTop: "10px",
          }}
        >
          <div style={{ flex: 1, padding: "10px", borderRight: "1px solid black" }}>
            <img src={logo} alt="logo" width="80" />
            <h5 style={{ margin: "5px 0" }}>
              Shree Bajrang Krupa Electricals & AC Technician
            </h5>
            <p style={{ margin: 0 }}>Mobile: 9974348948</p>
            <p style={{ margin: 0 }}>Address: Jamnagar Hapa railway Station Road Nr. Khira Furniture - 361120</p>
            <p></p>
          </div>

          <div style={{ flex: 1, padding: "10px" }}>
            <p>Invoice No: {data.invoiceNo}</p>
            <p>Invoice Date: {new Date().toLocaleString()}</p>
            <img src={qrcode} alt="logo" width="80" />

          </div>
        </div>

        {/* BILL TO */}
        <div style={{ border: "1px solid black", padding: "10px" }}>
          <strong className="text-primary">BILL TO</strong>
          <p style={{ margin: 0 }}>{data.customerName}</p>
          <p style={{ margin: 0 }}>Mobile: {data.mobile}</p>
        </div>

        {/* ITEMS TABLE */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr>
              <th style={th}>S.NO</th>
              <th style={th}>ITEMS</th>
              <th style={th}>QTY</th>
              <th style={th}>RATE</th>
              <th style={th}>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td style={td}>{index + 1}</td>
                <td style={td}>{item.name}</td>
                <td style={td}>{item.qty}</td>
                <td style={td}>{item.rate}</td>
                <td style={td}>{item.qty * item.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTAL */}
        <div className="text-success"
          style={{
            border: "1px solid black",
            borderTop: "none",
            padding: "10px",
            textAlign: "right",
            fontWeight: "bold",
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
      </div>

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