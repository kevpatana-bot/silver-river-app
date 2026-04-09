"use client";

import React, { useMemo, useState } from "react";

type MilkOption = {
  name: string;
  price: number;
};

type FlavorOption = {
  name: string;
  price: number;
};

type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  allowsMilk?: boolean;
  allowsFlavors?: boolean;
  defaultMilk?: string;
};

type CartItem = {
  uid: string;
  name: string;
  baseName: string;
  category: string;
  quantity: number;
  basePrice: number;
  milk?: string;
  milkUpcharge?: number;
  flavor?: string;
  flavorUpcharge?: number;
  notes?: string;
};

const TAX_RATE = 0.06;
const ORDER_PHONE = "9063704845";

const milkOptions: MilkOption[] = [
  { name: "Whole Milk", price: 0 },
  { name: "Oat Milk", price: 0.75 },
];

const flavorOptions: FlavorOption[] = [
  { name: "None", price: 0 },
  { name: "Vanilla", price: 0.5 },
  { name: "Caramel", price: 0.5 },
  { name: "Hazelnut", price: 0.5 },
  { name: "Coconut", price: 0.5 },
  { name: "Sugar-Free Caramel", price: 0.5 },
];

const menuItems: MenuItem[] = [
  { id: "espresso", name: "Espresso", category: "Espresso Favorites", price: 3.25 },
  { id: "americano", name: "Americano", category: "Espresso Favorites", price: 4.25 },
  { id: "cappuccino", name: "Cappuccino", category: "Espresso Favorites", price: 5.35, allowsMilk: true, allowsFlavors: true, defaultMilk: "Whole Milk" },
  { id: "latte", name: "Latte", category: "Espresso Favorites", price: 5.35, allowsMilk: true, allowsFlavors: true, defaultMilk: "Whole Milk" },
  { id: "cortado", name: "Cortado", category: "Espresso Favorites", price: 4.85, allowsMilk: true, allowsFlavors: true, defaultMilk: "Whole Milk" },
  { id: "red-eye", name: "Red Eye", category: "Espresso Favorites", price: 4.75 },
  { id: "mocha", name: "Mocha", category: "Espresso Favorites", price: 5.35, allowsMilk: true, allowsFlavors: true, defaultMilk: "Whole Milk" },
  { id: "flat-white", name: "Flat White", category: "Espresso Favorites", price: 5.35, allowsMilk: true, allowsFlavors: true, defaultMilk: "Whole Milk" },

  { id: "matcha", name: "Matcha", category: "Other Drinks", price: 5.00, allowsMilk: true, allowsFlavors: true, defaultMilk: "Whole Milk" },
  { id: "chai", name: "Chai", category: "Other Drinks", price: 5.00, allowsMilk: true, allowsFlavors: true, defaultMilk: "Whole Milk" },
  { id: "tea", name: "Tea", category: "Other Drinks", price: 2.50 },
  { id: "hot-chocolate", name: "Hot Chocolate", category: "Other Drinks", price: 4.00, allowsMilk: true, defaultMilk: "Whole Milk" },
  { id: "fresh-brewed-coffee", name: "Fresh Brewed Coffee", category: "Other Drinks", price: 2.75 },
  { id: "iced-coffee", name: "Iced Coffee", category: "Other Drinks", price: 3.50 },
  { id: "lemonade", name: "Lemonade", category: "Other Drinks", price: 3.50 },

  { id: "frappe-mocha", name: "16 oz Mocha Frappe", category: "Frappes", price: 6.00 },
  { id: "frappe-caramel", name: "16 oz Caramel Frappe", category: "Frappes", price: 6.00 },
  { id: "frappe-vanilla", name: "16 oz Vanilla Frappe", category: "Frappes", price: 6.00 },
];

const groupedMenu = menuItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
  if (!acc[item.category]) acc[item.category] = [];
  acc[item.category].push(item);
  return acc;
}, {});

function formatCurrency(value: number) {
  return `$${value.toFixed(2)}`;
}

function buildItemTotal(item: CartItem) {
  return (
    item.basePrice +
    (item.milkUpcharge || 0) +
    (item.flavorUpcharge || 0)
  ) * item.quantity;
}

