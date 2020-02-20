import {updateCards, updateCardModal} from './cards.js'

const CORS = 'https://cors-anywhere.herokuapp.com/'
const URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQOVGTdhVf8xPIDHrpFCwxcQA4J4RzElbX3wW5IIw36Tap_339eWIk8TWB2Tka9zGOpkJdv_TYVYXlO/pub?gid=0&single=true&output=csv'

d3.csv(CORS+URL).then(function(data) {
  var totalVis = data.length
  d3.select('#summary')
    .text(`${totalVis} out of ${totalVis} visualizations`)

  updateCards(data)

  d3.selectAll('.filter:checked')
    .on('change', function() {
      const dimensions = ['granularity', 'specificity', 'coverage',
                          'authenticity', 'realism', 'physicality', 'situatedness']
      let newData = data

      dimensions.forEach(dimension => {
        let changed = []
        d3.selectAll(`.filter-${dimension}:checked`)
          .each(function() {
            changed.push(this.value)
          })
        newData = newData.filter(function(d) {
          return changed.includes(d[dimension])
        })
      })

      updateCards(newData)

      d3.select('#summary')
        .text(`${newData.length} out of ${totalVis} visualizations`)
    })
})
