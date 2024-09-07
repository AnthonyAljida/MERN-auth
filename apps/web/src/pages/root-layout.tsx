import React from "react";
import FloatingShape from "../components/floating-shape";
import { Outlet } from "react-router-dom";

function RootLayout(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShape
        color="bg-green-500"
        delay={0}
        left="10%"
        size="w-64 h-64"
        top="-5%"
      />
      <FloatingShape
        color="bg-green-500"
        delay={0}
        left="10%"
        size="w-64 h-64"
        top="-5%"
      />
      <FloatingShape
        color="bg-green-500"
        delay={0}
        left="10%"
        size="w-64 h-64"
        top="-5%"
      />
      <Outlet />
    </div>
  );
}
export default RootLayout;
