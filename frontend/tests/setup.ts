import { afterEach, beforeEach, vi } from "vitest"
import "@testing-library/jest-dom/vitest"

beforeEach(() =>{ vi.useFakeTimers()})

afterEach(() =>{ vi.useRealTimers()})