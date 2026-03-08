export default function Home() {
  const sizeButtonStyle = {
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

  const drinkTitle = {
    fontSize: "22px",
    fontWeight: "bold",
    marginTop: "24px",
    marginBottom: "10px",
    color: "#333",
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
        Choose your drink size below to text your order
      </p>

      <h2 style={sectionTitle}>Espresso Menu</h2>

      <div style={drinkTitle}>Latte</div>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Small%20Latte."
        style={sizeButtonStyle}
      >
        <span>Small Latte</span>
        <span>$4.50</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Medium%20Latte."
        style={sizeButtonStyle}
      >
        <span>Medium Latte</span>
        <span>$5.00</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Large%20Latte."
        style={sizeButtonStyle}
      >
        <span>Large Latte</span>
        <span>$5.50</span>
      </a>

      <div style={drinkTitle}>Mocha</div>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Small%20Mocha."
        style={sizeButtonStyle}
      >
        <span>Small Mocha</span>
        <span>$5.00</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Medium%20Mocha."
        style={sizeButtonStyle}
      >
        <span>Medium Mocha</span>
        <span>$5.50</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Large%20Mocha."
        style={sizeButtonStyle}
      >
        <span>Large Mocha</span>
        <span>$6.00</span>
      </a>

      <div style={drinkTitle}>Cappuccino</div>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Small%20Cappuccino."
        style={sizeButtonStyle}
      >
        <span>Small Cappuccino</span>
        <span>$4.50</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Medium%20Cappuccino."
        style={sizeButtonStyle}
      >
        <span>Medium Cappuccino</span>
        <span>$5.00</span>
      </a>
      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%27d%20like%20to%20order%20a%20Large%20Cappuccino."
        style={sizeButtonStyle}
      >
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

      <section style={{ marginTop: "35px", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}><h2 style={sectionTitle}>Frapps (16 oz)</h2>

<h2 style={sectionTitle}>Frapps (16 oz)</h2>

<a
  href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%2016oz%20Mocha%20Frapp."
  style={sizeButtonStyle}
>
  <span>Mocha Frapp</span>
  <span>$6.00</span>
</a>

<a
  href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%2016oz%20Caramel%20Frapp."
  style={sizeButtonStyle}
>
  <span>Caramel Frapp</span>
  <span>$6.00</span>
</a>

<a
  href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20a%2016oz%20Vanilla%20Frapp."
  style={sizeButtonStyle}
>
  <span>Vanilla Frapp</span>
  <span>$6.00</span>
</a>