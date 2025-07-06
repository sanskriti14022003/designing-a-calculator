"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return secondValue !== 0 ? firstValue / secondValue : 0
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = Number.parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const handlePercentage = () => {
    const value = Number.parseFloat(display)
    setDisplay(String(value / 100))
  }

  const handlePlusMinus = () => {
    if (display !== "0") {
      setDisplay(display.charAt(0) === "-" ? display.slice(1) : "-" + display)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-sm mx-auto shadow-2xl">
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="bg-black text-white text-right p-4 rounded-lg text-3xl font-mono min-h-[60px] flex items-center justify-end overflow-hidden">
              {display}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <Button variant="secondary" className="h-14 text-lg font-semibold" onClick={clear}>
              AC
            </Button>
            <Button variant="secondary" className="h-14 text-lg font-semibold" onClick={handlePlusMinus}>
              ±
            </Button>
            <Button variant="secondary" className="h-14 text-lg font-semibold" onClick={handlePercentage}>
              %
            </Button>
            <Button
              variant="default"
              className="h-14 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => performOperation("÷")}
            >
              ÷
            </Button>

            {/* Row 2 */}
            <Button
              variant="outline"
              className="h-14 text-lg font-semibold bg-transparent"
              onClick={() => inputNumber("7")}
            >
              7
            </Button>
            <Button
              variant="outline"
              className="h-14 text-lg font-semibold bg-transparent"
              onClick={() => inputNumber("8")}
            >
              8
            </Button>
            <Button
              variant="outline"
              className="h-14 text-lg font-semibold bg-transparent"
              onClick={() => inputNumber("9")}
            >
              9
            </Button>
            <Button
              variant="default"
              className="h-14 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => performOperation("×")}
            >
              ×
            </Button>

            {/* Row 3 */}
            <Button
              variant="outline"
              className="h-14 text-lg font-semibold bg-transparent"
              onClick={() => inputNumber("4")}
            >
              4
            </Button>
            <Button
              variant="outline"
              className="h-14 text-lg font-semibold bg-transparent"
              onClick={() => inputNumber("5")}
            >
              5
            </Button>
            <Button
              variant="outline"
              className="h-14 text-lg font-semibold bg-transparent"
              onClick={() => inputNumber("6")}
            >
              6
            </Button>
            <Button
              variant="default"
              className="h-14 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => performOperation("-")}
            >
              −
            </Button>

            {/* Row 4 */}
            <Button
              variant="outline"
              className="h-14 text-lg font-semibold bg-transparent"
              onClick={() => inputNumber("1")}
            >
              1
            </Button>
            <Button
              variant="outline"
              className="h-14 text-lg font-semibold bg-transparent"
              onClick={() => inputNumber("2")}
            >
              2
            </Button>
            <Button
              variant="outline"
              className="h-14 text-lg font-semibold bg-transparent"
              onClick={() => inputNumber("3")}
            >
              3
            </Button>
            <Button
              variant="default"
              className="h-14 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => performOperation("+")}
            >
              +
            </Button>

            {/* Row 5 */}
            <Button
              variant="outline"
              className="h-14 text-lg font-semibold col-span-2 bg-transparent"
              onClick={() => inputNumber("0")}
            >
              0
            </Button>
            <Button variant="outline" className="h-14 text-lg font-semibold bg-transparent" onClick={inputDecimal}>
              .
            </Button>
            <Button
              variant="default"
              className="h-14 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handleEquals}
            >
              =
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
