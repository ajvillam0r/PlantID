import { NextRequest, NextResponse } from "next/server";

// This would connect to a database in a real application
const rarePlants = [
  {
    id: "1",
    plantName: "Variegated Monstera",
    scientificName: "Monstera deliciosa 'Variegata'",
    rarity: "rare",
    price: "$250-500",
    nurseries: [
      {
        name: "Rare Roots Nursery",
        location: "San Francisco, CA",
        available: true,
      },
      { name: "Leaf & Stem", location: "Oakland, CA", available: false },
    ],
  },
  {
    id: "2",
    plantName: "Pink Princess Philodendron",
    scientificName: "Philodendron erubescens 'Pink Princess'",
    rarity: "rare",
    price: "$150-300",
    nurseries: [
      {
        name: "Rare Roots Nursery",
        location: "San Francisco, CA",
        available: false,
      },
      { name: "Plant Haven", location: "Berkeley, CA", available: true },
    ],
  },
  {
    id: "3",
    plantName: "Thai Constellation",
    scientificName: "Monstera deliciosa 'Thai Constellation'",
    rarity: "very-rare",
    price: "$350-700",
    nurseries: [
      { name: "Exotic Greens", location: "San Jose, CA", available: true },
    ],
  },
  {
    id: "4",
    plantName: "White Wizard Philodendron",
    scientificName: "Philodendron erubescens 'White Wizard'",
    rarity: "very-rare",
    price: "$200-400",
    nurseries: [],
  },
  {
    id: "5",
    plantName: "Monstera Obliqua",
    scientificName: "Monstera obliqua",
    rarity: "endangered",
    price: "$800-1500",
    nurseries: [],
  },
  {
    id: "6",
    plantName: "Philodendron Spiritus Sancti",
    scientificName: "Philodendron spiritus-sancti",
    rarity: "endangered",
    price: "$5000+",
    nurseries: [],
  },
];

export async function GET(request: NextRequest) {
  // Get search query from URL
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const location = searchParams.get("location") || "San Francisco, CA";

  let results = [...rarePlants];

  // Filter by search query if provided
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(
      (plant) =>
        plant.plantName.toLowerCase().includes(lowerQuery) ||
        plant.scientificName.toLowerCase().includes(lowerQuery),
    );
  }

  return NextResponse.json(results);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // In a real app, this would save to a database
    // For now, just return success with the data
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 400 },
    );
  }
}
