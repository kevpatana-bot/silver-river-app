"use client";

import { useState } from "react";

type OrderItem = {
  name: string;
  price: number;
  milk: string;
};

export default function Home() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const addItem = (name: string, price: number) => {
    setOrderItems((prev) => [
      ...prev,
      { name, price, milk: "Regular" },
    ]);
  };

  const removeItem = (index: number) => {
    setOrderItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateMilk = (index: number, milk: string) => {
    setOrderItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, milk } : item
      )
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Silver River Bakery</h1>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button onClick={() => addItem("Latte", 4.75)}>Add Latte</button>
        <button onClick={() => addItem("Mocha", 5.25)}>Add Mocha</button>
      </div>

      <h2>Your Order</h2>

      {orderItems.map((item, index) => (
  <div key={index} style={{ marginBottom: 20 }}>
    <div>
      {item.name} - ${item.price.toFixed(2)}
    </div>

    <div style={{ marginTop: 8 }}>
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
      </button>{" "}
      <button onClick={() => updateMilk(index, "Oat Milk")}>
        Oat Milk
      </button>{" "}
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
    </div>

    <div>Milk: {item.milk}</div>

    <button onClick={() => removeItem(index)}>
      Remove
    </button>
  </div>
))}
        <div key={index} style={{ marginBottom: 20 }}>
          <div>
            {item.name} - $
{(
  item.price +
  (item.milk === "Oat Milk" || item.milk === "Almond" ? 0.75 : 0)
).toFixed(2)}
          </div>

          <div style={{ marginTop: 8, marginBottom: 8 }}>
            <button onClick={() => updateMilk(index, "Regular")}>
  Regular
</button>

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
<button onClick={() => updateMilk(index, "Almond")}>
  Almond (+0.75)
</button>
          </div>

          <div>Milk: {item.milk}</div>

          <button onClick={() => removeItem(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
