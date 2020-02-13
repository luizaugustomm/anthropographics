const cors = 'https://cors-anywhere.herokuapp.com/'
const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQOVGTdhVf8xPIDHrpFCwxcQA4J4RzElbX3wW5IIw36Tap_339eWIk8TWB2Tka9zGOpkJdv_TYVYXlO/pub?gid=0&single=true&output=csv'

function createCard(d) {
  const img = `<img class="card-img-top" src="img/thumbnails/${d.id}-tn.png" alt="${d.title}">`
  const cardTitle = `<h5 class="card-title">${d.title}</h5>`
  const cardAuthors = `<div class="card-text text-muted">${d.authors}</div>`
  const body = `<div class="card-body">${cardTitle}${cardAuthors}</div>`
  const card = `<div class="card">${img}${body}</div>`
  return card
}

function updateCards(newData) {
  const cardWrappers = d3.select('#cards')
    .selectAll('.card-wrapper')
    .data(newData)
    .join('div')
    .attr('class', 'col-sm-6 col-md-4 col-lg-3 mb-2 card-wrapper')
        .html(createCard)
        .on('click', updateCardModal)
}

function updateCardModal(d) {
  d3.select('#visualization-title')
    .text(d.title)

  d3.select('#visualization-image')
    .attr('src', `img/raw/${d.id}.png`)
    .attr('alt', d.title)
    .attr('class', 'img-fluid')

  d3.select('#visualization-website')
    .attr('href', d.url_source)
    .text(d.authors)

  d3.select('#visualization-dimensions')
    .html(() => {
      let tags = ''
      tags += `<span class="badge badge-pill badge-secondary">granularity: ${d.granularity.toLowerCase()}</span>\n`
      tags += `<span class="badge badge-pill badge-secondary">specificity: ${d.specificity.toLowerCase()}</span>\n`
      tags += `<span class="badge badge-pill badge-secondary">coverage: ${d.coverage.toLowerCase()}</span>\n`
      tags += `<span class="badge badge-pill badge-secondary">authenticity: ${d.authenticity.toLowerCase()}</span>\n`
      tags += `<span class="badge badge-pill badge-secondary">realism: ${d.realism.toLowerCase()}</span>\n`
      tags += `<span class="badge badge-pill badge-secondary">situatedness: ${d.situatedness.toLowerCase()}</span>\n`
      tags += `<span class="badge badge-pill badge-secondary">physicality: ${d.physicality.toLowerCase()}</span>\n`
      return tags
    })

  $('#visualization-modal').modal('show')
}

function resetFilters() {
  d3.selectAll('.filter')
    .property('checked', true)
    .dispatch('change')
}


d3.csv(cors+url).then(function(data) {
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
