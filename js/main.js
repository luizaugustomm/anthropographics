import {CORS, URL, DIMENSIONS, FAMILIES} from './constants.js'
import {updateCards, updateCardModal} from './cards.js'

d3.csv(CORS+URL).then(function(data) {

  var totalVis = data.length
  d3.select('#summary')
    .text(`${totalVis} out of ${totalVis} visualizations`)

  updateCards(data)

  d3.selectAll('.filter:checked')
    .on('change', function() {
      let newData = data
      DIMENSIONS.forEach(dimension => {
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

  d3.select('#family')
    .on('change', function() {
      let newData = data
      let family = d3.select(this).node().value
      if (family === 'no-family') {
        d3.selectAll('.dimension-values > li')
          .attr('class', 'dimension-default')
      } else {
        d3.selectAll('.dimension-values > li')
          .attr('class', 'dimension-unselected')
          .classed('dimension-selected', function(d, i, nodes) {
            return FAMILIES[family].includes(nodes[i].id)
          })
        let dimensionPairs = FAMILIES[family]
        let dims = getDimensions(dimensionPairs)
        for (var dim in dims) {
          newData = newData.filter(function(d) {
            return dims[dim].includes(d[dim].toLowerCase())
          })
        }
      }
      updateCards(newData)
      d3.select('#summary')
        .text(`${newData.length} out of ${totalVis} visualizations`)
    })
})

function getDimensions(dimPairs) {
  let dims = {}
  dimPairs.forEach(item => {
    let [d, v] = item.split('-')
    if (dims.hasOwnProperty(d)) {
      dims[d].push(v)
    } else {
      dims[d] = [v]
    }
  })
  return dims
}
