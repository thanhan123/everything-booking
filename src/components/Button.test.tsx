import { render, screen, fireEvent } from "@testing-library/react"
import Button from "./Button"

describe("Button", () => {
    it("renders with text", () => {
        render(<Button>Click Me</Button>)
        expect(screen.getByText("Click Me")).toBeInTheDocument()
    })

    it("calls onClick when clicked", () => {
        const handleClick = jest.fn()
        render(<Button onClick={handleClick}>Press</Button>)
        fireEvent.click(screen.getByText("Press"))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})
