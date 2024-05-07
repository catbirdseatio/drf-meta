import "@testing-library/jest-dom/vitest"
import { server } from "./mocks/server"
import { cleanup } from '@testing-library/react';

beforeAll(() => server.listen());

afterAll(() => server.close());

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.resetAllMocks()
  server.resetHandlers()
});
