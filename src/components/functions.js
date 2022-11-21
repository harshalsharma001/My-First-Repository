export function shortName(name) {
  let newOne = name?.match(/\b(\w)/g);
  let combine = newOne?.join('').toUpperCase()
  // return combine --- will return all first characters
  if (combine.length > 2) {
    return combine.substring(0, 2)
  } else {
    return combine
  }
}

export const backgroundColor = (name) => {
  switch (name) {
    case "Ankit Gupta": return "purple"
    case "Deepak Jadhav": return "darkorange"
    case "Virat Kohli": return "hotpink"
    case "Harshal Sharma": return "black"
    case "Pankaj Kumar Sharma": return "brown"

    default: return "black"
  }
}