/* useful Functions */
export const selectOne = (selector) => document.querySelector(selector)
export const selectAll = (selector) => document.querySelectorAll(selector)
export const pipe = (...functions) =>
  args => functions.reduce((arg, nextFn) => nextFn(arg), args)
export const asyncPipe = (...functions) =>
  args => functions.reduce((promise, nextFn) => promise.then(nextFn), Promise.resolve(args));
export const getClassList = (e) => e.target.classList

/* fetch의 try/catch를 추가합니다. */
export const getData = (url) => fetch(url)
  .then((res) => res.json())
  .catch((err) => {
    console.log("Fetch Failed", err)
    throw err
  })


/* selector에 대해서 html을 넣으면 innerHTML을 교체해주는 Renderer function을 만듭니다. */
export const createRenderer = (selector) => html => {
  selectOne(selector).innerHTML = html
}


/*
* selector에 대해서 EventListener 를 추가해주는 eventBinder function을 만듭니다.
* @param selector: querySelector
* @param eventType: click 등등
* @param events: click 함수 이후 실행될 이벤트들
* */
export const createEventBinder = selector => eventType => (...events) => {
  const els = selectAll(selector)
  els.forEach(el => el.addEventListener(eventType, pipe(...events)))
}
