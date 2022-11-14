/** define useful Function files */

export const selectOne = (selector) => document.querySelector(selector)
export const selectAll = (selector) => document.querySelectorAll(selector)

/** pipe function */
export const pipe = (...functions) =>
  args => functions.reduce((arg, nextFn) => nextFn(arg), args)

/** async로 동작하는 pipe function */
export const asyncPipe = (...functions) =>
  args => functions.reduce((promise, nextFn) => promise.then(nextFn), Promise.resolve(args));

/** onClick 등의 event로부터 target classList를 가져오는 function */
export const getClassList = (e) => e.target.classList

/** fetch의 try/catch를 추가합니다. */
export const fetchData = (url) => fetch(url)
  .then((res) => res.json())
  .catch((err) => {
    console.error("Fetch Failed", err)
    throw err
  })


/** selector에 대해서 html을 넣으면 innerHTML을 교체해주는 Renderer function을 만듭니다. */
export const createRenderer = (selector) => html => {
  selectOne(selector).innerHTML = html
}


/**
 * selector에 대해서 EventListener 를 추가해주는 eventBinder function을 만듭니다.
 * @param selector: querySelector
 * @param eventType: click 등등
 * @param events: click 함수 이후 실행될 이벤트들
 * */
export const createEventBinder = selector => eventType => (...events) => {
  const els = selectAll(selector)
  els.forEach(el => el.addEventListener(eventType, pipe(...events)))
}

export const getRandomColor = () => {
  let color = "";
  for (let i = 0; i < 3; i++)
    color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
  return color;
}

export const isHexColor = (text) => {
  if (typeof text === 'string' && text.startsWith('#')) {
    text = text.slice(1)
  }
  return text.length === 6
    && !isNaN(Number('0x' + text))
}

export const removeItem = (arr, conditionFunc) => {
  const index = arr.findIndex(conditionFunc);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
