// const request = require('request');
const genData = require('./prepareData.js');
const axios = require('axios')
const endpoint = 'http://tapi.dmz.test.ot:8015'

async function sendReq(url, data='', type) {
    console.log(type)
        switch (type) {
            case 'post':
                try {
                    res =  await axios.post(url, data)
                } catch (err) {
                    // console.error(url)
                      console.error(err.response)
                    }
              break;
            case 'get':
                res =  axios.get(url)
                break;
            default:
                console.log(`Sorry, we are out of ${url}.`);
          }
      return res

  }

async function sendReqSOAP(url, data) {
    try
    {
        res =  await axios.post(url, data)
    } catch(err) {
        console.error(url)
    }
    return res

}

  (async () => {
    let data = await genData.generate()
    // console.log('bonCompanytypecode = '+data.bonCompanytypecode)

    //Create company type
    resp = await sendReq(endpoint+'/tapi-service/companyType/createCompanyType', {
        "code": data.bonCompanytypecode,
        "description":"Описание для кода "+data.bonCompanytypecode
    }, 'post')
    data.companyTypeId = resp.data.id
    console.log('***')

    //Create country
    resp = await sendReq(endpoint+'/tapi-service/country/createCountry', {
        "code": data.bonCountrycode,
        "name": data.bonCountryname,
        "digitalCode": data.bonCountrydigcode
    }, 'post')
    data.bonCountryId = resp.data.id
    console.log('***')

    //Create place type
    resp = await sendReq(endpoint+'/tapi-service/placeType/createPlaceType', {
        "code": data.bonPTcode,
        "description": "Описание для кода data.bonPTcode}"
    }, 'post')
    data.placeTypeId = resp.data.id
    console.log('***')    

    //Create street type
    resp = await sendReq(endpoint+'/tapi-service/streetType/createStreetType', {
        "code": data.bonSTcode,
        "description": "Описание для кода data.bonSTcode}"
    }, 'post')
    data.streetTypeId = resp.data.id
    console.log('***') 
    
    //Create street type
    resp = await sendReq(endpoint+'/tapi-service/bonTariffPlan/createBonTariffPlan', {
        "code":data.bonTPcode,
        "description":"Описание для тарифного плана data.bonTPcode}"
    }, 'post')
    data.bonTPId = resp.data.id
    console.log('***') 

    // Create SP
    ////set_MC
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
    resp = await sendReqSOAP('http://192.168.4.58:6666/setparams', xmls)
    // console.log(resp.data.id)
    console.log('***') 
    
    ////getMCfromSIS
    resp = await sendReq(endpoint+'/tapi-service/bon/serviceprovider/getMarketCode/'+data.bonSPban, '', 'get')
    data.MC = resp.data
    console.log('***') 

    /////create service provider auto spg
    body = {
        "ban": {
            "serviceProviderId": data.bonSPid,
            "ban": data.bonSPban,
            "ctn": "-",
            "marketCodeId": data.randbranchmarketcode,
            "registrationDate": data.bonSPregistrationDate,
            "techState": 1
        },
        "bonSpSettingsDto": {
            "serviceProviderId": data.bonSPid,
            "enableDebugLog": false,
            "monitoringType": "OFFLINE",
            "heartbeatURL": "",
            "notificationURL": data.notificationURL,
            "notificationUserName": "1",
            "notificationUserPassword": "1",
            "onMonitorInOnlineRequest": false,
            "SftpDir": "",
            "considerTimezone": false,
            "blockStatus": "NEW",
            "blockDate": data.bonSPregistrationDate,
            "consentCustomPropName": "",
            "checkSubscriberConsent": false,
            "geoLocationNotifyDetail": "COUNTRY",
            "smsSenderName": "",
            "contactPersonPhone": "",
            "maxNotificationAttemtCount":100,
            "callbackTimeout": 10,
            "callbackRetryTimeout": 10,
            "callbackRetryCount": 3,
            "callbackUrl": data.callbackUrl,
            "callbackUserName": "",
            "callbackUserPassword": ""
        },
        "bonSpAddressDto": {
            "countryId": data.bonCountryid,
            "zipCode": data.bonSPzipcode,
            "region": data.region,
            "area": data.area,
            "placeTypeId": data.bonPTid,
            "place": data.placename,
            "streetTypeId": data.bonSTid,
            "streetName": data.streetname,
            "house": data.bonSPhousenumber
        },
        "id": data.bonSPid,
        "inn": data.bonSPinn,
        "name": data.bonSPname,
        "techState": 1
    }
    console.log(body)
    // resp = await sendReq(endpoint+'/tapi-service/bon/serviceprovider/createServiceProvider', body, 'post')
    // console.log(resp.data)
    // data.bonSpSettingsDtoID = resp.data.bonSpSettingsDto.id
    // data.bonSPbillingdatadto = resp.data.bonSpBillingDataDto.id
    // data.bonSpAddressDto = resp.data.bonSpAddressDto.id
    console.log('***') 

    // /////update service provider auto spg
    // body = {
    //     "ban": {
    //         "serviceProviderId": data.bonSPid,
    //         "ban": data.bonSPban,
    //         "ctn": "-",
    //         "marketCodeId": data.randbranchmarketcode,
    //         "registrationDate": data.bonSPregistrationDate,
    //         "techState": 1
    //         },
    //     "bonSpSettingsDto": {
    //         "id": data.bonSPsettingsdtoid,
    //         "serviceProviderId": data.bonSPid,
    //         "enableDebugLog": false,
    //         "monitoringType": "ONLINE",
    //         "heartbeatURL": data.heartbeatURL,
    //         "maxMsisdnCount": 100,
    //         "callbackUrl": data.callbackURL,
    //         "notificationURL": data.notificationURL,
    //         "notificationUserName": "1",
    //         "notificationUserPassword": "1",
    //         "onMonitorInOnlineRequest": false,
    //         "SftpDir": "",
    //         "considerTimezone": data.considerTimezone,
    //         "blockStatus": "NEW",
    //         "blockStatusDescription": "Не блокирован",
    //         "blockDate": data.bonSPregistrationDate,
    //         "consentCustomPropName": data.consentCustomPropName,
    //         "checkSubscriberConsent": false,
    //         "geoLocationNotifyDetail": "COUNTRY",
    //         "notificationTimeout":"10",
    //         "smsSenderName" : data.sender,
    //         "shortName": data.short_name,
    //         "smsParam1":data.smsParam1,
    //          "smsParam2":data.smsParam2,
    //          "smsParam3":data.smsParam3,
    //          "smsParam4":data.smsParam4,
    //          "smsParam5":data.smsParam5,
    //          "offlineMonitorCheckInterval":data.offlineMonitorCheckInterval,
    //          "callbackRetryCount":3,
    //         "callbackRetryTimeout":10,
    //         "callbackTimeout":10,
    //         "maxNotificationAttemtCount":100,
    //         "contactPersonPhone": "1111111111",
    //         "contactPersonEmail": "tapi_dr@dmz.test.ot"
    //     },
    //     "bonSpAddressDto": {
    //         "id": data.bonSPbillingdatadto,
    //         "countryId": data.bonCountryid,
    //         "zipCode": data.bonSPzipcode,
    //         "region": data.region,
    //         "area": data.area,
    //         "placeTypeId": data.bonPTid,
    //         "place": data.placename,
    //         "streetTypeId": data.bonSTid,
    //         "streetName": data.streetname,
    //         "house": data.bonSPhousenumber,
    //         "bonSpBillingDataId":data.bonSPbillingdatadto
    //     },
    //     "bonSpBillingDataDto": {
    //         "id": data.bonSPbillingdatadto,
    //         "serviceProviderId": data.bonSPid,
    //         "kpp": data.bonSPkpp,
    //         "okpo": data.bonSPokpo,
    //         "isResident": true,
    //         "companyTypeId": data.bonCompanytypeid,
    //         "billingContractOrderId": "",
    //         "billingContractOrderLgId": "",
    //         "billingCoType": "EXB",
    //         "billingDealerPopulationType": "M",
    //         "billingContractDate": data.billingcontractdate,
    //         "billingAccountType": "215",
    //         "billingCopyPersData": "N",
    //         "billingBenSelection": "E",
    //         "billingBen": data.bonSPben,
    //         "billingDeliveryDealer": "",
    //         "billingProductCode": "BON",
    //         "billingInKeyAttrName": "N",
    //         "billingNoDepositInd": "N",
    //         "billlingActivityRsnCode": "NR",
    //         "billingBillCycle": "68",
    //         "billingPhType": "BNTF",
    //         "billingKeyAtrName": "BNTF",
    //         "billingLgType": "BNTF",
    //         "bonTariffPlanId": data.BonTPID,
    //         "bonTariffPlanCode": data.bonTPcode,
    //         "companyTypeCode": data.bonCompanytypeid,
    //         "branchCode": "1500001",
    //         "branchId": data.randbranchid,
    //         "billingOrgId":data.billingorgid,
    //         "billingPhNo":"1"
    //     },
    //     "id": data.bonSPid,
    //     "inn": data.bonSPinn,
    //     "group": "GROUP_"+data.bonSPid,
    //     "name": data.bonSPname,
    //     "appLogin":data.bonSPid,
    //     "appPassword":data.bonSPid,
    //     "accessServiceId":data.accessServiceId,
    //     "techState": 1
    // }
    // resp = await sendReq(endpoint+'/tapi-service/bon/serviceprovider/updateServiceProvider', body, 'post')
    // data.bonSpSettingsDtoID = resp.data.bonSpSettingsDto.id
    // data.bonSPbillingdatadto = resp.data.bonSpBillingDataDto.id
    // data.bonSpAddressDto = resp.data.bonSpAddressDto.id
    // console.log('***') 

    // ////getMCfromSIS
    // resp = await sendReq(endpoint+'/tapi-service/bon/serviceprovider/'+data.bonSPid, undefined, 'get')
    // console.log('***')     
})();