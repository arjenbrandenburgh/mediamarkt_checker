<script>
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    props: [ 'prices' ],

    computed: {
      datacollection () {
        // Create the dataset object
        return {
          datasets: [
            {
              label: 'Prijs',
              type: 'line',
              backgroundColor: '#cc2d20',
              borderColor: '#cc2d20',
              pointBorderColor: '#cc2d20',
              fill: false,
              data: this.prices
            }
          ]
        };
      },
      options () {
        //Chart.js options that controls the appearance of the chart
        return {
          scales: {
            yAxes: [{
              ticks: {
                callback: (value, index, values) => `€${value}`,
                min: this.boundaryMin,
                max: this.boundaryMax
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              type: 'time',
              time: {
                unit: 'day',
                unitStepSize: 1,
                displayFormats: {
                  day: 'MMM DD'
                }
              },
              gridLines: {
                display: false
              },
            }]
          },
          tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
              label: (tooltipItems, data) => `€${tooltipItems.yLabel}`
            },
          },
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false
        };
      },
      boundaryMin () {
        // Find the minimum price and take 10% off. Use this is lower boundary for the chart
        if (this.prices) {
          const result = this.prices.reduce((prev, current) => (prev.y < current.y) ? prev : current);
          if (result && result.y) {
            return parseInt(result.y * 0.9);
          }
        }
      },
      boundaryMax () {
        // Find the maximum price and add 10%. Use this is upper boundary for the chart
        if (this.prices) {
          const result = this.prices.reduce((prev, current) => (prev.y > current.y) ? prev : current);
          if (result && result.y) {
            return parseInt(result.y * 1.1)
          }
        }
      },
    },

    mounted () {
      if (this.prices && this.prices.length > 0) {
        this.renderChart(this.datacollection, this.options);
      }
    },

    watch: {
      prices: function () {
        // If the 'prices' object changes, re-render the graph
        this.renderChart(this.datacollection, this.options);
      }
    }
  }
</script>