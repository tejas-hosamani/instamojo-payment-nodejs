module.exports = {
  default: {
    defaults: { headers: { common: {} } },
    get: jest.fn(() => Promise.resolve({ data: { message: "mock method" } })),
    post: jest.fn(() => Promise.resolve({ data: { message: "mock method" } })),
  },
};
