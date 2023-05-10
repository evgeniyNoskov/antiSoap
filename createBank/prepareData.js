const randomstring = require("randomstring")
const axios = require('axios')
const moment = require("moment")
// const request = require('request');
let SPData = {}
SPData.branch = {}


async function createUser() {
  try {
    const res =  axios.post('http://tapi.dmz.test.ot:8015/tapi-service/branch/getBranchesByFilter', {
      "startPosition": 0,
      "template": {
          "code": "",
          "marketCodeId": "",
          "salesEntityCode": "",
          "salesRepCode": "",
          "salesRep": ""
      }
  })
    // //console.log(`Status: ${res.status}`)
    // //console.log('Body: ', res.data)
    return res
  } catch (err) {
    console.error(err)
  }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
// //console.log(getRandomInt(3));

async function genData() {
      markCodeStr = randomstring.generate({
        length: 2,
        charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      });
    
    //market code
    //console.log("Данные для справочника Market code:")
    markCodeNnum = getRandomInt(9);
    SPData.markCode = markCodeStr + markCodeNnum
    //console.log("Значение для поля Системное название (ID): " + SPData.markCode)
    
    
    // сreationDate
    SPData.systemCreationDate = moment(new Date()).format('yyyy-MM-DD HH:mm:ss')
    //console.log("Значение для поля systemCreationDate: " + SPData.systemCreationDate)
    
    // updateDate
    SPData.systemUpdateDate = moment(new Date()).format('yyyy-MM-DD HH:mm:ss')
    //console.log("Значение для поля systemUpdateDate: " + SPData.systemUpdateDate)
    
    SPData.operatorId = 1000000 + getRandomInt(8999999);
    //console.log("Значение для поля Id Оператора: " + SPData.operatorId)
    
    SPData.applicationId = 100000 + getRandomInt(899999);
    //console.log("Значение для поля Id Приложения: " + SPData.applicationId)
    
    SPData.DL_SERVICE_CODE  = 10000 +  getRandomInt(89999);
    //console.log("Значение для поля DL_SERVICE_CODE: " + SPData.DL_SERVICE_CODE)
    
    SPData.DL_UPDATE_STAMP  = 1000 +  getRandomInt(8999);
    //console.log("Значение для поля DL_UPDATE_STAMP: " + SPData.DL_UPDATE_STAMP)
    
    vatRegistrationNumber_num = getRandomInt(9);
    vatRegistrationNumber_chars = randomstring.generate({
        length: 5,
        charset: 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz'
      });
    SPData.vatRegistrationNumber = vatRegistrationNumber_chars+vatRegistrationNumber_num
    //console.log("Значение для поля Регистрационный номер в VAT: " + SPData.vatRegistrationNumber)
    
    SPData.regionCode = 100 + getRandomInt(899);
    //console.log("Значение для поля Код региона: " + SPData.regionCode)
    
    //Daylight zone
    SPData.dlzid = ""
    
    //Bon Tarif plan
    SPData.BonTPID = ""
    
    SPData.bonTPcode = "BON TP-" + (1000000+getRandomInt(8999999)).toString()
    //console.log("Значение для поля Код тарифного плана: " + SPData.bonTPcode)
    
    //Bon price feature
    SPData.BonPFid = ""
    
    SPData.BonPFname = "BON PF-" + (1000000+getRandomInt(8999999))
    //console.log("Значение для поля Название в Price Feature: " + SPData.BonPFname)
    
    //Bon events
    SPData.cbonEventid = ""
    bonEventnamedig = 1000000+getRandomInt(8999999)
    SPData.bonEventname = "BON event " + bonEventnamedig
    SPData.bonEventcode = "CODE-" + bonEventnamedig
    //console.log("Значение для поля Название в Event: " + SPData.bonEventname)
    //console.log("Значение для поля Код в Event: " + SPData.bonEventcode)
    
    //Event GF
    BonEventId = (1 + getRandomInt(53))
    SPData.bonGFcode = "BON GF-" + (1000000+getRandomInt(8999999))
    SPData.BonEGFid = ""
    //console.log("Значение для поля Код в Event GF: " + SPData.bonGFcode)
    
    //Event UCP
    SPData.bonUCPcode = "BON UCP-" + (1000000+getRandomInt(8999999))
    SPData.BonEUCPid = ""
    //console.log("Значение для поля Код в Event UCP: " + SPData.bonUCPcode)
    
    //Street type
    SPData.bonSTcode = randomstring.generate({
        length: 5,
        charset: 'abcdefghijklmnopqrstuvwxyz'
      })
    SPData.bonSTid = ""
    //console.log("Значение для поля Код в Street type: " + SPData.bonSTcode)
    
    //Place type
    SPData.bonPTcode = randomstring.generate({
        length: 5,
        charset: 'abcdefghijklmnopqrstuvwxyz'
      })
    SPData.bonPTid = ""
    //console.log("Значение для поля Код в Place type: " + SPData.bonPTcode)
    
    //Country
    SPData.bonCountryId = 1 + getRandomInt(998)
    SPData.bonCountryname = "Страна" + SPData.bonCountryId
    SPData.bonCountrycode = "cntr" + SPData.bonCountryId
    SPData.bonCountrydigcode = (1000 + getRandomInt(8999)).toString()
    SPData.bonCountryid = ""
    //console.log("Значение для поля Название страны: " + SPData.bonCountryname)
    //console.log("Значение для поля Код страны: " + SPData.bonCountrycode)
    //console.log("Значение для поля Цифровой код страны: " + SPData.bonCountrydigcode)
    
    //Branch
    SPData.bonBranchid = ""
    SPData.bonBranchcode = "BC-" + (10000 + getRandomInt(89999))
    SPData.bonBranchsalesentitycode = "SEC-" + (10000 + getRandomInt(89999))
    SPData.salesrepid = 10000 + getRandomInt(89999)
    SPData.bonBranchsalesrepcode = "SRC-" + SPData.salesrepid
    SPData.bonBranchsalesrep = "Sales Rep-" + SPData.salesrepid
    //console.log("Значение для поля Код филиала: " + SPData.bonBranchcode)
    //console.log("Значение для поля Sales Entity Code: " + SPData.bonBranchsalesentitycode)
    //console.log("Значение для поля Sales Rep Code: " + SPData.bonBranchsalesrepcode)
    //console.log("Значение для поля Sales_Rep: " + SPData.bonBranchsalesrep)
    
    //Company type
    SPData.bonCompanytypecode = randomstring.generate({
      length: 4
    })
    SPData.bonCompanytypeid = ""
    //console.log("Значение для поля Код типа компании: " + SPData.bonCompanytypecode)

    //SMS template type
    SPData.bonSmstemplatetypename = "Тестовый шаблон СМС " + (1000 + getRandomInt(8999))
    SPData.bonSmstemplatetypeid = ""
    //console.log("Значение для поля Название: " + SPData.bonSmstemplatetypename)

    //Колличество ожиданий.
    SPData.countWaiting = "150"

    //События на которые необходимо разрешить доступ (делается по id в базе. Подход удовлетворяет тестированию потому что код тоже на эти ид настроен).
    SPData.listEvent = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,57,58,59,55,56,60,61,62,63,64,65"

    //Проверка временной зоны
    SPData.considerTimezone = true

    //Имя Сендера
    SPData.sender = "BON" + (getRandomInt(99999))

    SPData.session = null

    SPData.group_tps="1000"


    // Генерация данных для сервис провайдера
    //Данные для создания SP
    SPData.bonSPnamechar = "SP Name "
    SPData.bonSPnamedig = 10000000 + getRandomInt(89999999)
    SPData.bonSPname = SPData.bonSPnamechar + SPData.bonSPnamedig
    SPData.short_name ="short_"+getRandomInt(899999999)
    //console.log("Сгенерированное имя для SP: " + SPData.bonSPname)

    SPData.bonSPinn = (1000000000 + getRandomInt(899999999))
    //console.log("Сгенерированный ИНН для SP: " + SPData.bonSPinn)

    SPData.bonSPid = "SP_NAME_" + SPData.bonSPnamedig
    //console.log("Сгенерированный SYS_NAME для SP: " + SPData.bonSPid)

    SPData.bonSPban = (100000000 + getRandomInt(899999999))
    //console.log("Сгенерированный BAN для SP: " + SPData.bonSPban)

    SPData.bonSPctn = (79000000000+getRandomInt(1000000000));
    //console.log("Сгенерированный CTN для SP: " + SPData.bonSPctn)


    SPData.bonSPregistrationDate = moment(new Date()).format('yyyy-MM-DD HH:mm:ss')
    //console.log("Сгенерированная дата регистрации для SP: " + SPData.bonSPregistrationDate)

    SPData.bonSPkpp = (100000000 + getRandomInt(899999999))
    //console.log("Сгенерированный КПП для SP: " + SPData.bonSPkpp)

    SPData.bonSPokpo = (10000000 + getRandomInt(89999999))
    //console.log("Сгенерированный ОКПО для SP: " + SPData.bonSPokpo)

    SPData.streetname = "Название улицы " + SPData.bonSPnamedig
    //console.log("Сгенерированное название улицы: " + SPData.streetname)

    SPData.placename = "Название place " + SPData.bonSPnamedig
    //console.log("Сгенерированное название улицы: " + SPData.placename)

    SPData.bonSPzipcode = (100000 + getRandomInt(899999))
    //console.log("Сгенерированный индекс: " + SPData.bonSPzipcode)

    SPData.bonSPhousenumber = (1 + getRandomInt(9998))
    //console.log("Сгенерированный номер дома: " + SPData.bonSPhousenumber)

    SPData.region = "Регион " + SPData.bonSPnamedig
    //console.log("Сгенерированный регион: " + SPData.region)

    SPData.area = "Область " + SPData.bonSPnamedig
    //console.log("Сгенерированный регион: " + SPData.area)

    SPData.bonSPsettingsdtoid = ''
    SPData.bonSPaddressdto = ''
    SPData.bonSPbillingdatadto = ''

    SPData.billingcontractdate = moment(new Date()).format('yyyy-MM-dd')
    //console.log("сгенерированная дата для Billing_Contract_Date: " + SPData.billingcontractdate)

    SPData.bonSPben = (10000 + getRandomInt(89999))
    //console.log("сгенерированный BEN для SP: " + SPData.bonSPben)

    SPData.billingorgid = ''

    SPData.billorgid = (10000 +getRandomInt(89999))
    //console.log("сгенерированный Billing org ID для SP: " + SPData.billorgid)

    SPData.billing_Contract_Order_Id = ''

    SPData.consentCustomPropName =  SPData.bonSPid+"_cpn"

    SPData.smsParam1 ="param"+getRandomInt(100)
    SPData.smsParam2 ="param"+getRandomInt(100)
    SPData.smsParam3 ="param"+getRandomInt(100)
    SPData.smsParam4 ="param"+getRandomInt(100)
    SPData.smsParam5 ="param"+getRandomInt(100)

    // Выбор филиала
    response = await createUser()
    mapresponse = response.data.data

    SPData.branch.mapsize = mapresponse.length
    //console.log("Количество филиалов: " + SPData.branch.mapsize)

    SPData.branch.randbranchnum = getRandomInt(SPData.branch.mapsize)
    //console.log("Номер выбираемого случайного филиала: " + SPData.branch.randbranchnum)

    SPData.branch.randbranchcode = mapresponse[getRandomInt(SPData.branch.randbranchnum)].code
    //console.log("Код случайного филиала из списка: " + SPData.branch.randbranchcode)

    SPData.branch.randbranchid = mapresponse[getRandomInt(SPData.branch.randbranchnum)].id
    //console.log("ID этого случайного филиала: " + SPData.branch.randbranchid)

    SPData.branch.randbranchsalesrep = mapresponse[getRandomInt(SPData.branch.randbranchnum)].salesRep
    //console.log("Имя (salesrep) случайного филиала из списка: " + SPData.branch.randbranchsalesrep)

    SPData.branch.randbranchsalesrepcode = mapresponse[getRandomInt(SPData.branch.randbranchnum)].salesRepCode
    //console.log("SalesRep код случайного филиала из списка: " + SPData.branch.randbranchsalesrepcode)
    SPData.branch.randbranchmarketcode = mapresponse[getRandomInt(SPData.branch.randbranchnum)].marketCodeId
    //console.log("Market Code случайного филиала из списка: " + SPData.branch.randbranchmarketcode)
    
    return SPData 

}
module.exports.generate = genData
