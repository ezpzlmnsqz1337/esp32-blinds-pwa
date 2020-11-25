import { USERNAME, FEEDNAME, API_KEY } from '@/adafruitconfig'

class Adafruit {
  constructor(username, feedName, apiKey) {
    this._username = username
    this._feedName = feedName
    this._apiKey = apiKey
    this._url = `https://io.adafruit.com/api/v2/${this._username}/feeds/${this._feedName}/data?x-aio-key=${this._apiKey}`
  }

  async publish(message) {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: message })
    }
    const response = await fetch(this._url, requestOptions)
    const data = await response.json()
    console.log(data)
  }

  async read(limit) {
    limit = limit || 1
    const requestOptions = {
      method: 'GET'
    }
    const response = await fetch(`${this._url}&limit=${limit}`, requestOptions)
    const data = await response.json()
    console.log(data)
    return data
  }
}

const adafruit = new Adafruit(USERNAME, FEEDNAME, API_KEY)

export default adafruit
