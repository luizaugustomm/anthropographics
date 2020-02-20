import {FAMILIES} from './constants.js'

// Checks all filters
function resetFilters() {
  d3.selectAll('.filter')
    .property('checked', true)
    .dispatch('change')
}

// Switches filter between dimensions and families
d3.selectAll('input[name="options"]')
  .on('focus', function() {
    if (d3.select(this).attr('id') === 'option-dimensions') {
      d3.select('#filters').style('display', 'block')
      d3.select('#families').style('display', 'none')
      d3.select('option[value="no-family"]')
        .property('selected', true)
      d3.select('#family')
        .dispatch('change')
    } else {
      d3.select('#filters').style('display', 'none')
      d3.select('#families').style('display', 'block')
      resetFilters()
    }
  })

// Resets dimension filters
d3.select('#reset-button')
  .on('click', resetFilters)
