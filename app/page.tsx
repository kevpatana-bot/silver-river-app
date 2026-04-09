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
  { id: "espresso", name: "Espresso", category: "Espresso Favorites", price: 1.75 },
  { id: "americano-regular", name: "Regular Americano", category: "Espresso Favorites", price: 3.50 },
  { id: "americano-large", name: "Large Americano", category: "Espresso Favorites", price: 4.15 },
  {
    id: "cappuccino",
    name: "Cappuccino",
    category: "Espresso Favorites",
    price: 4.35,
    allowsMilk: true,
    allowsFlavors: true,
    defaultMilk: "Whole Milk",
  },
  {
    id: "latte-regular",
    name: "Regular Latte",
    category: "Espresso Favorites",
    price: 5.35,
    allowsMilk: true,
    allowsFlavors: true,
    defaultMilk: "Whole Milk",
  },
  {
    id: "latte-large",
    name: "Large Latte",
    category: "Espresso Favorites",
    price: 6.65,
    allowsMilk: true,
    allowsFlavors: true,
    defaultMilk: "Whole Milk",
  },
  {
    id: "cortado",
    name: "Cortado",
    category: "Espresso Favorites",
    price: 4.35,
    allowsMilk: true,
    allowsFlavors: true,
    defaultMilk: "Whol
