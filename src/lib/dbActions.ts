/* eslint-disable max-len */

'use server';

import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { Decimal } from '@prisma/client/runtime/library';
import { prisma } from './prisma';

/**
 * Adds a new asset to the database.
 * @param asset, an object with the following properties: assetName, assetAmount, dollarAmount, owner.
 */
// After adding, redirect to the assets page

/**
 * Edits an existing asset in the database.
 // eslint-disable-next-line max-len, max-len
 * @param asset, an object with the following properties: id, assetName, assetAmount, dollarAmount, avgBuyPrice, profitLoss, owner.
 */
export async function editAsset(asset: {
  id: number;
  assetName: string;
  assetAmount: Decimal;
  dollarAmount: Decimal;
  owner: string;
}) {
  // console.log(`editAsset data: ${JSON.stringify(asset, null, 2)}`);
  await prisma.asset.update({
    where: { id: asset.id },
    data: {
      assetName: asset.assetName,
      assetAmount: asset.assetAmount,
      dollarAmount: asset.dollarAmount,
      owner: asset.owner,
    },
  });
  // After updating, redirect to the asset page
  redirect('/asset');
}

/**
 * Deletes an existing asset from the database.
 * @param id, the id of the asset to delete.
 */
export async function deleteAsset(id: number) {
  // console.log(`deleteAsset id: ${id}`);
  await prisma.asset.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/assets');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

export async function addAsset(asset: {
  assetName: string;
  assetAmount: Decimal;
  dollarAmount: Decimal;
  owner: string;
}) {
  // Create a new asset record in the correct model instead of updating the 'stuff' model
  await prisma.asset.create({
    data: {
      assetName: asset.assetName,
      assetAmount: asset.assetAmount,
      dollarAmount: asset.dollarAmount,
      owner: asset.owner,
    },
  });
  // After adding, redirect to the assets page
  redirect('/assets');
}
