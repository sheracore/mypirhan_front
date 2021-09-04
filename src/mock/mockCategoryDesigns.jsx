const categoryDesign = [
  {
    id: 1,
    type_name: "sport",
  },
  {
    id: 2,
    type_name: "special",
  },
  {
    id: 3,
    type_name: "programming",
  },
  {
    id: 4,
    type_name: "fantasy",
  },
  {
    id: 5,
    type_name: "cinema",
  },
  {
    id: 6,
    type_name: "love",
  },
  {
    id: 7,
    type_name: "kids",
  },
  {
    id: 8,
    type_name: "game",
  },
  {
    id: 9,
    type_name: "anime",
  },
  {
    id: 10,
    type_name: "animal",
  },
  {
    id: 11,
    type_name: "auto",
  },
  {
    id: 12,
    type_name: "corona",
  },
]

export function getCategoryDesigns() {
  return categoryDesign
}

export function getCategoryDesign(id) {
  return categoryDesign.find((c) => c.id === id)
}
