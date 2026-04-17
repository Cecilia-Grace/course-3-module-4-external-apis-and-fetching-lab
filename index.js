// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="
const STATE_ABBR = 'CA'

// Your code here!
async function fetchWeatherAlerts(state) {
    const errorDiv = document.getElementById('error-message')
    const alertsDisplay = document.getElementById('alerts-display')

    try {
        errorDiv.textContent = ''
        errorDiv.classList.add('hidden')

        const response = await fetch(`https://api.weather.gov/alerts/active?area=${STATE_ABBR}`)

    if(!response.ok) {
        throw new Error(`${response.status}`)
    }

    const data = await response.json()

    displayAlerts(data)

    } catch (error) {
        errorDiv.textContent = error.message
        errorDiv.classList.remove('hidden')
        alertsDisplay.innerHTML = ''
        console.error(`Error: `, error)
    }
}

function displayAlerts(data) {
    const alerts = document.getElementById('alerts-display')

    alerts.innerHTML = ''

    const summary = document.createElement('h2')
    const title = data.title
    const NumOfAlerts = data.features.length

    summary.textContent = `${title}: ${NumOfAlerts}`
    alerts.appendChild(summary)

    const alertsList = document.createElement('ul')

    data.features.forEach(alert => {
        const listItem = document.createElement('li')

        const headLine = alert.properties.headline

        listItem.textContent = headLine;
        alertsList.appendChild(listItem)
    })

    alerts.appendChild(alertsList)
}

const button = document.getElementById('fetch-alerts')
const input = document.querySelector('#state-input')

if (button) {
    button.addEventListener('click', () => {
        const stateValue = input.value
        fetchWeatherAlerts(stateValue)
        
        input.value = '';
    })
}


