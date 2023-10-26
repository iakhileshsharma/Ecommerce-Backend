import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class OrderedProductsDto{
    
    
    @IsNotEmpty({message: 'id can not be empty'})
    id: number;

   
    @IsNumber({maxDecimalPlaces: 2}, {message: 'Price should not be number & max decimal precission 2'})
    @IsPositive({message: 'Price can not be negative'})
    product_unit_price: number;

    
    @IsNumber({},{message: 'quantity should not be number'})
    @IsPositive({message: 'quantity can not be negative'})
    product_quantity: number;
}