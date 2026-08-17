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

  // Strategy 1: Direct POST with text/plain (bypasses browser CORS preflight & works across Netlify)
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
    console.warn('Direct fetch attempt failed, trying fallback...', directError);
  }

  // Strategy 2: Proxy if running in local server mode
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
    console.warn('Server proxy unavailable, proceeding to no-cors mode...', proxyError);
  }

  // Strategy 3: Direct POST with no-cors mode (Universal fallback for client-only static hosting like Netlify)
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
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(updated.slice(0, 50)));
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

/**
 * Local device order search
 */
export function findStoredOrder(query: string): StoredOrder | undefined {
  if (!query) return undefined;
  const rawQuery = query.trim();
  const cleanQuery = rawQuery.toUpperCase().replace(/^#/, '');
  const digitsOnlyQuery = rawQuery.replace(/\D/g, '');

  const orders = getStoredOrders();

  // 1. Exact match on Order ID
  const exactIdMatch = orders.find((o) => o.orderId.toUpperCase() === cleanQuery);
  if (exactIdMatch) return exactIdMatch;

  // 2. Match without 'UTBD-' prefix (e.g. searching '583567' for 'UTBD-583567')
  const partialIdMatch = orders.find((o) => {
    const idNum = o.orderId.replace(/\D/g, '');
    return (
      (digitsOnlyQuery.length >= 4 && idNum === digitsOnlyQuery) ||
      o.orderId.toUpperCase() === `UTBD-${cleanQuery}`
    );
  });
  if (partialIdMatch) return partialIdMatch;

  // 3. Match by phone number
  if (digitsOnlyQuery.length >= 7) {
    const phoneMatch = orders.find((o) => {
      const orderPhoneDigits = o.mobile.replace(/\D/g, '');
      return (
        orderPhoneDigits.includes(digitsOnlyQuery) ||
        digitsOnlyQuery.includes(orderPhoneDigits)
      );
    });
    if (phoneMatch) return phoneMatch;
  }

  return undefined;
}

/**
 * Fetch REAL-TIME order data from Google Apps Script live spreadsheet (JSONP & Direct Cross-Domain)
 */
export async function fetchRemoteOrder(query: string): Promise<StoredOrder | null> {
  const cleanQuery = query.trim();
  if (!cleanQuery) return null;

  const targetEndpoint = `${businessConfig.orderApiEndpoint}?action=track&query=${encodeURIComponent(
    cleanQuery
  )}&orderId=${encodeURIComponent(cleanQuery)}`;

  // Strategy 1: Direct JSON fetch
  try {
    const res = await fetch(targetEndpoint, {
      method: 'GET',
    });

    if (res.ok) {
      const json = await res.json().catch(() => null);
      if (json && json.found === true && json.orderId) {
        const remoteOrder: StoredOrder = {
          orderId: json.orderId,
          customerName: json.customerName || 'Customer',
          mobile: json.mobile || '',
          itemsSummary: json.product || 'Urban Thread BD Apparel',
          deliveryZone: json.deliveryZone || 'Inside Dhaka',
          district: json.district || 'Dhaka',
          address: json.address || 'Dhaka',
          paymentMethod: json.paymentMethod || 'Cash on Delivery',
          subtotal: Number(json.subtotal) || 0,
          deliveryCharge: Number(json.deliveryCharge) || 70,
          grandTotal: Number(json.grandTotal) || 0,
          date: json.date || new Date().toISOString(),
          orderStatus: json.orderStatus || 'Confirmed & Processing',
          items: [],
        };
        return remoteOrder;
      }
    }
  } catch (err) {
    console.warn('Direct GET check fallback...', err);
  }

  // Strategy 2: Universal JSONP fallback (Bypasses Google Apps Script redirect CORS issues in browsers)
  return new Promise((resolve) => {
    const callbackName = `track_order_cb_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const script = document.createElement('script');
    
    // Timeout after 4 seconds if no response
    const timer = setTimeout(() => {
      cleanup();
      resolve(null);
    }, 4500);

    const cleanup = () => {
      clearTimeout(timer);
      if ((window as any)[callbackName]) {
        delete (window as any)[callbackName];
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };

    (window as any)[callbackName] = (json: any) => {
      cleanup();
      if (json && json.found === true && json.orderId) {
        const remoteOrder: StoredOrder = {
          orderId: json.orderId,
          customerName: json.customerName || 'Customer',
          mobile: json.mobile || '',
          itemsSummary: json.product || 'Urban Thread BD Apparel',
          deliveryZone: json.deliveryZone || 'Inside Dhaka',
          district: json.district || 'Dhaka',
          address: json.address || 'Dhaka',
          paymentMethod: json.paymentMethod || 'Cash on Delivery',
          subtotal: Number(json.subtotal) || 0,
          deliveryCharge: Number(json.deliveryCharge) || 70,
          grandTotal: Number(json.grandTotal) || 0,
          date: json.date || new Date().toISOString(),
          orderStatus: json.orderStatus || 'Confirmed & Processing',
          items: [],
        };
        resolve(remoteOrder);
      } else {
        resolve(null);
      }
    };

    script.src = `${targetEndpoint}&callback=${callbackName}`;
    script.onerror = () => {
      cleanup();
      resolve(null);
    };

    document.head.appendChild(script);
  });
}
