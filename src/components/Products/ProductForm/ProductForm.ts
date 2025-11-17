import type { Product } from '@/types/products'

enum ProductForm {
  ID = 'id',
  NAME = 'name',
  PRICE = 'price',
  CATEGORY = 'category',
  DESCRIPTION = 'description',
}

const ProductFormFields = (zod: any) => {
  return zod.object({
    [ProductForm.ID]: zod.number().optional(),
    [ProductForm.NAME]: zod.string().min(1, 'Name is required'),
    [ProductForm.PRICE]: zod.number().min(0, 'Price must be at least 0'),
    [ProductForm.CATEGORY]: zod.string().min(1, 'Category is required'),
    [ProductForm.DESCRIPTION]: zod.string().min(1, 'Description is required'),
  })
}

const getInitialValues = (product: Product | null) => {
  return {
    [ProductForm.ID]: product ? product.id : undefined,
    [ProductForm.NAME]: product ? product.name : '',
    [ProductForm.PRICE]: product ? product.price : 0,
    [ProductForm.CATEGORY]: product ? product.category : '',
    [ProductForm.DESCRIPTION]: product ? product.description : '',
  }
}

export { getInitialValues, ProductFormFields, ProductForm }
