import EasyPost from '@easypost/api';
import { Address, PackageDetails, ShippingLabel } from '@/types/shipping';

if (!process.env.NEXT_PUBLIC_EASYPOST_API_KEY) {
  throw new Error('EasyPost API key is not defined');
}

const client = new EasyPost(process.env.NEXT_PUBLIC_EASYPOST_API_KEY);


export async function createShippingLabel(
  fromAddress: Address,
  toAddress: Address,
  packageDetails: PackageDetails
): Promise<ShippingLabel> {
  try {
    const from = await client.Address.create(fromAddress);
    const to = await client.Address.create(toAddress);

    const parcel = await client.Parcel.create({
      weight: packageDetails.weight,
      length: packageDetails.length,
      width: packageDetails.width,
      height: packageDetails.height,
    });

    const shipment = await client.Shipment.create({
      from_address: from,
      to_address: to,
      parcel: parcel,
    
    });

    const retrievedShipment = await client.Shipment.retrieve(shipment.id);
    
    const boughtShipment = await client.Shipment.buy( retrievedShipment.id,
      retrievedShipment.lowestRate(),
      249.99,);

    return {
      id: boughtShipment.id,
      labelUrl: boughtShipment.postage_label.label_url,
      trackingCode: boughtShipment.tracking_code,
      rate: {
        service: boughtShipment.selected_rate.service,
        price: boughtShipment.selected_rate.rate,
        currency: boughtShipment.selected_rate.currency,
      },
    };
  } catch (error) {
    console.error('Error creating shipping label:', error);
    throw new Error('Failed to create shipping label. Please check your input and try again.');
  }
}


export async function validateAddress(address: Address): Promise<boolean> {
  try {
   const updatedAddress = {
    ...address,
    verify: true,
   }
    const validatedAddress = await client.Address.create(updatedAddress)

    console.log({Address: address,sucess: validatedAddress.verifications?.delivery?.success})
    

    return validatedAddress.verifications?.delivery?.success;
  } catch (error) {
    console.error('Error validating address:', error);
    return false;
  }
}