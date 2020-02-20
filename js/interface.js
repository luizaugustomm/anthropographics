var families = {
 'statistical-charts' : ['granularity-low',
                         'realism-low'],
 'simple-unit' : ['granularity-maximum',
                  'specificity-low',
                  'realism-low'],
 'complex-unit' : ['granularity-maximum',
                   'specificity-intermediate',
                   'specificity-high',
                   'realism-low'],
 'proportional-wee' : ['granularity-intermediate',
                       'realism-intermediate'],
 'individual-wee' : ['granularity-maximum',
                     'realism-intermediate'],
 'face-charts' : ['granularity-maximum',
                  'realism-high'],
 'embellished-charts' : ['authenticity-partial'],
 'example-driven' : ['specificity-intermediate',
                     'specificity-high',
                     'coverage-minimum',
                     'coverage-partial'],
 'situated-vis' : ['situatedness-intermediate',
                   'situatedness-high',
                   'situatedness-maximum'],
 'physicalizations' : ['physicality-intermediate',
                       'physicality-maximum']
}

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
    } else {
      d3.select('#filters').style('display', 'none')
      d3.select('#families').style('display', 'block')
      resetFilters()
    }
  })

// Highlights dimension values that correspond to the family
d3.select('#family')
  .on('change', function() {
    let family = d3.select(this).node().value
    if (family === 'no-family') {
      d3.selectAll('.dimension-values > li')
        .attr('class', 'dimension-default')
    } else {
      d3.selectAll('.dimension-values > li')
        .attr('class', 'dimension-unselected')
        .classed('dimension-selected', function(d, i, nodes) {
          return families[family].includes(nodes[i].id)
        })
    }
  })

// Resets dimension filters
d3.select('#reset-button')
  .on('click', resetFilters)
