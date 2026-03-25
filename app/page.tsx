+153
-142
Lines changed: 153 additions & 142 deletions
Original file line number	Diff line number	Diff line change
@@ -1,16 +1,53 @@
"use client";
import { useMemo, useState } from "react";
type OrderItem = {
  name: string;
  price: number;
};
export default function Home() {
  const sizeButtonStyle = {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const addItem = (name: string, price: number) => {
    setOrderItems((prev) => [...prev, { name, price }]);
  };
  const removeItem = (index: number) => {
    setOrderItems((prev) => prev.filter((_, i) => i !== index));
  };
  const clearOrder = () => {
    setOrderItems([]);
  };
  const total = useMemo(() => {
    return orderItems.reduce((sum, item) => sum + item.price, 0);
  }, [orderItems]);
  const textMessage = useMemo(() => {
    if (orderItems.length === 0) {
      return "Hi Silver River Bakery! I'd like to place an order.";
    }
    const lines = orderItems.map((item, index) => `${index + 1}. ${item.name} - $${item.price.toFixed(2)}`);
    return `Hi Silver River Bakery! I'd like to place an order:%0A%0A${lines.join("%0A")}%0A%0ATotal: $${total.toFixed(2)}`;
  }, [orderItems, total]);
  const menuButtonStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f7f3ef",
    padding: "14px 18px",
    marginBottom: "10px",
    borderRadius: "10px",
    textDecoration: "none",
    color: "#2b2b2b",
    fontSize: "18px",
    border: "1px solid #ddd",
    cursor: "pointer",
  } as const;

  const sectionTitle = {
@@ -20,20 +57,42 @@ export default function Home() {
    color: "#7a4b2a",
  } as const;

  const drinkTitle = {
  const itemTitle = {
    fontSize: "22px",
    fontWeight: "bold",
    marginTop: "24px",
    marginBottom: "10px",
    color: "#333",
  } as const;

  const actionButton = {
    display: "inline-block",
    backgroundColor: "#7a4b2a",
    color: "white",
    textDecoration: "none",
    padding: "14px 20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    marginRight: "10px",
    marginTop: "10px",
  } as const;
  const removeButton = {
    backgroundColor: "#eee",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "6px 10px",
    cursor: "pointer",
  } as const;
  return (
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "30px",
        maxWidth: "720px",
        maxWidth: "760px",
        margin: "0 auto",
        backgroundColor: "#fffdfb",
      }}
@@ -43,164 +102,116 @@ export default function Home() {
      </h1>

      <p style={{ fontSize: "20px", marginBottom: "25px", color: "#444" }}>
        Choose your drink size below to text your order
        Add multiple drinks to one order, then text it to us.
      </p>

      <h2 style={sectionTitle}>Espresso Menu</h2>
      <h2 style={sectionTitle}>Hot Drinks</h2>

      <div style={drinkTitle}>Latte</div>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Small%20Latte."
        style={sizeButtonStyle}
      >
      <div style={itemTitle}>Latte</div>
      <button onClick={() => addItem("Small Latte", 4.5)} style={menuButtonStyle}>
        <span>Small Latte</span>
        <span>$4.50</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Medium%20Latte."
        style={sizeButtonStyle}
      >
      </button>
      <button onClick={() => addItem("Medium Latte", 5.0)} style={menuButtonStyle}>
        <span>Medium Latte</span>
        <span>$5.00</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Large%20Latte."
        style={sizeButtonStyle}
      >
      </button>
      <button onClick={() => addItem("Large Latte", 5.5)} style={menuButtonStyle}>
        <span>Large Latte</span>
        <span>$5.50</span>
      </a>
      </button>

      <div style={drinkTitle}>Mocha</div>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Small%20Mocha."
        style={sizeButtonStyle}
      >
      <div style={itemTitle}>Mocha</div>
      <button onClick={() => addItem("Small Mocha", 5.0)} style={menuButtonStyle}>
        <span>Small Mocha</span>
        <span>$5.00</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Medium%20Mocha."
        style={sizeButtonStyle}
      >
      </button>
      <button onClick={() => addItem("Medium Mocha", 5.5)} style={menuButtonStyle}>
        <span>Medium Mocha</span>
        <span>$5.50</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Large%20Mocha."
        style={sizeButtonStyle}
      >
      </button>
      <button onClick={() => addItem("Large Mocha", 6.0)} style={menuButtonStyle}>
        <span>Large Mocha</span>
        <span>$6.00</span>
      </a>
      </button>

      <div style={drinkTitle}>Cappuccino</div>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Small%20Cappuccino."
        style={sizeButtonStyle}
      >
      <div style={itemTitle}>Cappuccino</div>
      <button onClick={() => addItem("Small Cappuccino", 4.5)} style={menuButtonStyle}>
        <span>Small Cappuccino</span>
        <span>$4.50</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Medium%20Cappuccino."
        style={sizeButtonStyle}
      >
      </button>
      <button onClick={() => addItem("Medium Cappuccino", 5.0)} style={menuButtonStyle}>
        <span>Medium Cappuccino</span>
        <span>$5.00</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Large%20Cappuccino."
        style={sizeButtonStyle}
      >
      </button>
      <button onClick={() => addItem("Large Cappuccino", 5.5)} style={menuButtonStyle}>
        <span>Large Cappuccino</span>
        <span>$5.50</span>
      </a>
      <div style={drinkTitle}>Americano</div>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Small%20Americano."
        style={sizeButtonStyle}
      >
        <span>Small Americano</span>
        <span>$3.50</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Medium%20Americano."
        style={sizeButtonStyle}
      >
        <span>Medium Americano</span>
        <span>$4.00</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Large%20Americano."
        style={sizeButtonStyle}
      >
        <span>Large Americano</span>
        <span>$4.50</span>
      </a>
      <div style={drinkTitle}>Cold Brew</div>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Small%20Cold%20Brew."
        style={sizeButtonStyle}
      >
        <span>Small Cold Brew</span>
        <span>$4.00</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Medium%20Cold%20Brew."
        style={sizeButtonStyle}
      >
        <span>Medium Cold Brew</span>
        <span>$4.50</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Large%20Cold%20Brew."
        style={sizeButtonStyle}
      >
        <span>Large Cold Brew</span>
        <span>$5.00</span>
      </a>
   <h2 style={sectionTitle}>Frapps (16 oz)</h2>
<a
  href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20a%2016oz%20Mocha%20Frapp."
  style={sizeButtonStyle}
>
  <span>Mocha Frapp</span>
  <span>$6.00</span>
</a>
<a
  href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20a%2016oz%20Caramel%20Frapp."
  style={sizeButtonStyle}
>
  <span>Caramel Frapp</span>
  <span>$6.00</span>
</a>
<a
  href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20a%2016oz%20Vanilla%20Frapp."
  style={sizeButtonStyle}
>
  <span>Vanilla Frapp</span>
  <span>$6.00</span>
</a>
<a
  href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20a%2016oz%20Hazelnut%20Frapp."
  style={sizeButtonStyle}
>
  <span>Hazelnut Frapp</span>
  <span>$6.00</span>
</a>
<a
  href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20a%2016oz%20White%20Chocolate%20Frapp."
  style={sizeButtonStyle}
>
  <span>White Chocolate Frapp</span>
  <span>$6.00</span>
</a>
      </button>
      <h2 style={sectionTitle}>Frapps (16 oz)</h2>
      <button onClick={() => addItem("Mocha Frapp 16 oz", 6.0)} style={menuButtonStyle}>
        <span>Mocha Frapp</span>
        <span>$6.00</span>
      </button>
      <button onClick={() => addItem("Caramel Frapp 16 oz", 6.0)} style={menuButtonStyle}>
        <span>Caramel Frapp</span>
        <span>$6.00</span>
      </button>
      <button onClick={() => addItem("Vanilla Frapp 16 oz", 6.0)} style={menuButtonStyle}>
        <span>Vanilla Frapp</span>
        <span>$6.00</span>
      </button>
      <h2 style={sectionTitle}>Your Order</h2>
      {orderItems.length === 0 ? (
        <p style={{ fontSize: "18px", color: "#666" }}>No items added yet.</p>
      ) : (
        <div>
          {orderItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <div style={{ fontSize: "18px" }}>{item.name}</div>
                <div style={{ color: "#666" }}>${item.price.toFixed(2)}</div>
              </div>
              <button onClick={() => removeItem(index)} style={removeButton}>
                Remove
              </button>
            </div>
          ))}
          <div style={{ marginTop: "15px", fontSize: "22px", fontWeight: "bold" }}>
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
      <div style={{ marginTop: "20px" }}>
        <a href={`sms:19063704846?body=${textMessage}`} style={actionButton}>
          Text My Order
        </a>
        <button onClick={clearOrder} style={actionButton}>
          Clear Order
        </button>
      </div>
      <section style={{ marginTop: "35px", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Order by Text</h2>
        <p style={{ fontSize: "18px", color: "#444" }}>
          Build your order above, then tap <strong>Text My Order</strong>.
        </p>
      </section>
    </main>
  );
}

   
