"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const VIBES = [
  { id: "rooftop", label: "Rooftop Bars" },
  { id: "jazz", label: "Jazz & Live Music" },
  { id: "lounge", label: "Cocktail Lounges" },
  { id: "club", label: "Nightclubs" },
  { id: "speakeasy", label: "Speakeasies" },
  { id: "hotel-bar", label: "Hotel Bars" },
  { id: "wine", label: "Wine & Spirits" },
  { id: "bottle", label: "Bottle Service" },
];

type Screen = "welcome" | "vibes" | "location";

const SCREENS: Screen[] = ["welcome", "vibes", "location"];

export default function OnboardingPage() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>("welcome");
  const [selectedVibes, setSelectedVibes] = useState<Set<string>>(new Set());

  const screenIndex = SCREENS.indexOf(screen);

  function saveAndAdvance() {
    if (screen === "vibes") {
      localStorage.setItem(
        "nocte_vibes",
        JSON.stringify(Array.from(selectedVibes))
      );
    }
    if (screen === "location") {
      handleLocationRequest();
      return;
    }
    const next = SCREENS[screenIndex + 1];
    if (next) setScreen(next);
  }

  function skip() {
    if (screen === "location") {
      finish();
      return;
    }
    const next = SCREENS[screenIndex + 1];
    if (next) setScreen(next);
    else finish();
  }

  function handleLocationRequest() {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          localStorage.setItem(
            "nocte_location",
            JSON.stringify({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            })
          );
          finish();
        },
        () => {
          finish();
        }
      );
    } else {
      finish();
    }
  }

  function finish() {
    localStorage.setItem("nocte_onboarding_complete", "true");
    router.push("/");
  }

  function toggleVibe(id: string) {
    setSelectedVibes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Progress dots */}
      <div className="flex justify-center gap-2 pt-12 pb-0">
        {SCREENS.map((s, i) => (
          <div
            key={s}
            className="w-2 h-2"
            style={{
              background: i <= screenIndex ? "#C9A96E" : "#2a2a2a",
            }}
          />
        ))}
      </div>

      {/* Screen content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 max-w-md mx-auto w-full">
        {screen === "welcome" && <WelcomeScreen />}
        {screen === "vibes" && (
          <VibesScreen
            selected={selectedVibes}
            onToggle={toggleVibe}
          />
        )}
        {screen === "location" && <LocationScreen />}
      </div>

      {/* Actions */}
      <div className="px-8 pb-12 max-w-md mx-auto w-full flex flex-col gap-3">
        <button
          onClick={saveAndAdvance}
          className="w-full py-4 text-black font-sans font-semibold text-sm tracking-widest uppercase"
          style={{ background: "#C9A96E" }}
        >
          {screen === "welcome" && "Get Started"}
          {screen === "vibes" && "Continue"}
          {screen === "location" && "Enable Location"}
        </button>
        <button
          onClick={skip}
          className="w-full py-4 font-sans text-sm tracking-widest uppercase border"
          style={{ color: "#6b6b6b", borderColor: "#2a2a2a" }}
        >
          Skip
        </button>
      </div>
    </div>
  );
}

function WelcomeScreen() {
  return (
    <div className="text-center">
      <p
        className="text-xs tracking-[0.3em] uppercase mb-6 font-sans"
        style={{ color: "#C9A96E" }}
      >
        Welcome to
      </p>
      <h1
        className="text-6xl font-serif mb-8 tracking-tight"
        style={{ color: "#FEFAF2" }}
      >
        Noctē
      </h1>
      <p
        className="text-base leading-relaxed font-sans"
        style={{ color: "#888" }}
      >
        Your after-dark concierge for the city&apos;s most exclusive
        experiences. Let&apos;s personalize your nights.
      </p>
    </div>
  );
}

function VibesScreen({
  selected,
  onToggle,
}: {
  selected: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="w-full">
      <p
        className="text-xs tracking-[0.3em] uppercase mb-4 font-sans text-center"
        style={{ color: "#C9A96E" }}
      >
        Step 2 of 3
      </p>
      <h2
        className="text-3xl font-serif mb-3 text-center"
        style={{ color: "#FEFAF2" }}
      >
        Your Vibe
      </h2>
      <p
        className="text-sm leading-relaxed font-sans mb-8 text-center"
        style={{ color: "#888" }}
      >
        Select the experiences that speak to you.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {VIBES.map((vibe) => {
          const active = selected.has(vibe.id);
          return (
            <button
              key={vibe.id}
              onClick={() => onToggle(vibe.id)}
              className="py-3 px-4 text-sm font-sans tracking-wide border transition-colors text-left"
              style={{
                background: active ? "#C9A96E" : "transparent",
                color: active ? "#000" : "#FEFAF2",
                borderColor: active ? "#C9A96E" : "#2a2a2a",
              }}
            >
              {vibe.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LocationScreen() {
  return (
    <div className="text-center">
      <p
        className="text-xs tracking-[0.3em] uppercase mb-4 font-sans"
        style={{ color: "#C9A96E" }}
      >
        Step 3 of 3
      </p>
      <h2
        className="text-3xl font-serif mb-3"
        style={{ color: "#FEFAF2" }}
      >
        Find Nearby
      </h2>
      <p
        className="text-sm leading-relaxed font-sans"
        style={{ color: "#888" }}
      >
        Enable location to discover venues near you and get personalized
        recommendations for tonight.
      </p>
    </div>
  );
}
