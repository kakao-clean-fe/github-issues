import {Window} from "happy-dom";

let windowSpy
const happyWindow = new Window()
const originWindow = {...window, test: true}
windowSpy = vi.spyOn(window, 'window', 'get')
windowSpy.mockImplementation(() => ({
  ...originWindow,
  document: happyWindow.document,
  Event: class Event extends happyWindow.Event {
  }
}))