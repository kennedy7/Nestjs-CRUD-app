import { Controller, Post , Body, Get, Param, Patch, Delete} from '@nestjs/common';
import { productsService } from './products.service';

@Controller('products')
export class productsController {
     constructor(private readonly productsService: productsService){}
     @Post()
    addProduct(
     @Body('title') prodTitle: string, 
     @Body('description') prodDesc: string,
     @Body('price') prodPrice: number,
     ){
    const generatedId = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice)
    return {id: generatedId}
    }
@Get('all') // localhost:<host>/products/all
getAllproducts(){
     return this.productsService.getProducts()
}
@Get(':id')  // localhost:<host>/products/:id
     getSingleProduct(@Param('id') prodId: string){
          return this.productsService.getSingleProduct(prodId)
}
@Patch(':id')  // localhost:<host>/products/:id
updateProduct(
     @Param('id') prodId: string,  
     @Body('title') prodTitle: string, 
     @Body('description') prodDesc: string,
     @Body('price') prodPrice: number,

){
     this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice)
     return null;
     
}

@Delete(':id') 
removeProduct(
     @Param('id') prodId: string){
          this.productsService.deleteProduct(prodId);
          return null
     }
 
}
