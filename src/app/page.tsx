"use client";

import React from "react";
import MatchSetup from "@/components/MatchSetup";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        ¡Bienvenido al ATC Dream Match!
      </h1>
      <MatchSetup />
    </div>
  );
}
