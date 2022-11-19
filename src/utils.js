/** define useful Function files */
export const selectOne = (selector) => document.querySelector(selector)
export const selectAll = (selector) => document.querySelectorAll(selector)

/** pipe function */
export const pipe = (...functions) =>
  args => functions.reduce((arg, nextFn) => nextFn(arg), args)

/** async로 동작하는 pipe function */
export const asyncPipe = (...functions) =>
  args => functions.reduce((promise, nextFn) => promise.then(nextFn), Promise.resolve(args));

/** fetch의 try/catch를 추가합니다. */
export const requestGet = async (url, options = {}) => {
  try {
    const res = await fetch(url, options)
    return res.json()
  } catch (err) {
    console.error("GET method Failed:", err)
    throw err
  }
}
export const requestPost = async (url, options = {}) => {
  try {
    const res = await fetch(
      url,
      {
        method: "POST",
        ...options
      }
    )
    return res.json()
  } catch (err) {
    console.error("POST method Failed:", err)
    throw err
  }
}


/** random color code를 생성합니다 */
export const getRandomColorCode = () => {
  let color = "";
  for (let i = 0; i < 3; i++)
    color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
  return color;
}

/** hex color code인지 체크합니다 */
export const isHexColor = (text) => {
  if (typeof text === 'string' && text.startsWith('#')) {
    text = text.slice(1)
  }
  return text.length === 6
    && !isNaN(Number('0x' + text))
}

/** array에서 condition을 만족하는 element를 삭제한 array를 반환합니다. */
export const removeItem = (arr, conditionFunc) => {
  const index = arr.findIndex(conditionFunc);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
