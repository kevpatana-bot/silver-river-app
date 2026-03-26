"use client";

import Image from "next/image";
import { useState } from "react";

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
};

type MilkOption = {
  name: string;
  price: number;
};

type FlavorOption = {
  name: string;
  price: number;
};

const milkOptions: MilkOption[] = [
  { name: "Whole Milk", price: 0 },
  { name: "2% Milk", price: 0 },
  { name: "Skim Milk", price: 0 },
  { name: "Almond Milk", price: 0.75 },
  { name: "Oat Milk", price: 0.75 },
  { name: "Soy Milk", price: 0.75 },
];

const latteFlavorOptions: FlavorOption[] = [
  { name: "Vanilla", price: 0.5 },
  { name: "Caramel", price: 0.5 },
  { name: "Coconut", price: 0.5 },
  { name: "Hazelnut", price: 0.5 },
  { name: "Sugar Free Caramel", price: 0.5 },
];

export default function Home() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [selectedMilk, setSelectedMilk] = useState<MilkOption>(milkOptions[0]);
  const [selectedLatteFlavors, setSelectedLatteFlavors] = useState<string[]>([]);

  const toggleLatteFlavor = (flavorName: string) => {
    setSelectedLatteFlavors((prev) =>
      prev.includes(flavorName)
        ? prev.filter((flavor) => flavor !== flavorName)
        : [...prev, flavorName]
    );
  };

  const addItem = (
    drinkName: string,
    basePrice: number,
    options?: { allowMilk?: boolean; allowLatteFlavors?: boolean }
  ) => {
    const allowMilk = options?.allowMilk ?? true;
    const allowLatteFlavors = options?.allowLatteFlavors ?? false;

    const milkCharge = allowMilk ? selectedMilk.price : 0;
    const milkText = allowMilk ? ` - ${selectedMilk.name}` : "";

    const chosenFlavorObjects = allowLatteFlavors
      ? latteFlavorOptions.filter((flavor) =>
          selectedLatteFlavors.includes(flavor.name)
        )
      : [];

    const flavorCharge = chosenFlavorObjects.reduce(
      (sum, flavor) => sum + flavor.price,
      0
    );

    const flavorText =
      chosenFlavorObjects.length > 0
        ? ` - Flavors: ${chosenFlavorObjects.map((f) => f.name).join(", ")}`
        : "";

    const finalName = `${drinkName}${milkText}${flavorText}`;
    const finalPrice = basePrice + milkCharge + flavorCharge;

    setOrderItems((prev) => {
      const existing = prev.find((item) => item.name === finalName);

      if (existing) {
        return prev.map((item) =>
          item.name === finalName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { name: finalName, price: finalPrice, quantity: 1 }];
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
          `${item.quantity} x ${item.name} - $${(
            item.price * item.quantity
          ).toFixed(2)}`
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
      <div style={logoWrapStyle}>
        <Image
          src="/logo.png"
          alt="Silver River Bakery Logo"
          width={180}
          height={180}
          style={logoStyle}
          priority
        />
      </div>

      <h1 style={titleStyle}>Silver River Bakery</h1>
      <p style={subtitleStyle}>Order Your Drinks for Pickup</p>

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
        <h2 style={sectionTitle}>Milk Choice</h2>
        <p style={helperTextStyle}>Choose milk before adding each drink.</p>

        {milkOptions.map((milk) => (
          <button
            key={milk.name}
            onClick={() => setSelectedMilk(milk)}
            style={{
              ...milkButtonStyle,
              backgroundColor:
                selectedMilk.name === milk.name ? "#d9d9d9" : "#f8f8f8",
            }}
          >
            <span>{milk.name}</span>
            <span>{milk.price > 0 ? `+$${milk.price.toFixed(2)}` : "$0.00"}</span>
          </button>
        ))}
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Latte Flavors</h2>
        <p style={helperTextStyle}>These flavors apply to lattes only.</p>

        {latteFlavorOptions.map((flavor) => (
          <button
            key={flavor.name}
            onClick={() => toggleLatteFlavor(flavor.name)}
            style={{
              ...flavorButtonStyle,
              backgroundColor: selectedLatteFlavors.includes(flavor.name)
                ? "#d9d9d9"
                : "#f8f8f8",
            }}
          >
            <span>{flavor.name}</span>
            <span>+$0.50</span>
          </button>
        ))}

        <button
          onClick={() => setSelectedLatteFlavors([])}
          style={clearButtonStyle}
        >
          Clear Latte Flavors
        </button>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Lattes</h2>

        <button
          onClick={() =>
            addItem("Regular Latte", 5.35, {
              allowMilk: true,
              allowLatteFlavors: true,
            })
          }
          style={menuButtonStyle}
        >
          <span>Regular Latte</span>
          <span>$5.35</span>
        </button>

        <button
          onClick={() =>
            addItem("Large Latte", 6.65, {
              allowMilk: true,
              allowLatteFlavors: true,
            })
          }
          style={menuButtonStyle}
        >
          <span>Large Latte</span>
          <span>$6.65</span>
        </button>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Mochas</h2>

        <button
          onClick={() =>
            addItem("Regular Mocha", 5.35, {
              allowMilk: true,
              allowLatteFlavors: false,
            })
          }
          style={menuButtonStyle}
        >
          <span>Regular Mocha</span>
          <span>$5.35</span>
        </button>

        <button
          onClick={() =>
            addItem("Large Mocha", 6.65, {
              allowMilk: true,
              allowLatteFlavors: false,
            })
          }
          style={menuButtonStyle}
        >
          <span>Large Mocha</span>
          <span>$6.65</span>
        </button>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Matcha</h2>

        <button
          onClick={() =>
            addItem("Regular Matcha", 5.0, {
              allowMilk: true,
              allowLatteFlavors: false,
            })
          }
          style={menuButtonStyle}
        >
          <span>Regular Matcha</span>
          <span>$5.00</span>
        </button>

        <button
          onClick={() =>
            addItem("Large Matcha", 6.0, {
              allowMilk: true,
              allowLatteFlavors: false,
            })
          }
          style={menuButtonStyle}
        >
          <span>Large Matcha</span>
          <span>$6.00</span>
        </button>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Americanos</h2>

        <button
          onClick={() =>
            addItem("Regular Americano", 3.75, {
              allowMilk: false,
              allowLatteFlavors: false,
            })
          }
          style={menuButtonStyle}
        >
          <span>Regular Americano</span>
          <span>$3.75</span>
        </button>

        <button
          onClick={() =>
            addItem("Large Americano", 4.75, {
              allowMilk: false,
              allowLatteFlavors: false,
            })
          }
          style={menuButtonStyle}
        >
          <span>Large Americano</span>
          <span>$4.75</span>
        </button>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Cappuccinos</h2>

        <button
          onClick={() =>
            addItem("Regular Cappuccino", 4.95, {
              allowMilk: true,
              allowLatteFlavors: false,
            })
          }
          style={menuButtonStyle}
        >
          <span>Regular Cappuccino</span>
          <span>$4.95</span>
        </button>

        <button
          onClick={() =>
            addItem("Large Cappuccino", 5.95, {
              allowMilk: true,
              allowLatteFlavors: false,
            })
          }
          style={menuButtonStyle}
        >
          <span>Large Cappuccino</span>
          <span>$5.95</span>
        </button>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Hot Chocolate</h2>

        <button
          onClick={() =>
            addItem("Regular Hot Chocolate", 3.5, {
              allowMilk: true,
              allowLatteFlavors: false,
            })
          }
          style={menuButtonStyle}
        >
          <span>Regular Hot Chocolate</span>
          <span>$3.50</span>
        </button>

        <button
          onClick={() =>
            addItem("Large Hot Chocolate", 4.5, {
              allowMilk: true,
              allowLatteFlavors: false,
            })
          }
          style={menuButtonStyle}
        >
          <span>Large Hot Chocolate</span>
          <span>$4.50</span>
        </button>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Chai</h2>

        <button
          onClick={() =>
            addItem("Regular Chai", 4.95, {
              allowMilk: true,
              allowLatteFlavors: false,
            })
          }
          style={menuButtonStyle}
        >
          <span>Regular Chai</span>
          <span>$4.95</span>
        </button>

        <button
          onClick={() =>
            addItem("Large Chai", 5.95, {
              allowMilk: true,
              allowLatteFlavors: false,
            })
          }
          style={menuButtonStyle}
        >
          <span>Large Chai</span>
          <span>$5.95</span>
        </button>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitle}>Frappes - 16 oz</h2>

        <button
          onClick={() =>
            addItem("Mocha Frappe 16 oz", 6.5, {
              allowMilk: false,
              allowLatteFlavors: false,
            })
          }
          style={menuButtonStyle}
        >
          <span>Mocha Frappe 16 oz</span>
          <span>$6.50</span>
        </button>

        <button
          onClick={() =>
            addItem("Caramel Frappe 16 oz", 6.5, {
              allowMilk: false,
              allowLatteFlavors: false,
            })
          }
          style={menuButtonStyle}
        >
          <span>Caramel Frappe 16 oz</span>
          <span>$6.50</span>
        </button>

        <button
          onClick={() =>
            addItem("Vanilla Frappe 16 oz", 6.5, {
              allowMilk: false,
              allowLatteFlavors: false,
            })
          }
          style={menuButtonStyle}
        >
          <span>Vanilla Frappe 16 oz</span>
          <span>$6.50</span>
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
                <div>{item.quantity} x {item.name}</div>

                <div style={orderRightStyle}>
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

            <hr style={dividerStyle} />
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax (6%): ${tax.toFixed(2)}</p>
            <p style={totalStyle}>Total: ${total.toFixed(2)}</p>
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
  maxWidth: "650px",
  margin: "0 auto",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};

const logoWrapStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "16px",
};

const logoStyle: React.CSSProperties = {
  borderRadius: "16px",
  objectFit: "contain",
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

const helperTextStyle: React.CSSProperties = {
  marginTop: "0",
  marginBottom: "12px",
  color: "#666",
  fontSize: "14px",
};

const sectionStyle: React.CSSProperties = {
  marginBottom: "22px",
  padding: "16px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  backgroundColor: "#fff",
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
  alignItems: "center",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  backgroundColor: "#f8f8f8",
  cursor: "pointer",
  fontSize: "16px",
};

const milkButtonStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  cursor: "pointer",
  fontSize: "16px",
};

const flavorButtonStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  cursor: "pointer",
  fontSize: "16px",
};

const clearButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  backgroundColor: "#efefef",
  cursor: "pointer",
  fontSize: "16px",
};

const orderRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
  gap: "10px",
};

const orderRightStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const removeButtonStyle: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#ddd",
  cursor: "pointer",
};

const dividerStyle: React.CSSProperties = {
  margin: "12px 0",
};

const totalStyle: React.CSSProperties = {
  fontWeight: "bold",
};

const placeOrderButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  marginTop: "16px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#222",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
};
