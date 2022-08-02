import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class productsService{
   private products: Product[] = [];

    insertProduct(title:string, desc:string, price:number){
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price)
        this.products.push(newProduct);
        return prodId;
    }

    getProducts(){
        //gets a copy of the produts that an ediited from outside the private method
        return [...this.products];
    }
    getSingleProduct(ProductId: string){
        const product = this.findProduct(ProductId)[0];
        if (!product){
            throw new NotFoundException('Product Not found')
        }
        return{...product}
    }
    updateProduct(ProductId: string, title:string, desc:string, price:number ){
        const[ product, index] = this.findProduct(ProductId);
        const updatedProduct = {...product};
        if (title){
            updatedProduct.title = title
        }
        if (desc){
            updatedProduct.desc = desc
        }
        if (price){
            updatedProduct.price = price
        }
        this.products[index] = updatedProduct;
        
    }

    deleteProduct(prodId: string){
    const index =  this.findProduct(prodId)[1]
    this.products.splice(index, 1);
    }
    private findProduct(id: string): [Product, number]{
    const productIndex = this.products.findIndex((prod)=>prod.id === id)
    
    const product = this.products[productIndex]
    if (!product){
        throw new NotFoundException('Product Not found')
    }
     return [product, productIndex];
}



}
