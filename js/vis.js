
const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQOVGTdhVf8xPIDHrpFCwxcQA4J4RzElbX3wW5IIw36Tap_339eWIk8TWB2Tka9zGOpkJdv_TYVYXlO/pub?gid=0&single=true&output=csv'

d3.csv(url).then(function(data) {
  const cards = d3.select('#cards')
    .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .attr('class', 'col-sm-6 col-md-4 col-lg-3 mb-2 cc')
    .append('div')
    .attr('class', 'card')
    .on('click', d => {
      d3.select('#visualization-title')
        .text(d.title)

      d3.select('#visualization-image')
        .attr('src', d.img)
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

      $('#visualization-modal').modal('show');
    })

  cards
    .append('img')
    .attr('class', 'card-img-top')
    .attr('src', d => d.thumbnail)
    .attr('alt', d => d.title)

  const cardBodies = cards
    .append('div')
    .attr('class', 'card-body')

  cardBodies
    .append('h5')
    .attr('class', 'card-title')
    .text(d => d.title)

  cardBodies
    .append('div')
    .attr('class', 'card-text text-muted')
    .text(d => d.authors)

});
