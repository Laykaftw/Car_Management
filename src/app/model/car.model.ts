import { Image } from './Image.model';
import { Maker } from './maker.model';

export class Car {
  idCar!: number;
  carModel?: string;
  carPrice?: number;
  dateManufacture?: Date;
  maker!: Maker;
  image!: Image;
  imageStr!: string;
  images!: Image[];
}
