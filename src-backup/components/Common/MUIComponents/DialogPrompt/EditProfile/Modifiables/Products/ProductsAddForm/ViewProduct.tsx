import React from 'react';
import classes from './AddProduct.module.scss';
import TextField from '@mui/material/TextField';
import ProductCaresoul from '../ProductCaresoul/StaticCaresoul';
import type {
  CurrencyTypes,
  FileInterface,
  ProductExpectedPayload,
} from '../../../../../../../../redux/interfaces/backend/apis/productPortfolio';

import { IProductImageDetails } from '../../../../../../../../redux/interfaces/backend/apis/v2/products/product.interfaces';

type FilesInterface = FileInterface[];
const currencyMap = {
  USD: '$',
  EUR: '€',
  INR: '₹',
};

export default function AddProduct(props: {
  details: ProductExpectedPayload;
  open: boolean;
}) {
  const { details, open } = props;
  const [title, setTitle] = React.useState(details.productName);
  const [discount, setDiscount] = React.useState(details.discountedPrice);
  const [category, setCategory] = React.useState(details.productCategory);
  const [pricing, setPricing] = React.useState(+details.productPrice);
  const [currency, setCurrency] = React.useState<CurrencyTypes>(
    details.productCurrencyType
  );
  const [description, setDescription] = React.useState(details.productDetails);
  const [files, setFiles] = React.useState<FilesInterface>(
    (details?.images ?? []).map((element) =>
      convertToFrontendSupported(element)
    ) as FilesInterface
  );
  React.useEffect(() => {
    const modifiedImages = (details?.images ?? []).map((element) =>
      convertToFrontendSupported(element)
    );
    setFiles(modifiedImages);
  }, [details.images]);

  React.useEffect(() => {
    if (open) {
      if (details.productName) setTitle(details.productName);
      if (details.productPrice) setPricing(details.productPrice);
      if (details.productCurrencyType) setCurrency(details.productCurrencyType);
      if (details.productDetails) setDescription(details.productDetails);
      if (details.discountedPrice) setDiscount(details.discountedPrice);
      if (details.productCategory) setCategory(details.productCategory);
    }
  }, [
    open,
    details.productName,
    details.productCategory,
    details.productPrice,
    details.discountedPrice,
    details.productCurrencyType,
    details.productDetails,
  ]);

  return (
    <React.Fragment>
      <div className={classes.ProductLayout}>
        <TextField
          disabled
          className={[classes.Product, classes.Product_Title].join(' ')}
          label='Product Name'
          size='small'
          type='text'
          value={title ?? ''}
        />
        <div className={[classes.Product, classes.Product_Pricing].join(' ')}>
          <TextField
            disabled
            className={classes.Product_CurrencyValue}
            label='Pricing'
            size='small'
            type='text'
            value={`${currencyMap[currency ?? 'INR']} ${pricing ?? -1}`}
          />
        </div>
        <TextField
          disabled
          className={[classes.Product, classes.Product_Location].join(' ')}
          label='Discounted Price'
          size='small'
          type='text'
          value={`${currencyMap[currency ?? 'INR']} ${discount ?? -1}`}
        />
        <div className={classes.Product_ImagwViewer}>
          <ProductCaresoul files={files} />
        </div>
      </div>
      <div className={classes.RemaingElements}>
        <TextField
          disabled
          className={classes.Product_Category}
          label='Category'
          size='small'
          type='text'
          value={category ?? 'ART '}
        />

        <TextField
          disabled
          className={classes.Product_Description}
          label='Add Product Details'
          size='small'
          type='text'
          placeholder='Type Here (500 characters max)'
          multiline
          rows={3}
          value={description ?? ''}
        />
      </div>
    </React.Fragment>
  );
}

const convertToFrontendSupported = (
  file: IProductImageDetails
): FileInterface => {
  return {
    preview: file.imagePreview,
    type: file.imageType,
    file: {
      name: file.imageName,
      type: file.imageType,
    },
  };
};
