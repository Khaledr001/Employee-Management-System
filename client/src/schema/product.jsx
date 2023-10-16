import * as Yup from "yup";

const addProduct = Yup.object({
  name: Yup.string().min(3).max(70).required("Please enter your name"),
  catagoryId: Yup.string().required("Please select a category"),
  image: Yup.mixed()
    .required("Please select a product image")
    .test(
      "FILE_SIZE",
      "Image size must be within 3 MB",
      (value) => value && value.size <= 3145728
    )
    .test(
      "FILE_FORMAT",
      "Product image must be in png, jpg or jpeg type",
      (value) =>
        value && ["image/png", "image/jpg", "image/jpeg", "image/webp"].includes(value.type)
    ),
  price: Yup.number("Please enter numeric value"),
  quantity: Yup.number("Please enter numeric value"),
  shippingCost: Yup.number("Please enter numeric value"),
  description: Yup.string()
    .min(5)
    .max(1000)
    .required("Please provide a description for this product"),
});

const productSchema = { addProduct };
export default productSchema;
