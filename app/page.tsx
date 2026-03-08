export default function Home() {
  const buttonStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f7f3ef",
    padding: "14px 18px",
    marginBottom: "10px",
    borderRadius: "10px",
    textDecoration: "none",
    color: "#2b2b2b",
    fontSize: "18px",
    border: "1px solid #ddd",
  } as const;

  const sectionTitle = {
    fontSize: "28px",
    marginTop: "30px",
    marginBottom: "15px",
    color: "#7a4b2a",
  } as const;

  const itemTitle = {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "20px",
    marginBottom: "8px",
  } as const;

  return (
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "30px",
        maxWidth: "720px",
        margin: "0 auto",
        backgroundColor: "#fffdfb",
      }}
    >
      <h1 style={{ fontSize: "42px", marginBottom: "10px", color: "#7a4b2a" }}>
        Silver River Bakery
      </h1>

      <p style={{ fontSize: "20px", marginBottom: "25px", color: "#444" }}>
        Tap a drink below to start a text order
      </p>

      <h2 style={sectionTitle}>Hot Drinks</h2>

      <div style={itemTitle}>Latte</div>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%20Small%20Latte."
        style={buttonStyle}
      >
        <span>Small Latte</span>
        <span>$4.50</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%20Medium%20Latte."
        style={buttonStyle}
      >
        <span>Medium Latte</span>
        <span>$5.00</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%20Large%20Latte."
        style={buttonStyle}
      >
        <span>Large Latte</span>
        <span>$5.50</span>
      </a>

      <div style={itemTitle}>Mocha</div>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%20Small%20Mocha."
        style={buttonStyle}
      >
        <span>Small Mocha</span>
        <span>$5.00</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%20Medium%20Mocha."
        style={buttonStyle}
      >
        <span>Medium Mocha</span>
        <span>$5.50</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%20Large%20Mocha."
        style={buttonStyle}
      >
        <span>Large Mocha</span>
        <span>$6.00</span>
      </a>

      <div style={itemTitle}>Cappuccino</div>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%20Small%20Cappuccino."
        style={buttonStyle}
      >
        <span>Small Cappuccino</span>
        <span>$4.50</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%20Medium%20Cappuccino."
        style={buttonStyle}
      >
        <span>Medium Cappuccino</span>
        <span>$5.00</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%20Large%20Cappuccino."
        style={buttonStyle}
      >
        <span>Large Cappuccino</span>
        <span>$5.50</span>
      </a>

      <div style={itemTitle}>Americano</div>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%20Small%20Americano."
        style={buttonStyle}
      >
        <span>Small Americano</span>
        <span>$3.50</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%20Medium%20Americano."
        style={buttonStyle}
      >
        <span>Medium Americano</span>
        <span>$4.00</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%20Large%20Americano."
        style={buttonStyle}
      >
        <span>Large Americano</span>
        <span>$4.50</span>
      </a>

      <h2 style={sectionTitle}>Iced Drinks</h2>

      <div style={itemTitle}>Iced Latte</div>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%20Small%20Iced%20Latte."
        style={buttonStyle}
      >
        <span>Small Iced Latte</span>
        <span>$4.75</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%20Medium%20Iced%20Latte."
        style={buttonStyle}
      >
        <span>Medium Iced Latte</span>
        <span>$5.25</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%20Large%20Iced%20Latte."
        style={buttonStyle}
      >
        <span>Large Iced Latte</span>
        <span>$5.75</span>
      </a>

      <div style={itemTitle}>Cold Brew</div>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%20Small%20Cold%20Brew."
        style={buttonStyle}
      >
        <span>Small Cold Brew</span>
        <span>$4.00</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%20Medium%20Cold%20Brew."
        style={buttonStyle}
      >
        <span>Medium Cold Brew</span>
        <span>$4.50</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%20Large%20Cold%20Brew."
        style={buttonStyle}
      >
        <span>Large Cold Brew</span>
        <span>$5.00</span>
      </a>

      <h2 style={sectionTitle}>Flavor Add-Ons</h2>

      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20Please%20add%20Vanilla%20to%20my%20drink."
        style={buttonStyle}
      >
        <span>Vanilla</span>
        <span>+$0.75</span>
      </a>

      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20Please%20add%20Caramel%20to%20my%20drink."
        style={buttonStyle}
      >
        <span>Caramel</span>
        <span>+$0.75</span>
      </a>

      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20Please%20add%20Hazelnut%20to%20my%20drink."
        style={buttonStyle}
      >
        <span>Hazelnut</span>
        <span>+$0.75</span>
      </a>

      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20Please%20add%20White%20Chocolate%20to%20my%20drink."
        style={buttonStyle}
      >
        <span>White Chocolate</span>
        <span>+$0.75</span>
      </a>

      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20Please%20add%20an%20Extra%20Shot%20to%20my%20drink."
        style={buttonStyle}
      >
        <span>Extra Shot</span>
        <span>+$1.00</span>
      </a>

      <section style={{ marginTop: "35px", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Order by Text</h2>
        <p style={{ fontSize: "18px", color: "#444" }}>
          Text your order to <strong>906-370-4846</strong>
        </p>
      </section>
    </main>
  );
}