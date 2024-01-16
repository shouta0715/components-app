/* eslint-disable tailwindcss/no-custom-classname */
import { Pencil } from "lucide-react";
import React from "react";

export function EditingPencil(props: React.SVGProps<SVGSVGElement>) {
  return (
    <div className="relative">
      <style>
        {`
        .rotate-right {
          animation: rotate-right 1s cubic-bezier(1, -0.01, 0.13, 1.15) infinite alternate-reverse both;
          transform-origin: top center;
        }

        @keyframes rotate-right {
          0% {
            transform: rotate(0) translateY(0);
          }

          25% {
            transform: rotate(10deg) translateY(4px);
          }

          50% {
            transform: rotate(0deg) translateY(0px);
          }

          100% {
            transform: rotate(-10deg) translateY(2px);
          }
        }
      `}
      </style>
      <Pencil className="rotate-right absolute -top-1 left-3 size-3.5 fill-white sm:left-3.5 sm:size-4" />
      <svg
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <style>
          {`
        @keyframes check {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}
        </style>
        <rect
          height="14"
          rx="1"
          stroke="#0A0A30"
          strokeWidth="1.5"
          width="10"
          x="7"
          y="5"
        />
        <path
          d="M10 8.973h4m-4 3.64h2"
          stroke="#265BFF"
          strokeLinecap="round"
          strokeWidth="1.5"
          style={{
            animation: "check 3s infinite cubic-bezier(.99,-.1,.01,1.02)",
            strokeDashoffset: 100,
            strokeDasharray: 100,
          }}
        />
      </svg>
    </div>
  );
}
