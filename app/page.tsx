"use client";

import { useState } from "react";

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
};

export default function Home() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  const addItem = (name: string, price: number) => {
    setOrderItems((prev) => {
      const existing = prev.find((item) => item.name === name);
      if (existing) {
        return prev.map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { name, price, quantity: 1 }];
    });
  };

  const removeItem = (name: string) => {
    setOrderItems((prev) =>
      prev
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.06;
  const total = subtotal + tax;

  const placeOrder = () => {
    if (!customerName.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!pickupTime.trim()) {
      alert("Please enter a pickup time.");
      return;
    }

    if (orderItems.length === 0) {
      alert("Please add at least one item.");
      return;
    }

    const orderText = [
      "New Silver River Bakery Order",
      `Name: ${customerName}`,
      `Pickup Time: ${pickupTime}`,
      "",
      "Items:",
      ...orderItems.map(
        (item) =>
          `${item.quantity} x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`
      ),
      "",
      `Subtotal: $${subtotal.toFixed(2)}`,
      `Tax (6%): $${tax.toFixed(2)}`,
      `Total: $${total.toFixed(2)}`,
      "",
      "Pay at pickup",
    ].join("\n");

    const phoneNumber = "19063704845";
    const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(orderText)}`;
    window.location.href = smsUrl;
  };

  return (
    <main style={pageStyle}>
      <h1 style={titleStyle}>Silver River Bakery</h1>
      <p style={subtitleStyle}>Espresso Order App</p>

      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Customer Info</h2>

        <input
          type="text"
          placeholder="Your name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Pickup time (example: 10:15 AM)"
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Lattes</h2>

        <button
          onClick={() => addItem("Regular Latte", 5.35)}
          style={menuButtonStyle}
        >
          <span>Regular Latte</span>
          <span>$5.35</span>
        </button>

        <button
          onClick={() => addItem("Large Latte", 6.65)}
          style={menuButtonStyle}
        >
          <span>Large Latte</span>
          <span>$6.65</span>
        </button>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Mochas</h2>

        <button
          onClick={() => addItem("Regular Mocha", 5.35)}
          style={menuButtonStyle}
        >
          <span>Regular Mocha</span>
          <span>$5.35</span>
        </button>

        <button
          onClick={() => addItem("Large Mocha", 6.65)}
          style={menuButtonStyle}
        >
          <span>Large Mocha</span>
          <span>$6.65</span>
        </button>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Order Summary</h2>

        {orderItems.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          <>
            {orderItems.map((item) => (
              <div key={item.name} style={orderRowStyle}>
                <div>
                  {item.quantity} x {item.name}
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => removeItem(item.name)}
                    style={removeButtonStyle}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <hr style={{ margin: "12px 0" }} />
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax (6%): ${tax.toFixed(2)}</p>
            <p>
              <strong>Total: ${total.toFixed(2)}</strong>
            </p>
          </>
        )}

        <button onClick={placeOrder} style={placeOrderButtonStyle}>
          Text Order
        </button>
      </div>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};

const titleStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "4px",
};

const subtitleStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#555",
  marginBottom: "24px",
};

const sectionStyle: React.CSSProperties = {
  marginBottom: "24px",
  padding: "16px",
  border: "1px solid #ddd",
  borderRadius: "10px",
};

const sectionTitle: React.CSSProperties = {
  marginBottom: "12px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box",
};

const menuButtonStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  backgroundColor: "#f8f8f8",
  cursor: "pointer",
  fontSize: "16px",
};

const orderRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
};

const removeButtonStyle: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#ddd",
  cursor: "pointer",
};

const placeOrderButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  marginTop: "16px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#222",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
};