export default function Page() {
  const [customerName, setCustomerName] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, { milk: string; flavor: string; notes: string }>>({});

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + buildItemTotal(item), 0),
    [cart]
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const addToCart = (item: MenuItem) => {
    const savedOptions = selectedOptions[item.id] || {
      milk: item.defaultMilk || "Whole Milk",
      flavor: "None",
      notes: "",
    };

    const selectedMilk = milkOptions.find((milk) => milk.name === savedOptions.milk);
    const selectedFlavor = flavorOptions.find((flavor) => flavor.name === savedOptions.flavor);

    const newItem: CartItem = {
      uid: `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: item.name,
      baseName: item.name,
      category: item.category,
      quantity: 1,
      basePrice: item.price,
      milk: item.allowsMilk ? savedOptions.milk : undefined,
      milkUpcharge: item.allowsMilk ? selectedMilk?.price || 0 : 0,
      flavor: item.allowsFlavors ? savedOptions.flavor : undefined,
      flavorUpcharge: item.allowsFlavors ? selectedFlavor?.price || 0 : 0,
      notes: savedOptions.notes?.trim() || undefined,
    };

    setCart((prev) => [...prev, newItem]);
  };

  const updateQuantity = (uid: string, change: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.uid === uid
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (uid: string) => {
    setCart((prev) => prev.filter((item) => item.uid !== uid));
  };

  const updateSelectedOption = (
    itemId: string,
    field: "milk" | "flavor" | "notes",
    value: string
  ) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [itemId]: {
        milk: prev[itemId]?.milk || "Whole Milk",
        flavor: prev[itemId]?.flavor || "None",
        notes: prev[itemId]?.notes || "",
        [field]: value,
      },
    }));
  };

  const submitOrder = () => {
    if (cart.length === 0) {
      alert("Please add at least one item to the order.");
      return;
    }

    const lines: string[] = [];
    lines.push("Silver River Bakery Order");
    lines.push("");
    lines.push(`Name: ${customerName || "Not provided"}`);
    lines.push(`Pickup Time: ${pickupTime || "Not provided"}`);

    if (orderNotes.trim()) {
      lines.push(`Order Notes: ${orderNotes.trim()}`);
    }

    lines.push("");
    lines.push("Items:");

    cart.forEach((item, index) => {
      lines.push(
        `${index + 1}. ${item.quantity} x ${item.baseName} - ${formatCurrency(
          item.basePrice
        )}`
      );
      if (item.milk) lines.push(`   Milk: ${item.milk}`);
      if (item.flavor && item.flavor !== "None") lines.push(`   Flavor: ${item.flavor}`);
      if (item.notes) lines.push(`   Item Notes: ${item.notes}`);
      const itemUnitTotal =
        item.basePrice + (item.milkUpcharge || 0) + (item.flavorUpcharge || 0);
      lines.push(`   Item Total: ${formatCurrency(itemUnitTotal * item.quantity)}`);
    });

    lines.push("");
    lines.push(`Subtotal: ${formatCurrency(subtotal)}`);
    lines.push(`Tax (6%): ${formatCurrency(tax)}`);
    lines.push(`Total: ${formatCurrency(total)}`);
    lines.push("");
    lines.push("Pay at pickup.");

    const smsBody = encodeURIComponent(lines.join("\n"));
    window.location.href = `sms:${ORDER_PHONE}?body=${smsBody}`;
  };

  return (
    <main className="min-h-screen bg-stone-100 text-stone-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <section className="rounded-3xl bg-white p-5 shadow-xl md:p-6">
            <div className="mb-6 rounded-3xl bg-gradient-to-r from-amber-900 via-amber-800 to-stone-800 p-6 text-white shadow-lg">
              <p className="text-sm uppercase tracking-[0.25em] text-amber-100">
                Silver River Bakery
              </p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">
                Don’t Forget Your Espresso!
              </h1>
              <p className="mt-3 max-w-2xl text-base text-amber-50 md:text-lg">
                Order ahead and pay at pickup.
              </p>
              <p className="mt-2 text-sm text-amber-100">
                Milk options now available: Whole Milk and Oat Milk only.
              </p>
            </div>

            <div className="space-y-8">
              {Object.entries(groupedMenu).map(([category, items]) => (
                <div key={category}>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-stone-800">{category}</h2>
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-900">
                      {items.length} items
                    </span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((item) => {
                      const optionState = selectedOptions[item.id] || {
                        milk: item.defaultMilk || "Whole Milk",
                        flavor: "None",
                        notes: "",
                      };

                      return (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-stone-200 bg-stone-50 p-4 shadow-sm"
                        >
                          <div className="mb-3 flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-xl font-semibold text-stone-900">{item.name}</h3>
                              {item.description ? (
                                <p className="mt-1 text-sm text-stone-600">{item.description}</p>
                              ) : null}
                            </div>
                            <div className="rounded-full bg-amber-900 px-3 py-1 text-sm font-bold text-white">
                              {formatCurrency(item.price)}
                            </div>
                          </div>

                          <div className="space-y-3">
                            {item.allowsMilk ? (
                              <div>
                                <label className="mb-1 block text-sm font-medium text-stone-700">
                                  Milk Choice
                                </label>
                                <select
                                  className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm"
                                  value={optionState.milk}
                                  onChange={(e) =>
                                    updateSelectedOption(item.id, "milk", e.target.value)
                                  }
                                >
                                  {milkOptions.map((milk) => (
                                    <option key={milk.name} value={milk.name}>
                                      {milk.name}
                                      {milk.price > 0 ? ` (+${formatCurrency(milk.price)})` : ""}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ) : null}

                            {item.allowsFlavors ? (
                              <div>
                                <label className="mb-1 block text-sm font-medium text-stone-700">
                                  Flavor
                                </label>
                                <select
                                  className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm"
                                  value={optionState.flavor}
                                  onChange={(e) =>
                                    updateSelectedOption(item.id, "flavor", e.target.value)
                                  }
                                >
                                  {flavorOptions.map((flavor) => (
                                    <option key={flavor.name} value={flavor.name}>
                                      {flavor.name}
                                      {flavor.price > 0 ? ` (+${formatCurrency(flavor.price)})` : ""}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ) : null}

                            <div>
                              <label className="mb-1 block text-sm font-medium text-stone-700">
                                Notes
                              </label>
                              <input
                                type="text"
                                className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm"
                                placeholder="Light ice, extra hot, etc."
                                value={optionState.notes}
                                onChange={(e) =>
                                  updateSelectedOption(item.id, "notes", e.target.value)
                                }
                              />
                            </div>

                            <button
                              onClick={() => addToCart(item)}
                              className="w-full rounded-2xl bg-amber-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
                            >
                              Add to Order
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="h-fit rounded-3xl bg-white p-5 shadow-xl md:p-6 lg:sticky lg:top-6">
            <h2 className="text-2xl font-bold text-stone-900">Your Order</h2>
            <p className="mt-1 text-sm text-stone-600">Pay at pickup</p>

            <div className="mt-5 space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 px-3 py-2"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">
                  Pickup Time
                </label>
                <input
                  type="text"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 px-3 py-2"
                  placeholder="Example: 10:15 AM"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">
                  Order Notes
                </label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="min-h-[90px] w-full rounded-xl border border-stone-300 px-3 py-2"
                  placeholder="Anything we should know?"
                />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {cart.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-4 text-sm text-stone-500">
                  No items yet.
                </div>
              ) : (
                cart.map((item) => {
                  const unitPrice =
                    item.basePrice +
                    (item.milkUpcharge || 0) +
                    (item.flavorUpcharge || 0);

                  return (
                    <div
                      key={item.uid}
                      className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-stone-900">{item.baseName}</h3>
                          <p className="text-sm text-stone-600">{formatCurrency(unitPrice)} each</p>
                          {item.milk ? (
                            <p className="mt-1 text-xs text-stone-600">Milk: {item.milk}</p>
                          ) : null}
                          {item.flavor && item.flavor !== "None" ? (
                            <p className="text-xs text-stone-600">Flavor: {item.flavor}</p>
                          ) : null}
                          {item.notes ? (
                            <p className="text-xs text-stone-600">Notes: {item.notes}</p>
                          ) : null}
                        </div>
                        <button
                          onClick={() => removeItem(item.uid)}
                          className="text-sm font-medium text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.uid, -1)}
                            className="h-9 w-9 rounded-full border border-stone-300 bg-white text-lg"
                          >
                            −
                          </button>
                          <span className="min-w-[24px] text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.uid, 1)}
                            className="h-9 w-9 rounded-full border border-stone-300 bg-white text-lg"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right font-semibold text-stone-900">
                          {formatCurrency(buildItemTotal(item))}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-6 rounded-2xl bg-stone-100 p-4">
              <div className="flex items-center justify-between text-sm text-stone-700">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-stone-700">
                <span>Tax (6%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-lg font-bold text-stone-900">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <button
              onClick={submitOrder}
              className="mt-6 w-full rounded-2xl bg-stone-900 px-4 py-3 text-base font-semibold text-white transition hover:bg-stone-800"
            >
              Text Order for Pickup
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
