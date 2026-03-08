export default function Home() {
  return (
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "40px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
        Silver River Bakery
      </h1>

      <p style={{ fontSize: "20px", marginBottom: "30px" }}>
        Fresh pasties, espresso drinks, cinnamon rolls, and baked goods in L&apos;Anse, Michigan.
      </p>

     <section style={{ marginBottom: "30px" }}>
  <h2>Espresso Menu</h2>
  <ul style={{ lineHeight: "2", fontSize: "18px", listStyle: "none", padding: 0 }}>
    <li>Espresso - $3.00</li>
    <li>Americano - $3.50</li>
    <li>Latte - $4.50</li>
    <li>Cappuccino - $4.50</li>
    <li>Mocha - $5.00</li>
    <li>Caramel Macchiato - $5.25</li>
    <li>Vanilla Latte - $5.00</li>
    <li>White Chocolate Mocha - $5.25</li>
    <li>Cold Brew - $4.00</li>
    <li>Iced Latte - $4.75</li>
  </ul>
</section>

      <section style={{ marginBottom: "30px" }}>
        <h2>Order by Text</h2>
        <p style={{ fontSize: "18px" }}>
          Text your order to: <strong>(906) 370-4846</strong>
        </p>
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>Hours</h2>
        <p style={{ fontSize: "18px" }}>
          Open daily - Hours can be updated here
        </p>
      </section><a
  href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I%20would%20like%20to%20place%20an%20order."
  style={{
    display: "inline-block",
    backgroundColor: "#7a4b2a",
    color: "white",
    textDecoration: "none",
    border: "none",
    padding: "14px 24px",
    fontSize: "18px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Start Your Order
</a>

      
    </main>
  );
}