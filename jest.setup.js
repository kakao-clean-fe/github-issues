import fetch from "jest-fetch-mock";

fetch.enableMocks();

afterEach(() => fetch.mockClear());