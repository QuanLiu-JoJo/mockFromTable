document.querySelector("#generateButton").addEventListener("click", () => {
  generate();
});

document.querySelector("#copyRes").addEventListener("click", async (e) => {
  await navigator.clipboard.writeText(document.querySelector("#out").value);
});

function generate() {
  let selector = document.querySelector("#selector").value;
  let num = parseInt(document.querySelector("#eleNum").value);
  let fnName = document.querySelector("#fnName").value;
  let startRow = document.querySelector("#startRow").value;
  let keyCol = document.querySelector("#keyCol").value;
  let typeCol = document.querySelector("#typeCol").value;

  // popup ---> content
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      let message = {
        info: "mockTheTable",
        selector,
        num,
        startRow,
        keyCol,
        typeCol,
      };
      chrome.tabs.sendMessage(tabs[0].id, message, (res) => {
        console.log(res);
        out.value = `export const ${fnName} = (params: any) => {
  return Promise.resolve(
      ${res}
  );
};`;
      });
    }
  );
}
