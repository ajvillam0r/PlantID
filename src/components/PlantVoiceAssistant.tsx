"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Mic, MicOff, Send, Volume2, X, MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";

interface PlantVoiceAssistantProps {
  className?: string;
  plantName?: string;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const PlantVoiceAssistant = ({
  className,
  plantName,
}: PlantVoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your plant care assistant. Ask me anything about caring for your plants.",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

  // Sample plant care knowledge base
  const plantCareKnowledge = [
    {
      keywords: ["water", "watering", "overwater", "underwater"],
      response:
        "Most houseplants should be watered when the top inch of soil feels dry. Succulents and cacti need less frequent watering, while tropical plants may need more. Always check the soil moisture before watering.",
    },
    {
      keywords: ["light", "sunlight", "bright", "shade", "window"],
      response:
        "Different plants have different light requirements. Most houseplants prefer bright, indirect light. Direct sunlight can burn leaves, while too little light can cause leggy growth and fewer leaves.",
    },
    {
      keywords: ["fertilize", "fertilizer", "feed", "nutrients"],
      response:
        "Most houseplants benefit from fertilizing during the growing season (spring and summer). Use a balanced houseplant fertilizer at half the recommended strength every 4-6 weeks.",
    },
    {
      keywords: ["repot", "repotting", "pot", "container"],
      response:
        "Repot plants when they become root-bound, typically every 1-2 years. Choose a pot that's 1-2 inches larger in diameter than the current one, and use fresh potting soil.",
    },
    {
      keywords: ["pest", "bugs", "insects", "mites", "aphids", "spider"],
      response:
        "Common houseplant pests include spider mites, aphids, and mealybugs. Treat with insecticidal soap, neem oil, or by wiping leaves with a mild soap solution. Regularly inspect plants to catch infestations early.",
    },
    {
      keywords: ["yellow", "brown", "spots", "wilting", "drooping"],
      response:
        "Yellowing leaves often indicate overwatering, while brown tips suggest underwatering or low humidity. Spots could be sunburn or fungal issues. Wilting may be due to water stress or root problems.",
    },
    {
      keywords: ["humidity", "mist", "dry air"],
      response:
        "Many tropical plants prefer higher humidity. Increase humidity by misting, using a humidifier, placing plants on pebble trays with water, or grouping plants together.",
    },
    {
      keywords: ["temperature", "cold", "hot", "draft"],
      response:
        "Most houseplants prefer temperatures between 65-75°F (18-24°C). Avoid placing plants near drafty windows, doors, or heating/cooling vents, as sudden temperature changes can stress plants.",
    },
    {
      keywords: ["propagate", "propagation", "cutting", "divide"],
      response:
        "Many plants can be propagated through stem cuttings placed in water or soil. Some plants can be divided at the roots. Spring and summer are usually the best times for propagation.",
    },
    {
      keywords: ["soil", "potting mix", "medium"],
      response:
        "Use well-draining potting mix appropriate for your plant type. Succulents need sandy, fast-draining soil, while tropical plants prefer richer soil that retains some moisture.",
    },
  ];

  // Initialize speech recognition
  useEffect(() => {
    if (
      (typeof window !== "undefined" && "SpeechRecognition" in window) ||
      "webkitSpeechRecognition" in window
    ) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join("");

        setTranscript(transcript);
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start();
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      recognitionRef.current?.stop();
    } else {
      setTranscript("");
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  const handleSendMessage = async () => {
    if (!transcript.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: transcript,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);
    setTranscript("");

    // Process the message and generate a response
    setTimeout(() => {
      const response = generateResponse(userMessage.text);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsProcessing(false);

      // Speak the response
      speakResponse(response);
    }, 1000);
  };

  const generateResponse = (query: string): string => {
    // Convert query to lowercase for easier matching
    const lowerQuery = query.toLowerCase();

    // Check for plant-specific queries if plantName is provided
    if (plantName) {
      const plantSpecificResponse = getPlantSpecificResponse(
        lowerQuery,
        plantName,
      );
      if (plantSpecificResponse) return plantSpecificResponse;
    }

    // Check against knowledge base
    for (const item of plantCareKnowledge) {
      if (item.keywords.some((keyword) => lowerQuery.includes(keyword))) {
        return item.response;
      }
    }

    // Default responses for common questions
    if (
      lowerQuery.includes("hello") ||
      lowerQuery.includes("hi") ||
      lowerQuery.includes("hey")
    ) {
      return "Hello! How can I help with your plants today?";
    }

    if (lowerQuery.includes("thank")) {
      return "You're welcome! Feel free to ask if you have any other plant care questions.";
    }

    if (
      lowerQuery.includes("who are you") ||
      lowerQuery.includes("what are you")
    ) {
      return "I'm your plant care voice assistant. I can answer questions about plant care, maintenance, and troubleshooting common issues.";
    }

    // Fallback response
    return "I'm not sure about that specific plant care question. Try asking about watering, light requirements, fertilizing, pests, or common plant problems.";
  };

  const getPlantSpecificResponse = (
    query: string,
    plantName: string,
  ): string | null => {
    const plantNameLower = plantName.toLowerCase();

    // Very basic plant-specific responses
    if (plantNameLower.includes("monstera")) {
      if (query.includes("water")) {
        return `Water your Monstera when the top 2-3 inches of soil are dry. This is typically every 1-2 weeks, but may vary based on your home's conditions.`;
      }
      if (query.includes("light")) {
        return `Monsteras prefer bright, indirect light. They can tolerate some direct morning sun but should be protected from harsh afternoon sunlight.`;
      }
    }

    if (
      plantNameLower.includes("snake plant") ||
      plantNameLower.includes("sansevieria")
    ) {
      if (query.includes("water")) {
        return `Snake plants are drought-tolerant. Water only when the soil is completely dry, typically every 3-4 weeks. Overwatering is the most common issue with these plants.`;
      }
      if (query.includes("light")) {
        return `Snake plants are adaptable to various light conditions, from low light to bright indirect light. They can even tolerate some direct sun.`;
      }
    }

    if (
      plantNameLower.includes("pothos") ||
      plantNameLower.includes("devil's ivy")
    ) {
      if (query.includes("water")) {
        return `Water your Pothos when the top inch of soil is dry. They're quite forgiving and can bounce back from occasional underwatering.`;
      }
      if (query.includes("light")) {
        return `Pothos can adapt to various light conditions, from low light to bright indirect light. However, they grow faster and have more variegation in brighter conditions.`;
      }
    }

    return null;
  };

  const speakResponse = (text: string) => {
    if (synth) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      synth.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synth) {
      synth.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className={className}>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Plant Voice Assistant</CardTitle>
              <CardDescription>
                Ask questions about plant care using your voice
              </CardDescription>
            </div>
            <MessageSquare className="h-5 w-5 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] overflow-y-auto mb-4 space-y-4 p-1">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                  <div className="flex space-x-1">
                    <div
                      className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="relative">
            <Input
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Ask a question about plant care..."
              className="pr-24"
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <div className="absolute right-1 top-1 flex space-x-1">
              {isSpeaking && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={stopSpeaking}
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              )}
              <Button
                size="icon"
                variant={isListening ? "destructive" : "secondary"}
                className="h-7 w-7"
                onClick={toggleListening}
              >
                {isListening ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
              <Button
                size="icon"
                variant="default"
                className="h-7 w-7"
                onClick={handleSendMessage}
                disabled={!transcript.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Suggested Questions</h3>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-accent"
                onClick={() =>
                  setTranscript("How often should I water my plants?")
                }
              >
                Watering frequency
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-accent"
                onClick={() =>
                  setTranscript("What's the best light for houseplants?")
                }
              >
                Light requirements
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-accent"
                onClick={() =>
                  setTranscript("How do I get rid of plant pests?")
                }
              >
                Pest control
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-accent"
                onClick={() =>
                  setTranscript("Why are my plant's leaves turning yellow?")
                }
              >
                Yellow leaves
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <p className="text-xs text-muted-foreground">
            Voice recognition works best in a quiet environment
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PlantVoiceAssistant;
