"use client";

import { useMemo, useState } from "react";

type OrderItem = {
  name: string;
  price: number;
  milk: string;
};
export default function Home() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const addItem = (name: string, price: number) => {
  setOrderItems((prev) => [...prev, { name, price, milk: "Regular" }]);
};
  const removeItem = (index: number) => {
    setOrderItems((prev) => prev.filter((_, i) => i !== index));
  };
  const updateMilk = (index: number, milk: string) => {
  setOrderItems((prev) =>
    prev.map((item, i) => (i === index ? { ...item, milk } : item))
  );
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

    );

    return `Hi Silver River Bakery! I'd like to place an order:%0A%0A${lines.join(
      "%0A"
    )}%0A%0ATotal: $${total.toFixed(2)}`;
  }, [orderItems, total]);
{orderItems.length === 0 ? (
  <p>No items added yet.</p>
) : (
  <div>
    {orderItems.map((item, index) => (
      <div
        key={index}
        style={{
          marginBottom: "16px",
          paddingBottom: "10px",
          borderBottom: "1px solid #eee",
        }}
      >
        <div>
          {item.name} - ${item.price.toFixed(2)}
        </div>

        <div style={{ marginTop: "6px" }}>
          <button
            onClick={() => updateMilk(index, "Regular")}
            style={{
              background: item.milk === "Regular" ? "#fbbf24" : "#fff",
              border: "1px solid #ccc",
              marginRight: "5px",
              padding: "4px 8px",
            }}
          >
            Regular
          </button>

          <button
            onClick={() => updateMilk(index, "Oat Milk")}
            style={{
              background: item.milk === "Oat Milk" ? "#fbbf24" : "#fff",
              border: "1px solid #ccc",
              marginRight: "5px",
              padding: "4px 8px",
            }}
          >
            Oat Milk (+0.75)
          </button>

          <button
            onClick={() => updateMilk(index, "Almond")}
            style={{
              background: item.milk === "Almond" ? "#fbbf24" : "#fff",
              border: "1px solid #ccc",
              marginRight: "5px",
              padding: "4px 8px",
            }}
          >
            Almond (+0.75)
          </button>
        </div>

        <div style={{ color: "#666", marginTop: "4px" }}>
          Milk: {item.milk}
        </div>

        <button onClick={() => removeItem(index)} style={removeButton}>
          Remove
        </button>
      </div>
    ))}

    <div style={{ marginTop: "10px" }}>
      Total: ${total.toFixed(2)}
    </div>
  </div>
)}
  <div>
    {orderItems.map((item, index) => (
      <div
        key={index}
        style={{
          marginBottom: "16px",
          paddingBottom: "10px",
          borderBottom: "1px solid #eee",
        }}
      >
        <div>
          {item.name} - ${item.price.toFixed(2)}
        </div>

        <div style={{ marginTop: "6px" }}>
          <button
            onClick={() => updateMilk(index, "Regular")}
            style={{
              background: item.milk === "Regular" ? "#fbbf24" : "#fff",
              border: "1px solid #ccc",
              marginRight: "5px",
              padding: "4px 8px",
            }}
          >
            Regular
          </button>

          <button
            onClick={() => updateMilk(index, "Oat Milk")}
            style={{
              background: item.milk === "Oat Milk" ? "#fbbf24" : "#fff",
              border: "1px solid #ccc",
              marginRight: "5px",
              padding: "4px 8px",
            }}
          >
            Oat Milk (+0.75)
          </button>

          <button
            onClick={() => updateMilk(index, "Almond")}
            style={{
              background: item.milk === "Almond" ? "#fbbf24" : "#fff",
              border: "1px solid #ccc",
              marginRight: "5px",
              padding: "4px 8px",
            }}
          >
            Almond (+0.75)
          </button>
        </div>

        <div style={{ color: "#666", marginTop: "4px" }}>
          Milk: {item.milk}
        </div>

        <button onClick={() => removeItem(index)} style={removeButton}>
          Remove
        </button>
      </div>
    ))}

    <div style={{ marginTop: "10px" }}>
      Total: ${total.toFixed(2)}
    </div>
  </div>
)}

  const menuButtonStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f7f3ef",
    padding: "14px 18px",
    marginBottom: "10px",
    borderRadius: "10px",
    color: "#2b2b2b",
    fontSize: "18px",
    border: "1px solid #ddd",
    cursor: "pointer",
  } as const;

  const sectionTitle = {
    fontSize: "26px",
    fontWeight: "bold",
    marginTop: "30px",
    marginBottom: "10px",
    color: "#7a4b2a",
  } as const;

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
    <main style={{ padding: "30px", maxWidth: "760px", margin: "0 auto" }}>
      <h1>Silver River Bakery</h1>

      <h2 style={sectionTitle}>Hot Drinks</h2>

      <div style={itemTitle}>Latte</div>
      <button onClick={() => addItem("Small Latte", 4.5)} style={menuButtonStyle}>
        <span>Small Latte</span>
        <span>$4.50</span>
      </button>
      <button onClick={() => addItem("Medium Latte", 5.0)} style={menuButtonStyle}>
        <span>Medium Latte</span>
        <span>$5.00</span>
      </button>
      <button onClick={() => addItem("Large Latte", 5.5)} style={menuButtonStyle}>
        <span>Large Latte</span>
        <span>$5.50</span>
      </button>

      <div style={itemTitle}>Mocha</div>
      <button onClick={() => addItem("Small Mocha", 5.0)} style={menuButtonStyle}>
        <span>Small Mocha</span>
        <span>$5.00</span>
      </button>
      <button onClick={() => addItem("Medium Mocha", 5.5)} style={menuButtonStyle}>
        <span>Medium Mocha</span>
        <span>$5.50</span>
      </button>
      <button onClick={() => addItem("Large Mocha", 6.0)} style={menuButtonStyle}>
        <span>Large Mocha</span>
        <span>$6.00</span>
      </button>

      <h2 style={sectionTitle}>Frapps (16 oz)</h2>

      <button onClick={() => addItem("Mocha Frapp", 6.0)} style={menuButtonStyle}>
        <span>Mocha Frapp</span>
        <span>$6.00</span>
      </button>
      <button onClick={() => addItem("Caramel Frapp", 6.0)} style={menuButtonStyle}>
        <span>Caramel Frapp</span>
        <span>$6.00</span>
      </button>

      <h2 style={sectionTitle}>Your Order</h2>

      {orderItems.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <div>
          {orderItems.map((item, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              {item.name} - ${item.price.toFixed(2)}
              <button onClick={() => removeItem(index)} style={removeButton}>
                Remove
              </button>
            </div>
          ))}

          <div style={{ marginTop: "10px" }}>
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
    </main>
  );
}
   
