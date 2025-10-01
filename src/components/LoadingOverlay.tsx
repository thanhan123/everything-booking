"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * A global loading overlay that can be toggled.
 */
export function LoadingOverlay({ isLoading }: { isLoading: boolean }) {
    const [visible, setVisible] = useState(isLoading)
    const pathname = usePathname()

    console.log('***> call here');

    // When the route changes, hide the loader automatically
    useEffect(() => {
        if (isLoading) return
        setVisible(false)
    }, [pathname, isLoading])

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <Loader2 className="animate-spin text-gray-800 h-12 w-12" />
                </motion.div>
            )}
        </AnimatePresence>
    )
}
