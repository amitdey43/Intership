"use client";
import React from "react";
import { Button } from "../../components/ui/moving-border.jsx";

export function MovingBorderDemo() {
  return (
    <div>
      <Button
        borderRadius="1.75rem"
        className="bg-white dark:bg-slate-900 text-white dark:text-white border-neutral-200 dark:border-slate-800">
        Borders are cool
      </Button>
    </div>
  );
}
