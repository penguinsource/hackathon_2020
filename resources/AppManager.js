const csvtojson = require('csvtojson')
const Geocode = require('./Geocode')
const MapRoutes = require('./MapRoutes/MapRoutes')
const SendSMS = require('./SMS')

const AppManager = {}

AppManager.openExcel = async (drivers, fileObject) => {
  const csvReader = csvtojson.csv();
  
  const excelJSON = await csvReader.fromFile(fileObject.path)
  const addresses = excelJSON.map((data, index) => ({
    name: `${data.Address}`
  }))

  const promiseList = []
  for (let i = 0; i < Object.keys(addresses).length; i++) {
    const address = addresses[i]

    const geocodePromise = Geocode.getLatLon(addresses[i].name)
      .then(location => {
        address.lon = location.lng
        address.lat = location.lat
      })
    promiseList.push(geocodePromise)
  }

  const promisesDone = await Promise.all(promiseList);  // wait for all geocode requests to finish..
  console.log('addresses, addresses', addresses)
  const routes = await MapRoutes.getShortestRoutes(undefined, addresses, drivers)
  console.log('routes', routes)

  return {
    success: true,
    routes
  }
}

AppManager.sendRoutesInfo = async (data) => {
  try {
    const promiseList = []

    for (let i = 0; i < Object.keys(data).length; i++) {
      const driverObject = data[i]
      const smsMessage = `Hey ${driverObject.driverName}, here is your route for today's deliveries. Click this link to open your directions and begin navigating. <br /> ${driverObject.link}`
      const promise = SendSMS(driverObject.phone, smsMessage)
      return;
    }

    await Promise.all(promiseList)

    return {
      success: true
    }
  } catch (err) {
    console.error('AppManager.sendRoutesInfo error', err)
    return {
      success: false,
      error: err
    }
  }
}

module.exports = AppManager
