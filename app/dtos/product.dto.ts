import { CategoryDto } from "~/dtos/category.dto";
import { AttributeDto } from "~/dtos/attribute.dto";

export class ProductDto {
  id: number;
  number: string;
  title: string;
  description: string;
  categories: CategoryDto[];
  attributes: AttributeDto[];
}
