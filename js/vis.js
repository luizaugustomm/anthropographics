
d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vQOVGTdhVf8xPIDHrpFCwxcQA4J4RzElbX3wW5IIw36Tap_339eWIk8TWB2Tka9zGOpkJdv_TYVYXlO/pub?gid=0&single=true&output=csv').then(function(data) {

  const cards = d3.select('#cards')
  .selectAll('div')
  .data(data)
  .enter()
  .append('div')
  .attr('class', 'col-sm-6 col-md-4 col-lg-3 mb-2 mx-4')
  .attr('onclick', d => 'window.open("' + d.url + '")' )
  .append('div')
  .attr('class', d => 'card');

cards
  .append('img')
  .attr('class', 'card-img-top')
  .attr('src', d => d.img)
  .attr('alt', d => d.title)
  .style('height', '5em')
  .style('object-fit', 'cover')

const cardBodies = cards
  .append('div')
  .attr('class', 'card-body')

cardBodies
  .append('h5')
  .attr('class', 'card-title')
  .text(d => d.title)

cardBodies
  .append('div')
  .attr('class', 'card-text')
  .text(d => d.authors)

});
