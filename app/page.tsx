"use client";

import { useMemo, useState } from "react";

type SyrupOption = "None" | "Vanilla" | "Caramel" | "Coconut" | "Hazelnut";

type OrderItem = {
  name: string;
  price: number;
  milk: string;
  extraShot: boolean;
  frappSyrup: SyrupOption;
};

export default function Home() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const addItem = (name: string, price: number) => {
    setOrderItems((prev) => [
      ...prev,
      {
        name,
        price,
        milk: "Regular",
        extraShot: false,
        frappSyrup: "None",
      },
    ]);
  };

  const removeItem = (index: number) => {
    setOrderItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateMilk = (index: number, milk: string) => {
    setOrderItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, milk } : item))
    );
  };

  const updateExtraShot = (index: number, extraShot: boolean) => {
    setOrderItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, extraShot } : item))
    );
  };

  const updateFrappSyrup = (index: number, frappSyrup: SyrupOption) => {
    setOrderItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, frappSyrup } : item))
    );
  };

  const clearOrder = () => {
    setOrderItems([]);
  };

  const isFrapp = (name: string) => name.toLowerCase().includes("frapp");

  const supportsMilk = (name: string) => {
    const lower = name.toLowerCase();
    return (
      lower.includes("latte") ||
      lower.includes("mocha") ||
      lower.includes("cappuccino") ||
      lower.includes("cortado") ||
      lower.includes("matcha") ||
      lower.includes("chai") ||
      lower.includes("frapp")
    );
  };

  const supportsExtraShot = (name: string) => {
    const lower = name.toLowerCase();
    return (
      lower.includes("latte") ||
      lower.includes("mocha") ||
      lower.includes("cappuccino") ||
      lower.includes("americano") ||
      lower.includes("cortado")
    );
  };

  const getItemTotal = (item: OrderItem) => {
    const milkUpcharge =
      item.milk === "Oat Milk" || item.milk === "Almond" ? 0.75 : 0;
    const shotUpcharge = item.extraShot ? 1.75 : 0;
    const syrupUpcharge = item.frappSyrup !== "None" ? 0.5 : 0;

    return item.price + milkUpcharge + shotUpcharge + syrupUpcharge;
  };

  const subtotal = useMemo(() => {
    return orderItems.reduce((sum, item) => sum + getItemTotal(item), 0);
  }, [orderItems]);

  const tax = useMemo(() => subtotal * 0.06, [subtotal]);

  const finalTotal = useMemo(() => subtotal + tax, [subtotal, tax]);

  const textMessage = useMemo(() => {
    if (orderItems.length === 0) {
      return "Hi Silver River Bakery! I'd like to place an order.";
    }

    const lines = orderItems.map((item, index) => {
      const details: string[] = [];

      if (supportsMilk(item.name)) {
        details.push(item.milk);
      }

      if (supportsExtraShot(item.name) && item.extraShot) {
        details.push("Extra Shot");
      }

      if (isFrapp(item.name) && item.frappSyrup !== "None") {
        details.push(`${item.frappSyrup} Syrup`);
      }

      const detailText = details.length ? ` (${details.join(", ")})` : "";

      return `${index + 1}. ${item.name}${detailText} - $${getItemTotal(item).toFixed(2)}`;
    });

    return `Hi Silver River Bakery! I'd like to place an order:%0A%0A${lines.join(
      "%0A"
    )}%0A%0ASubtotal: $${subtotal.toFixed(2)}%0ATax (6%): $${tax.toFixed(
      2
    )}%0ATotal: $${finalTotal.toFixed(2)}`;
  }, [orderItems, subtotal, tax, finalTotal]);

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
    textDecoration: "none",
  } as const;

  const removeButton = {
    backgroundColor: "#eee",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "6px 10px",
    cursor: "pointer",
    marginTop: "8px",
  } as const;

  const optionButtonStyle = (selected: boolean) =>
    ({
      background: selected ? "#fbbf24" : "#fff",
      border: "1px solid #ccc",
      marginRight: "5px",
      marginTop: "5px",
      padding: "4px 8px",
      borderRadius: "6px",
      cursor: "pointer",
    } as const);

  return (
    <main
      style={{
        padding: "30px",
        maxWidth: "760px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Silver River Bakery</h1>

      <h2 style={sectionTitle}> Drinks</h2>

     
      <div style={itemTitle}>Latte</div>
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
      <div style={itemTitle}>Mocha</div>

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

      <div style={itemTitle}>Cappuccino</div>
      <button onClick={() => addItem("Cappuccino", 4.35)} style={menuButtonStyle}>
        <span>Cappuccino</span>
        <span>$4.35</span>
      </button>

      <div style={itemTitle}>Americano</div>
      <button onClick={() => addItem("Americano", 3.5)} style={menuButtonStyle}>
        <span>Americano</span>
        <span>$3.50</span>
      </button>

      <div style={itemTitle}>Cortado</div>
      <button onClick={() => addItem("Cortado", 4.35)} style={menuButtonStyle}>
        <span>Cortado</span>
        <span>$4.35</span>
      </button>

      <div style={itemTitle}>Matcha</div>
      <button
        onClick={() => addItem("Regular Matcha", 5.0)}
        style={menuButtonStyle}
      >
        <span>Regular Matcha</span>
        <span>$5.00</span>
      </button>
      <button
        onClick={() => addItem("Large Matcha", 6.0)}
        style={menuButtonStyle}
      >
        <span>Large Matcha</span>
        <span>$6.00</span>
      </button>

      <div style={itemTitle}>Chai</div>
      <button
        onClick={() => addItem("Regular Chai", 4.35)}
        style={menuButtonStyle}
      >
        <span>Regular Chai</span>
        <span>$4.35</span>
      </button>
      <button
        onClick={() => addItem("Large Chai", 5.65)}
        style={menuButtonStyle}
      >
        <span>Large Chai</span>
        <span>$5.65</span>
      </button>

      <h2 style={sectionTitle}>Cold Drinks</h2>

      <div style={itemTitle}>Iced Tea</div>
      <button
        onClick={() => addItem("Regular Iced Tea", 3.95)}
        style={menuButtonStyle}
      >
        <span>Regular Iced Tea</span>
        <span>$3.95</span>
      </button>
      <button
        onClick={() => addItem("Large Iced Tea", 4.25)}
        style={menuButtonStyle}
      >
        <span>Large Iced Tea</span>
        <span>$4.25</span>
      </button>

      <div style={itemTitle}>Iced Coffee</div>
      <button
        onClick={() => addItem("Regular Iced Coffee", 3.95)}
        style={menuButtonStyle}
      >
        <span>Regular Iced Coffee</span>
        <span>$3.95</span>
      </button>
      <button
        onClick={() => addItem("Large Iced Coffee", 4.25)}
        style={menuButtonStyle}
      >
        <span>Large Iced Coffee</span>
        <span>$4.25</span>
      </button>

      <div style={itemTitle}>Lemonade</div>
      <button
        onClick={() => addItem("Regular Lemonade", 3.75)}
        style={menuButtonStyle}
      >
        <span>Regular Lemonade</span>
        <span>$3.75</span>
      </button>
      <button
        onClick={() => addItem("Large Lemonade", 4.25)}
        style={menuButtonStyle}
      >
        <span>Large Lemonade</span>
        <span>$4.25</span>
      </button>

      <h2 style={sectionTitle}>Frapps</h2>

      <button
        onClick={() => addItem("Mocha Frapp", 6.75)}
        style={menuButtonStyle}
      >
        <span>Mocha Frapp</span>
        <span>$6.75</span>
      </button>
      <button
        onClick={() => addItem("Caramel Frapp", 6.75)}
        style={menuButtonStyle}
      >
        <span>Caramel Frapp</span>
        <span>$6.75</span>
      </button>
      <button
        onClick={() => addItem("Vanilla Frapp", 6.75)}
        style={menuButtonStyle}
      >
        <span>Vanilla Frapp</span>
        <span>$6.75</span>
      </button>

      <h2 style={sectionTitle}>Your Order</h2>

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
                {item.name} - ${getItemTotal(item).toFixed(2)}
              </div>

              {supportsMilk(item.name) && (
                <div style={{ marginTop: "6px" }}>
                  <button
                    onClick={() => updateMilk(index, "Regular")}
                    style={optionButtonStyle(item.milk === "Regular")}
                  >
                    Regular
                  </button>

                  <button
                    onClick={() => updateMilk(index, "Oat Milk")}
                    style={optionButtonStyle(item.milk === "Oat Milk")}
                  >
                    Oat Milk (+0.75)
                  </button>

                  <button
                    onClick={() => updateMilk(index, "Almond")}
                    style={optionButtonStyle(item.milk === "Almond")}
                  >
                    Almond (+0.75)
                  </button>

                  <div style={{ color: "#666", marginTop: "4px" }}>
                    Milk: {item.milk}
                  </div>
                </div>
              )}

              {supportsExtraShot(item.name) && (
                <div style={{ marginTop: "8px" }}>
                  <button
                    onClick={() => updateExtraShot(index, false)}
                    style={optionButtonStyle(!item.extraShot)}
                  >
                    No Extra Shot
                  </button>

                  <button
                    onClick={() => updateExtraShot(index, true)}
                    style={optionButtonStyle(item.extraShot)}
                  >
                    Extra Shot (+1.75)
                  </button>
                </div>
              )}

              {isFrapp(item.name) && (
                <div style={{ marginTop: "8px" }}>
                  <div style={{ color: "#666", marginBottom: "4px" }}>
                    Frapp Syrup
                  </div>

                  <button
                    onClick={() => updateFrappSyrup(index, "None")}
                    style={optionButtonStyle(item.frappSyrup === "None")}
                  >
                    None
                  </button>
                  <button
                    onClick={() => updateFrappSyrup(index, "Vanilla")}
                    style={optionButtonStyle(item.frappSyrup === "Vanilla")}
                  >
                    Vanilla (+0.50)
                  </button>
                  <button
                    onClick={() => updateFrappSyrup(index, "Caramel")}
                    style={optionButtonStyle(item.frappSyrup === "Caramel")}
                  >
                    Caramel (+0.50)
                  </button>
                  <button
                    onClick={() => updateFrappSyrup(index, "Coconut")}
                    style={optionButtonStyle(item.frappSyrup === "Coconut")}
                  >
                    Coconut (+0.50)
                  </button>
                  <button
                    onClick={() => updateFrappSyrup(index, "Hazelnut")}
                    style={optionButtonStyle(item.frappSyrup === "Hazelnut")}
                  >
                    Hazelnut (+0.50)
                  </button>

                  <div style={{ color: "#666", marginTop: "4px" }}>
                    Syrup: {item.frappSyrup}
                  </div>
                </div>
              )}

              <button onClick={() => removeItem(index)} style={removeButton}>
                Remove
              </button>
            </div>
          ))}

          <div style={{ marginTop: "10px" }}>
            Subtotal: ${subtotal.toFixed(2)}
          </div>
          <div>Tax (6%): ${tax.toFixed(2)}</div>
          <div style={{ fontWeight: "bold", marginTop: "5px" }}>
            Total: ${finalTotal.toFixed(2)}
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
