import * as Yup from 'yup';

export const AssetSchema = Yup.object({
  assetName: Yup.string().required(),
  assetAmount: Yup.number().positive().required(),
  dollarAmount: Yup.number().positive().required(),
  owner: Yup.string().required(),
});

export const EditAssetSchema = Yup.object({
  id: Yup.number().required(),
  assetName: Yup.string().required(),
  assetAmount: Yup.number().positive().required(),
  dollarAmount: Yup.number().positive().required(),
  owner: Yup.string().required(),
});
