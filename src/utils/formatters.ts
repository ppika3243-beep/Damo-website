import { businessConfig } from '../config/businessConfig';
import { DeliveryZone } from '../types';

export function formatPrice(amount: number): string {
  return `৳${amount.toLocaleString('en-US')}`;
}

export function getDeliveryCharge(zone: DeliveryZone): number {
  switch (zone) {
    case 'Inside Dhaka':
      return businessConfig.delivery.insideDhakaCharge;
    case 'Dhaka Suburbs':
      return businessConfig.delivery.dhakaSuburbsCharge;
    case 'Outside Dhaka':
      return businessConfig.delivery.outsideDhakaCharge;
    default:
      return businessConfig.delivery.insideDhakaCharge;
  }
}

export function isValidBdPhone(phone: string): boolean {
  // Matches 013-019 followed by 8 digits (11 digits total) or +8801...
  const cleaned = phone.replace(/[\s\-()]/g, '');
  const bdRegex = /^(?:\+8801|8801|01)[3-9]\d{8}$/;
  return bdRegex.test(cleaned);
}

export function formatBdPhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  if (cleaned.startsWith('+880')) {
    return cleaned;
  }
  if (cleaned.startsWith('880')) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith('01')) {
    return `+88${cleaned}`;
  }
  return phone;
}

export function createWhatsAppOrderLink(orderId: string, grandTotal: number, customerName: string): string {
  const cleanPhone = businessConfig.whatsappNumber;
  const message = encodeURIComponent(
    `Hello Urban Thread BD! I just placed an order:\n\nOrder ID: ${orderId}\nCustomer: ${customerName}\nTotal: ${formatPrice(grandTotal)}\n\nPlease let me know when it will be dispatched. Thank you!`
  );
  return `https://wa.me/${cleanPhone}?text=${message}`;
}
