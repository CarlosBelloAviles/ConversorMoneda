let montoInput = document.getElementById("cantidad")
 const selectMoneda = document.getElementById("conversor")
const search = document.getElementById("search")
const resultado = document.getElementById("resultado")
const urlApi = "https://mindicador.cl/api"
let chart = null


async function getData (){
try {
    const res = await fetch(urlApi);
    const data = await res.json();
    return data
} catch (error) {
    alert( error );

}

}


const renderConvetidor = async () => {
    const  cantidad = montoInput.value
   
    const selectCoin = selectMoneda.value
    if (cantidad <= 0 || cantidad ==="") {
       
        alert ("Agrega un valor coherente")
        
    } else if (selectCoin === "") {

        alert ("Elige un tipo de Moneda")
        resultado.innerHTML = "No se encontró valor agregado"
    }

    const data = await getData()
    let coin = selectCoin
    let indicadores = data[coin].codigo
    let indicador = data[coin].valor
    let total = (cantidad / indicador).toFixed(2)
    resultado.innerHTML = ` Resultado: ${total} ${indicadores}`
  
   

}
 

const main = async () => {
    try {
        const conversion = await getData()
        renderConvetidor()
       RenderGrafico()
    } catch (error) {
        alert(error)
    }
    
        
   }
   
  async function RenderGrafico() {
    const selectCoin = selectMoneda.value
    const res = await fetch(`https://mindicador.cl/api/${selectCoin.toLowerCase()}`)
    const datos = await res.json()
    
    const labels = datos.serie.slice(0,10).map((dato) => {
        return dato.fecha.substring(0,10)
    })
    const valores = datos.serie.slice(0,10).map((dato) => {
        return dato.valor
    })
    const config = {
        type: 'line',
        data: {
        labels: labels,
        datasets: [
            {
                label: 'Últimos 10 días',
                backgroundColor: 'green',
                data: valores
                }]}
    }
    const chartDOM = document.getElementById("grafico")
    if (chart) {
        chart.destroy()
    }
    chartDOM.style.backgroundColor = 'silver'
    chart = new Chart(chartDOM, config)
    chartDOM.innerHTML = chart

            } 


search.addEventListener("click", main);