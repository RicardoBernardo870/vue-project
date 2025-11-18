<script setup lang="ts">
import { InputText, InputNumber, Textarea, Button, Select } from 'primevue'
import { watch, ref } from 'vue'
import { useProductStore } from '@/stores/useProductStore'
import { useRoute } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import type { Product } from '@/types/products'
import { useProductOptions } from '@/composables/useProductOptions'
import { ProductFormFields, ProductForm, getInitialValues } from './ProductForm'
import { useToast } from 'primevue'

import Zod from 'zod'
import router from '@/router'

type Props = {
  product?: Product | null
  mode: 'create' | 'edit'
}

type Emits = {
  (e: 'success'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const route = useRoute()
const toast = useToast()

const productStore = useProductStore()

const { editProduct, addNewProduct } = productStore
const { categoryOptions } = useProductOptions()

const submitAttempted = ref<boolean>(false)
const validationSchema = toTypedSchema(ProductFormFields(Zod))

const { handleSubmit, values, meta, setFieldValue, errors, isSubmitting, resetForm } =
  useForm<Product>({
    validationSchema,
    validateOnMount: false,
    initialValues: getInitialValues(props.product || null),
  })

const showError = (field: keyof Product) => {
  return submitAttempted.value ? errors.value[field] : undefined
}

const onSubmit = handleSubmit(
  async (values) => {
    try {
      if (props.mode === 'edit') {
        await editProduct(Number(route.params.id), values)
        toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product updated successfully',
          life: 3000,
        })

        await router.push('/dashboard')
      } else {
        await addNewProduct(values)
        toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product added successfully',
          life: 3000,
        })

        emit('success')
      }

      resetForm({
        values: getInitialValues(props.product || null),
      })

      submitAttempted.value = false
    } catch (error) {
      console.error('Form submission error:', error)

      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: props.mode === 'edit' ? 'Failed to update product' : 'Failed to add product',
        life: 3000,
      })
    }
  },
  () => {
    submitAttempted.value = true
  },
)

watch(
  () => props.product,
  (newProduct) => {
    if (!newProduct) return

    resetForm({
      values: getInitialValues(newProduct),
    })
  },
)
</script>

<template>
  <form class="product-form" @submit.prevent="onSubmit">
    <label for="product-name">Product Name*:</label>
    <InputText
      id="product-name"
      class="text-input"
      :invalid="!!showError(ProductForm.NAME)"
      :model-value="values[ProductForm.NAME]"
      @update:model-value="setFieldValue(ProductForm.NAME, $event || '')"
    />

    <span class="error-message">{{ showError(ProductForm.NAME) }}</span>

    <label for="price">Price*:</label>
    <InputNumber
      id="price"
      mode="decimal"
      showButtons
      class="text-input"
      :invalid="!!showError(ProductForm.PRICE)"
      :model-value="values[ProductForm.PRICE]"
      @update:model-value="setFieldValue(ProductForm.PRICE, $event || 0)"
    />

    <span class="error-message">{{ showError(ProductForm.PRICE) }}</span>

    <label for="category">Category*:</label>
    <Select
      id="category"
      :options="categoryOptions"
      option-label="label"
      option-value="value"
      class="text-input"
      :invalid="!!showError(ProductForm.CATEGORY)"
      :model-value="values[ProductForm.CATEGORY]"
      @update:model-value="setFieldValue(ProductForm.CATEGORY, $event || '')"
    />

    <span class="error-message">{{ showError(ProductForm.CATEGORY) }}</span>

    <label for="description">Description*:</label>
    <Textarea
      id="description"
      rows="5"
      cols="30"
      :invalid="!!showError(ProductForm.DESCRIPTION)"
      :model-value="values[ProductForm.DESCRIPTION]"
      @update:model-value="setFieldValue(ProductForm.DESCRIPTION, $event || '')"
    />

    <span class="error-message">{{ showError(ProductForm.DESCRIPTION) }}</span>

    <Button
      type="submit"
      label="Save Changes"
      severity="success"
      :loading="isSubmitting"
      :disabled="props.mode === 'edit' && !meta.dirty"
    />
  </form>
</template>

<style lang="css" scoped>
.product-form {
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-weight: bold;
    margin-top: 1rem;
  }

  .text-input {
    margin-top: 0.1rem;
  }

  .p-button {
    margin-top: 1rem;
    align-self: flex-end;
  }

  .error-message {
    color: red;
    font-size: 0.875rem;
  }
}
</style>
