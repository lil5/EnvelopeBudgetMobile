import month from '../util/month'
import Big from 'big.js'

export function createJar (jar) {
  return {
    type: 'CREATE_JAR',
    payload: jar,
  }
}

export function updateJar (jar) {
  return {
    type: 'UPDATE_JAR',
    payload: jar,
  }
}

export function updateJarAmount ({id, amount}) {
  return {
    type: 'UPDATE_JAR_AMOUNT',
    payload: {id, amount},
  }
}

export function updateJarAmountUnsorted ({id, amount}) {
  return {
    type: 'UPDATE_JAR_AMOUNT_UNSORTED',
    payload: {id, amount},
  }
}

export function deleteJar (id) {
  return {
    type: 'DELETE_JAR',
    payload: id,
  }
}

export function updateRepeat () {
  return (dispatch, getState) => ({
    type: 'UPDATE_REPEAT',
    payload: new Promise((resolve, reject) => {
      const today = new Date()
      const { lastUpdate, jars, stats, unsorted } = getState()

      let isNewYear = today.getUTCFullYear() > lastUpdate[0]
      let isNewMonth = isNewYear ? true : today.getUTCMonth() > lastUpdate[1]
      let isNewQuarter = isNewYear ? true
        : Math.floor((today.getUTCMonth() + 3) / 3) > Math.floor((lastUpdate[1] + 3) / 3)

      if (isNewYear || isNewMonth) { // performance
        const newJars = []
        const newStats = stats
        let newUnsorted = new Big(unsorted)
        jars.forEach(jar => {
          if (jar.currency === '') {
            if ((jar.repeat === 'Y' && isNewYear) ||
              (jar.repeat === 'M' && isNewMonth) ||
              (jar.repeat === 'Q' && isNewQuarter)) {
              // add unsorted
              newUnsorted = newUnsorted.add(jar.amount)

              // copy values to stats
              newStats[jar.id].push({
                date: `${today.getUTCFullYear()} ${month[today.getUTCMonth()]}`,
                amount: parseFloat((jar.goal.type === 'budget'
                  ? new Big(jar.amount).minus(jar.goal.amount)
                  : new Big(jar.amount)
                ).toFixed(2)),
              })

              // remove from jar
              jar = {
                ...jar,
                amount: 0,
                burn: 0,
              }
            }
          }
          newJars.push(jar)
        })

        resolve({
          newJars,
          newUnsorted: parseFloat(newUnsorted.toString()),
          newStats,
          // newLastUpdate: [today.getUTCFullYear(), today.getUTCMonth()],
          newLastUpdate: [1, 1],
        })
      } else {
        resolve(false) // otherwise do nothing
      }
    }), // end Promise
  })
}

export function updateDefaultCurrency (currency) {
  return {
    type: 'UPDATE_DEFAULT_CURRENCY',
    payload: currency,
  }
}

export function updateRedux () {
  return {
    type: 'UPDATE_REDUX',
  }
}
