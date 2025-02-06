"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./button"
import { ChevronDown } from "lucide-react"

interface DropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "start" | "end"
}

const dropdownVariants = {
  hidden: { 
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.1 }
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 20,
      duration: 0.2
    }
  }
}

export function Dropdown({ trigger, children, align = "end" }: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="relative inline-block text-left">
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            className={`
              absolute z-50 mt-2 w-56 rounded-md shadow-lg bg-background ring-1 ring-border
              ${align === "end" ? "right-0" : "left-0"}
            `}
          >
            <div className="py-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  icon?: React.ReactNode
}

export function DropdownItem({ children, icon, ...props }: DropdownItemProps) {
  return (
    <button
      {...props}
      className="w-full px-4 py-2 text-sm text-left text-foreground hover:bg-accent flex items-center gap-2"
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </button>
  )
} 