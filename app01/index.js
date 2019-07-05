//import * as request from 'request'
//import * as readline from 'readline'
const request = require('request') //import request
const readline = require('readline') //import readline

const rl = readline.createInterface({input: process.stdin, output: process.stdout})

function showExchange(rates) {
  rl.question('กรอกจำนวนเงิน (บาท) ', (answer) => {
    const money = parseFloat(answer)
    console.log(`ผู้ใช้มีเงิน ${money} บาท`)
    for (let k in rates) {
      console.log(`\t: ${k} ${(money*rates[k]/rates['THB']).toFixed(2)}`)
    }
    rl.close()
  })
}//การสร้างฟังก์ชันและเรียกใช้

const url = `https://api.exchangeratesapi.io/latest`

let result = '';
request.get(url)
    .on('response', res => {
            console.log(`response statusCode : ${res.statusCode}`)
            // console.log(res.headers)
        })
    .on('data', data => { //เอาข้อมูลมาต่อกัน
      result += data
        })
    .on('end', () => { 
      const exchange = JSON.parse(result) //แปลงทั้งหมดเป็น json object
      showExchange(exchange.rates)
        })
