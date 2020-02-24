export const DEFAULT_CATEGORY = [
  "praca",
  "szkoła",
  "nauka",
  "odpoczynek",
  "rozrywka",
  "sport",
  "dojazd",
  "zakupy",
  "porządki",
  "inne"
];

export const BACKGROUND_COLOR = [
  "rgba(84, 165, 219, 0.4)",
  "rgba(113, 233, 113, 0.4)",
  "rgba(233, 225, 113, 0.4)",
  "rgba(233, 127, 113, 0.4)",
  "rgba(185, 113, 233, 0.4)",
  "rgba(233, 113, 169, 0.4)",
  "rgba(233, 113, 113, 0.4)",
  "rgba(145, 218, 196, 0.4)",
  "rgba(218, 180, 145, 0.4)",
  "rgba(218, 226, 208, 0.4)"
];

export const OPTIONS_CHART = {
  tooltips: {
    callbacks: {
      label: (tooltipItem, data) => {
        if (data.datasets.length === 1) {
          return `${data.labels[tooltipItem.index]}: ${
            data.datasets[0].data[tooltipItem.index]
          }%`;
        } else {
          return `${data.datasets[tooltipItem.datasetIndex].label}: ${
            data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
          }%`;
        }
      }
    }
  }
};
