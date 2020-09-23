const setItemSpy = jest.spyOn(
  Object.getPrototypeOf(window.localStorage),
  "setItem"
);

localStorage.setItem("usuarios", JSON.stringify([{}, {}, {}]));

test("Deve retornar 3 usuários", async () => {
  expect(JSON.parse(localStorage.getItem("usuarios")).length).toBe(3);
});
