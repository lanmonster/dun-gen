import Tile from "./tile.ts";

// cli testing tiles
//
//export default {
//  blank: new Tile(" ", 0.04,[0, 0, 0, 0]),
//  vertical: new Tile("┃", 0.04,[1, 0, 1, 0]),
//  horizontal: new Tile("━", 0.04,[0, 1, 0, 1]),
//  east_south: new Tile("┏", 0.04,[0, 1, 1, 0]),
//  south_west: new Tile("┓", 0.04,[0, 0, 1, 1]),
//  north_east: new Tile("┗", 0.04,[1, 1, 0, 0]),
//  north_west: new Tile("┛", 0.04,[1, 0, 0, 1]),
//  full: new Tile("▉", 0.04,[1, 1, 1, 1]),
//};
//
const all_tiles = {
  blank: new Tile("/blank.webp", 0.04, [0, 0, 0, 0]),
  cactus: new Tile("/cactus.webp", 0.01, [0, 0, 0, 0]),
  cactus2: new Tile("/cactus2.webp", 0.01, [0, 0, 0, 0]),
  bush: new Tile("/bush.webp", 0.01, [0, 0, 0, 0]),
  ph: new Tile("/ph.webp", 0.01, [0, 1, 0, 1]),
  pv: new Tile("/pv.webp", 0.01, [1, 0, 1, 0]),
  path_turn_es: new Tile("/path_turn_es.webp", 0.01, [0, 1, 1, 0]),
  path_turn_ne: new Tile("/path_turn_ne.webp", 0.01, [1, 1, 0, 0]),
  path_turn_sw: new Tile("/path_turn_sw.webp", 0.01, [0, 0, 1, 1]),
  path_turn_wn: new Tile("/path_turn_wn.webp", 0.01, [1, 0, 0, 1]),
  x: new Tile("/x.webp", 0.01, [1, 1, 1, 1]),
  t_n: new Tile("/t_n.webp", 0.01, [1,1,0,1]),
  t_e: new Tile("/t_e.webp", 0.01, [1,1,1,0]),
  t_s: new Tile("/t_s.webp", 0.01, [0,1,1,1]),
  t_w: new Tile("/t_w.webp", 0.01, [1,0,1,1]),
  floor: new Tile("/floor.webp", 0.49, [2, 2, 2, 2]),
  wall_tl: new Tile("/wall_tl.webp", 0.04, [0, 6, 4, 0]),
  wall_t: new Tile("/wall_t.webp", 0.04, [0, 6, 2, 6]),
  wall_tr: new Tile("/wall_tr.webp", 0.04, [0, 0, 5, 6]),
  wall_l: new Tile("/wall_l.webp", 0.04, [4, 2, 4, 0]),
  wall_r: new Tile("/wall_r.webp", 0.04, [5, 0, 5, 2]),
  wall_bl: new Tile("/wall_bl.webp", 0.04, [4, 3, 0, 0]),
  wall_b: new Tile("/wall_b.webp", 0.04, [2, 3, 0, 3]),
  wall_br: new Tile("/wall_br.webp", 0.04, [5, 0, 0, 3]),
  door: new Tile("/door.webp", 0.04, [2, 3, 1, 3]),
} as const;
export default all_tiles;

