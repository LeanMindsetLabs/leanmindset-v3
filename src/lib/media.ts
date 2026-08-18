export const mealPhotos: Record<string, number> = {
  "chicken-veg": require("../../assets/meals/chicken-vegetables.png"),
  "chicken-rice-bowl": require("../../assets/meals/chicken-vegetables.png"),
  "egg-scramble": require("../../assets/meals/chicken-vegetables.png"),
  "turkey-salad": require("../../assets/meals/chicken-vegetables.png"),
  "yogurt-berries": require("../../assets/meals/greek-yogurt-berries.png"),
  "oatmeal-berries": require("../../assets/meals/greek-yogurt-berries.png"),
  "yogurt-parfait": require("../../assets/meals/greek-yogurt-berries.png"),
  "apple-almonds": require("../../assets/meals/greek-yogurt-berries.png"),
  "tofu-stir-fry": require("../../assets/meals/tofu-stir-fry.png"),
  "tofu-bowl": require("../../assets/meals/tofu-stir-fry.png"),
  "protein-shake": require("../../assets/meals/tofu-stir-fry.png"),
};

export const trainPhotos: Record<string, number> = {
  "walk-core-a": require("../../assets/train/walk-core-a.png"),
  "dead-bug": require("../../assets/train/dead-bug.png"),
  plank: require("../../assets/train/plank.png"),
  "glute-bridge": require("../../assets/train/glute-bridge.png"),
  "bird-dog": require("../../assets/train/bird-dog.png"),
  crunch: require("../../assets/train/crunch.png"),
};

export function mealPhoto(id: string) {
  return mealPhotos[id];
}

export function trainPhoto(src: string) {
  const key = src.replace("/train/", "").replace(".png", "");
  return trainPhotos[key];
}
