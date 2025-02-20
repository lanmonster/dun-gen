import Tile from "./tile.ts";

// cli testing tiles
//
//export default {
//  blank: new Tile(" ", [0, 0, 0, 0]),
//  vertical: new Tile("┃", [1, 0, 1, 0]),
//  horizontal: new Tile("━", [0, 1, 0, 1]),
//  east_south: new Tile("┏", [0, 1, 1, 0]),
//  south_west: new Tile("┓", [0, 0, 1, 1]),
//  north_east: new Tile("┗", [1, 1, 0, 0]),
//  north_west: new Tile("┛", [1, 0, 0, 1]),
//  full: new Tile("▉", [1, 1, 1, 1]),
//};
//
const all_tiles = {
  blank: new Tile("/blank.webp", [0, 0, 0, 0]),
  //cactus: new Tile("/cactus.webp", [0, 0, 0, 0]),
  //bush: new Tile("/bush.webp", [0, 0, 0, 0]),

  ph: new Tile("/ph.webp", [0, 1, 0, 1]),
  pv: new Tile("/pv.webp", [1, 0, 1, 0]),
  path_turn_es: new Tile("/path_turn_es.webp", [0, 1, 1, 0]),
  path_turn_ne: new Tile("/path_turn_ne.webp", [1, 1, 0, 0]),
  path_turn_sw: new Tile("/path_turn_sw.webp", [0, 0, 1, 1]),
  path_turn_wn: new Tile("/path_turn_wn.webp", [1, 0, 0, 1]),
  t: new Tile("/t.webp", [1, 1, 1, 1]),

  floor: new Tile("/floor.webp", [2, 2, 2, 2]),
  wall_tl: new Tile("/wall_tl.webp", [0, 6, 4, 0]),
  wall_t: new Tile("/wall_t.webp", [0, 6, 2, 6]),
  wall_tr: new Tile("/wall_tr.webp", [0, 0, 5, 6]),
  wall_l: new Tile("/wall_l.webp", [4, 2, 4, 0]),
  wall_r: new Tile("/wall_r.webp", [5, 0, 5, 2]),
  wall_bl: new Tile("/wall_bl.webp", [5, 3, 0, 0]),
  wall_b: new Tile("/wall_b.webp", [2, 3, 0, 3]),
  wall_br: new Tile("/wall_br.webp", [4, 0, 0, 3]),
  door: new Tile("/door.webp", [2, 3, 1, 3]),
} as const;
export default all_tiles;

export const allowed_on_top_left = {
  blank: all_tiles.blank,
  //cactus: all_tiles.cactus,
  //bush: all_tiles.bush,
  path_turn_es: all_tiles.path_turn_es,
  wall_tl: all_tiles.wall_tl,
} as const;
export const allowed_on_top_center = {
  blank: all_tiles.blank,
  //cactus: all_tiles.cactus,
  //bush: all_tiles.bush,
  ph: all_tiles.ph,
  path_turn_es: all_tiles.path_turn_es,
  path_turn_sw: all_tiles.path_turn_sw,
  wall_t: all_tiles.wall_t,
  wall_tl: all_tiles.wall_tl,
  wall_tr: all_tiles.wall_tr,
} as const;
export const allowed_on_top_right = {
  //blank: all_tiles.blank,
  //cactus: all_tiles.cactus,
  //bush: all_tiles.bush,
} as const;
export const allowed_on_left_center = {
  //blank: all_tiles.blank,
  //cactus: all_tiles.cactus,
  //bush: all_tiles.bush,
} as const;
