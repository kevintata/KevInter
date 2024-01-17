const iof = 1.1 / 100;
const spread = 0.99 / 100;

const screen = window.matchMedia("(max-width: 690px)")
const container = document.getElementById('container-dollar')
const dollar = document.getElementById('dollar')
const result = document.querySelector('div#result')
const result2 = document.querySelector('div#result2')
const result3 = document.querySelector('div#result3')
const result4 = document.querySelector('div#result4')
const today = document.getElementById('dollar-now')
const todayhigh = document.getElementById('dollar-high')
const todaylow = document.getElementById('dollar-low')

const getDollar = async () => {
    const res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
    const data = await res.json()
    const convert = data.USDBRL.ask
    const high = data.USDBRL.high
    const low = data.USDBRL.low


    const n = Number(dollar.value)
    const real = convert*n
    const realWithIof = real + (real * iof)
    const realWithIofSpread = realWithIof + (realWithIof * spread)

    const todayBrl = Number(convert)
    const highBrl = Number(high)
    const lowBrl = Number(low)

    today.innerHTML = `Dollar = R$${todayBrl.toFixed(4)}`
    todayhigh.innerHTML = `High = R$${highBrl.toFixed(3)}`
    todaylow.innerHTML = `Low = R$${lowBrl.toFixed(3)}`



    if (dollar.value.length >= 0){
        result.innerHTML = `<br> Total R$${realWithIofSpread.toFixed(2)}`
        // result2.innerHTML = `<br> Grand total R$${realWithIofSpread.toFixed(2)}`
    }
        dollar.value.length == 0
        ? (result.innerHTML = 'Please enter a Dollar amount. <br> Your result will go here')
        // (result2.innerHTML = '')
        : (container.style.height = '');



    // High and Low fluctuation 

        if (todayBrl.toFixed(2) >= highBrl.toFixed(2)){
            today.style.color = 'red'
        } else if (lowBrl.toFixed(2) >= todayBrl.toFixed(2)){
            today.style.color = 'rgb(30, 195, 55)'
        } else {
            today.style.color = ''
        }


    if (todayBrl.toFixed(2) >= highBrl.toFixed(2) && lowBrl.toFixed(2) >= todayBrl.toFixed(2)){
        today.style.color = '#171717'
        todayhigh.innerHTML = 'Market is closed.'
        todayhigh.style.color = '#202020'
        todaylow.style.display = 'none'
    }

    // Copy Button
    if (dollar.value.length == 0){
        const copyDiv = document.getElementById('copyDiv')
        copyDiv.style.display = 'none'
    } else{
        const copyText = document.getElementById('copy') 
        copyDiv.style.display = 'block'
        copyText.addEventListener('click', () => {
            window.navigator.clipboard.writeText('R$' + real.toFixed(2))
        });
    }

    function enterPress(event) {
        if (event.key === 'Enter'){
            getDollar();
        }
    }

        document.addEventListener('keydown', enterPress);
        const btn = document.getElementById('button')
        btn.addEventListener('click', () =>{
            getDollar();
        })

}

getDollar()