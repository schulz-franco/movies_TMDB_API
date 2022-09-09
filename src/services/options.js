const PUBLIC_TOKEN = ""
const TOKEN = process.env.REACT_APP_ACCESS_TOKEN ? process.env.REACT_APP_ACCESS_TOKEN : PUBLIC_TOKEN

const options = {
  headers: {
    'Authorization': 'Bearer ' + TOKEN,
    'Content-Type': 'application/json;charset=utf-8'
  }
}

export default options
