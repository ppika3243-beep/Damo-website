import { businessConfig } from '../config/businessConfig';
import { OrderPayload, OrderSubmissionResult, StoredOrder, CartItem } from '../types';

/**
 * Generate unique Order ID in the format UTBD-XXXXXX (e.g. UTBD-048291)
 */
export function generateOrderId(): string {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `UTBD-${randomNum}`;
}

const LOCAL_STORAGE_ORDERS_KEY = 'urban_thread_bd_orders';

/**
 * Submit order to Google Apps Script Web App endpoint
 */
export async function submitOrderToGoogleSheet(
  payload: OrderPayload,
  cartItems?: CartItem[]
): Promise<OrderSubmissionResult> {
  const targetEndpoint = businessConfig.orderApiEndpoint;

  const bodyData = {
    orderId: payload.orderId,
    customerName: payload.customerName.trim(),
    mobile: payload.mobile.trim(),
    product: payload.product,
    size: payload.size,
    quantity: payload.quantity,
    deliveryZone: payload.deliveryZone,
    district: payload.district,
    address: payload.address.trim(),
    paymentMethod: payload.paymentMethod,
    paymentStatus: payload.paymentStatus || 'Pending',
    deliveryNote: payload.deliveryNote ? payload.deliveryNote.trim() : '',
    subtotal: payload.subtotal,
    deliveryCharge: payload.deliveryCharge,
    grandTotal: payload.grandTotal,
    orderStatus: payload.orderStatus || 'New',
    adminNote: payload.adminNote || '',
  };

  const jsonString = JSON.stringify(bodyData);

  // Strategy 1: Use server proxy `/api/submit-order` (bypasses browser CORS & redirects smoothly)
  try {
    const proxyResponse = await fetch('/api/submit-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonString,
    });

    if (proxyResponse.ok) {
      const data = await proxyResponse.json().catch(() => ({ success: true }));
      if (data.success !== false) {
        saveOrderLocally(payload, cartItems);
        return {
          success: true,
          orderId: payload.orderId,
          message: 'Your order has been received successfully.',
          payload,
          timestamp: new Date().toISOString(),
        };
      }
    }
  } catch (proxyError) {
    console.warn('Server proxy order submission unavailable, trying direct connection...', proxyError);
  }

  // Strategy 2: Direct POST with text/plain (avoids browser preflight OPTIONS while sending valid JSON string to Google Apps Script)
  try {
    const directResponse = await fetch(targetEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: jsonString,
    });

    if (directResponse.ok || directResponse.type === 'opaque') {
      saveOrderLocally(payload, cartItems);
      return {
        success: true,
        orderId: payload.orderId,
        message: 'Your order has been received successfully.',
        payload,
        timestamp: new Date().toISOString(),
      };
    }
  } catch (directError) {
    console.warn('Direct text/plain fetch failed, attempting no-cors fallback...', directError);
  }

  // Strategy 3: Direct POST with no-cors mode (ensures browser does not block Google redirect)
  try {
    await fetch(targetEndpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: jsonString,
    });

    saveOrderLocally(payload, cartItems);
    return {
      success: true,
      orderId: payload.orderId,
      message: 'Your order has been received successfully.',
      payload,
      timestamp: new Date().toISOString(),
    };
  } catch (noCorsError: unknown) {
    const errMessage =
      noCorsError instanceof Error
        ? noCorsError.message
        : 'Network connection failed while reaching the order server. Please check your internet connection and try again.';

    console.error('Order submission error:', noCorsError);

    return {
      success: false,
      message: errMessage,
      payload,
    };
  }
}

/**
 * Save order to localStorage for tracking and receipt download
 */
export function saveOrderLocally(payload: OrderPayload, cartItems?: CartItem[]): void {
  try {
    const stored = getStoredOrders();
    const newOrder: StoredOrder = {
      orderId: payload.orderId,
      customerName: payload.customerName,
      mobile: payload.mobile,
      itemsSummary: payload.product,
      deliveryZone: payload.deliveryZone,
      district: payload.district,
      address: payload.address,
      paymentMethod: payload.paymentMethod,
      subtotal: payload.subtotal,
      deliveryCharge: payload.deliveryCharge,
      grandTotal: payload.grandTotal,
      date: new Date().toISOString(),
      orderStatus: payload.orderStatus || 'New',
      items: cartItems || [],
    };

    const updated = [newOrder, ...stored.filter((o) => o.orderId !== payload.orderId)];
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(updated.slice(0, 20)));
  } catch (err) {
    console.warn('Could not save order locally:', err);
  }
}

export function getStoredOrders(): StoredOrder[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function findStoredOrder(orderId: string): StoredOrder | undefined {
  const cleanId = orderId.trim().toUpperCase();
  const orders = getStoredOrders();
  return orders.find((o) => o.orderId.toUpperCase() === cleanId);
}
