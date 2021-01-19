import swordAsset from "../../assets/Weapons/Sword.png";
import hammerAsset from "../../assets/Weapons/Hammer.png";

export const weapons = {
  "sword": {
    "id": 1,
    "nodeId": "sword",
    "sprite": {
      "img": swordAsset,
      "width": 8,
      "height": 21
    },
    "node": {
      "anchorPoint": "50% 70%",
      "rotation": -45
    },
    "attributes": {
      "damage": 1,
    }
  },
  "hammer": {
    "id": 2,
    "nodeId": "hammer",
    "sprite": {
      "img": hammerAsset,
      "width": 10,
      "height": 37
    },
    "node": {
      "anchorPoint": "50% 70%",
      "rotation": "-90%"
    },
    "attributes": {
      "damage": 1,
    }
  }
}
