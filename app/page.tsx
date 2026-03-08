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
        Fresh espresso drinks in L&apos;Anse, Michigan
      </p>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "8px" }}>
          Espresso Menu
        </h2>

        <div style={{ fontSize: "18px", lineHeight: "2.2" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Espresso</span>
            <span>$3.00</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Americano</span>
            <span>$3.50</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Latte</span>
            <span>$4.50</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Cappuccino</span>
            <span>$4.50</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Mocha</span>
            <span>$5.00</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Caramel Macchiato</span>
            <span>$5.25</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Vanilla Latte</span>
            <span>$5.00</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>White Chocolate Mocha</span>
            <span>$5.25</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Cold Brew</span>
            <span>$4.00</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Iced Latte</span>
            <span>$4.75</span>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>Order by Text</h2>
        <p style={{ fontSize: "18px" }}>
          Text your order to <strong>906-370-4846</strong>
        </p>
      </section>

      <a
        href="sms:19063704846?body=Hi%20Silver%20River%20Bakery!%20I'd%20like%20to%20order%20an%20espresso%20drink."
        style={{
          display: "inline-block",
          backgroundColor: "#7a4b2a",
          color: "white",
          textDecoration: "none",
          padding: "16px 28px",
          fontSize: "18px",
          borderRadius: "8px",
        }}
      >
        Start Your Order
      </a>
    </main>
  );
}