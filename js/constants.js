export const CORS = 'https://cors-anywhere.herokuapp.com/'
export const URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQOVGTdhVf8xPIDHrpFCwxcQA4J4RzElbX3wW5IIw36Tap_339eWIk8TWB2Tka9zGOpkJdv_TYVYXlO/pub?gid=0&single=true&output=csv'

export const DIMENSIONS = ['granularity', 'specificity', 'coverage',
                    'authenticity', 'realism', 'physicality', 'situatedness']

export const FAMILIES = {
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
 'single-person' : ['coverage-minimum'],
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
