export const CONFIG = {
  imagesPerGroup: 4,
  defaultRoomType: "living",
  imageTypes: ["all", "bathroom", "hallway", "bedroom", "layout"],
  tableConfigs: {
    main: [
      { label: "Год постройки", key: "yearBuilt" },
      { label: "Материал постройки", key: "material" },
      { label: "Тип дома", key: "buildingType" },
      { label: "Тип постройки", key: "constructionType" },
      { label: "Высота потолков", key: "ceilingHeight" },
      { label: "Лифт", key: "elevator" },
      { label: "Парковка", key: "parking" },
      { label: "Безопасность", key: "security" },
      { label: "Состояние", key: "renovation" },
    ],
    financial: [
      { label: "Цена", key: "price" },
      { label: "Цена за м²", key: "pricePerSqm" },
      { label: "Ипотека", key: "mortgageAvailable" },
      { label: "Банк", key: "mortgageBank" },
      { label: "Первоначальный взнос", key: "initialPayment" },
      { label: "Ежемесячный платеж", key: "monthlyPayment" },
      { label: "Коммунальные услуги", key: "utilities" },
      { label: "Налог", key: "tax" },
      { label: "Комиссия", key: "commission" },
    ],
  },
};
