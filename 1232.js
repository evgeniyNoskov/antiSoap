const axios = require('axios')
const request = require('request');

// const data = {
//   name: 'John Doe',
//   job: 'Content Writer'
// }

// async function createUser() {
//   try {
//     const res =  axios.post('https://reqres.in/api/users', data)
//     // console.log(`Status: ${res.status}`)
//     // console.log('Body: ', res.data)
//     return res
//   } catch (err) {
//     console.error(err)
//   }
// }



// let res
// (async () => {
//     res = await createUser(1)
//     console.log(res)
//     console.log('***')
// })();

let xmls='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:new="http://www.example.org/NewWSDLFile/">\
            <soapenv:Header/>\
            <soapenv:Body>\
               <new:setParams>\
                  <mockName>SIS</mockName>\
                  <paramName>marketCode</paramName>\
                  <paramValue>MUR</paramValue>\
                  <extParam></extParam>\
               </new:setParams>\
            </soapenv:Body>\
            </soapenv:Envelope>';

axios.post('http://192.168.4.58:6666/setparams',
           xmls,
           {headers:
             {'Content-Type': 'text/xml;charset=UTF-8'}
           }).then(res=>{
             console.log(res);
           }).catch(err=>{console.log(err)});