"use client";

import { useMemo, useState } from "react";

const drinks = [
  { name: "Latte", price: 4.5 },
  { name: "Cappuccino", price: 4.5 },
  { name: "Americano", price: 3.5 },
  { name: "Mocha", price: 5.0 },
  { name: "Caramel Latte", price: 5.25 },
  { name: "Vanilla Latte", price: 5.25 },
];

const sizes = [
  { name: "12 oz", price: 0 },
  { name: "16 oz", price: 0.5 },
  { name: "20 oz", price: 1.0 },
];

const milkOptions = [
  { name: "Whole Milk", price: 0 },
  { name: "Oat Milk", price: 0.75 },
  { name: "Almond Milk", price: 0.75 },
];

const addOnsList = [
  { name: "Extra Shot", price: 1.0 },
  { name: "Whipped Cream", price: 0.5 },
  { name: "Extra Syrup", price: 0.5 },
  { name: "Cold Foam", price: 1.0 },
];

export default function OrderPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupTime, setPickupTime] = useState("ASAP");
  const [drink, setDrink] = useState("Latte");
  const [size, setSize] = useState("16 oz");
  const [milk, setMilk] = useState("Whole Milk");
  const [instructions, setInstructions] = useState("");
  const [addOns, setAddOns] = useState<string[]>([]);

  function toggleAddOn(item: string) {
    setAddOns((prev) =>
      prev.includes(item)
        ? prev.filter((x) => x !== item)
        : [...prev, item]
    );
  }

  const total = useMemo(() => {
    const drinkPrice = drinks.find((d) => d.name === drink)?.price ?? 0;
    const sizePrice = sizes.find((s) => s.name === size)?.price ?? 0;
    const milkPrice = milkOptions.find((m) => m.name === milk)?.price ?? 0;
    const addOnPrice = addOns.reduce((sum, addOn) => {
      const item = addOnsList.find((a) => a.name === addOn);
      return sum + (item?.price ?? 0);
    }, 0);

    return (drinkPrice + sizePrice + milkPrice + addOnPrice).toFixed(2);
  }, [drink, size, milk, addOns]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const message = `Silver River Bakery Espresso Order

Name: ${name}
Phone: ${phone}
Pickup: ${pickupTime}
Drink: ${drink}
Size: ${size}
Milk: ${milk}
Add-Ons: ${addOns.length ? addOns.join(", ") : "None"}
Instructions: ${instructions || "None"}
Total: $${total}`;

    const smsLink = `sms:9063704845?body=${encodeURIComponent(message)}`;
    window.location.href = smsLink;
  }

  return (
    <main style={pageStyle}>
      <div style={phoneShellStyle}>
        <div style={heroStyle}>
          <div style={badgeStyle}>Silver River Bakery</div>
          <h1 style={titleStyle}>Espresso Orders</h1>
          <p style={subtitleStyle}>Fresh coffee, fast pickup.</p>
          <p style={contactStyle}>
            Questions? Call or text <strong>906-370-4845</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <section style={cardStyle}>
            <h2 style={sectionTitleStyle}>Your Info</h2>

            <label style={labelStyle}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              style={inputStyle}
              required
            />

            <label style={labelStyle}>Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone number"
              style={inputStyle}
              required
            />

            <label style={labelStyle}>Pickup Time</label>
            <select
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              style={inputStyle}
            >
              <option>ASAP</option>
              <option>In 10 minutes</option>
              <option>In 20 minutes</option>
              <option>In 30 minutes</option>
              <option>Later today</option>
            </select>
          </section>

          <section style={cardStyle}>
            <h2 style={sectionTitleStyle}>Choose Your Drink</h2>
            <div style={gridStyle}>
              {drinks.map((item) => {
                const selected = drink === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setDrink(item.name)}
                    style={{
                      ...choiceCardStyle,
                      ...(selected ? selectedChoiceStyle : {}),
                    }}
                  >
                    <span style={choiceTitleStyle}>{item.name}</span>
                    <span style={choicePriceStyle}>${item.price.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section style={cardStyle}>
            <h2 style={sectionTitleStyle}>Size</h2>
            <div style={pillRowStyle}>
              {sizes.map((item) => {
                const selected = size === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setSize(item.name)}
                    style={{
                      ...pillStyle,
                      ...(selected ? selectedPillStyle : {}),
                    }}
                  >
                    {item.name}
                    {item.price > 0 ? ` (+$${item.price.toFixed(2)})` : ""}
                  </button>
                );
              })}
            </div>
          </section>

          <section style={cardStyle}>
            <h2 style={sectionTitleStyle}>Milk</h2>
            <div style={pillRowStyle}>
              {milkOptions.map((item) => {
                const selected = milk === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setMilk(item.name)}
                    style={{
                      ...pillStyle,
                      ...(selected ? selectedPillStyle : {}),
                    }}
                  >
                    {item.name}
                    {item.price > 0 ? ` (+$${item.price.toFixed(2)})` : ""}
                  </button>
                );
              })}
            </div>
          </section>

          <section style={cardStyle}>
            <h2 style={sectionTitleStyle}>Add-Ons</h2>
            <div style={gridStyle}>
              {addOnsList.map((item) => {
                const selected = addOns.includes(item.name);
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => toggleAddOn(item.name)}
                    style={{
                      ...choiceCardStyle,
                      ...(selected ? selectedChoiceStyle : {}),
                    }}
                  >
                    <span style={choiceTitleStyle}>{item.name}</span>
                    <span style={choicePriceStyle}>+${item.price.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section style={cardStyle}>
            <h2 style={sectionTitleStyle}>Special Instructions</h2>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Extra hot, less sweet, light ice, etc."
              style={textAreaStyle}
            />
          </section>

          <section style={summaryCardStyle}>
            <div style={summaryRowStyle}>
              <span style={summaryLabelStyle}>Drink</span>
              <span style={summaryValueStyle}>{drink}</span>
            </div>
            <div style={summaryRowStyle}>
              <span style={summaryLabelStyle}>Size</span>
              <span style={summaryValueStyle}>{size}</span>
            </div>
            <div style={summaryRowStyle}>
              <span style={summaryLabelStyle}>Milk</span>
              <span style={summaryValueStyle}>{milk}</span>
            </div>
            <div style={summaryRowStyle}>
              <span style={summaryLabelStyle}>Add-Ons</span>
              <span style={summaryValueStyle}>
                {addOns.length ? addOns.join(", ") : "None"}
              </span>
            </div>
            <div style={{ ...summaryRowStyle, marginTop: 8, fontWeight: 700 }}>
              <span style={{ fontSize: 18 }}>Total</span>
              <span style={{ fontSize: 22 }}>${total}</span>
            </div>

            <button type="submit" style={submitButtonStyle}>
              Text My Order
            </button>
          </section>
        </form>
      </div>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background:
    "linear-gradient(180deg, #f4ede5 0%, #efe4d8 45%, #eadbcc 100%)",
  padding: "20px 14px 40px",
  fontFamily: "Arial, sans-serif",
};

const phoneShellStyle: React.CSSProperties = {
  maxWidth: 520,
  margin: "0 auto",
};

const heroStyle: React.CSSProperties = {
  padding: "12px 8px 20px",
  textAlign: "center",
};

const badgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 14px",
  borderRadius: 999,
  backgroundColor: "#ffffffcc",
  color: "#6a4b3a",
  fontSize: 13,
  fontWeight: 700,
  marginBottom: 12,
  border: "1px solid #ead8ca",
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 34,
  lineHeight: 1.1,
  color: "#2f2119",
};

const subtitleStyle: React.CSSProperties = {
  margin: "8px 0 6px",
  color: "#6c5a50",
  fontSize: 16,
};

const contactStyle: React.CSSProperties = {
  margin: 0,
  color: "#6c5a50",
  fontSize: 14,
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#fffaf5",
  borderRadius: 22,
  padding: 18,
  boxShadow: "0 10px 24px rgba(75, 49, 31, 0.08)",
  border: "1px solid #efdfd1",
};

const summaryCardStyle: React.CSSProperties = {
  backgroundColor: "#4e3428",
  color: "#fff",
  borderRadius: 22,
  padding: 20,
  boxShadow: "0 12px 26px rgba(78, 52, 40, 0.2)",
};

const sectionTitleStyle: React.CSSProperties = {
  margin: "0 0 14px",
  fontSize: 20,
  color: "#2f2119",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: 6,
  marginTop: 12,
  fontSize: 14,
  fontWeight: 700,
  color: "#4b382d",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 14px",
  borderRadius: 14,
  border: "1px solid #ddc9ba",
  backgroundColor: "#fff",
  fontSize: 16,
  boxSizing: "border-box",
  outline: "none",
};

const textAreaStyle: React.CSSProperties = {
  width: "100%",
  minHeight: 100,
  padding: "14px 14px",
  borderRadius: 14,
  border: "1px solid #ddc9ba",
  backgroundColor: "#fff",
  fontSize: 16,
  boxSizing: "border-box",
  resize: "vertical",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const choiceCardStyle: React.CSSProperties = {
  border: "1px solid #e7d5c8",
  borderRadius: 18,
  padding: "14px 12px",
  backgroundColor: "#fff",
  textAlign: "left",
  cursor: "pointer",
};

const selectedChoiceStyle: React.CSSProperties = {
  backgroundColor: "#6a4534",
  color: "#fff",
  border: "1px solid #6a4534",
};

const choiceTitleStyle: React.CSSProperties = {
  display: "block",
  fontWeight: 700,
  fontSize: 15,
  marginBottom: 6,
};

const choicePriceStyle: React.CSSProperties = {
  fontSize: 14,
  opacity: 0.9,
};

const pillRowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
};

const pillStyle: React.CSSProperties = {
  border: "1px solid #dcc7b8",
  backgroundColor: "#fff",
  borderRadius: 999,
  padding: "12px 14px",
  fontSize: 14,
  cursor: "pointer",
};

const selectedPillStyle: React.CSSProperties = {
  backgroundColor: "#6a4534",
  color: "#fff",
  border: "1px solid #6a4534",
};

const summaryRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  marginBottom: 10,
};

const summaryLabelStyle: React.CSSProperties = {
  color: "#ddc5b7",
  fontSize: 14,
};

const summaryValueStyle: React.CSSProperties = {
  textAlign: "right",
  fontSize: 14,
};

const submitButtonStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 16,
  padding: "16px 18px",
  border: "none",
  borderRadius: 16,
  backgroundColor: "#f6c56f",
  color: "#3a261c",
  fontSize: 17,
  fontWeight: 700,
  cursor: "pointer",
};
