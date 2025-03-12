import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 },
      );
    }

    // Convert the file to base64
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    // Prepare the request to Gemini API
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: 'Identify this plant and provide detailed care instructions including watering needs, sunlight requirements, and soil preferences. Format the response as JSON with the following structure: {"plantName": string, "scientificName": string, "confidence": number, "details": [{"label": string, "value": string}], "tags": [string], "careInstructions": [{"category": string, "value": string, "description": string}]}',
                },
                {
                  inline_data: {
                    mime_type: imageFile.type,
                    data: base64Image,
                  },
                },
              ],
            },
          ],
          generation_config: {
            temperature: 0.4,
            top_p: 0.95,
            top_k: 0,
            max_output_tokens: 2048,
          },
        }),
      },
    );

    const data = await response.json();

    // Extract the text response from Gemini
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textResponse) {
      return NextResponse.json(
        { error: "Failed to get a valid response from Gemini API" },
        { status: 500 },
      );
    }

    // Try to parse the JSON response from the text
    try {
      // Find JSON in the response (it might be surrounded by markdown code blocks)
      const jsonMatch = textResponse.match(/```json\n([\s\S]*?)\n```/) ||
        textResponse.match(/```([\s\S]*?)```/) || [null, textResponse];

      const jsonStr = jsonMatch[1].trim();
      const plantData = JSON.parse(jsonStr);

      return NextResponse.json(plantData);
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      return NextResponse.json(
        {
          error: "Failed to parse plant identification data",
          rawResponse: textResponse,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error in plant identification:", error);
    return NextResponse.json(
      { error: "Failed to process the image" },
      { status: 500 },
    );
  }
}
