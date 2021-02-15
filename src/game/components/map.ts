import { Component, Types } from "ecsy";
import { Matrix } from "../types";
import { CustomTypes } from "../types/custom_types";

export type CellType = number;

export class GameMap extends Component<GameMap> {
    cell_size: number;
    cells: Matrix<CellType>;

    static schema = {
        cell_size: { type: Types.Number, default: 256 },
        cells: { type: CustomTypes.MatrixNum },
    };
}