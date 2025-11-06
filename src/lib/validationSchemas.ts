import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const AssetSchema = Yup.object({
  assetName: Yup.string().required(),
  assetAmount: Yup.number().positive().required(),
  dollarAmount: Yup.number().positive().required(),
  avgBuyPrice: Yup.number().positive(),
  profitLoss: Yup.number(),
  owner: Yup.string().required(),
});
