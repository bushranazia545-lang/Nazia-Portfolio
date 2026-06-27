import * as React from "react"
import { cn } from "@/lib/utils"

/** ------------------------------------------------------------------ */
/*  Context                                                            */
/** ------------------------------------------------------------------ */
interface CardCurtainRevealContextValue {
  isOpen: boolean
}
const CardCurtainRevealContext = React.createContext<
  CardCurtainRevealContextValue | undefined
>(undefined)

function useCardCurtainRevealContext() {
  const context = React.useContext(CardCurtainRevealContext)
  if (!context) {
    throw new Error(
      "useCardCurtainRevealContext must be used within a CardCurtainReveal Component"
    )
  }
  return context
}

/** ------------------------------------------------------------------ */
/*  CardCurtainReveal — hover-tracking wrapper with explicit state     */
/** ------------------------------------------------------------------ */
const CardCurtainReveal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <CardCurtainRevealContext.Provider value={{ isOpen }}>
      <div
        ref={ref}
        className={cn("relative flex flex-col overflow-hidden", className)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        {...props}
      >
        {children}
      </div>
    </CardCurtainRevealContext.Provider>
  )
})
CardCurtainReveal.displayName = "CardCurtainReveal"

/** ------------------------------------------------------------------ */
/*  CardCurtainRevealBody — front face, always visible                 */
/** ------------------------------------------------------------------ */
const CardCurtainRevealBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex-1 p-6 relative z-[2]", className)} {...props} />
})
CardCurtainRevealBody.displayName = "CardCurtainRevealBody"

/** ------------------------------------------------------------------ */
/*  CardCurtainRevealFooter — slides up on hover via explicit state   */
/** ------------------------------------------------------------------ */
const CardCurtainRevealFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { isOpen } = useCardCurtainRevealContext()

  return (
    <div
      ref={ref}
      className={cn(
        /* Position over the whole card */
        "absolute inset-0",
        /* Lift above the body content */
        "z-20",
        /* Start below, slide up when open */
        "transition-transform duration-500 ease-[cubic-bezier(0.25,1.5,0.5,1)]",
        isOpen ? "translate-y-0" : "translate-y-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
CardCurtainRevealFooter.displayName = "CardCurtainRevealFooter"

/** ------------------------------------------------------------------ */
/*  CardCurtainRevealOverlay (optional) — decorative wipe color        */
/** ------------------------------------------------------------------ */
const CardCurtainOverlay = React.forwardRef<
  HTMLDivElement,
  { className?: string }
>(({ className, ...props }, ref) => {
  const { isOpen } = useCardCurtainRevealContext()

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 z-[1] pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.25,1.5,0.5,1)]",
        isOpen ? "-translate-y-full" : "translate-y-0",
        className
      )}
      {...props}
    />
  )
})
CardCurtainOverlay.displayName = "CardCurtainOverlay"

export {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealFooter,
  CardCurtainOverlay,
}
