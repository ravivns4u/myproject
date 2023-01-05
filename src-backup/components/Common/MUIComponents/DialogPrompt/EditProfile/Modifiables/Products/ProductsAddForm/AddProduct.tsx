import React from 'react';
import classes from './AddProduct.module.scss';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ProductCaresoul from '../ProductCaresoul/ProductCaresoul';
import Button from '@mui/material/Button';
import type {
  CurrencyTypes,
  FileInterface,
  ProductExpectedPayload,
} from '../../../../../../../../redux/interfaces/backend/apis/productPortfolio';
import { ref, uploadBytes } from 'firebase/storage';
import Client from '../../../../../../../../firebase/firebase_client_exports';
import { useAppSelector, useAppDispatch } from '../../../../../../../../redux/app/hooks';
import { updateNotification } from '../../../../../../../../redux/slices/notifications';
import Spinner from '../../../../../../Spinner/Spinner';
import { IMetaData } from '../../../../../../../../redux/interfaces/backend/apis';
import { Autocomplete, createFilterOptions } from '@mui/material';
import { ResponseParams } from '../../../../../../../../redux/interfaces/backend/apiHandlers';
import {
  ICreateProductUser,
  IProductImageDetails,
} from '../../../../../../../../redux/interfaces/backend/apis/v2/products/product.interfaces';
import { IProductOpsValidate } from '../../../../../../../../pages/api/v2/user-profile/products/product-user-validate';
import { IProductOpsCreate } from '../../../../../../../../pages/api/v2/user-profile/products/product-user-create';
import MUIEditAutoComplete from '../../../../../AutoComplete/MUIEditAutoComplete';
const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'INR',
    label: '₹',
  },
];

type FilesInterface = FileInterface[];
const filter = createFilterOptions();

