import healthPotionAsset from "../../assets/HealthPotion.png";

export const pickables = {
  healthPotion: {
    sprite: {
      img: healthPotionAsset,
      width: 7,
      height: 11,
    },
    node: {
      offsetX: 16,
      offsetY: -4,
    },
    action: {
      name: "CHANGE_ATTRIBUTE",
      change: {
        health: 1,
      },
    }
  }
}
