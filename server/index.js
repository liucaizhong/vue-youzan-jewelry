const express = require('express')
const axios = require('axios')
// const multipart = require('connect-multiparty')
// const FormData = require('form-data')
// const fs = require('fs')

// const multipartMiddleware = multipart()
const router = express.Router()
const baseUrl = 'http://xnjykj.natappfree.cc/api-auth'

function mapUrl (rawUrl) {
  return baseUrl + rawUrl
}

// function formData (rawForm, rawData, isFile) {
//   const form = rawForm || new FormData()

//   Object.keys(rawData).forEach(key => {
//     // console.log(rawData[key])
//     if (isFile) {
//       const { fieldName, originalFilename, path } = rawData[key]
//       form.append(fieldName, fs.createReadStream(path), originalFilename)
//     } else {
//       form.append(key, rawData[key])
//     }
//   })

//   return form
// }

// function getHeaders (form) {
//   return new Promise((resolve, reject) => {
//     form.getLength((err, length) => {
//       if (err) reject(err)
//       const headers = Object.assign({
//         'Content-Length': length
//       }, form.getHeaders())
//       resolve(headers)
//     })
//   })
// }

// headers: {
//   'Content-Type': 'application/x-www-form-urlencoded',
//   'Content-Length': Buffer.byteLength(data),
// }

function request ({ url, method = 'get', headers = {}, ...args }, req, res) {
  // console.log('req.headers', req.headers)
  if (req.headers.cookie) {
    Object.assign(headers, {
      cookie: req.headers.cookie,
    })
  }
  console.log('headers', headers)
  axios({
    method,
    url,
    // withCredentials: true,
    headers,
    ...args,
    responseType: 'stream',
  }).then(resp => {
    console.log('resp.headers', resp.headers)
    resp.data.pipe(res)
    if (resp.headers['set-cookie']) {
      res.setHeader('set-cookie', resp.headers['set-cookie'])
    }
  }).catch(err => {
    console.error('error is', err)
    res.status(500).send('500 | Internal Server Error')
  })
}

module.exports = () => {
  router.post('/client/UserLogin/', (req, res) => {
    request({
      url: mapUrl(req.url),
      method: 'post',
      data: req.body,
    }, req, res)
  })

  router.get('/client/GetVerifyCode/', (req, res) => {
    request({
      url: mapUrl(req.url),
    }, req, res)
  })

  router.get('/client/product/', (req, res) => {
    request({
      url: mapUrl(req.url),
    }, req, res)
  })

  router.post('/client/RentalService/', (req, res) => {
    request({
      url: mapUrl(req.url),
      method: 'post',
      data: req.body,
    }, req, res)
  })

  // router.post('/productupdate/', multipartMiddleware, (req, res) => {
  //   let form = formData(null, req.body)
  //   form = formData(form, req.files, true)
  //   // console.log('productupdate3', form)

  //   getHeaders(form).then(headers => {
  //     request({
  //       url: mapUrl(req.url),
  //       method: 'post',
  //       data: form,
  //       headers,
  //     }, req, res)
  //   }).catch(err => {
  //     console.error('error is', err)
  //     res.status(500).send('500 | Internal Server Error')
  //   })
  // })

  // router.post('/productfile/', (req, res) => {
  //   const form = formData(null, req.files, true)
  //   console.log('productfile', form)

  //   getHeaders(form).then(headers => {
  //     request({
  //       url: mapUrl(req.url),
  //       method: 'post',
  //       data: form,
  //       headers,
  //     }, req, res)
  //   }).catch(err => {
  //     console.error('error is', err)
  //     res.status(500).send('500 | Internal Server Error')
  //   })
  // })

  return router
}
