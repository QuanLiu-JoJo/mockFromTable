console.log("mockFormTable script start");

// get popup2content info
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // console.log(request);
  // console.log(
  //   mockFromTable(
  //     request.selector,
  //     request.num,
  //     request.startRow,
  //     request.keyCol,
  //     request.typeCol
  //   )
  // );
  sendResponse(
    mockFromTable(
      request.selector,
      request.num,
      request.startRow,
      request.keyCol,
      request.typeCol
    )
  );
});

//数据模拟，输入表格元素的选择器
function mockFromTable(
  tableSlector,
  res_arr = 0, // 是否生成数组数据，默认0则生成对象数据，非零时该值为数组个数
  startRow = 1,
  keyCol = 0,
  typeCol = 1
) {
  let tableEle = document.querySelector(tableSlector);
  let dataArr = getTableContent(tableEle);
  let res = res_arr === 0 ? {} : [];
  if (res_arr === 0) {
    for (let i = startRow, len = dataArr.length; i < len; i++) {
      let value =
        dataArr[i][typeCol] === "string"
          ? "demo_string" + Math.random().toFixed(3) * 1e3
          : Math.random().toFixed(6) * 1e6;
      res[dataArr[i][keyCol]] = value;
    }
  } else {
    for (let t = 0; t < res_arr; t++) {
      let temp = {};
      for (let i = startRow, len = dataArr.length; i < len; i++) {
        let value;
        switch (dataArr[i][typeCol]) {
          case "string":
            value = "demo_string_" + Math.random().toFixed(3) * 1e3;
            break;
          case "double":
            value = Math.random().toFixed(6);
            break;
          default:
            value = Math.random().toFixed(6) * 1e6;
        }
        temp[dataArr[i][keyCol]] = value;
      }
      res.push(temp);
    }
  }
  return JSON.stringify(res);
}

function getTableContent(tableEle) {
  let data = [];
  for (var i = 0, rows = tableEle.rows.length; i < rows; i++) {
    for (var j = 0, cells = tableEle.rows[i].cells.length; j < cells; j++) {
      if (!data[i]) {
        data[i] = new Array();
      }
      data[i][j] = getValue(tableEle.rows[i].cells[j]);
    }
  }
  return data;
}

function getValue(ele) {
  while (ele.firstChild != null) {
    ele = ele.firstChild;
  }
  return ele.data;
}
