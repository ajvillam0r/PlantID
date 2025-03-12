import { NextRequest, NextResponse } from "next/server";

interface HealthIssue {
  id: string;
  name: string;
  description: string;
  severity: "low" | "medium" | "high";
  symptoms: string[];
  treatment: string[];
  preventionTips: string[];
}

// Database of common plant health issues
const plantHealthIssues: Record<string, HealthIssue[]> = {
  leaf_spots: [
    {
      id: "leaf_spot_1",
      name: "Fungal Leaf Spot",
      description: "Fungal infection causing brown spots with yellow halos",
      severity: "medium",
      symptoms: [
        "Brown spots with yellow halos",
        "Spots may merge into larger lesions",
        "Affected leaves eventually turn yellow and drop",
      ],
      treatment: [
        "Remove and destroy affected leaves",
        "Apply fungicide according to package directions",
        "Ensure good air circulation around plants",
        "Avoid overhead watering",
      ],
      preventionTips: [
        "Water at the base of the plant",
        "Space plants properly for good air circulation",
        "Clean up fallen leaves and plant debris",
        "Use disease-resistant varieties when possible",
      ],
    },
    {
      id: "leaf_spot_2",
      name: "Bacterial Leaf Spot",
      description:
        "Bacterial infection causing water-soaked spots that turn brown or black",
      severity: "medium",
      symptoms: [
        "Water-soaked spots that turn brown or black",
        "Spots may have yellow halos",
        "Spots may appear angular, limited by leaf veins",
        "Leaves may develop holes as infected tissue dies and falls out",
      ],
      treatment: [
        "Remove and destroy affected leaves",
        "Apply copper-based bactericide",
        "Avoid overhead watering",
        "Provide good air circulation",
      ],
      preventionTips: [
        "Use disease-free seeds and plants",
        "Rotate crops in vegetable gardens",
        "Avoid working with plants when they're wet",
        "Disinfect garden tools between uses",
      ],
    },
  ],
  pests: [
    {
      id: "pest_1",
      name: "Spider Mites",
      description: "Tiny pests that cause stippling on leaves and fine webbing",
      severity: "high",
      symptoms: [
        "Fine webbing on undersides of leaves",
        "Tiny specks moving on the leaf surface",
        "Yellow or bronze stippling on leaves",
        "Leaves may curl, dry, and fall off",
      ],
      treatment: [
        "Spray plants with strong stream of water",
        "Apply insecticidal soap or neem oil",
        "For severe infestations, use miticide",
        "Repeat treatments every 7-10 days",
      ],
      preventionTips: [
        "Increase humidity around plants",
        "Regularly inspect plants for early signs",
        "Keep plants healthy and well-watered",
        "Introduce beneficial predators like ladybugs",
      ],
    },
    {
      id: "pest_2",
      name: "Aphids",
      description:
        "Small soft-bodied insects that cluster on new growth and undersides of leaves",
      severity: "medium",
      symptoms: [
        "Clusters of small insects on stems or leaf undersides",
        "Sticky honeydew on leaves or surfaces below",
        "Curled, distorted, or yellowing leaves",
        "Stunted growth",
      ],
      treatment: [
        "Spray with strong stream of water",
        "Apply insecticidal soap or neem oil",
        "Introduce beneficial insects like ladybugs",
        "For severe cases, use systemic insecticide",
      ],
      preventionTips: [
        "Regularly inspect plants",
        "Avoid excessive nitrogen fertilizer",
        "Keep area free of weeds that may harbor aphids",
        "Use reflective mulch in vegetable gardens",
      ],
    },
    {
      id: "pest_3",
      name: "Mealybugs",
      description:
        "White, cottony insects that cluster in leaf axils and undersides",
      severity: "medium",
      symptoms: [
        "White, cottony masses in leaf axils or undersides",
        "Sticky honeydew and sooty mold",
        "Yellowing leaves",
        "Stunted or distorted growth",
      ],
      treatment: [
        "Remove with cotton swab dipped in alcohol",
        "Apply insecticidal soap or neem oil",
        "For severe infestations, use systemic insecticide",
        "Repeat treatments weekly until controlled",
      ],
      preventionTips: [
        "Inspect new plants before bringing indoors",
        "Avoid overwatering and overfertilizing",
        "Maintain good air circulation",
        "Quarantine affected plants",
      ],
    },
  ],
  watering_issues: [
    {
      id: "water_1",
      name: "Overwatering",
      description: "Excessive water causing root rot and yellowing leaves",
      severity: "high",
      symptoms: [
        "Yellowing leaves throughout the plant",
        "Soft, mushy stems near soil line",
        "Wilting despite moist soil",
        "Moldy soil surface",
      ],
      treatment: [
        "Reduce watering frequency",
        "Ensure pot has drainage holes",
        "Repot in fresh, well-draining soil if necessary",
        "Remove affected roots when repotting",
      ],
      preventionTips: [
        "Water only when top inch of soil is dry",
        "Use well-draining soil mix",
        "Choose pots with drainage holes",
        "Adjust watering schedule seasonally",
      ],
    },
    {
      id: "water_2",
      name: "Underwatering",
      description: "Insufficient water causing wilting and dry, crispy leaves",
      severity: "medium",
      symptoms: [
        "Dry, crispy leaf edges or tips",
        "Wilting or drooping",
        "Slow growth",
        "Soil pulling away from sides of pot",
      ],
      treatment: [
        "Water thoroughly until water drains from bottom",
        "For severely dry soil, soak pot in water for 30 minutes",
        "Trim away dead, crispy leaves",
        "Establish regular watering schedule",
      ],
      preventionTips: [
        "Check soil moisture regularly",
        "Use reminder app for watering schedule",
        "Consider self-watering pots for consistent moisture",
        "Adjust watering frequency based on season and environment",
      ],
    },
  ],
  nutrient_deficiencies: [
    {
      id: "nutrient_1",
      name: "Nitrogen Deficiency",
      description: "Lack of nitrogen causing yellowing of older leaves",
      severity: "medium",
      symptoms: [
        "Yellowing of older, lower leaves",
        "Stunted growth",
        "Pale green color throughout plant",
        "Early leaf drop",
      ],
      treatment: [
        "Apply balanced fertilizer with higher first number (N-P-K)",
        "For quick results, use water-soluble nitrogen fertilizer",
        "Add compost or organic matter to soil",
        "Follow package directions for application rates",
      ],
      preventionTips: [
        "Regular fertilizing during growing season",
        "Use slow-release fertilizers for consistent feeding",
        "Add compost to soil annually",
        "Avoid overwatering which can leach nutrients",
      ],
    },
    {
      id: "nutrient_2",
      name: "Iron Chlorosis",
      description: "Iron deficiency causing yellowing leaves with green veins",
      severity: "medium",
      symptoms: [
        "Yellowing leaves with green veins (interveinal chlorosis)",
        "Symptoms appear on new growth first",
        "Stunted growth",
        "In severe cases, leaves may turn white and drop",
      ],
      treatment: [
        "Apply iron chelate or iron sulfate to soil",
        "For quick results, use foliar spray with iron",
        "Adjust soil pH if too high (alkaline)",
        "In containers, repot with fresh soil containing iron",
      ],
      preventionTips: [
        "Test and maintain proper soil pH (most plants prefer 6.0-7.0)",
        "Use acidifying fertilizers for acid-loving plants",
        "Add organic matter to improve nutrient availability",
        "Avoid overwatering which can lead to poor nutrient uptake",
      ],
    },
  ],
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image") as File;
    const plantType = (formData.get("plantType") as string) || "unknown";
    const symptoms = (formData.get("symptoms") as string) || "";

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // In a real implementation, this would use AI to analyze the image
    // For this demo, we'll return predefined issues based on symptoms mentioned

    let detectedIssues: HealthIssue[] = [];

    // Simple keyword matching for demo purposes
    const symptomsLower = symptoms.toLowerCase();

    if (
      symptomsLower.includes("spot") ||
      symptomsLower.includes("brown") ||
      symptomsLower.includes("yellow spot")
    ) {
      detectedIssues = [...detectedIssues, ...plantHealthIssues.leaf_spots];
    }

    if (
      symptomsLower.includes("web") ||
      symptomsLower.includes("bug") ||
      symptomsLower.includes("insect") ||
      symptomsLower.includes("pest")
    ) {
      detectedIssues = [...detectedIssues, ...plantHealthIssues.pests];
    }

    if (
      symptomsLower.includes("wilt") ||
      symptomsLower.includes("drooping") ||
      symptomsLower.includes("overwater") ||
      symptomsLower.includes("dry")
    ) {
      detectedIssues = [
        ...detectedIssues,
        ...plantHealthIssues.watering_issues,
      ];
    }

    if (
      symptomsLower.includes("yellow leaf") ||
      symptomsLower.includes("pale") ||
      symptomsLower.includes("deficiency")
    ) {
      detectedIssues = [
        ...detectedIssues,
        ...plantHealthIssues.nutrient_deficiencies,
      ];
    }

    // If no specific symptoms matched or no symptoms provided, return a sampling of issues
    if (detectedIssues.length === 0) {
      detectedIssues = [
        plantHealthIssues.leaf_spots[0],
        plantHealthIssues.pests[0],
        plantHealthIssues.watering_issues[0],
      ];
    }

    // Limit to 3 most relevant issues
    detectedIssues = detectedIssues.slice(0, 3);

    return NextResponse.json({
      success: true,
      issues: detectedIssues,
    });
  } catch (error) {
    console.error("Error in plant health diagnosis:", error);
    return NextResponse.json(
      { error: "Failed to process the image" },
      { status: 500 },
    );
  }
}
