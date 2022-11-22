/**
 * Simple get request
 * @param url
 * @returns {Promise<any>}
 */
export async function get(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/**
 * Simple post request
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export async function post(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(response.statusText);

    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// this is more like interface than class
class Abortable {
  abort() {
    throw new Error('implement this');
  }
}

/**
 * AbortableRequest is Singleton class.
 * Hence, it only creates one object.
 */
export class AbortableRequest extends Abortable {
  #controllers = {};
  static instance;

  constructor() {
    super();
    if (AbortableRequest.instance) {
      return AbortableRequest.instance;
    }
    AbortableRequest.instance = this;
  }

  abort(url) {
    if (this.getController(url)) {
      this.#controllers[url].abort();
    }
  }

  async get(url) {
    // abort if same previous request exists
    if (this.#controllers[url]) {
      this.abort(url);
    }
    this.#controllers[url] = new AbortController();
    const signal = this.#controllers[url].signal;

    try {
      const response = await fetch(url, {signal});
      delete this.#controllers[url];

      return await response.json();
    } catch (err) {
      console.error("error: ", err);

      // delete should not be handled in finally clause
      // because controller should not be deleted when request is aborted by user
      if (err.name !== 'AbortError') {
        delete this.#controllers[url];
      }
      throw err;
    }
  }

  //  TODO(@roddy.oh): implement post
  async post() {
  }

  //  TODO(@roddy.oh): implement put
  async put() {
  }

  //  TODO(@roddy.oh): implement delete
  async delete() {
  }

  getController(url) {
    return this.#controllers[url];
  }
}