export default function AddProduct(props: {
  isAdd: boolean;
  details: ProductExpectedPayload;
  metadata: IMetaData;
  triggerChanges: () => void;
  formCloseHandler?: () => void;
  open: boolean;
}) {
  const { isAdd, details, triggerChanges, formCloseHandler, open } = props;
  const {
    uid,
    firebaseToken,
    user: { plan },
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState(isAdd ? '' : details.productName);
  const [discount, setDiscount] = React.useState(isAdd ? 900 : details.discountedPrice);
  const [profession, setProfession] = React.useState([] as []);
  const [categories, setCategories] = React.useState([] as any[]);
  const [backendError, setBackendError] = React.useState('');
  const [fileUploaded, setFileUploaded] = React.useState(false);
  const [languages, setLanguages] = React.useState([] as string[]);
  const [sendProfession, setSendProfession] = React.useState([] as any[]);
  const [sendCategory, setSendCategory] = React.useState(['Art'] as any[]);
  const [productDetailsError, setProductDetailsError] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const closeModal = () => {
    setLoading(false);
    triggerChanges();
    if (formCloseHandler) formCloseHandler();
  };

  const [pricing, setPricing] = React.useState(isAdd ? 1000 : +details.productPrice);

  const [currency, setCurrency] = React.useState<CurrencyTypes>(isAdd ? 'INR' : details.productCurrencyType);

  const [description, setDescription] = React.useState(isAdd ? '' : details.productDetails);

  const [files, setFiles] = React.useState<FilesInterface>(
    isAdd ? [] : ((details?.images ?? []).map((element) => convertToFrontendSupported(element)) as FilesInterface)
  );

  //CategoryHandler
  const onFormChangeHandler = (formKey: any, value: React.SetStateAction<any[]>) => {
    setSendCategory(value);
  };

  React.useEffect(() => {
    fetch('/api/v2/languages')
      .then((res) =>
        res
          .json()
          .then((data: ResponseParams) => {
            setLanguages(data?.payload?.languages);
            setCategories(
              data.payload.category.map((value: any) => {
                return { label: value, value: value };
              })
            );
            setProfession(data?.payload?.profession);
          })
          .catch((error) => console.log(error))
      )
      .catch((error) => console.error(error));
  }, []);

  const resetInitState = React.useCallback(() => {
    setLoading(false);
    if (isAdd) {
      setTitle('');
      setDiscount(900);
      setPricing(1000);
      setCurrency('INR');
      setDescription('');
      setFiles([]);
      setSendCategory(['ART'] as any[]);
      setSendProfession(['Physical Art'] as any[]);
    }
    setBackendError('');
    setFileUploaded(false);
  }, [isAdd]);

  React.useEffect(() => {
    return () => {
      if (isAdd) {
        resetInitState();
      }
    };
  }, [isAdd, resetInitState]);

  React.useEffect(() => {
    if (!isAdd) {
      const modifiedImages = (details?.images ?? []).map((element) => convertToFrontendSupported(element));
      setFiles(modifiedImages);
    }
  }, [details.images, isAdd]);

  React.useEffect(() => {
    if (!isAdd) {
      if (details.productName) setTitle(details.productName);
      if (details.productPrice) setPricing(details.productPrice);
      if (details.productCurrencyType) setCurrency(details.productCurrencyType);
      if (details.productDetails) setDescription(details.productDetails);
      if (details.discountedPrice) setDiscount(details.discountedPrice);
      if (details.productCategory) setSendCategory(details.productCategory);
      if (details.productProfession) setSendProfession(details.productProfession);
    } else resetInitState();
  }, [resetInitState, open, isAdd, details]);

  const afterValidationHandler = (error: any, msg: string) => {
    console.log(error);
    dispatch(
      updateNotification({
        message: msg,
        status: 'error',
        title: 'Error',
        show: true,
      })
    );
    setLoading(false);
    closeModal();
  };

  const frontEndPayloadBuilder = (images: any[], folderRef: string): ICreateProductUser => ({
    productName: title,
    productCategory: sendCategory,
    productPrice: pricing,
    discountedPrice: discount,
    productCurrencyType: currency,
    productDetails: description,
    storageFolderRef: folderRef,
    productProfession: sendProfession,
    images,
  });

  const backendPayloadBuilder = (images: any[] = Array(files.length).fill(0), storageFolderRef: string) => {
    const genericPayload: ICreateProductUser = frontEndPayloadBuilder(images, storageFolderRef);
    const backendPayload: IProductOpsValidate = {
      frontendPayload: genericPayload,
      firebaseToken,
    };
    return backendPayload;
  };

  const validateErrorLocalChanger = (err: any, msg: string): { error: boolean; msg: string } => {
    console.log(err);
    setLoading(false);
    return { error: true, msg };
  };
  const basicFormValidator = async (storageRef: string) => {
    setLoading(true);
    setIsDisabled(true);
    const backendPayload = backendPayloadBuilder(Array(files.length).fill(0), storageRef);
    return await fetch('/api/v2/user-profile/products/product-user-validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendPayload),
    })
      .then((data) =>
        data
          .json()
          .then((data: ResponseParams) => {
            setIsDisabled(false);
            if (data.error) {
              return validateErrorLocalChanger(data, data.msg);
            } else {
              setLoading(false);
              return { error: false, msg: 'Validated Successfully' };
            }
          })
          .catch((err) => validateErrorLocalChanger(err, 'Unable to Decode Server Message'))
      )
      .catch((err) => validateErrorLocalChanger(err, '404: Server Not Found'));
  };

  const uploadToFireStore = (frontendPayload: ICreateProductUser, folderRef: string) => {
    setLoading(true);
    if (!isAdd) {
      frontendPayload.id = details.id;
      frontendPayload.storageFolderRef =
        folderRef !== '-1' ? `db-dev/user-metadata/portfolio/products/${uid}/${folderRef}` : details.storageFolderRef;
      folderRef = folderRef !== '-1' ? details.storageFolderRef : '-1';
    } else {
      frontendPayload.storageFolderRef = `db-dev/user-metadata/portfolio/products/${uid}/${folderRef}`;
    }
    const body: IProductOpsCreate = {
      firebaseToken,
      frontendPayload,
      folderRef,
    };
    fetch(`/api/v2/user-profile/products/${isAdd ? 'product-user-create' : 'product-user-modify'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((data) =>
        data
          .json()
          .then((data: ResponseParams) => {
            if (!data.error) {
              dispatch(
                updateNotification({
                  message: `Data Added Successfully`,
                  status: 'success',
                  title: 'Success',
                  show: true,
                })
              );
              setLoading(false);
              resetInitState();
              closeModal();
            } else {
              afterValidationHandler(data, data.msg);
            }
          })
          .catch((err) => afterValidationHandler(err, 'Unable to Parse JSON Response'))
      )
      .catch((error) => afterValidationHandler(error, 'Unable to Upload, Server Not Responding'));
  };

  const productImageUploadHandler = async (folderRef: string, uniqueTimeStamp: number) => {
    setLoading(true);
    const promises = files.map(
      (file, index) =>
        new Promise((resolve) => {
          const fileLocation = `db-dev/user-metadata/portfolio/products/${uid}/${folderRef}`;
          const imageName = `img_${uniqueTimeStamp}_${index}_${file.file.name}`;
          const loc = `${fileLocation}/${imageName}`;
          const storageRef = ref(Client.storage, loc);
          const contentType = file.file.type;
          uploadBytes(storageRef, file.file, {
            contentType,
          })
            .then(() => {
              const firebaseImageObject: IProductImageDetails = {
                imageName,
                imageAbsPath: loc,
                imageType: contentType,
                imagePreview: '',
                imageExpiryTimeStamp: -1,
                firebaseFolderLocation: fileLocation,
              };

              resolve(firebaseImageObject);
            })
            .catch((err) => {
              console.log(err);
              resolve({ error: true });
            });
        })
    );
    const results = await Promise.all(promises).then((data) => data);
    setLoading(false);
    return results;
  };

  const onSubmitHandler = async () => {
    const { error, msg } = await basicFormValidator('');
    if (error) {
      setBackendError(msg);
      setProductDetailsError(false);
      return;
    } else if (description === '') {
      setProductDetailsError(true);
      setBackendError('');
    } else {
      //Validate
      setLoading(true);
      setProductDetailsError(false);
      setBackendError('');
      if (fileUploaded) {
        setBackendError('');
        const uniqueTimeStamp = new Date().getTime();
        const folderRef = `products_${uniqueTimeStamp}__${Math.floor(Math.random() * 10000000)}`;
        const images = await productImageUploadHandler(folderRef, uniqueTimeStamp);
        const requestPayload = frontEndPayloadBuilder(images, folderRef);
        uploadToFireStore(requestPayload, folderRef);
        return;
      } else if (!isAdd) {
        const requestPayload = frontEndPayloadBuilder(details.images, details.storageFolderRef);
        uploadToFireStore(requestPayload, '-1');
        return;
      }
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      {backendError !== '' && (
        <label className={'error-red'} style={{ padding: '1rem' }}>
          {backendError}
        </label>
      )}
      <div className={classes.ProductLayout} style={{ pointerEvents: isDisabled ? 'none' : '' }}>
        <TextField
          required
          className={[classes.Product, classes.Product_Title].join(' ')}
          label='Product Name'
          size='small'
          type='text'
          value={title ?? ''}
          onChange={(event) => setTitle(event.target.value)}
        />
        <div className={[classes.Product, classes.Product_Pricing].join(' ')}>
          <TextField
            select
            className={classes.Product_CurrencyType}
            size='small'
            type='text'
            value={currency ?? 'INR'}
            onChange={(event) => {
              setCurrency((event.target.value ?? 'INR') as CurrencyTypes);
            }}
          >
            {currencies.map((option, index) => (
              <MenuItem key={option.value ?? 'INR' + index} value={option.value ?? 'INR'}>
                {option.label ?? '$'}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            className={classes.Product_CurrencyValue}
            label='Pricing'
            size='small'
            type='text'
            value={pricing ?? '1000'}
            onChange={(event) => setPricing(isNaN(+event.target.value) ? 1000 : +event.target.value)}
          />
        </div>
        <TextField
          required
          className={[classes.Product, classes.Product_Location].join(' ')}
          label='Discounted Price'
          size='small'
          type='text'
          value={discount ?? '1000'}
          onChange={(event) => setDiscount(isNaN(+event.target.value) ? 1000 : +event.target.value)}
        />
        <div className={classes.Product_ImagwViewer}>
          <ProductCaresoul
            files={files}
            onFileChangeHandler={setFiles}
            onSuccessfullyFileUploaded={setFileUploaded}
            isAdd={isAdd}
          />
        </div>
      </div>
      <div className={classes.RemaingElements}>
        {plan !== undefined && (
          <MUIEditAutoComplete
            options={categories}
            onFormChangeHandler={onFormChangeHandler}
            label='Category'
            formKey='category'
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              const isExisting = options.some((option) => inputValue === option?.title);
              if (inputValue !== '' && !isExisting) {
                filtered.push(inputValue);
              }
              return filtered;
            }}
            defaultValue={
              plan === 'pro'
                ? sendCategory?.map((value: any) => {
                    return { label: value, value: value };
                  })
                : sendCategory[0]
            }
          />
        )}

        <Autocomplete
          disablePortal
          limitTags={4}
          multiple
          size='small'
          fullWidth
          options={profession}
          onChange={(_, e) => {
            if (e) setSendProfession(e as []);
          }}
          value={sendProfession}
          defaultValue={sendProfession}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            const { inputValue } = params;
            const isExisting = options.some((option) => inputValue === option.title);
            if (inputValue !== '' && !isExisting) {
              filtered.push(inputValue);
            }
            return filtered;
          }}
          // defaultValue={!isAdd && details.productProfession}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Profession'
              required
              // className={classes.Product_Category}
              size='small'
            />
          )}
        />

        <TextField
          required
          className={classes.Product_Description}
          label='Add Product Details'
          size='small'
          type='text'
          placeholder='Type Here (500 characters max)'
          multiline
          rows={3}
          value={description ?? ''}
          onChange={(event) => setDescription(event.target.value.slice(0, 500))}
        />
        {productDetailsError && (
          <label className={'error-red'} style={{ padding: '1rem' }}>
            Please Add Product Details
          </label>
        )}
        <Button className={['ThemeButtonBlack', classes.Product_CTA].join(' ')} onClick={onSubmitHandler}>
          {isAdd ? 'Add Product' : 'Save Product'}
        </Button>
      </div>
    </React.Fragment>
  );
}

const convertToFrontendSupported = (file: IProductImageDetails): FileInterface => {
  return {
    preview: file.imagePreview,
    type: file.imageType,
    file: {
      name: file.imageName,
      type: file.imageType,
    },
  };
};
