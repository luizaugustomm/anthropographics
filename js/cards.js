function createCard(d) {
  const img = `<img class="card-img-top" src="img/thumbnails/${d.id}-tn.png" alt="${d.title}">`
  const badgeId = `<div class="card-img-overlay"><h5><span class="badge badge-pill badge-dark">${d.nid}</span></h5></div>`
  const cardTitle = `<h5 class="card-title">${d.title}</h5>`
  const cardAuthors = `<div class="card-text text-muted">${d.authors}</div>`
  const body = `<div class="card-body">${cardTitle}${cardAuthors}</div>`
  const card = `<div class="card">${img}${badgeId}${body}</div>`
  return card
}

export function updateCards(nd) {
  const cardWrappers = d3.select('#cards')
    .selectAll('.card-wrapper')
    .data(nd)
    .join('div')
    .attr('class', 'col-sm-6 col-md-4 col-lg-3 mb-2 card-wrapper')
        .html(createCard)
        .on('click', updateCardModal)
}

export function updateCardModal(d) {
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
